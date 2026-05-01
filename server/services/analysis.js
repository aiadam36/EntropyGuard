const { calculateEntropy, classifyEntropy } = require("./entropy");

function analyzePassword(password) {
  const entropy = calculateEntropy(password);
  const strength = classifyEntropy(entropy);

  const feedback = [];

  if (password.length < 8) {
    feedback.push("Use at least 8 characters");
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push("Add uppercase letters");
  }

  if (!/[0-9]/.test(password)) {
    feedback.push("Include numbers");
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push("Add symbols");
  }

  return {
    length: password.length,
    entropy: Number(entropy.toFixed(2)),
    strength,
    feedback
  };
}

module.exports = { analyzePassword };
