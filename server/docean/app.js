// TODO: add logging
// TODO: add better error checking
// TODO: add S3 backup
// TODO: populate and use the .env file
// TODO: comment and document in README
// TODO: error checking and proper HTTP error codes
// TODO: error checking on Pi with Pushover notifications
// TODO: reconcile difference in CSV column names (Pi vs. DO)
// TODO: move from adubdub to Boo's domain
// TODO: try Caddy instead of NGINX

const fastify = require("fastify")({
  logger: true,
});
const fs = require("fs");
const { parse } = require("csv-parse/sync");
const speedsFile = "speeds.txt";

fastify.get("/losalamosal", function (request, reply) {
  console.log("query: " + JSON.stringify(request.query));

  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET");

  switch (request.query.format) {
    case "highcharts":
      console.log("HighCharts format");
      reply.send(formatForHighcharts());
      break;
    default:
      console.log("Unsupported format");
      reply.status(501).send({ ok: false });
      break;
  }
});

// Append record (current speeds) to end of speedsFile.
// The speedsFile is a CSV file with headers:
// DATETIME,DOWNLOAD,UPLOAD
// The data in this CSV file is converted to various formats
// when requested by a GET command (e.g. for different plotting
// tools).
fastify.post("/losalamosal", function (request, reply) {
  console.log("body: " + request.body);

  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "POST");

  fs.appendFileSync(speedsFile, request.body + "\n");
  reply.status(200).send({ ok: true });
});

// Return all speeds in a format suitable for Highcharts client.
function formatForHighcharts() {
  // FIXME: break out the read to return error if file not found
  const records = parse(fs.readFileSync(speedsFile, { encoding: "utf8" }), {
    columns: true,
    skip_empty_lines: true,
  });
  let hcdata = [];
  for (const record of records) {
    let onePoint = {};
    onePoint.t = record.DATETIME;
    onePoint.d = Math.trunc(parseInt(record.DOWNLOAD) / 1000000) + " Mbps";
    onePoint.u = Math.trunc(parseInt(record.UPLOAD) / 1000000) + " Mbps";
    hcdata.push(onePoint);
  }
  var hourlyData = hcdata.map((arr) => {
    console.log(arr);
    var narr = [];
    var speed = parseInt(arr["d"].split(" ")[0]);
    if (isNaN(speed)) speed = null;
    narr.push(Date.parse(arr["t"]), speed);
    return narr;
  });
  console.log(hourlyData);
  return hcdata;
}

// Run the server!
fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
