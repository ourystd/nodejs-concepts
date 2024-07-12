const { Buffer } = require("node:buffer");

const memoryContainer = Buffer.alloc(4); // 4 bytes | 32 bites

memoryContainer[0] = 0b1111;
memoryContainer[1] = 0x34;
memoryContainer.writeInt8(-34, 2);

console.log(memoryContainer);

for (item of memoryContainer) {
  console.log(item);
}
console.log(memoryContainer.readInt8(2));

console.log(memoryContainer.toString("hex"));
