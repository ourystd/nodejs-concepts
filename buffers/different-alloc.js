const { Buffer } = require("node:buffer");

const buff = Buffer.alloc(5000);

console.log(buff.length);

for (let i = 0; i < buff.length; i++) {
  const value = buff[i];
  if (value !== 0) {
    console.log(`Elmt at pos ${i} is: ${value.toString(16)}`);
  }
}

console.log(-100 >>> 1);
