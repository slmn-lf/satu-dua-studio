/**
 * Utility function to load HTML components dynamically
 * @param {string} componentPath - Path to the component HTML file
 * @param {string} elementId - ID of the element to insert the component
 */
function loadHTMLComponent(componentPath, elementId) {
  const element = document.getElementById(elementId);

  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  fetch(componentPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load component: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      element.innerHTML = data;
      // Dispatch custom event after component is loaded
      const loadedEvent = new CustomEvent("componentLoaded", {
        detail: { componentPath, elementId },
      });
      document.dispatchEvent(loadedEvent);
    })
    .catch((error) => {
      console.error(`Error loading component from ${componentPath}:`, error);
      element.innerHTML = `<p>Error loading component</p>`;
    });
}

// Load navigation bar when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadHTMLComponent("components/navbar.html", "navbar-container");
});
