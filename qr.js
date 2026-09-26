const form = document.getElementById("qrForm");
const contentInput = document.getElementById("content");
const errorCorrectionSelect = document.getElementById("errorCorrection");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const fgColorInput = document.getElementById("fgColor");
const bgColorInput = document.getElementById("bgColor");
const qrDisplay = document.getElementById("qrDisplay");
const qrcodeContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const messageBox = document.getElementById("message");

function generateQRCode() {
  const content = contentInput.value.trim();
  const errorCorrection = errorCorrectionSelect.value;
  const width = parseInt(widthInput.value) || 250;
  const height = parseInt(heightInput.value) || 250;
  const fgColor = fgColorInput.value || "#000000";
  const bgColor = bgColorInput.value || "#ffffff";

  // 修改：请输入内容 -> Please enter content
  if (!content) {
    showMessage("Please enter some content", "error");
    return;
  }

  // 修改：大小不能小于100px -> Size must be at least 100px
  if (width < 100 || height < 100) {
    showMessage("Size must be at least 100px.", "error");
    return;
  }

  qrcodeContainer.innerHTML = "";

  try {
    new QRCode(qrcodeContainer, {
      text: content,
      width: width,
      height: height,
      colorDark: fgColor,
      colorLight: bgColor,
      correctLevel: QRCode.CorrectLevel[errorCorrection],
    });

    qrDisplay.classList.add("show");
    // 修改：QR码生成成功！ -> QR Code generated successfully!
    showMessage("✅ QR Code generated successfully!", "success");
  } catch (error) {
    // 修改：生成失败： -> Generation failed:
    showMessage("Generation failed: " + error.message, "error");
  }
}

function showMessage(text, type = "info") {
  messageBox.textContent = text;
  messageBox.className = "info-box " + type;
  if (type === "success") {
    setTimeout(() => {
      messageBox.textContent = "";
      messageBox.className = "info-box";
    }, 3000);
  }
}

downloadBtn.addEventListener("click", () => {
  const img = qrcodeContainer.querySelector("img");
  const canvas = qrcodeContainer.querySelector("canvas");
  const src =
    img && img.src ? img.src : canvas ? canvas.toDataURL("image/png") : null;

  // 修改：下载失败，未找到二维码图像 -> Download failed: QR code image not found.
  if (!src) {
    showMessage("Download failed: QR code image not found.", "error");
    return;
  }

  const link = document.createElement("a");
  link.href = src;
  link.download = "qrcode_" + new Date().getTime() + ".png";
  link.click();
  // 修改：下载成功！ -> Downloaded successfully!
  showMessage("✅ Downloaded successfully!", "success");
});

copyBtn.addEventListener("click", async () => {
  const canvas = qrcodeContainer.querySelector("canvas");
  // 修改：复制失败：未能获取图像数据 -> Copy failed: Failed to get image data.
  if (!canvas) {
    showMessage("Copy failed: Failed to get image data.", "error");
    return;
  }

  try {
    canvas.toBlob((blob) => {
      // 修改：复制失败 -> Copy failed
      if (!blob) {
        showMessage("Copy failed", "error");
        return;
      }
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(() => {
          // 修改：已复制到剪贴板！ -> Copied to clipboard!
          showMessage("✅ Copied to clipboard!", "success");
        })
        .catch(() => {
          // 修改：复制失败，请尝试下载 -> Copy failed. Please try downloading instead.
          showMessage("Copy failed. Please try downloading instead.", "error");
        });
    });
  } catch (error) {
    // 修改：复制失败： -> Copy failed:
    showMessage("Copy failed: " + error.message, "error");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateQRCode();
});

contentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    generateQRCode();
  }
});

window.addEventListener("load", () => {
  // 修改：输入网址或文本，点击"生成QR码" -> Enter a URL or text, then click "Generate"
  showMessage('💡 Enter a URL or text, then click "Generate"', "info");
});
