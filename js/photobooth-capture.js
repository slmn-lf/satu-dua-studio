// Capture Photo Page Logic
let video, canvas, finalCanvas, startCaptureBtn;
let countdownOverlay, countdownNumber, countdownText;
let previewContainer, statusText;

let stream = null;
let selectedFrame = null;
let capturedPhotos = []; // Array untuk menyimpan 3 foto
let photoCount = 0;
let countdownInterval = null;
let isCapturing = false;

// Photo positions dalam frame (x, y, width, height)
// Frame: jarak atas 97, jarak samping 50, jarak antar foto 0 (no gap), jarak bawah minimal
const photoPositions = [
  { x: 50, y: 97, width: 980, height: 540 }, // Posisi foto 1
  { x: 50, y: 637, width: 980, height: 540 }, // Posisi foto 2 (97 + 540)
  { x: 50, y: 1177, width: 980, height: 540 }, // Posisi foto 3 (637 + 540)
];

/**
 * Initialize capture page elements
 * Gets called after component is loaded
 */
function initCapturePage() {
  // Get DOM elements
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  finalCanvas = document.getElementById("final-canvas");
  startCaptureBtn = document.getElementById("start-capture");
  countdownOverlay = document.getElementById("countdown-overlay");
  countdownNumber = document.getElementById("countdown-number");
  countdownText = document.getElementById("countdown-text");
  previewContainer = document.getElementById("preview-container");
  statusText = document.getElementById("status-text");

  if (!video || !startCaptureBtn) {
    console.error("Capture page elements not found");
    return;
  }

  // Add event listener
  startCaptureBtn.addEventListener("click", startCaptureProcess);

  // Initialize page
  initPage();
}

// Initialize - Get selected frame from session storage
function initPage() {
  selectedFrame = sessionStorage.getItem("selectedFrame");

  if (!selectedFrame) {
    // Redirect back to frame selection if no frame selected
    window.location.href = "photobooth.html";
    return;
  }

  // Start camera
  startCamera();
}

// Minta akses kamera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Gagal mengakses kamera:", err);
    alert(
      "Tidak bisa mengakses kamera. Pastikan Anda memberikan izin dan membuka halaman ini via HTTPS (atau localhost)."
    );
  }
}

// Start capturing process with countdown
function startCaptureProcess() {
  if (isCapturing) return;

  isCapturing = true;
  startCaptureBtn.disabled = true;
  statusText.textContent = "Capturing...";

  // Show preview container
  previewContainer.style.display = "block";

  // Start capturing 3 photos with countdown
  captureNextPhoto();
}

// Capture photos one by one with countdown
function captureNextPhoto() {
  if (photoCount < 3) {
    startCountdown();
  }
}

// Start countdown timer
function startCountdown() {
  let countdown = 3;
  countdownOverlay.style.display = "flex";
  countdownNumber.textContent = countdown;
  countdownText.textContent = `Foto ${photoCount + 1} dari 3`;

  countdownInterval = setInterval(() => {
    countdown--;

    if (countdown > 0) {
      countdownNumber.textContent = countdown;
    } else {
      clearInterval(countdownInterval);
      countdownNumber.textContent = "Smile!";
      countdownText.textContent = "Foto sedang diambil...";

      // Capture photo after countdown
      setTimeout(() => {
        capturePhoto();
        countdownOverlay.style.display = "none";

        // Next photo atau show preview
        if (photoCount < 3) {
          setTimeout(captureNextPhoto, 800);
        } else {
          // All 3 photos captured - show preview
          showPreview();
        }
      }, 500);
    }
  }, 1000);
}

// Ambil foto
function capturePhoto() {
  const context = canvas.getContext("2d");
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;

  // Target aspect ratio: 909:476 (width:height)
  const targetAspectRatio = 909 / 476;
  const videoAspectRatio = videoWidth / videoHeight;

  let cropWidth = videoWidth;
  let cropHeight = videoHeight;
  let cropX = 0;
  let cropY = 0;

  // Calculate crop dimensions to match target aspect ratio
  if (videoAspectRatio > targetAspectRatio) {
    // Video is wider - crop width
    cropWidth = videoHeight * targetAspectRatio;
    cropX = (videoWidth - cropWidth) / 2;
  } else {
    // Video is taller - crop height
    cropHeight = videoWidth / targetAspectRatio;
    cropY = (videoHeight - cropHeight) / 2;
  }

  // Set canvas to target aspect ratio (909:476)
  canvas.width = 909;
  canvas.height = 476;

  // Draw cropped video frame
  context.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, 909, 476);

  // Simpan foto ke array
  const dataUrl = canvas.toDataURL("image/png");
  capturedPhotos.push(dataUrl);

  // Display preview image immediately
  const previewId = `preview-${photoCount + 1}`;
  document.getElementById(previewId).src = dataUrl;

  photoCount++;
}

// Show preview setelah 3 foto selesai
function showPreview() {
  statusText.textContent = "Semua foto selesai diambil";

  // Stop video
  stopVideoCapture();

  isCapturing = false;

  // Auto redirect ke result page setelah 2 detik
  setTimeout(() => {
    compositPhotosToFrame();
  }, 2000);
}

// Komposit 3 foto ke frame
function compositPhotosToFrame() {
  const frameImg = new Image();
  frameImg.onload = function () {
    // Setup canvas dengan ukuran frame (1080 x 1920)
    finalCanvas.width = 1080;
    finalCanvas.height = 1920;
    const ctx = finalCanvas.getContext("2d");

    // Setup canvas dengan background putih/transparan
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1080, 1920);

    // Draw 3 photos pada posisi yang telah ditentukan FIRST
    let photosLoaded = 0;
    capturedPhotos.forEach((photoUrl, index) => {
      const imgPhoto = new Image();
      imgPhoto.onload = function () {
        const pos = photoPositions[index];

        // Calculate dimensions maintaining aspect ratio
        const photoAspectRatio = imgPhoto.width / imgPhoto.height;
        const areaAspectRatio = pos.width / pos.height;

        let drawWidth = pos.width;
        let drawHeight = pos.height;

        if (photoAspectRatio > areaAspectRatio) {
          // Photo is wider - fit by height
          drawHeight = pos.width / photoAspectRatio;
        } else {
          // Photo is taller - fit by width
          drawWidth = pos.height * photoAspectRatio;
        }

        // Draw photo maintaining aspect ratio, starting from top-left of area
        ctx.drawImage(imgPhoto, pos.x, pos.y, drawWidth, drawHeight);

        photosLoaded++;
        if (photosLoaded === 3) {
          // AFTER drawing photos, draw frame on top
          drawFrameOnTop();
        }
      };
      imgPhoto.src = photoUrl;
    });
  };
  frameImg.src = `photobooth/frames/${selectedFrame}.png`;
}

// Draw frame on top of photos
function drawFrameOnTop() {
  const frameImg = new Image();
  frameImg.onload = function () {
    const ctx = finalCanvas.getContext("2d");
    // Draw frame on top of photos
    ctx.drawImage(frameImg, 0, 0, 1080, 1920);

    // Redirect to result page
    redirectToResult();
  };
  frameImg.src = `photobooth/frames/${selectedFrame}.png`;
}

// Redirect ke result page dan simpan final photo
function redirectToResult() {
  const finalDataUrl = finalCanvas.toDataURL("image/png");
  sessionStorage.setItem("resultPhoto", finalDataUrl);

  // Redirect ke result page
  window.location.href = "result.html";
}

// Stop video capture
function stopVideoCapture() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    stream = null;
  }
}
