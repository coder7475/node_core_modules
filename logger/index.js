// console.log(process.argv);
const path = require('path');
const fs = require('fs');
const { timeStamp } = require('console');

const inputArgs = process.argv.slice(2)

const text = inputArgs.join(" ").concat("\n");
const timestamp = new Date().toISOString();
console.log(timestamp);
if (!text) {
  console.log("X Please provide a message to log");
  console.log("Ex: node logger/ Hello World!");
  process.exit(1);
}
const log = `${text} ${timestamp}\n`;
//console.log("Read Arguments");

const filePath = path.join(__dirname, "log.txt");
//console.log(text);
//console.log(filePath);

fs.appendFile(filePath, log, { encoding: 'utf-8' }, (err) => {
  if (err) throw err;
  console.log("Finished writing!");
})
