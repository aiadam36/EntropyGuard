const input = document.getElementById("password");
const result = document.getElementById("result");

input.addEventListener("input", async () => {
  const password = input.value;

  if (!password) {
    result.innerHTML = "";
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

  result.innerHTML = `
    <p><strong>Entropy:</strong> ${data.entropy}</p>
    <p><strong>Strength:</strong> ${data.strength}</p>
    <p><strong>Length:</strong> ${data.length}</p>
    <ul>
      ${data.feedback.map(f => `<li>${f}</li>`).join("")}
    </ul>
  `;
});
