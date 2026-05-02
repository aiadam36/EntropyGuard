const { calculateEntropy, classifyEntropy } = require("./entropy");

function estimateCrackTime(entropy) {
  // guesses = 2^entropy
  const guesses = Math.pow(2, entropy);

  // assume attacker speed (guesses per second)
  const OFFLINE_FAST = 1e10; // strong GPU attack
  const ONLINE_SLOW = 100;   // rate-limited login

  function formatTime(seconds) {
    if (seconds < 1) return "Instant";

    const units = [
      { label: "years", value: 60 * 60 * 24 * 365 },
      { label: "days", value: 60 * 60 * 24 },
      { label: "hours", value: 60 * 60 },
      { label: "minutes", value: 60 },
      { label: "seconds", value: 1 }
    ];

    for (const u of units) {
      const amt = Math.floor(seconds / u.value);
      if (amt >= 1) return `${amt} ${u.label}`;
    }
  }

  return {
    offline_fast: formatTime(guesses / OFFLINE_FAST),
    online_slow: formatTime(guesses / ONLINE_SLOW)
  };
}

function analyzePassword(password) {
  const entropy = calculateEntropy(password);
  const strength = classifyEntropy(entropy);

  const feedback = [];

  if (password.length < 8) feedback.push("Use at least 8 characters");
  if (!/[A-Z]/.test(password)) feedback.push("Add uppercase letters");
  if (!/[0-9]/.test(password)) feedback.push("Include numbers");
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push("Add symbols");

  const crackTime = estimateCrackTime(entropy);

  return {
    length: password.length,
    entropy: Number(entropy.toFixed(2)),
    strength,
    crackTime,
    feedback
  };
}

module.exports = { analyzePassword };
