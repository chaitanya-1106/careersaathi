# ⭐ CareerSaathi — AI Career Advisor for India

> **Your Smartest Guide to Career & Education**  
> AI-powered, India-specific career guidance for students from Class 10 onwards.

[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)
[![Made for India](https://img.shields.io/badge/Made%20for-🇮🇳%20India-green.svg)](https://github.com/yourusername/careersaathi)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-blue.svg)](https://anthropic.com)

---

## 🎯 What is CareerSaathi?

CareerSaathi is a **free, open-source AI career advisor** designed specifically for Indian students. It uses Anthropic's **Claude AI** to provide personalized, India-specific career guidance considering your stream, location, finances, and goals.

### Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Career Chat** | Chat in Hindi, English or Hinglish with Claude AI |
| 🧠 **Psychometric Quiz** | 6-question personality test to find your career type |
| 🗺️ **Roadmap Generator** | AI-generated step-by-step career roadmaps |
| 🕸️ **Knowledge Graph** | Visual map: Degree → Skills → Jobs → Salary |
| 💼 **Opportunities** | Curated scholarships, jobs & internships |
| 👨‍🏫 **Mentor Network** | Connect with professionals across fields |

---

## 🚀 Live Demo

**→ [careersaathi.in](https://yourusername.github.io/careersaathi)** *(after GitHub Pages setup)*

---

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (zero dependencies!)
- **AI**: [Anthropic Claude API](https://docs.anthropic.com) (claude-sonnet-4)
- **Fonts**: Syne + DM Sans (Google Fonts)
- **Deployment**: GitHub Pages (static, no backend needed)

---

## 📁 Project Structure

```
careersaathi/
├── index.html          # Main app (single-page application)
├── css/
│   └── main.css        # All styles
├── js/
│   └── app.js          # App logic + AI integration
├── README.md
└── LICENSE
```

---

## ⚡ Quick Start

### Option 1: Just Open in Browser
```bash
git clone https://github.com/yourusername/careersaathi.git
cd careersaathi
# Open index.html in your browser
```

### Option 2: Local Server (Recommended)
```bash
# Using Python
python3 -m http.server 8000
# Visit http://localhost:8000

# Using Node.js
npx serve .
# Visit http://localhost:3000
```

---

## 🔑 Setting Up AI Chat

The AI Chat requires an **Anthropic API key**:

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create a free account and generate an API key
3. In CareerSaathi, click **⚙️** in the chat header or the warning banner
4. Enter your API key — it's saved **locally in your browser only**

> **Note**: The API key is stored in `localStorage` and never sent to any server other than Anthropic's API directly.

---

## 🌐 Deploy to GitHub Pages

```bash
# 1. Fork or clone this repo
git clone https://github.com/yourusername/careersaathi.git

# 2. Push to your GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 3. Enable GitHub Pages:
# Go to repo Settings → Pages → Source: Deploy from branch → main / root
# Your site will be live at: https://yourusername.github.io/careersaathi
```

---

## 🎨 Screenshots

*(Add screenshots here)*

---

## 🤝 Contributing

Contributions are welcome! Areas to improve:

- [ ] Add more career paths to the knowledge graph
- [ ] Add more scholarships / job listings
- [ ] PWA support (offline mode)
- [ ] State-specific scholarship data
- [ ] More psychometric questions
- [ ] Dark/light mode toggle

**Steps to contribute:**
1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📊 Career Types

CareerSaathi identifies 5 career personality types:

| Type | Icon | Best For |
|------|------|---------|
| Tech Innovator | 💻 | Engineering, CS, Data Science |
| Creative Visionary | 🎨 | Design, Arts, Media |
| Business Leader | 📊 | MBA, Commerce, Entrepreneurship |
| Governance Champion | 🏛️ | UPSC, SSC, Defence |
| Research Scholar | 🔬 | Science, Medicine, Academia |

---

## 📜 License

MIT License — see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgements

- [Anthropic](https://anthropic.com) for the Claude AI API
- [Google Fonts](https://fonts.google.com) for Syne & DM Sans
- All Indian students who need better career guidance 🇮🇳

---

<div align="center">
  Made with ❤️ for Indian Students
  <br>
  <strong>⭐ Star this repo if it helped you!</strong>
</div>
