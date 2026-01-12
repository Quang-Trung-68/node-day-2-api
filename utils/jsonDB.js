const fs = require("node:fs");
const path = require("path");

function loadDB(resourceName) {
  try {
    const dbDir = path.join(__dirname, "..", "db");
    const filePath = path.join(dbDir, `${resourceName}.json`);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("load DB error:", error.message);
    return [];
  }
}

function saveDB(resourceName, data) {
  try {
    const dbDir = path.join(__dirname, "..", "db");
    const filePath = path.join(dbDir, `${resourceName}.json`);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
    }

    const rawData = JSON.stringify(data, null, 2);

    fs.writeFileSync(filePath, rawData, "utf-8");
    return;
  } catch (error) {
    console.error("save DB error:", error.message);
  }
}

module.exports = { loadDB, saveDB };
