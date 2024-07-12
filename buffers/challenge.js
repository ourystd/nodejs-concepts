// 0100 1000 0110 1001 0010 0001

const { Buffer } = require("node:buffer");

const mem = Buffer.from([0b01001000, 0b01101001, 0b00100001]);
// const values = ;
// for (let i = 0; i < 6; i++) {
//   mem[i] = values[i];
// }

console.log(mem);
console.log(mem.toString("utf-8"));

/////////////////////////////////////////////

const buff = Buffer.from("Hello World!", "utf-8");
console.log(buff);

const simplerBuff = Buffer.from("486921", "hex");

console.log(simplerBuff);
