// Load footer component
async function loadFooter() {
  try {
    const response = await fetch("components/footer.html");
    const footerHTML = await response.text();
    const footerContainer = document.getElementById("footer-container");

    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
      // Load footer CSS
      loadFooterCSS();
    }
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}

function loadFooterCSS() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "components/css/footer.css";
  document.head.appendChild(link);
}

// Load footer when DOM is ready
document.addEventListener("DOMContentLoaded", loadFooter);
