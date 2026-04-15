import Fastify from "fastify";
import startRabbitListener from "./src/modules/rabbitListener.js";

const fastify = Fastify({ logger: false });

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
  // startRabbitListener();
});

export default fastify;
