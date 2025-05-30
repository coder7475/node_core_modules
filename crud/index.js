const http = require('http')

const server = http.createServer((req, res) => {
  // res.end("Welcome to CRUD APP!");
  if (req.url === "/todos" && req.method === "GET") {
    res.end("All Todos")
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
