# Entropy Guard

A simple, transparent password strength checker built with Node.js

This tool evaluates password strength using **[zxcvbn](https://github.com/dropbox/zxcvbn)** — a pattern-aware strength estimator — with a strong focus on **privacy, clarity, and auditability**.

---

## Features

* Pattern-aware strength analysis via zxcvbn
* Real-time password analysis
* Strength classification (Very Weak → Very Strong)
* Time-to-crack estimation (offline GPU vs online attack models)
* Contextual feedback and suggestions
* Visual strength meter (real-time UI feedback)
* Password visibility toggle
* No password storage or logging
* Clean and readable codebase for easy auditing

---

## How It Works

Password strength is estimated using **zxcvbn**, which goes beyond simple character-set entropy by:

* Matching against 30,000+ common passwords and dictionary words
* Detecting keyboard patterns (e.g. `qwerty`, `12345`)
* Recognising dates, names, repeated characters, and sequences
* Accounting for common substitutions (e.g. `@` → `a`, `3` → `e`)

This produces a **score from 0–4** and a **log₁₀ guesses** estimate that reflects real-world crackability — not just theoretical character-set size.

### Time-to-crack estimation

Crack time is derived directly from zxcvbn's guesses estimate, modelled against two attacker profiles:

* **Offline fast** — high-speed GPU cracking (10 billion guesses/sec)
* **Online slow** — rate-limited login attempts (100 guesses/hour)

---

## Strength Levels

| Score | Strength    |
| ----- | ----------- |
| 0     | Very Weak   |
| 1     | Weak        |
| 2     | Reasonable  |
| 3     | Strong      |
| 4     | Very Strong |

> Strength is visualised in the UI using a dynamic strength bar for faster feedback.

---

## Getting Started

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

## Usage

1. Open the client UI
2. Enter a password
3. View strength, crack time, and suggestions in real-time

---

## Privacy First

* Passwords are **never stored**
* No database involved
* No external API calls
* All calculations are done locally within the app

> This project is designed to be fully inspectable and safe to use.

---

## Disclaimer

This tool does **not**:

* Check against live breach databases
* Replace proper security practices

Use it as a guideline, not a guarantee.

---

## Contributing

Contributions are welcome.

If you'd like to improve this project:

* Fork the repo
* Create a feature branch
* Submit a pull request
