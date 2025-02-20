const products = [
  {
    name: "Samsung S25 Ultra",
    price: "PKR 439,999",
    image: "./resources/images/SamsungGalaxyS25Ultra.jpg",
    description: "A high-end smartphone with amazing features.",
  },
  {
    name: "Lenovo V15 G4",
    price: "PKR 149,999",
    image: "./resources/images/Lenovov15G4.jpg",
    description: "Powerful laptop for work and play.",
  },
  {
    name: "Apple iMac MQRK3",
    price: "PKR 559,000",
    image: "./resources/images/AppleiMac_MQRK3.jpg",
    description: "Noise-canceling headphones for immersive audio.",
  }
];

const container = document.getElementById("product-container");

products.forEach((product) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${product.image}" alt="${product.name}" width="100">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>
            <div class="card-back">
                <p>${product.description}</p>
                <button onclick="buyProduct('${product.name}')">Buy Now</button>
            </div>
        </div>
    `;
  container.appendChild(card);
});

function buyProduct(name) {
  console.log(`Product Selected: ${name}`);
}

document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
