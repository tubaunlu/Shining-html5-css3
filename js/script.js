'use strict';

/**
 * Add event on multiple elements
 */
const addEventOnElem = function (elem, type, callback) {
  if (NodeList.prototype.isPrototypeOf(elem) || Array.isArray(elem)) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else if (elem) {
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
  document.body.classList.toggle("no-scroll"); // Mobilde arka plan kaymasını engelle
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
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

if (searchSubmit && searchInput) {
  searchSubmit.addEventListener("click", function () {
    if (searchInput.value.trim() !== "") {
      console.log("Arama yapılıyor: " + searchInput.value);
    }
  });
}

/**
 * Mobile Menu Handling
 */
const mobileMenuBtn = document.querySelector(".nav-open-btn");
const mobileNav = document.querySelector(".navbar");

if (mobileMenuBtn && mobileNav && overlay) {
  mobileMenuBtn.addEventListener("click", function () {
    mobileNav.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });
}

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
const header = document.querySelector("header");
const freeShipping = document.querySelector(".free-shipping");
const threshold = 50;
let hidden = false;

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > threshold) {
    // Kullanıcı aşağı kaydırıyorsa, header ve free shipping'i gizle
    if (!hidden) {
      if (header) header.style.transform = "translateY(-100%)";
      if (freeShipping) freeShipping.style.transform = "translateY(-100%)";
      hidden = true;
    }
  } else {
    // Kullanıcı yukarı kaydırıyorsa, header ve free shipping'i geri getir
    if (hidden) {
      if (header) header.style.transform = "translateY(0)";
      if (freeShipping) freeShipping.style.transform = "translateY(0)";
      hidden = false;
    }
  }

  lastScrollTop = scrollTop;
});

// Mobilde arama ve header action butonlarını göster
document.querySelectorAll('.search-field, .header-action-btn').forEach(el => el.style.display = 'block');

// input-wrapper için sadece bir kez display ayarla
const inputWrapper = document.querySelector(".input-wrapper");
if (inputWrapper) inputWrapper.style.display = "block";
