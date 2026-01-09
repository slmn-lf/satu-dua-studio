import { getServices, buyService } from "../services/PhotoboothService.js";
import { ServiceCard } from "../../components/ServiceCard.js";

export const renderServices = async () => {
  const container = document.getElementById("services-container");

  if (!container) {
    console.error("Container #services-container not found");
    return;
  }

  try {
    const services = await getServices();
    console.log("Services loaded:", services);

    if (!services || services.length === 0) {
      container.innerHTML = "<p>No services available</p>";
      return;
    }

    // Create service section container with grid
    const serviceSection = document.createElement("section");
    serviceSection.className = "service-section";

    services.forEach((service) => {
      const card = ServiceCard({
        image: service.image,
        title: service.title,
        desc: service.desc,
        onClick: () => buyService(service),
      });

      if (card) {
        serviceSection.appendChild(card);
      }
    });

    container.appendChild(serviceSection);
    console.log("Services rendered successfully");
  } catch (error) {
    console.error("Error rendering services:", error);
    container.innerHTML = `<p>Error loading services: ${error.message}</p>`;
  }
};
