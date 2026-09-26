const form = document.getElementById("qrForm");
const contentInput = document.getElementById("content");
const errorCorrectionSelect = document.getElementById("errorCorrection");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
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

  if (!content) {
    showMessage("Please key in content ", "error");
    return;
  }

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
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel[errorCorrection],
    });

    qrDisplay.classList.add("show");
    showMessage("✅ QR code generate successfull:", "success");
  } catch (error) {
    showMessage("Generate Failed:" + error.message, "error");
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

  if (!src) {
    showMessage("Download failed: QR code image not found", "error");
    return;
  }

  const link = document.createElement("a");
  link.href = src;
  link.download = "qrcode_" + new Date().getTime() + ".png";
  link.click();
  showMessage("✅ Download successfully!", "success");
});

copyBtn.addEventListener("click", async () => {
  const canvas = qrcodeContainer.querySelector("canvas");
  if (!canvas) {
    showMessage("Copy failed: Failed to get image data", "error");
    return;
  }

  try {
    canvas.toBlob((blob) => {
      if (!blob) {
        showMessage("Copy failed", "error");
        return;
      }
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(() => {
          showMessage("✅  Copied to clipboard", "success");
        })
        .catch(() => {
          showMessage("Copied failed , Please try download again!", "error");
        });
    });
  } catch (error) {
    showMessage("Copy failed:" + error.message, "error");
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
  showMessage('💡Enter a URL or text, then click "Generate"');
});
