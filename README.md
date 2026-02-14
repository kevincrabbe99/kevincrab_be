# kevincrab.be

[![Website](https://img.shields.io/badge/website-kevincrab.be-blue)](https://kevincrab.be)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)

> A Windows 95-themed personal portfolio website

This is the source code for my personal website, featuring a retro Windows 95 desktop interface built with modern web technologies.

> **Note:** This project was built before the era of AI vibe coding. The architecture, design decisions, and implementation were intentionally crafted without AI-generated code.

## 🌐 Live URLs

| URL | Description |
|-----|-------------|
| [kevincrab.be](https://kevincrab.be) | Main personal website |
| [me.kevincrab.be](https://me.kevincrab.be) | Accessible version with readability improvements |
| [links.kevincrab.be](https://links.kevincrab.be) | Opens directly to the links window |
| [emulator.kevincrab.be](https://emulator.kevincrab.be) | Win95 emulator highlight mode |

## ✨ Features

- 🪟 **Windows 95 Desktop Interface** — Authentic retro UI with draggable windows, taskbar, and start menu
- 📁 **File Explorer** — Browse projects and content through a familiar file system metaphor
- 🔗 **Links Window** — Quick access to social profiles and external links
- 🎮 **Emulator Mode** — Dedicated view highlighting the Win95 aesthetic
- 📱 **Responsive Design** — Works on desktop and mobile devices
- ⚡ **Fast Performance** — Optimized React build with code splitting

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript
- **State Management:** Redux Toolkit
- **Styling:** SCSS + CSS Modules
- **Build Tool:** Create React App
- **Hosting:** Vercel (with Cloudflare CDN)
- **CI/CD:** GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Vercel CLI (optional, for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/kevincrabbe99/kevincrab_be.git
cd kevincrab_be

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env.local
# Edit .env.local with your Firebase config
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start:local` | Development mode without Firebase |
| `npm run start:dev` | Development mode with Firebase (requires secrets) |
| `npm run start:local-production` | Production build locally (requires secrets) |
| `npm run build:local-production` | Build for local production testing |
| `npm run build:prod` | Build for production deployment |
| `npm test` | Run test suite in watch mode |
| `npm run eject` | Eject from Create React App (⚠️ one-way) |

### Development Workflow

```bash
# Start local development server
npm run start:local

# Build for production
npm run build:prod

# Serve production build locally
npx serve -s build
```

## 📁 Project Structure

```
kevincrab_be/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── windows/         # Window-specific components
│   ├── state/           # Redux store and slices
│   ├── styles/          # SCSS stylesheets
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .github/workflows/   # CI/CD pipelines
└── README.md
```

## 🚢 Deployment

Production deployments are automated via GitHub Actions on pushes to `master`.

Manual deployment:
```bash
npm run build:prod
vercel --prod
```

## 📝 License

MIT License — feel free to use this as inspiration for your own portfolio!

---

Built with 💾 and ☕ by [Kevin Crabbe](https://kevincrab.be)
