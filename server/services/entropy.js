const { getCharsetSize } = require("../utils/charset");

function calculateEntropy(password) {
  const charset = getCharsetSize(password);
  if (charset === 0) return 0;

  return password.length * Math.log2(charset);
}

function classifyEntropy(entropy) {
  if (entropy < 28) return "Very Weak";
  if (entropy < 36) return "Weak";
  if (entropy < 60) return "Reasonable";
  if (entropy < 128) return "Strong";
  return "Very Strong";
}

module.exports = { calculateEntropy, classifyEntropy };
