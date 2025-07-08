document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  fetchPayments();

  const form = document.getElementById("addProductForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;
    // Prevent unauthorized access
const token = sessionStorage.getItem("adminToken");
if (!token) {
  alert("Unauthorized access. Redirecting to login...");
  window.location.href = "admin-login.html";
}


   const res = await fetch("http://localhost:5000/api/products", {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

    const data = await res.json();
    document.getElementById("addProductStatus").innerText = "✅ Product added!";
    form.reset();
    fetchProducts();
  });
});

async function fetchProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach(p => {
    list.innerHTML += `<li><strong>${p.name}</strong> – KES ${p.price}</li>`;
  });
}

async function fetchPayments() {
  const res = await fetch("http://localhost:5000/api/admin/payments");
  const payments = await res.json();
  const tableBody = document.querySelector("#mpesaTable tbody");
  tableBody.innerHTML = "";
  payments.forEach(p => {
    tableBody.innerHTML += `
      <tr>
        <td>${p.mpesaRef}</td>
        <td>${p.phone}</td>
        <td>KES ${p.amount}</td>
        <td>${p.status}</td>
        <td>${new Date(p.date).toLocaleString()}</td>
      </tr>
    `;
  });
}
