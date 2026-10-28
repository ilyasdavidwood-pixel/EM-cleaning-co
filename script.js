
// ==========================================
// E M CLEAN & CO
// WEBSITE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // MOBILE NAVIGATION
  // ========================================

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    mobileMenu.hidden = true;
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpening = mobileMenu.hidden;

    mobileMenu.hidden = !isOpening;
    menuToggle.textContent = isOpening ? "✕" : "☰";

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpening)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpening ? "Close menu" : "Open menu"
    );
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !mobileMenu.hidden &&
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });


  // ========================================
  // WEBSITE CONTENT SETTINGS
  // ========================================

  // You can hide the unfinished sections
  // until Erin has photos and reviews.

  const settings = {
    showGallery: true,
    showReviews: true
  };


  // ========================================
  // CUSTOMER REVIEWS
  // ========================================

  // Add REAL customer reviews here.
  // Get permission before publishing them.
  //
  // Example format:
  //
  // {
  //   quote: "The customer's exact review.",
  //   name: "Customer's approved display name",
  //   source: "Facebook"
  // }

  const reviews = [

    // Paste real reviews here.

  ];


  // ========================================
  // DISPLAY CUSTOMER REVIEWS
  // ========================================

  const reviewsGrid = document.getElementById("reviewsGrid");

  const validReviews = reviews.filter((review) => {
    return (
      review &&
      typeof review.quote === "string" &&
      review.quote.trim() &&
      typeof review.name === "string" &&
      review.name.trim()
    );
  });

  function makeReviewCard(review) {

    const card = document.createElement("article");
    card.className = "review-card";

    const mark = document.createElement("div");
    mark.className = "review-mark";
    mark.textContent = "“";

    const quote = document.createElement("p");
    quote.className = "customer-quote";
    quote.textContent = `“${review.quote.trim()}”`;

    const author = document.createElement("div");
    author.className = "review-author";

    const name = document.createElement("strong");
    name.textContent = review.name;

    const source = document.createElement("small");
    source.textContent = review.source || "Customer feedback";

    author.append(name, source);
    card.append(mark, quote, author);

    return card;
  }

  function makePlaceholder(title, description) {

    const card = document.createElement("article");
    card.className = "review-card review-placeholder";

    const mark = document.createElement("div");
    mark.className = "review-mark";
    mark.textContent = "“";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    const label = document.createElement("small");
    label.textContent = "REVIEW PLACEHOLDER — NOT A CUSTOMER QUOTE";

    card.append(mark, heading, paragraph, label);

    return card;
  }

  if (validReviews.length > 0) {

    validReviews.slice(0, 6).forEach((review) => {
      reviewsGrid.appendChild(makeReviewCard(review));
    });

    document.querySelector(".reviews-heading p").textContent =
      "A few lovely words shared by our customers.";

  } else {

    const placeholders = [
      {
        title: "Your first lovely review",
        description: "Add a genuine quote from a customer here."
      },
      {
        title: "Another kind word",
        description: "A second customer review will look lovely here."
      },
      {
        title: "A little appreciation",
        description: "A third piece of genuine feedback goes here."
      }
    ];

    placeholders.forEach((item) => {
      reviewsGrid.appendChild(
        makePlaceholder(item.title, item.description)
      );
    });

  }


  // ========================================
  // CLEANING RESULTS GALLERY
  // ========================================

  // Add these files to your GitHub repository:
  //
  // assets/results/result-01.jpg
  // assets/results/result-02.jpg
  // assets/results/result-03.jpg
  //
  // Only use genuine photos with permission.

  const galleryImages =
    document.querySelectorAll("[data-gallery-image]");

  galleryImages.forEach((image) => {

    const card = image.closest(".gallery-card");

    function checkImage() {
      if (image.naturalWidth > 0) {
        card.classList.add("has-photo");
      } else {
        card.classList.remove("has-photo");
      }
    }

    image.addEventListener("load", checkImage);

    image.addEventListener("error", () => {
      card.classList.remove("has-photo");
    });

    if (image.complete) {
      checkImage();
    }

  });


  // ========================================
  // OPTIONAL SECTION VISIBILITY
  // ========================================

  if (!settings.showGallery) {
    document.getElementById("results").hidden = true;

    document.querySelectorAll('a[href="#results"]')
      .forEach((link) => {
        link.hidden = true;
      });
  }

  if (!settings.showReviews) {
    document.getElementById("reviews").hidden = true;

    document.querySelectorAll('a[href="#reviews"]')
      .forEach((link) => {
        link.hidden = true;
      });
  }


  // ========================================
  // CONTACT FORM
  // ========================================

  const form = document.getElementById("quoteForm");
  const formError = document.getElementById("formError");

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
      document.getElementById("fullName").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const postcode =
      document.getElementById("postcode").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const message =
      document.getElementById("message").value.trim();


    // Validate name and email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !emailPattern.test(email)) {

      formError.hidden = false;

      if (!name) {
        document.getElementById("fullName").focus();
      } else {
        document.getElementById("email").focus();
      }

      return;
    }

    formError.hidden = true;


    // Prepare enquiry email

    const subject = `Free home visit enquiry - ${name}`;

    const body = [
      "Hello Erin,",
      "",
      "I would like to enquire about a free home visit and cleaning quotation.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Postcode: ${postcode || "Not provided"}`,
      "",
      "About my home / what I need:",
      message || "Please get in touch to discuss.",
      "",
      "Thank you."
    ].join("\n");


    // Open customer's email application

    const mailtoLink =
      "mailto:emcleanandco@gmail.com" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

  });


  // ========================================
  // FOOTER COPYRIGHT YEAR
  // ========================================

  document.getElementById("year").textContent =
    new Date().getFullYear();


  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================

  const animatedElements = document.querySelectorAll(
    ".service-card, .trust-item, .about-content, " +
    ".process-step, .gallery-card, .review-card"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  }

});
