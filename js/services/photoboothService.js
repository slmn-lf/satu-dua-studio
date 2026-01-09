export const getServices = async () => {
  try {
    const res = await fetch("/data/cards.json");
    if (!res.ok) throw new Error("Failed to load services");
    return await res.json();
  } catch (error) {
    console.error("Error loading services:", error);
    return [];
  }
};

export const buyService = (service) => {
  console.log("Beli paket:", service.title);

  // Save service to localStorage and navigate
  localStorage.setItem("selectedService", JSON.stringify(service));
  // window.location.href = "/photobooth.html"
};
