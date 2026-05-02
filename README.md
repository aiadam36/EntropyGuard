# Entropy Guard 🔐

This tool evaluates password strength using entropy calculations and basic heuristics — with a strong focus on **privacy, clarity, and auditability**.

---

## ✨ Features

* 🔢 Entropy-based strength calculation
* ⚡ Real-time password analysis
* 🧠 Strength classification (Very Weak → Very Strong)
* ⏱️ Time-to-crack estimation (offline GPU vs online attack models)
* 🎨 Visual strength meter (real-time UI feedback)
* 👁️ Password visibility toggle
* 🔍 Character set detection (lowercase, uppercase, numbers, symbols)
* 🚫 No password storage or logging
* 🧾 Clean and readable codebase for easy auditing

---

## 🧠 How It Works

Password strength is estimated using entropy:

```
entropy = length × log2(charset_size)
```

Where:

* `length` = number of characters in the password
* `charset_size` = pool of possible characters used

### Example

A password using:

* lowercase (26)
* uppercase (26)
* numbers (10)
* symbols (~32)

→ total charset ≈ 94

Higher entropy = harder to crack.

### Time-to-crack estimation

The system estimates how long it would take to brute-force a password using:

* Offline attack (high-speed GPU cracking simulation)
* Online attack (rate-limited login attempts)

This is based on:

```
guesses = 2^entropy
```

---

## 📊 Strength Levels

| Entropy (bits) | Strength    |
| -------------- | ----------- |
| < 28           | Very Weak   |
| 28 – 35        | Weak        |
| 36 – 59        | Reasonable  |
| 60 – 127       | Strong      |
| ≥ 128          | Very Strong |

> Strength is now visualized in the UI using a dynamic strength bar for faster feedback.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aiadam36/EntropyGuard
cd EntropyGuard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
npm start
```

Server will start on:

```
http://localhost:3000
```

---

## 🌐 Usage

1. Open the client UI
2. Enter a password
3. View entropy and strength in real-time

---

## 🔒 Privacy First

* Passwords are **never stored**
* No database involved
* No external API calls
* All calculations are done locally within the app

> This project is designed to be fully inspectable and safe to use.

---

## ⚠️ Disclaimer

Entropy alone does not guarantee security.

This tool does **not**:

* Check against large breach databases
* Detect all common password patterns
* Replace proper security practices

Use it as a guideline, not a guarantee.

---

## 🤝 Contributing

Contributions are welcome.

If you'd like to improve this project:

* Fork the repo
* Create a feature branch
* Submit a pull request
