// Simple JavaScript for the travel website
document.addEventListener("DOMContentLoaded", function () {
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const searchResults = document.getElementById("searchResults");

  // Sample destinations data
  const destinations = [
    {
      name: "Maldives",
      type: "beach",
      description: "Beautiful beaches with crystal clear water",
    },
    {
      name: "Bali, Indonesia",
      type: "beach",
      description: "Exotic beaches with stunning sunsets",
    },
    {
      name: "Angkor Wat, Cambodia",
      type: "temple",
      description: "The largest religious monument in the world",
    },
    {
      name: "Golden Temple, India",
      type: "temple",
      description: "Beautiful golden architecture",
    },
    {
      name: "Japan",
      type: "country",
      description: "Perfect blend of tradition and modernity",
    },
    {
      name: "Thailand",
      type: "country",
      description: "Land of smiles with vibrant culture",
    },
  ];

  function performSearch(query) {
    if (!query.trim()) {
      searchResults.style.display = "none";
      return;
    }

    const filteredDestinations = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.type.toLowerCase().includes(query.toLowerCase()) ||
        dest.description.toLowerCase().includes(query.toLowerCase())
    );

    displaySearchResults(filteredDestinations);
  }

  function displaySearchResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="search-result-item">No destinations found</div>';
    } else {
      searchResults.innerHTML = results
        .map(
          (dest) =>
            `<div class="search-result-item" onclick="selectDestination('${dest.name}')">
                    <strong>${dest.name}</strong> - ${dest.description}
                </div>`
        )
        .join("");
    }
    searchResults.style.display = "block";
  }

  // Search input event listeners
  searchInput.addEventListener("input", function () {
    performSearch(this.value);
  });

  searchBtn.addEventListener("click", function () {
    performSearch(searchInput.value);
  });

  // Close search results when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !searchInput.contains(e.target) &&
      !searchBtn.contains(e.target) &&
      !searchResults.contains(e.target)
    ) {
      searchResults.style.display = "none";
    }
  });

  // Contact form handling
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Show success message
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });

  // Book Now button functionality
  const bookBtn = document.querySelector(".book-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", function () {
      alert("Booking system coming soon! Please contact us for reservations.");
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Global function for destination selection
function selectDestination(destinationName) {
  alert(`You selected ${destinationName}! More details coming soon.`);
  document.getElementById("searchInput").value = destinationName;
  document.getElementById("searchResults").style.display = "none";
}
