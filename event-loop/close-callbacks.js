const fs = require("fs");

const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on("close", () => {
  console.log("\nthis is from readableStream close event callback\n");
});
fs.open("./the-file.txt", "w+", (err, fd) => {
  console.log("\nthis is from fs.open callback\n");
  fs.writeSync(fd, "Hello World\n");
  fs.close(fd, () => {
    console.log("\nthis is from fs.close callback\n");
  });
  process.nextTick(() => {
    console.log("\ninner process.nextTick: in fs.close callback\n");
  });
});

fs.open("./the-file2.txt", "w+", (err, fd) => {
  console.log("\n2 this is from fs.open callback\n");
  fs.writeSync(fd, "2 Hello World\n");
  fs.close(fd, () => {
    console.log("\n2 this is from fs.close callback\n");
  });
});

setImmediate(() => {
  console.log("\nthis is setImmediate 1\n");
  process.nextTick(() => {
    console.log("\ninner Promise.resolve: in setImmediate 1\n");
  });
});
setImmediate(() => console.log("this is setImmediate 2"));
setTimeout(() => {
  console.log("\nthis is setTimeout 1\n");
  Promise.resolve().then(() => {
    console.log("\ninner Promise.resolve 2: in setTimeout\n");
  });
}, 0);
setTimeout(() => console.log("this is setTimeout 2"), 0);
Promise.resolve().then(() => {
  console.log("\nthis is Promise.resolve 1\n");
  process.nextTick(() => {
    console.log("\ninner process.nextTick\n");
    Promise.resolve().then(() => {
      console.log("\ninner Promise.resolve\n");
    });
  });
});
Promise.resolve().then(() => {
  console.log("\nthis is Promise.resolve 2\n");
});
process.nextTick(() => {
  console.log("\nthis is process.nextTick 1\n");
});
