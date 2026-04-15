import RabbitmqServer from "./serverRabbit.js";

export default async function startRabbitListener() {
  try {
    const rabbit = new RabbitmqServer(process.env.RABBITMQ_URI);

    await rabbit.start();

    await rabbit.consumeQueue("envio_email", async (email) => {
      const data = JSON.parse(email.content.toString());
      console.log(data);
    });
  } catch (error) {
    console.error("Erro no RabbitMQ:", error);
  }
}
