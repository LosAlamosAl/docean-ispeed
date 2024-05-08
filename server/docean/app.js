// TODO: add logging
// TODO: add better error checking
// TODO: add S3 backup
// TODO: populate and use the .env file
// TODO: comment and document in README
const fastify = require("fastify")({
  logger: true,
});
const fs = require("fs");

fastify.get("/losalamosal", function (request, reply) {
  reply.send(fs.readFileSync("speeds.txt", { encoding: "utf8" }));
});

fastify.post("/losalamosal", function (request, reply) {
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
