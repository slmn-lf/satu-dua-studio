// Frame Selection Page Logic
let frameOptions, startCaptureBtn;
let selectedFrame = null;

/**
 * Initialize frame selection page
 * Gets called after component is loaded
 */
function initFrameSelectionPage() {
  frameOptions = document.querySelectorAll(".frame-option");
  startCaptureBtn = document.getElementById("start-capture");

  if (!frameOptions.length || !startCaptureBtn) {
    console.error("Frame selection page elements not found");
    return;
  }

  // Frame selection handler
  frameOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all options
      frameOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to selected option
      this.classList.add("active");

      // Set selected frame
      selectedFrame = this.dataset.frame;

      // Enable start button
      startCaptureBtn.disabled = false;
    });
  });

  // Start capture page
  startCaptureBtn.addEventListener("click", function () {
    // Store selected frame in session storage
    sessionStorage.setItem("selectedFrame", selectedFrame);

    // Redirect to capture page
    window.location.href = "capture.html";
  });
}
