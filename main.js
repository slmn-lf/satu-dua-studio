const video = document.getElementById("video");
const photo = document.getElementById("photo");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("capture");
const stopBtn = document.getElementById("stop");
const downloadBtn = document.getElementById("download");

let stream = null;

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

// Ambil foto
function capturePhoto() {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Tampilkan hasil di <img>
  const dataUrl = canvas.toDataURL("image/png");
  photo.src = dataUrl;
  photo.style.display = "block";
  downloadBtn.style.display = "inline-block";

  // Atur unduh
  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "foto-saya.png";
    a.click();
  };
}

// Hentikan kamera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    stream = null;
  }
}

// Event listeners
captureBtn.addEventListener("click", capturePhoto);
stopBtn.addEventListener("click", stopCamera);

// Mulai kamera saat halaman dimuat
startCamera();
