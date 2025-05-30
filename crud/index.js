const http = require('http')

const server = http.createServer((req, res) => {
  res.end("Welcome to CRUD APP!");
});

server.listen(5000, "localhost", () => {
  console.log("Server listening to port 5000");
})
