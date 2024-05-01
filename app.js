const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", function (request, reply) {
  /*
  console.log(request.params);
  console.log(request.raw.rawHeaders);
  console.log(request.method);
  console.log(request.url);
  console.log(request.query);
  console.log(request.body);
  */
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
