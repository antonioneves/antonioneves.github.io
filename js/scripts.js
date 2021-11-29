/*!
    * Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    *///
// Scripts
//
const mainLink = document.getElementById("main-link");
mainLink.style.display = "none";
const scrollLimit = 550;
const scrollRange = 100;

let intersected = window.location.hash === "#skils";
let barIntersected = window.location.hash === "#experience";

let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 1.0,
};

window.addEventListener("DOMContentLoaded", () => {
    // Navbar shrink function
    var navbarShrink = () => {
        const navbarCollapsible = document.body.querySelector("#mainNav");
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove("navbar-shrink");
        } else {
            navbarCollapsible.classList.add("navbar-shrink");
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector("#mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#mainNav",
            offset: 72,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .nav-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

    const observer = new IntersectionObserver(animateSkilBars, options);
    const observerBar = new IntersectionObserver(displayExperienceBar, options);

    observer.observe(document.getElementById("skils"));

    observerBar.observe(document.getElementById("expOdOs"));
    observerBar.observe(document.getElementById("expOttobock"));
    observerBar.observe(document.getElementById("expCSGermany"));
    observerBar.observe(document.getElementById("expCSPorto"));
    observerBar.observe(document.getElementById("expBitBrain"));
    observerBar.observe(document.getElementById("expUminho"));
});

let displayExperienceBar = (entries) => {
    // intersection triggered on page load - ignore
    if (barIntersected) {
        const className = entries[0].target.className;
        if (!className.includes("fadeIn")) {
            entries[0].target.className += " fadeIn";
            entries[0].target.style.opacity = 1;
        }
    }
    // display loading skil bars only once
    if (barIntersected <= 1) barIntersected++;
};

let animateBar = (elem, maxWidth, time = 10) => {
    var width = 0;
    var id = setInterval(() => {
        if (width >= maxWidth) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
        }
    }, time);
};

let animateSkilBars = () => {
    // intersection triggered on page load - ignore
    if (intersected == 1) {
        animateBar(document.getElementById("skilsTypeScript"), 97);
        animateBar(document.getElementById("skilsCCpp"), 95);
        animateBar(document.getElementById("skilsCsh"), 92);
        animateBar(document.getElementById("skilsDocker"), 90);
        animateBar(document.getElementById("skilsPython"), 93);
        animateBar(document.getElementById("skilsGit"), 97);
        animateBar(document.getElementById("skilsGraphQl"), 85);
        animateBar(document.getElementById("skilsAws"), 80);
    }

    // display loading skil bars only once
    if (intersected <= 1) intersected++;
};

// Fade navbar brand when moving up
const fade = (element, opacity) => {
    element.style.opacity = opacity;
    if (opacity) element.style.removeProperty("display");
    else element.style.display = "none";
};

window.onscroll = () => {
    const y = window.scrollY;
    const r = (y - scrollLimit + scrollRange) / (2 * scrollRange);
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const s = clamp(r, 0, 1);

    fade(mainLink, s);
};

let submitContactForm = () => {
    const form = document.getElementById("contactForm");
    form.classList.add('was-validated');

    if (form.checkValidity()) {
        form.classList.remove('was-validated');
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const data = {
            name: name,
            email: email,
            message: message,
        };
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://ov6s2qc9d6.execute-api.eu-west-3.amazonaws.com/live", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.
        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
            if (xhr.status === 200) {
                const submitSuccessMessage = document.getElementById("submitSuccessMessage");
                const submitButton = document.getElementById("submitButton");
                submitSuccessMessage.classList.remove = ("d-none");
                submitButton.classList.add = ("d-none");
            } else {
                alert("Sorry, there was an error sending your message. Please try again later.");
            }
        };
    }
};
