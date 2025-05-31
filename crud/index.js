const http = require('http')

const data = [
  {
    title: "Hello"
  }
]
const server = http.createServer((req, res) => {
  // res.end("Welcome to CRUD APP!");
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, "Successful", {
      "content-type": "text/json",
    })
    // res.setHeader(headers)
    // res.end("All Todos")
    res.end(JSON.stringify(data));
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("Todos Created");
  } else {
    res.end("Route Not found");
  }
});

server.listen(5000, "localhost", () => {
  console.log("Server listening to port 5000");
})

/**
 * /todos - GET - All todos
 * /todos/create-todo - POST . Create Todo
 *
 */
