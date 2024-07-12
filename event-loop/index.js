const fs = require("node:fs");

/* console.log("first");
fs.readFile(__filename, "utf8", (err, data) => {
  console.log("second");
});
console.log("last"); */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const longComputationTask = () => {
  for (let i = 0; i < 1_000_000_000; i++) {}
  console.log("longComputationTask");
};

const cb1 = () => {
  console.log("cb1", "setTimeout");
};
const cb2 = async () => {
  console.log("cb2", "Promise.resolve.then");
  //   await sleep(1000).then(() => console.log("cb2'", "awake from sleep"));
};
const cb3 = () => {
  console.log("cb3", "process.nextTick");
  //   longComputationTask();
};
const cb4 = () => {
  console.log("cb4", "fs.readFile");
};
const cb5 = () => {
  console.log("cb5", "setImmediate");
};

console.log("=== Main start ===");
Promise.resolve().then(cb2);
setTimeout(cb1, 0);
Promise.resolve().then(cb2);
setTimeout(cb1, 0);
process.nextTick(cb3);
setTimeout(cb1, 0);
fs.readFile(__filename, cb4);
fs.readFile(__filename, cb4);
setImmediate(cb5);
longComputationTask();
process.nextTick(() => console.log("nextTick 2"));
console.log("=== Main end ===");
