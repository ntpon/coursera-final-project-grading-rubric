// Simple JavaScript for the travel website
document.addEventListener("DOMContentLoaded", function () {
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const searchResultsSection = document.getElementById("searchResults");
  const searchResultsContent = document.getElementById("searchResultsContent");
  const beachSection = document.getElementById("beachSection");
  const templeSection = document.getElementById("templeSection");
  const countrySection = document.getElementById("countrySection");

  // Enhanced destinations data with more details
  const destinations = [
    {
      name: "Maldives",
      type: "beach",
      description:
        "Paradise on earth with pristine white sand beaches and crystal clear turquoise waters. Perfect for honeymoons and luxury getaways.",
      country: "Maldives",
      bestTime: "November to April",
      price: "$$$",
      rating: "4.9/5",
      duration: "7-14 days",
      highlights: "Overwater bungalows, coral reefs, water sports",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
    },
    {
      name: "Bali, Indonesia",
      type: "beach",
      description:
        "Exotic island paradise with stunning beaches, ancient temples, and vibrant culture. A perfect blend of relaxation and adventure.",
      country: "Indonesia",
      bestTime: "April to October",
      price: "$$",
      rating: "4.7/5",
      duration: "10-21 days",
      highlights: "Rice terraces, temples, surfing, yoga retreats",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    },
    {
      name: "Angkor Wat, Cambodia",
      type: "temple",
      description:
        "The magnificent temple complex, a UNESCO World Heritage site and the largest religious monument in the world. A journey through ancient Khmer civilization.",
      country: "Cambodia",
      bestTime: "November to March",
      price: "$",
      rating: "4.8/5",
      duration: "3-7 days",
      highlights: "Ancient temples, sunrise views, cultural tours",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=300&fit=crop",
    },
    {
      name: "Golden Temple, India",
      type: "temple",
      description:
        "The sacred Harmandir Sahib, a stunning golden temple surrounded by a holy lake. A spiritual journey into Sikh culture and architecture.",
      country: "India",
      bestTime: "October to March",
      price: "$",
      rating: "4.6/5",
      duration: "2-5 days",
      highlights: "Golden architecture, spiritual experience, langar",
      image:
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&h=300&fit=crop",
    },
    {
      name: "Japan",
      type: "country",
      description:
        "A fascinating country that perfectly blends ancient traditions with cutting-edge technology. From cherry blossoms to bullet trains.",
      country: "Japan",
      bestTime: "March to May, September to November",
      price: "$$$",
      rating: "4.9/5",
      duration: "14-21 days",
      highlights: "Cherry blossoms, temples, technology, cuisine",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    },
    {
      name: "Thailand",
      type: "country",
      description:
        "The Land of Smiles offers everything from bustling cities to serene beaches, ancient temples to modern shopping malls.",
      country: "Thailand",
      bestTime: "November to April",
      price: "$$",
      rating: "4.7/5",
      duration: "10-18 days",
      highlights: "Bangkok, beaches, temples, street food",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&h=300&fit=crop",
    },
  ];

  function performSearch(query) {
    if (!query.trim()) {
      showAllSections();
      return;
    }

    // Search through destinations data
    const searchQuery = query.toLowerCase();
    const matchingDestinations = destinations.filter((destination) => {
      return (
        destination.name.toLowerCase().includes(searchQuery) ||
        destination.description.toLowerCase().includes(searchQuery) ||
        destination.country.toLowerCase().includes(searchQuery) ||
        destination.type.toLowerCase().includes(searchQuery) ||
        destination.highlights.toLowerCase().includes(searchQuery)
      );
    });

    displaySearchResults(matchingDestinations);
  }

  function displaySearchResults(matchingDestinations) {
    // Hide all regular sections
    hideAllSections();

    if (matchingDestinations.length === 0) {
      searchResultsContent.innerHTML = `
        <div class="no-results">
          <h3>No destinations found</h3>
          <p>Try searching for beaches, temples, countries, or specific destinations</p>
        </div>
      `;
    } else {
      // Create simple search result cards with just name and description
      searchResultsContent.innerHTML = matchingDestinations
        .map((destination) => {
          return `
            <div class="search-result-card" onclick="selectDestination('${destination.name}')">
              <img src="${destination.image}" alt="${destination.name}" />
              <div class="card-content">
                <h3>${destination.name}</h3>
                <p class="description">${destination.description}</p>
              </div>
            </div>
          `;
        })
        .join("");
    }
    searchResultsSection.style.display = "block";
  }

  function hideAllSections() {
    beachSection.style.display = "none";
    templeSection.style.display = "none";
    countrySection.style.display = "none";
    searchResultsSection.style.display = "none";
  }

  function showAllSections() {
    beachSection.style.display = "block";
    templeSection.style.display = "block";
    countrySection.style.display = "block";
    searchResultsSection.style.display = "none";
  }

  // Search input event listeners
  searchInput.addEventListener("input", function () {
    performSearch(this.value);
  });

  searchBtn.addEventListener("click", function () {
    performSearch(searchInput.value);
  });

  // Reset button functionality
  resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    showAllSections();
  });

  // Close search results when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !searchInput.contains(e.target) &&
      !searchBtn.contains(e.target) &&
      !resetBtn.contains(e.target) &&
      !searchResultsSection.contains(e.target)
    ) {
      // Keep search results visible if there's a search query
      if (!searchInput.value.trim()) {
        showAllSections();
      }
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
  // Keep the search results visible since user selected from results
}
