import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async (req, res) => {
  return { hello: "world" };
});

fastify.listen({ port: 3000 });
