
// ==========================================
// E M CLEAN & CO
// WEBSITE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // MOBILE NAVIGATION
  // ========================================

  const menuToggle =
    document.getElementById("menuToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");


  function closeMenu() {

    mobileMenu.hidden = true;

    menuToggle.textContent = "☰";

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

  }


  menuToggle.addEventListener("click", (event) => {

    event.stopPropagation();

    const isOpening = mobileMenu.hidden;

    mobileMenu.hidden = !isOpening;

    menuToggle.textContent =
      isOpening ? "✕" : "☰";

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
  // GENUINE CUSTOMER REVIEWS
  // ========================================

  const reviews = [

    // REVIEW ONE
    {
      quote:
        "Hi Erin. Thank you so much for the clean yesterday! " +
        "My house looks stunning and the smell when I walked in " +
        "was dreamy! Please can we sort a 2 hour weekly clean? " +
        "Thanks again xx",

      name: "Domestic cleaning customer",
      source: "Customer message"
    },


    // REVIEW TWO
    {
      quote:
        "We have Erin come to our house weekly and I honestly " +
        "couldn't recommend her enough. Every time she comes " +
        "round, the house is left clean, fresh, and smelling lovely.\n\n" +

        "From the start, Erin made me feel so comfortable. " +
        "She is incredibly personable and friendly, and you " +
        "can really tell how much she cares about the service " +
        "she provides. She offered to do a meet and greet, " +
        "which none of the other cleaners I contacted suggested. " +
        "That really went a long way for me as it showed the level " +
        "of care and professionalism she brings to her business.\n\n" +

        "I chose Erin because I didn't want a big agency company " +
        "coming into our home. I wanted someone self-employed " +
        "who genuinely cares about their work and their clients, " +
        "and Erin is exactly that.\n\n" +

        "Every week she puts in so much time and effort and " +
        "the results always show. It's such a nice feeling " +
        "coming back into the house after she's been.\n\n" +

        "Thank you Erin for always doing such a lovely job. " +
        "We really appreciate everything you do 😊",

      name: "Weekly cleaning customer",
      source: "Customer testimonial"
    },


    // REVIEW THREE
    {
      quote:
        "Old Stratford Renovations Ltd would like to thank " +
        "EM Clean & Co for doing a great job of a post building " +
        "work clean after our last refurbishment of a three " +
        "bed house. Great job 👍",

      name: "Old Stratford Renovations Ltd",
      source: "Customer testimonial"
    }

  ];


  // ========================================
  // DISPLAY CUSTOMER REVIEWS
  // ========================================

  const reviewsGrid =
    document.getElementById("reviewsGrid");


  function createReviewCard(review) {

    const card =
      document.createElement("article");

    card.className = "review-card";


    // Quotation mark
    const mark =
      document.createElement("div");

    mark.className = "review-mark";
    mark.textContent = "“";


    // Review text
    const quote =
      document.createElement("p");

    quote.className = "customer-quote";

    quote.textContent =
      `“${review.quote.trim()}”`;


    // Customer details
    const author =
      document.createElement("div");

    author.className = "review-author";


    const name =
      document.createElement("strong");

    name.textContent = review.name;


    const source =
      document.createElement("small");

    source.textContent =
      review.source || "Customer feedback";


    author.append(name, source);

    card.append(mark, quote, author);

    return card;

  }


  reviews.forEach((review) => {

    reviewsGrid.appendChild(
      createReviewCard(review)
    );

  });


  // ========================================
  // ORIGINAL EMAIL ENQUIRY FUNCTION
  // ========================================

  // This version opens the visitor's email
  // application with the form details filled in.
  //
  // It does not use FormSubmit or a backend.
  //
  // The customer must press Send in their
  // email application.

  const form =
    document.getElementById("quoteForm");

  const formError =
    document.getElementById("formError");


  form.addEventListener("submit", (event) => {

    // Stop the normal form submission
    event.preventDefault();


    // Collect the visitor's information
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


    // ======================================
    // VALIDATE THE FORM
    // ======================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!name || !emailPattern.test(email)) {

      formError.hidden = false;

      if (!name) {

        document.getElementById("fullName").focus();

      } else {

        document.getElementById("email").focus();

      }

      return;

    }


    // Hide validation error
    formError.hidden = true;


    // ======================================
    // PREPARE THE EMAIL
    // ======================================

    const subject =
      `Free home visit enquiry - ${name}`;


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


    // ======================================
    // OPEN THE VISITOR'S EMAIL APPLICATION
    // ======================================

    const mailtoLink =

      "mailto:emcleanandco@gmail.com" +

      `?subject=${encodeURIComponent(subject)}` +

      `&body=${encodeURIComponent(body)}`;


    // Opens Gmail, Outlook, Apple Mail or
    // another configured email application.
    //
    // The visitor must press Send.

    window.location.href = mailtoLink;

  });


  // ========================================
  // AUTOMATIC COPYRIGHT YEAR
  // ========================================

  document.getElementById("year").textContent =
    new Date().getFullYear();


  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================

  const animatedElements =
    document.querySelectorAll(

      ".service-card, " +
      ".trust-item, " +
      ".about-content, " +
      ".process-step, " +
      ".review-card"

    );


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {

    const observer =
      new IntersectionObserver(

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
