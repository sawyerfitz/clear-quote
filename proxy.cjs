require("dotenv").config();

const http = require("http");
const https = require("https");

http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    return res.end();
  }

  if (req.method !== "POST" || req.url !== "/v1/messages") {
    res.writeHead(404, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    return res.end(JSON.stringify({ error: "Route not found" }));
  }

  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const apiReq = https.request(options, apiRes => {
      let data = "";

      apiRes.on("data", chunk => {
        data += chunk;
      });

      apiRes.on("end", () => {
        console.log("Status:", apiRes.statusCode);
        console.log("Response:", data);

        res.writeHead(apiRes.statusCode || 500, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        });

        res.end(data);
      });
    });

    apiReq.on("error", err => {
      console.error(err);
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    });

    apiReq.write(body);
    apiReq.end();
  });
}).listen(3001, () => {
  console.log("Proxy running on http://localhost:3001");
});
