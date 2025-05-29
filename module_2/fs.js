// file read - I/O intensive task
// synchronous
// 2. file read -> single thread -> block the event loop
const fs = require('node:fs');

const data = fs.readFileSync("./files/hello.txt", { encoding: 'utf-8' });

console.log(data);
// asynchronousk
// file read -> single thread -> event loop -> thread pool
