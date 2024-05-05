import fs from "fs";

// Read the JSON file synchronously
const data = fs.readFileSync("output.json", "utf-8");

// Parse the JSON data
const jsonData = JSON.parse(data);

console.log(jsonData); // Log the JSON data to the console
// You can now use the 'jsonData' variable to access the JSON object
