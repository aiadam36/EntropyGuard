const express = require("express");
const path = require("path");

const app = express();

// serve frontend
app.use(express.static(path.join(__dirname, "../client")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
