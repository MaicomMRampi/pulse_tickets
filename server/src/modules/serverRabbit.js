import amqplib from "amqplib";

export default class RabbitmqServer {
  constructor(connection_string) {
    this.uri = connection_string;
  }
  async start() {
    this.conn = await amqplib.connect(this.uri);
    this.channel = await this.conn.createChannel();
  }
  async disconnect() {
    await this.channel.close();
    await this.conn.close();
  }
  async publishQueue(queueName, message) {
    return this.channel.sendToQueue(queueName, Buffer.from(message));
  }
  async consumeQueue(queueName, callback) {
    await this.channel.prefetch(1); // Configura prefetch como 1
    return this.channel.consume(
      queueName,
      async (message) => {
        await callback(message); // Aguarda o processamento completo do callback
        this.channel.ack(message); // Confirma manualmente o recebimento da mensagem
      },
      { noAck: false }, // Define noAck como false
    );
  }
}
