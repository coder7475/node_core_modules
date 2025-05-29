// file read/write - I/O intensive task
// synchronous
// 2. file read -> single thread -> block the event loop
const fs = require('node:fs');

// reading from file
const data = fs.readFileSync("./files/hello.txt", { encoding: 'utf-8' });

console.log(data);

// witing to a file
const text = "Writing to a file second time";

fs.writeFileSync("./files/hello.txt", text);



// asynchronousk
// file read -> single thread -> event loop -> thread pool
//
let text_2 = "Task 1";

const data_2 = fs.readFile('./files/hello.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log("Something went wrong!", err);
    return;
  }

  text_2 = data;

  console.log(data);
})

console.log(text_2);

console.log("Task 3");


// write asynchronously 
//
const newData = "Writing asynchronously";

fs.writeFile("./files/hello.txt", newData, { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("Error writing the file", err);
    return;
  }
  console.log("File written successfully!");
})




