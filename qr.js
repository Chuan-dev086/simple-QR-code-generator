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
    showMessage("请输入内容", "error");
    return;
  }

  if (width < 100 || height < 100) {
    showMessage("大小不能小于100px", "error");
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
    showMessage("✅ QR码生成成功！", "success");
  } catch (error) {
    showMessage("生成失败：" + error.message, "error");
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
    showMessage("下载失败，未找到二维码图像", "error");
    return;
  }

  const link = document.createElement("a");
  link.href = src;
  link.download = "qrcode_" + new Date().getTime() + ".png";
  link.click();
  showMessage("✅ 下载成功！", "success");
});

copyBtn.addEventListener("click", async () => {
  const canvas = qrcodeContainer.querySelector("canvas");
  if (!canvas) {
    showMessage("复制失败：未能获取图像数据", "error");
    return;
  }

  try {
    canvas.toBlob((blob) => {
      if (!blob) {
        showMessage("复制失败", "error");
        return;
      }
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(() => {
          showMessage("✅ 已复制到剪贴板！", "success");
        })
        .catch(() => {
          showMessage("复制失败，请尝试下载", "error");
        });
    });
  } catch (error) {
    showMessage("复制失败：" + error.message, "error");
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
  showMessage('💡 输入网址或文本，点击"生成QR码"', "info");
});
