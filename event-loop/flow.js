const fs = require("fs");

(() => {
  console.log("START");

  setTimeout(() => {
    console.log("setTimeout 1");
  }, 0);

  setImmediate(() => {
    console.log("setImmidiate");
  });

  fs.readFile(__filename, () => {
    setTimeout(() => {
      console.log("readFile setTimeout");
    }, 0);
    setImmediate(() => {
      console.log("readFile setImmediate");
    });
    process.nextTick(() => {
      console.log("readFile Next Tick");
    });
  });

  Promise.resolve().then(() => {
    console.log("Promise");
    process.nextTick(() => {
      console.log("Promise Next Tick");
    });
  });

  process.nextTick(() => {
    console.log("Next Tick");
  });

  setTimeout(() => {
    console.log("setTimeout 2");
  }, 0);

  console.log("END");
})();
