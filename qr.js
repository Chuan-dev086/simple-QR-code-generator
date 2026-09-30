const tabText = document.getElementById("tabText");
const tabWifi = document.getElementById("tabWifi");
const textGroup = document.getElementById("textGroup");
const wifiGroup = document.getElementById("wifiGroup");

const contentInput = document.getElementById("content");
const wifiSsidInput = document.getElementById("wifiSsid");
const wifiPasswordInput = document.getElementById("wifiPassword");
const wifiEncryptionSelect = document.getElementById("wifiEncryption");
const logoInput = document.getElementById("logoInput");

const errorCorrectionSelect = document.getElementById("errorCorrection");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const fgColorInput = document.getElementById("fgColor");
const bgColorInput = document.getElementById("bgColor");
const qrcodeContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const messageBox = document.getElementById("message");

let currentMode = "text";
let debounceTimer = null;
let uploadedLogo = null;

function escapeWifiString(str) {
  if (!str) return "";
  return str.replace(/([\\;:,"])/g, "\\$1");
}

function getPayload() {
  if (currentMode === "text") {
    return contentInput.value.trim();
  } else {
    const ssid = wifiSsidInput.value.trim();
    const password = wifiPasswordInput.value.trim();
    const encryption = wifiEncryptionSelect.value;

    if (!ssid) {
      return "";
    }

    const escapedSsid = escapeWifiString(ssid);
    const escapedPassword = escapeWifiString(password);

    if (encryption === "nopass") {
      return `WIFI:S:${escapedSsid};T:nopass;;`;
    }
    return `WIFI:S:${escapedSsid};T:${encryption};P:${escapedPassword};;`;
  }
}

function generateQRCode() {
  const payload = getPayload();
  let errorCorrection = errorCorrectionSelect.value;
  const width = parseInt(widthInput.value) || 250;
  const height = parseInt(heightInput.value) || 250;
  const fgColor = fgColorInput.value || "#000000";
  const bgColor = bgColorInput.value || "#ffffff";

  if (uploadedLogo) {
    errorCorrection = "H";
    errorCorrectionSelect.value = "H";
  }

  if (!payload) {
    qrcodeContainer.innerHTML = "";
    if (currentMode === "wifi") {
      showMessage("Please enter Wi-Fi network name (SSID)", "error");
    } else {
      showMessage("Please enter content", "error");
    }
    return;
  }

  if (width < 100 || height < 100) {
    showMessage("Size cannot be smaller than 100px", "error");
    return;
  }

  qrcodeContainer.innerHTML = "";

  try {
    new QRCode(qrcodeContainer, {
      text: payload,
      width: width,
      height: height,
      colorDark: fgColor,
      colorLight: bgColor,
      correctLevel: QRCode.CorrectLevel[errorCorrection],
    });

    if (uploadedLogo) {
      setTimeout(() => {
        attachLogoToCanvas(width, height, bgColor);
      }, 50);
    }

    showMessage("✅ QR code updated live", "success");
  } catch (error) {
    showMessage("Generation failed: " + error.message, "error");
  }
}

function attachLogoToCanvas(width, height, bgColor) {
  const canvas = qrcodeContainer.querySelector("canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const logoSize = Math.min(width, height) * 0.22;
  const x = (width - logoSize) / 2;
  const y = (height - logoSize) / 2;
  const padding = 6;

  ctx.fillStyle = bgColor;
  ctx.fillRect(
    x - padding / 2,
    y - padding / 2,
    logoSize + padding,
    logoSize + padding,
  );

  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    x - padding / 2,
    y - padding / 2,
    logoSize + padding,
    logoSize + padding,
  );

  ctx.drawImage(uploadedLogo, x, y, logoSize, logoSize);

  const img = qrcodeContainer.querySelector("img");
  if (img) {
    img.src = canvas.toDataURL("image/png");
  }
}

function handleInput() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    generateQRCode();
  }, 300);
}

function showMessage(text, type = "info") {
  messageBox.textContent = text;
  messageBox.className = "info-box " + type;
  if (type === "success") {
    setTimeout(() => {
      if (messageBox.textContent === "✅ QR code updated live") {
        messageBox.textContent = "";
        messageBox.className = "info-box";
      }
    }, 2000);
  }
}

logoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        uploadedLogo = img;
        generateQRCode();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    uploadedLogo = null;
    generateQRCode();
  }
});

tabText.addEventListener("click", () => {
  currentMode = "text";
  tabText.classList.add("active");
  tabWifi.classList.remove("active");
  textGroup.classList.remove("hidden");
  wifiGroup.classList.add("hidden");
  generateQRCode();
});

tabWifi.addEventListener("click", () => {
  currentMode = "wifi";
  tabWifi.classList.add("active");
  tabText.classList.remove("active");
  wifiGroup.classList.remove("hidden");
  textGroup.classList.add("hidden");
  generateQRCode();
});

[
  contentInput,
  wifiSsidInput,
  wifiPasswordInput,
  widthInput,
  heightInput,
].forEach((input) => {
  input.addEventListener("input", handleInput);
});

[
  errorCorrectionSelect,
  wifiEncryptionSelect,
  fgColorInput,
  bgColorInput,
].forEach((select) => {
  select.addEventListener("change", generateQRCode);
});

downloadBtn.addEventListener("click", () => {
  const img = qrcodeContainer.querySelector("img");
  const canvas = qrcodeContainer.querySelector("canvas");
  const src =
    img && img.src ? img.src : canvas ? canvas.toDataURL("image/png") : null;

  if (!src) {
    showMessage("Download failed, image not found", "error");
    return;
  }

  const link = document.createElement("a");
  link.href = src;
  link.download = "qrcode_" + new Date().getTime() + ".png";
  link.click();
  showMessage("✅ Download successful!", "success");
});

copyBtn.addEventListener("click", async () => {
  const canvas = qrcodeContainer.querySelector("canvas");
  if (!canvas) {
    showMessage("Copy failed: canvas element missing", "error");
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
          showMessage("✅ Copied to clipboard!", "success");
        })
        .catch(() => {
          showMessage("Copy failed, try downloading", "error");
        });
    });
  } catch (error) {
    showMessage("Copy failed: " + error.message, "error");
  }
});

window.addEventListener("load", () => {
  generateQRCode();
});
