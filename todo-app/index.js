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

  } else if (req.url === "/todos" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    })

    req.on('end', () => {

      const { title, body } = JSON.parse(data);
      const createdAt = new Date().toLocaleString();
      const getTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const allTodos = JSON.parse(getTodos);

      allTodos.todos.push({ title, body, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(allTodos), { encoding: "utf-8" });


      res.end("Todo Created!");
    })


  } else {

    res.writeHead(404);

    res.end("Not Found!");
  }
})

server.listen(3000, () => {
  console.log("Server is running!");
})
