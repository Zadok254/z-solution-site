// =============================
// Z Solutions Landing Page JS
// =============================

// === COUNTER ANIMATION ===
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
});

// === WHATSAPP CHAT ===
function startWhatsAppChat() {
  const input = prompt("Type your message to our Z Solutions agent:");
  if (input) {
    const msg = encodeURIComponent(input);
    const phone = "254712345678"; // Replace with your business line
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  }
}

// === FIND MY BRANCH FUNCTION ===
function findBranch() {
  const branches = [
    { name: "Nairobi HQ", lat: -1.2921, lon: 36.8219 },
    { name: "Kisumu", lat: -0.0917, lon: 34.7679 },
    { name: "Mombasa", lat: -4.0435, lon: 39.6682 },
    { name: "Eldoret", lat: 0.5204, lon: 35.2698 },
    { name: "Kakamega", lat: 0.2827, lon: 34.7519 },
    { name: "Kampala", lat: 0.3476, lon: 32.5825 },
    { name: "Accra", lat: 5.6037, lon: -0.1870 },
  ];

  const result = document.getElementById("branchResult");
  result.innerHTML = '<div class="spinner"></div>';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      let nearest = null;
      let minDistance = Infinity;

      branches.forEach(branch => {
        const dist = Math.sqrt(
          Math.pow(branch.lat - userLat, 2) +
          Math.pow(branch.lon - userLon, 2)
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearest = branch;
        }
      });

      result.innerText = `📍 Your Nearest Branch: ${nearest.name}`;
    }, () => {
      result.innerText = "⚠️ Failed to get your location.";
    });
  } else {
    result.innerText = "❌ Geolocation not supported.";
  }
}

// === SCROLL EFFECT (optional for future enhancements) ===
// You can use libraries like AOS.js or add smooth scroll manually

// === SUBSCRIBE NEWSLETTER (placeholder) ===
document.querySelector(".newsletter form")?.addEventListener("submit", e => {
  e.preventDefault();
  const email = e.target.querySelector("input").value;
  alert(`Thank you for subscribing, ${email}! 🥬`);
});
