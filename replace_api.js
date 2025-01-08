const fs = require("fs");
const path = require("path");

// Path to the config.js file
const filePath = path.resolve(__dirname, "public/config.js");

// Read the file content
let fileContent = fs.readFileSync(filePath, "utf-8");

// Replace the placeholder with the actual API URL from the environment variable
const apiUrl = process.env.API_URL || "http://localhost:5000"; // Default for local development
fileContent = fileContent.replace(/_API_URL_/g, apiUrl);

// Write the updated content back to the file
fs.writeFileSync(filePath, fileContent, "utf-8");

console.log(`API URL in config.js replaced with: ${apiUrl}`);
