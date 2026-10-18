const http = require("http");
const fs = require("fs");
const path = require("path");
const client = require("prom-client");

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests received",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const server = http.createServer(async (req, res) => {
  const route = req.url.split("?")[0];

  if (route === "/metrics") {
    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());
    return;
  }

  let status = 200;

  if (route === "/health") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "ok" }));
  } else if (route === "/" || route === "/index.html") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    fs.createReadStream(path.join(__dirname, "index.html"))
      .on("error", () => {
        if (!res.headersSent) res.writeHead(500);
        res.end("Internal server error");
      })
      .pipe(res);
  } else {
    status = 404;
    res.writeHead(status, { "Content-Type": "text/plain" });
    res.end("Not found");
  }

  requests.inc({
    method: req.method,
    route,
    status_code: String(status),
  });
});

const port = Number(process.env.PORT) || 3000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Lumina server listening on port ${port}`);
});
