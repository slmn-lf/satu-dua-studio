export const ServiceCard = ({ image, title, desc, onClick }) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card__media">
      <img src="${image}" alt="${title}" loading="lazy" />
    </div>
    <div class="card__body">
      <h3 class="card__title">${title}</h3>
      <p class="card__desc">${desc}</p>
      
    </div>
  `;

  const buyButton = card.querySelector('[data-action="buy"]');
  if (buyButton) {
    buyButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof onClick === "function") onClick();
    });
  }

  return card;
};
