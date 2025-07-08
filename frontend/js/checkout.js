const form = document.getElementById("checkoutForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const customerName = document.getElementById("customerName").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const products = cart;
  const total = calculateTotal(products);

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerName, phone, location, paymentMethod, products, total })
  });

  const data = await res.json();

  if (res.ok) {
    alert("✅ Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html";
  } else {
    alert("❌ Order Failed: " + data.message);
  }
});

function calculateTotal(cart) {
  const priceMap = {
    "1": 30,
    "2": 20,
    "3": 100,
    "4": 950,
    "5": 550,
    "6": 150,
    "7": 70,
    "8": 1200,
    "9": 50,
    "10": 600
  };
  return cart.reduce((total, id) => total + (priceMap[id] || 0), 0);
}

