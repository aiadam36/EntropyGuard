const input = document.getElementById("password");
const result = document.getElementById("result");
const bar = document.getElementById("bar");
const toggle = document.getElementById("toggle");

// toggle visibility
toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password";
});

// strength (color + width)
function updateBar(strength) {
  const map = {
    "Very Weak": { width: "20%", color: "red" },
    "Weak": { width: "40%", color: "orange" },
    "Reasonable": { width: "60%", color: "gold" },
    "Strong": { width: "80%", color: "blue" },
    "Very Strong": { width: "100%", color: "green" }
  };

  const s = map[strength] || { width: "0%", color: "gray" };

  bar.style.width = s.width;
  bar.style.background = s.color;
}

const strengthLabels = ["Very Weak", "Weak", "Reasonable", "Strong", "Very Strong"];

function formatSeconds(seconds) {
  if (seconds < 1) return "Instant";
  if (seconds < 60) return `${Math.floor(seconds)} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`;
  return `${Math.floor(seconds / 31536000)} years`;
}

input.addEventListener("input", () => {
  const password = input.value;

  if (!password) {
    result.innerHTML = "";
    bar.style.width = "0%";
    return;
  }

  const analysis = zxcvbn(password);
  const strength = strengthLabels[analysis.score];
  const estimatedEntropyBits = analysis.guesses_log10 * Math.log2(10);
  const feedback = [analysis.feedback.warning, ...analysis.feedback.suggestions].filter(Boolean);

  updateBar(strength);

  result.innerHTML = `
    <p><strong>Entropy:</strong> ${estimatedEntropyBits.toFixed(1)} bits
      <small>(log₁₀ guesses: ${analysis.guesses_log10.toFixed(2)})</small>
    </p>
    <p><strong>Strength:</strong> ${strength}</p>
    <p><strong>Crack Time (Fast GPU):</strong> ${formatSeconds(analysis.crack_times_seconds.offline_fast_hashing_1e10_per_second)}</p>
    <p><strong>Crack Time (Online Attack):</strong> ${formatSeconds(analysis.crack_times_seconds.online_throttling_100_per_hour)}</p>
    <ul>
      ${feedback.map(f => `<li>${f}</li>`).join("")}
    </ul>
  `;
});
