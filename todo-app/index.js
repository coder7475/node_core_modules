const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "./data/todo.json");


const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200);
    res.end("Todo server is running!")
  } else if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.writeHead(200, {
      "content-type": "text/json",
    })

    res.end(data);
  } else {
    res.writeHead(404);
    res.end("Not Found!");
  }
})

server.listen(3000, () => {
  console.log("Server is running!");
})
