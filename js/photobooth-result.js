// Result Page Logic
function initResultPage() {
  // Get elements with delay to ensure they're loaded
  setTimeout(() => {
    const resultPhoto = document.getElementById("result-image");
    const downloadBtn = document.getElementById("download");
    const takeAgainBtn = document.getElementById("take-again");
    const backToHomeBtn = document.getElementById("back-home");

    if (!resultPhoto || !downloadBtn) {
      console.error("Result page elements not found");
      return;
    }

    const photoDataUrl = sessionStorage.getItem("resultPhoto");

    if (!photoDataUrl) {
      // Redirect back to frame selection if no photo found
      window.location.href = "photobooth.html";
      return;
    }

    // Display result photo
    resultPhoto.src = photoDataUrl;

    // Setup download button
    downloadBtn.addEventListener("click", function () {
      const a = document.createElement("a");
      a.href = photoDataUrl;
      a.download = "photobooth-saya.png";
      a.click();
    });

    // Take again - go back to frame selection
    takeAgainBtn.addEventListener("click", function () {
      sessionStorage.removeItem("resultPhoto");
      sessionStorage.removeItem("selectedFrame");
      window.location.href = "photobooth.html";
    });

    // Back to home
    backToHomeBtn.addEventListener("click", function () {
      sessionStorage.removeItem("resultPhoto");
      sessionStorage.removeItem("selectedFrame");
      window.location.href = "../index.html";
    });
  }, 100);
}
