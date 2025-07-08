const products = [
  {
    _id: "1",
    name: "Organic Sukuma Wiki",
    price: 30,
    image: "https://images.unsplash.com/photo-1632192460110-45a33100a0ce"
  },
  {
    _id: "2",
    name: "Free Range Eggs",
    price: 20,
    image: "https://images.unsplash.com/photo-1612212959285-b338463b1f06"
  },
  {
    _id: "3",
    name: "Organic Milk",
    price: 100,
    image: "https://images.unsplash.com/photo-1611042553480-ecfef3f45671"
  },
  {
    _id: "4",
    name: "Desi Chicken",
    price: 950,
    image: "https://images.unsplash.com/photo-1612350739774-c574a5b26b27"
  },
  {
    _id: "5",
    name: "Organic Honey",
    price: 550,
    image: "https://images.unsplash.com/photo-1584270354949-4be88449bdbb"
  },
  {
    _id: "6",
    name: "Cow Manure Fertilizer",
    price: 150,
    image: "https://images.unsplash.com/photo-1609895920012-b6a5a5f5ef1d"
  },
  {
    _id: "7",
    name: "Tomatoes",
    price: 70,
    image: "https://images.unsplash.com/photo-1582281298052-84338cabb85f"
  },
  {
    _id: "8",
    name: "Maize Seeds",
    price: 1200,
    image: "https://images.unsplash.com/photo-1602526215846-7c1a8d4d30a4"
  },
  {
    _id: "9",
    name: "Organic Avocados",
    price: 50,
    image: "https://images.unsplash.com/photo-1600283108233-3b7f6fda29c1"
  },
  {
    _id: "10",
    name: "Tilapia Fish",
    price: 600,
    image: "https://images.unsplash.com/photo-1559070081-3a6c1be7b197"
  }
];

const cartContainer = document.getElementById("cartContainer");
const cartSummary = document.getElementById("cartSummary");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  cartSummary.innerHTML = "";
} else {
  let total = 0;
  cartContainer.innerHTML = cart.map(id => {
    const product = products.find(p => p._id === id);
    total += product.price;
    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p>KES ${product.price}</p>
          <button onclick="removeFromCart('${product._id}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  cartSummary.innerHTML = `
    <h2>Total: KES ${total}</h2>
  `;
}

function removeFromCart(id) {
  const newCart = cart.filter(pid => pid !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  location.reload();
}

function checkout() {
  alert("✅ Proceeding to checkout...");
  // Later: Redirect to checkout.html
}
