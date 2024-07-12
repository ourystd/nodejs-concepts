const fs = require("node:fs");
const fsPromises = require("node:fs/promises");

const fileContent = fs.readFileSync("text.txt");

(async () => {
  try {
    const fileContent = await fsPromises.readFile("text.txt");
    console.log("new", fileContent);
  } catch (error) {
    console.error(error);
  }
})();

console.log(fileContent.toString());
