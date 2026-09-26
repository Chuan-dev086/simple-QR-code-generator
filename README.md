# 🎯 QR Code Generator

A lightweight, elegant, and ready-to-use front-end QR code generation tool. Supports real-time text/URL conversion, custom dimensions, error correction level selection, and one-click image downloading or copying.

## ✨ Features

* ⚡ **Instant Generation**: Convert URLs or arbitrary text into QR codes on the fly.
* 🛡️ **Error Correction Control**: Select between **L** (7%), **M** (15%), **Q** (25%), and **H** (30%) data recovery capability.
* 📏 **Customizable Dimensions**: Adjust width and height values easily (default: 250x250 px).
* 📥 **One-Click Download**: Export and save your generated QR code as a high-resolution PNG image.
* 📋 **One-Click Copy**: Built-in Clipboard API support to copy the QR code image directly to your clipboard.
* 🎨 **Modern UI**: Stylish gradient aesthetics, smooth animation feedback, and clean layout across devices.

## 🛠️ Tech Stack

* **HTML5**: Semantic web structure
* **CSS3**: Flexbox layout, gradient styling, and micro-interactions
* **JavaScript (ES6+)**: Native DOM manipulation & asynchronous Clipboard API
* **QRCode.js**: Lightweight client-side QR code rendering library

## 📁 Project Structure

```
.
├── index.html   # Main layout and external script inclusions
├── qr.css       # Stylesheets and visual animations
├── qr.js        # Core application logic (QR rendering, download, clipboard events)
└── README.md    # Documentation
```

## 🚀 Quick Start

### Running Locally

This project requires no build tools or server environment to run:

1. Clone or download this repository to your machine:
   ```bash
   git clone https://github.com/your-username/qr-code-generator.git
   ```

2. Navigate to the project directory:
   ```bash
   cd qr-code-generator
   ```

3. Double-click or open `index.html` in any modern browser to run the application.

## 📖 Usage

1. **Enter Content**: Type or paste any URL (e.g., `https://example.com`) or text into the input field.
2. **Configure Settings (Optional)**:
   * Select an **Error Correction Level** (Level H is recommended if you plan to overlay a logo in the center).
   * Specify custom **Width** and **Height** values (minimum recommended size: 100px).
3. **Generate & Export**:
   * Click **✨ Generate QR Code** or press `Enter`.
   * Click **📥 Download** to save the PNG file, or click **📋 Copy** to copy the image to your clipboard.

## 📄 License

This project is licensed under the [MIT License](LICENSE).