const express = require("express");
const path = require("path");

const checkRoute = require("./routes/check");

const app = express();

app.use(express.json());

// API
app.use("/api", checkRoute);

// serve frontend
app.use(express.static(path.join(__dirname, "../client")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
