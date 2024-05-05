const fastify = require("fastify")({
  logger: true,
});
const fs = require("fs");

fastify.get("/losalamosal", function (request, reply) {
  reply.send(fs.readFileSync("speeds.txt", { encoding: "utf8" }));
});

fastify.post("/losalamosal", function (request, reply) {
  /*
  console.log(request.params);
  console.log(request.raw.rawHeaders);
  console.log(request.method);
  console.log(request.url);
  console.log(request.query);
  */
  console.log(request.body);

  fs.appendFileSync("speeds.txt", request.body + "\n");
  reply.send(request.body);
});

// Run the server!
fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
