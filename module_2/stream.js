const fs = require("node:fs");


const readStream = fs.createReadStream('./files/output.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('files/hello.txt', { encoding: 'utf-8' })

// console.log(readStream);

readStream.on('data', (chunk) => {
  console.log(chunk);

  writeStream.write(chunk, (err) => {
    if (err) {
      throw Error("Write Error!");
    }
  })
})



