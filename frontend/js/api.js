// Fetch & display products
window.addEventListener("DOMContentLoaded", async () => {
  if (!document.getElementById("product-grid")) return;

  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();

  const grid = document.getElementById("product-grid");
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <h2>${p.name}</h2>
      <p>${p.description}</p>
      <strong>KES ${p.price}</strong><br>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
  `).join('');
});
