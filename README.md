# 🎯 QR Code Generator

A lightweight, elegant, and ready-to-use front-end QR code generation tool. Features a responsive two-column layout, real-time debounced generation, custom Wi-Fi network QR creation, color customization, and one-click exporting options.

## ✨ Features

- ⚡ **Real-Time Generation**: Live debounced preview updates as you type without lag.
- 📶 **Wi-Fi Mode**: Dedicated tab to generate one-click connect Wi-Fi QR codes (SSID, password, encryption).
- 🎨 **Custom Colors**: Personalize pattern (foreground) and background colors with native color pickers.
- 🛡️ **Error Correction Control**: Choose between **L** (7%), **M** (15%), **Q** (25%), and **H** (30%) recovery levels.
- 📏 **Customizable Dimensions**: Adjust width and height dynamically.
- 📥 **One-Click Download & Copy**: Save high-resolution PNGs or copy images directly to your clipboard.
- 📐 **Responsive Two-Column Layout**: Left side for inputs, right side for immediate QR preview.

## 🛠️ Tech Stack

- **HTML5**: Semantic web structure
- **CSS3**: Flexbox & CSS Grid for responsive two-column layout
- **JavaScript (ES6+)**: Native DOM manipulation, debounced input events, and Clipboard API
- **QRCode.js**: Client-side QR rendering library

## 📁 Project Structure

```

.
├── index.html # Main two-column layout and script setup
├── qr.css # Grid layout, tab styling, and responsive UI
├── qr.js # Core logic (Debounced rendering, Wi-Fi encoding, Clipboard & Download)
└── README.md # Project documentation

```

## 🚀 Quick Start

### Running Locally

This project requires no build tools or server environment to run:

1. Clone or download this repository:

   ```
   git clone [https://github.com/Chuan-dev086/simple-QR-code-generator.git](https://github.com/Chuan-dev086/simple-QR-code-generator.git)
   ```

2. Navigate to the project directory:

```
cd simple-QR-code-generator

```

3. Double-click `index.html` or open it with Live Server in VS Code.

## 📖 Usage

1. **Select Mode**: Switch between **Text / URL** and **Wi-Fi** tabs at the top.
2. **Enter Details**: Type your text/URL or enter Wi-Fi network credentials (SSID & Password).
3. **Customize Settings**:

- Pick custom pattern and background colors.
- Adjust error correction level and image dimensions.

4. **Export**: The QR code updates automatically as you type. Click **Download** or **Copy** to save.

## 📄 License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE&utm_source=gemini).
