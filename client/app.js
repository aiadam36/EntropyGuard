const input = document.getElementById("password");
const result = document.getElementById("result");
const bar = document.getElementById("bar");
const toggle = document.getElementById("toggle");

// 👁️ toggle visibility
toggle.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password";
});

// 🎯 strength → color + width
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

input.addEventListener("input", async () => {
  const password = input.value;

  if (!password) {
    result.innerHTML = "";
    bar.style.width = "0%";
    return;
  }

  const res = await fetch("/api/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password })
  });

  const data = await res.json();

  updateBar(data.strength);

  result.innerHTML = `
    <p><strong>Entropy:</strong> ${data.entropy}</p>
    <p><strong>Strength:</strong> ${data.strength}</p>
    <p><strong>Crack Time (Fast GPU):</strong> ${data.crackTime.offline_fast}</p>
    <p><strong>Crack Time (Online Attack):</strong> ${data.crackTime.online_slow}</p>
    <ul>
      ${data.feedback.map(f => `<li>${f}</li>`).join("")}
    </ul>
  `;
});
