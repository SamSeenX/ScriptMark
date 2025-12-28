# ScriptMark

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Web-blue.svg)]()

> Instantly convert JavaScript code into a browser bookmarklet with a clean, dark-mode friendly interface.

**ScriptMark** is a simple yet powerful tool for developers and power users to create custom bookmarklets. Whether you want to scrape images, zap annoying elements, or automate tasks, this tool makes it easy to generate, preview, and share your bookmarklets.

## ✨ Features

- 🌓 **Dark/Light Mode** - Automatic detection with a manual toggle.
- 🛠️ **12 Built-in Templates** - Ready-to-use scripts for common tasks.
- 🖼️ **Image Extractor** - Extract, filter, and download all images from any page.
- ⚡ **Zap Elements** - Click to remove unwanted page elements instantly.
- 🔓 **Right-Click Enabler** - Force enable context menus on restrictive sites.
- 🔎 **Visual Inspector** - Hover to inspect fonts and colors.
- ♿ **Alt Text Checker** - Overlay image alt text for accessibility testing.
- 🚀 **Performance Check** - Quick page speed verification.
- 📝 **Live Editor** - Edit code and see changes in real-time.
- 🔒 **CSP Bypass** - Advanced handling for strict Content Security Policies.

## 📸 Demo

![ScriptMark Demo](assets/demo.png)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SamSeenX/scriptmark.git
cd scriptmark

# Install dependencies
npm install

# Run the project
npm run dev
```

### Basic Usage

1.  Open the app in your browser (usually `http://localhost:5173`).
2.  **Select a Template** from the list (e.g., "Zap Elements") or write your own code.
3.  **Customize** the code in the editor if needed.
4.  **Drag the button** "My Bookmarklet" to your browser's bookmarks bar.
5.  Go to any website and **click your new bookmarklet** to run it!

## 📖 Templates Included

| Template | Description |
|----------|-------------|
| **Blank Script** | A clean slate for your custom code. |
| **Edit Page Content** | Turn any webpage into an editable document. |
| **Dark Mode Toggle** | Force a simple dark mode on any site. |
| **Extract All Images** | Gallery view of all images with download & sorting. |
| **Zap Elements** | Point and click to delete page elements. |
| **Enable Right-Click** | Unblock context menus and text selection. |
| **Visual Inspector** | View font and color info on hover. |
| **Show Alt Text** | Verify accessibility tags on images. |
| **Page Speed Check** | View basic load time stats. |
| **Remove Sticky** | Kill sticky headers and footers. |
| **Insert Text** | Auto-fill elements with specific classes. |
| **Reveal Passwords** | Show hidden password field characters. |

## 🏗️ Project Structure

```
jsbookmark/
├── public/           # Static assets (favicons, etc.)
├── src/
│   ├── components/   # React components (BookmarkletCreator.jsx)
│   ├── data/         # Template definitions (templates.js)
│   ├── App.jsx       # Main app entry
│   └── index.css     # Global styles & variables
├── index.html        # HTML entry point
└── package.json      # Project dependencies
```

## 🛠️ Development

### Setup Development Environment

```bash
git clone https://github.com/SamSeenX/scriptmark.git
cd scriptmark
npm install
npm run dev
```

### Building for Production

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ☕ Support

If you find this project useful, please consider supporting me:

- ⭐ Starring this repository
- 🐛 Reporting issues
- ☕ [Buy me a coffee](https://buymeacoffee.com/samseen)

---

Created with ❤️ by [SamSeen](https://buymeacoffee.com/samseen)
# scriptmark
