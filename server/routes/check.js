const express = require("express");
const router = express.Router();

const { analyzePassword } = require("../services/analysis");

router.post("/check", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  const result = analyzePassword(password);

  res.json(result);
});

module.exports = router;
