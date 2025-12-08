/**
 * Photobooth Component Loader
 * Utility untuk memuat halaman photobooth sebagai component
 */

function loadPhotoboothComponent(componentName, containerId) {
  const componentPath = `components/photobooth-${componentName}.html`;

  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      return response.text();
    })
    .then((html) => {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = html;

        // Load scripts based on component type
        loadComponentScripts(componentName);
      } else {
        console.error(`Container not found: ${containerId}`);
      }
    })
    .catch((error) => {
      console.error("Error loading photobooth component:", error);
    });
}

/**
 * Load component-specific scripts
 */
function loadComponentScripts(componentName) {
  let scriptPath;
  let initFunctionName;

  switch (componentName) {
    case "frame-selection":
      scriptPath = "js/photobooth-frame-selection.js";
      initFunctionName = "initFrameSelectionPage";
      break;
    case "capture":
      scriptPath = "js/photobooth-capture.js";
      initFunctionName = "initCapturePage";
      break;
    case "result":
      scriptPath = "js/photobooth-result.js";
      initFunctionName = "initResultPage";
      break;
    default:
      return;
  }

  const script = document.createElement("script");
  script.src = scriptPath;
  script.async = true;

  // Call init function after script loads
  script.onload = function () {
    // Small delay to ensure global function is available
    setTimeout(() => {
      if (typeof window[initFunctionName] === "function") {
        window[initFunctionName]();
      }
    }, 100);
  };

  script.onerror = function () {
    console.error(`Failed to load script: ${scriptPath}`);
  };

  document.head.appendChild(script);
}
