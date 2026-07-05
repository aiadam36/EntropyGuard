const zxcvbn = require("zxcvbn");

function analyzePassword(password) {
  const result = zxcvbn(password);

  const strengthLabels = ["Very Weak", "Weak", "Reasonable", "Strong", "Very Strong"];

  const crackTimeSecs = result.crack_times_seconds;

  function formatSeconds(s) {
    if (s < 1) return "Instant";
    if (s < 60) return `${Math.floor(s)} seconds`;
    if (s < 3600) return `${Math.floor(s / 60)} minutes`;
    if (s < 86400) return `${Math.floor(s / 3600)} hours`;
    if (s < 31536000) return `${Math.floor(s / 86400)} days`;
    return `${Math.floor(s / 31536000)} years`;
  }

  return {
    length: password.length,
    entropy: Number(result.guesses_log10.toFixed(2)), // log10 guesses ≈ practical entropy
    strength: strengthLabels[result.score],
    crackTime: {
      offline_fast: formatSeconds(crackTimeSecs.offline_fast_hashing_1e10_per_second),
      online_slow:  formatSeconds(crackTimeSecs.online_throttling_100_per_hour),
    },
    feedback: [
      result.feedback.warning,
      ...result.feedback.suggestions,
    ].filter(Boolean),
  };
}

module.exports = { analyzePassword };
