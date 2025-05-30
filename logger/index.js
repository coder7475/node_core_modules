// console.log(process.argv);
const path = require('path');
const fs = require('fs');

const inputArgs = process.argv.slice(2)

const text = inputArgs.join(" ");

if (!text) {
  console.log("X Please provide a message to log");
  console.log("Ex: node logger/ Hello World!");
  process.exit(1);
}

console.log("Read Arguments");

const filePath = path.join(__dirname, "log.txt");

console.log(filePath);

fs.appendFile(filePath, text, { encoding: 'utf-8' }, (err) => {
  if (err) throw err;
  console.log("Finished writing!");
})
