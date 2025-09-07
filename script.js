// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector("#navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(15, 23, 42, 0.98)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)";
      navbar.style.boxShadow =
        "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)";
    }
  });

  // Load coding profiles from JSON
  loadCodingProfiles();
});

// Coding profiles data (this would typically be in a separate JSON file)
const codingProfilesData = {
  profiles: [
    {
      platform: "Leetcode",
      logo: "https://ucarecdn.com/0185f58f-ba8a-4f06-bf4d-cb20f6b21bb1/-/resize/1050/",
      stats: [
        { label: "Total Problems Solved", value: "115" },
        { label: "Easy", value: "36" },
        { label: "Medium", value: "71" },
        { label: "Hard", value: "8" },
      ],
      link: "https://leetcode.com/u/raj3100/",
    },
    {
      platform: "Codeforces",
      logo: "https://codeforces.org/s/83301/images/codeforces-sponsored-by-ton.png",
      stats: [
        { label: "Total Questions Solved", value: "240" },
        { label: "Contest Rating", value: "1252" },
        { label: "Max Rating", value: "1252" },
        { label: "Rank", value: "Pupil" },
      ],
      link: "https://codeforces.com/profile/hasanraj3100",
    },
    {
      platform: "CodeChef",
      logo: "https://cdn.codechef.com/images/cc-logo.svg",
      stats: [
        { label: "Total Questions Solved", value: "182" },
        { label: "Contest Rating", value: "1553" },
        { label: "Max Rating", value: "1553" },
        { label: "Stars", value: "3" },
      ],
      link: "https://www.codechef.com/users/raj3100",
    },
  ],
};

function loadCodingProfiles() {
  const codingContainer = document.getElementById("coding-container");

  codingProfilesData.profiles.forEach((profile) => {
    const card = document.createElement("a");
    card.href = profile.link;
    card.target = "_blank";
    card.className = "coding-card";

    const headerDiv = document.createElement("div");
    headerDiv.className = "coding-header";

    const logoDiv = document.createElement("div");
    logoDiv.className = "coding-logo";

    const logoImg = document.createElement("img");
    logoImg.src = profile.logo;
    logoImg.alt = `${profile.platform} Logo`;
    logoDiv.appendChild(logoImg);

    const title = document.createElement("h3");
    title.className = "coding-title";
    title.textContent = profile.platform;

    headerDiv.appendChild(logoDiv);
    headerDiv.appendChild(title);

    const statsDiv = document.createElement("div");
    statsDiv.className = "coding-stats";

    profile.stats.forEach((stat) => {
      const statDiv = document.createElement("div");
      statDiv.className = "coding-stat";

      const valueSpan = document.createElement("div");
      valueSpan.className = "stat-value";
      valueSpan.textContent = stat.value;

      const labelSpan = document.createElement("div");
      labelSpan.className = "stat-label";
      labelSpan.textContent = stat.label;

      statDiv.appendChild(valueSpan);
      statDiv.appendChild(labelSpan);

      statsDiv.appendChild(statDiv);
    });

    card.appendChild(headerDiv);
    card.appendChild(statsDiv);

    codingContainer.appendChild(card);
  });
}

// Add subtle animations to elements when they come into view
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all section elements for animation
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(section);
});

