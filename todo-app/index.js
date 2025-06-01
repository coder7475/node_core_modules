
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the path to the JSON file where todos are stored
const filePath = path.join(__dirname, "./data/todo.json");

// Create the HTTP server
const server = http.createServer((req, res) => {

  // Root route - health check
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200);
    res.end("Todo server is running!");

    // GET /todos - fetch all todos
  } else if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(data);

    // POST /todos - create a new todo
  } else if (req.url === "/todos" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const { title, body } = JSON.parse(data);
      const createdAt = new Date().toLocaleString();

      // Read existing todos
      const getTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const allTodos = JSON.parse(getTodos);

      // Add new todo
      allTodos.todos.push({ title, body, createdAt });

      // Save updated list
      fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2), { encoding: "utf-8" });

      res.end("Todo Created!");
    });

    // PUT /todos/:id - update a todo by index
  } else if (req.url.startsWith("/todos/") && req.method === "PUT") {
    const id = parseInt(req.url.split("/")[2]);

    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { title, body } = JSON.parse(data);

      // Read todos
      const getTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const allTodos = JSON.parse(getTodos);

      // Check if index is valid
      if (id >= 0 && id < allTodos.todos.length) {
        // Update the fields
        allTodos.todos[id] = {
          ...allTodos.todos[id],
          title: title || allTodos.todos[id].title,
          body: body || allTodos.todos[id].body,
          updatedAt: new Date().toLocaleString()
        };

        // Save changes
        fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2), { encoding: "utf-8" });

        res.end("Todo Updated!");
      } else {
        res.writeHead(404);
        res.end("Todo not found!");
      }
    });

    // DELETE /todos/:id - delete a todo by index
  } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);

    // Read todos
    const getTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
    const allTodos = JSON.parse(getTodos);

    // Check if index is valid
    if (id >= 0 && id < allTodos.todos.length) {
      // Remove item
      allTodos.todos.splice(id, 1);

      // Save updated list
      fs.writeFileSync(filePath, JSON.stringify(allTodos, null, 2), { encoding: "utf-8" });

      res.end("Todo Deleted!");
    } else {
      res.writeHead(404);
      res.end("Todo not found!");
    }

    // Handle undefined routes
  } else {
    res.writeHead(404);
    res.end("Not Found!");
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running!");
});
