# ToolNest — 89+ Free High-Performance Online Utility Suite

[![Live Demo](https://img.shields.io/badge/Live_Demo-toolnest--fawn.vercel.app-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://toolnest-fawn.vercel.app)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**ToolNest** is a modern, responsive, high-performance web utility platform featuring **89+ tools** across 10 categories. Engineered for maximum speed, user privacy, and zero latency, all calculations and file operations execute **100% client-side in the user's browser memory**.

---

## ⚡ Key Architectural Features

- **100% Client-Side Processing:** Zero file or document uploads to remote servers. All image conversions, text formatting, cryptographic hashing, and PDF generators run locally via Web Crypto API and HTML5 Canvas.
- **Micro-Bundle Size:** Entire 89-tool application compiled to just **~81.6 kB (gzipped)** using Vite and dynamic `React.lazy()` code-splitting.
- **PWA & Offline-First:** Progressive Web App capable. Users can install ToolNest natively on mobile or desktop and use utilities offline without Wi-Fi.
- **Command Palette Search:** Global `⌘K` / `Ctrl + K` fuzzy search modal for instant navigation across all 89 utilities.
- **Google AdSense Ready:** Pre-configured with responsive `<AdBanner />` containers and fully compliant `/privacy`, `/terms`, `/about`, and `/contact` trust architecture.
- **Accessibility & SEO:** 100/100 WCAG AAA contrast ratio, dynamic `SoftwareApplication` JSON-LD schema, automated `sitemap.xml`, and AI-agent discoverable `llms.txt`.

---

## 🗂️ 89 Tools Across 10 Categories

| Category | Suite Highlights | Total Tools |
|---|---|:---:|
| 📄 **PDF Tools** | Text to PDF, Image to PDF, Watermarker, Rotator, Merger, Splitter | **8** |
| 🖼️ **Image Tools** | Compressor, Resizer, Format Converters (PNG/JPG/WebP), Filters, Base64 | **9** |
| 📝 **Text Tools** | Word Counter, Case Converter, Diff Checker, Slug Generator, Line Sorter | **10** |
| 🔢 **Calculators** | Percentage, Universal Unit Converter, Loan/EMI, BMI, Discount, Sales Tax | **10** |
| 💻 **Developer Tools** | Base64 Codec, JSON Formatter, SHA-256 Hash Gen, UUID v4, Timestamp, Regex | **12** |
| 📱 **QR & Barcodes** | URL QR, WiFi QR, vCard Contact QR, SMS QR, Code 128 Barcode | **6** |
| 🔍 **SEO Tools** | Meta Tag Gen, Robots.txt, Sitemap XML, Keyword Density, SERP Simulator | **8** |
| 📢 **Social Media** | Tweet Thread Splitter, Instagram Caption Spacer, Viral Hashtag Builder | **8** |
| 🎨 **Design Tools** | HEX to RGB, CSS Box Shadow Generator, CSS Gradients, Contrast Checker | **8** |
| ⏱️ **Productivity** | Pomodoro Focus Timer, Precision Stopwatch, Password Gen, Dice Roller | **10** |
| **Total Active Utilities** | | **89** |

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with dynamic light/dark theme switching
- **Build Tool:** Vite 5 (ESNext, Rollup code-splitting)
- **Icons:** Lucide React
- **Hosting:** Vercel Global Edge Network with custom HTTP security headers

---

## 🚀 Local Development Setup

To run ToolNest locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/Shahnawaz-kha/ToolNest.git

# 2. Navigate to the project directory
cd ToolNest

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build

To compile and verify the optimized production bundle:

```bash
npm run build
npm run preview
```

---

## 📄 License

This project is licensed under the **MIT License** — free for personal and commercial use.
