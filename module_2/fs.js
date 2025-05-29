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
const data_2 = fs.readFile('./files/hello.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log("Something went wrong!", err);
    return;
  }

  console.log(data);
})
