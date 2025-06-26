'use strict';

/**
 * Add event on multiple elements
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);


/**
 * Scroll reveal effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();
addEventOnElem(window, "scroll", scrollReveal);

/**
 * Search Bar Functionality
 */
const searchInput = document.querySelector(".search-field");
const searchSubmit = document.querySelector(".search-submit");

searchSubmit.addEventListener("click", function () {
  if (searchInput.value.trim() !== "") {
    console.log("Arama yapılıyor: " + searchInput.value);
  }
});

/**
 * Mobile Menu Handling
 */
const mobileMenuBtn = document.querySelector(".nav-open-btn");
const mobileNav = document.querySelector(".navbar");

mobileMenuBtn.addEventListener("click", function () {
  mobileNav.classList.toggle("open");
  overlay.classList.toggle("active");
});

/**
 * Smooth Scroll for Links
 */
navbarLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 60,
        behavior: "smooth"
      });
    }

    closeNavbar();
  });
});



let lastScrollTop = 0;
const header = document.querySelector("header"); // Başlığı seç
const freeShipping = document.querySelector(".free-shipping"); // Üstteki free shipping çubuğunu seç
const threshold = 50; // 50px kaydırmadan sonra devreye girsin
let hidden = false;

window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > threshold) {
        // Kullanıcı aşağı kaydırıyorsa, header ve free shipping'i gizle
        if (!hidden) {
            header.style.transform = "translateY(-100%)";
            freeShipping.style.transform = "translateY(-100%)";
            hidden = true;
        }
    } else {
        // Kullanıcı yukarı kaydırıyorsa, header ve free shipping'i geri getir
        if (hidden) {
            header.style.transform = "translateY(0)";
            freeShipping.style.transform = "translateY(0)";
            hidden = false;
        }
    }

    lastScrollTop = scrollTop;
});

document.querySelectorAll('.search-field, .header-action-btn').forEach(el => el.style.display = 'block');

document.querySelector(".input-wrapper").style.display = "flex";
document.querySelector(".input-wrapper").style.display = "block";
document.querySelector(".input-wrapper").style.display = "block";
