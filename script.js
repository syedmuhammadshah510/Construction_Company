/* ====================================
   SYEDS GROUPS OF COMPANY.LTD
   Main JavaScript
   ==================================== */

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2800);
});

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- MOBILE MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

/* ---- HERO SLIDER ---- */
const slides   = document.querySelectorAll('.hero-slide');
const dots     = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  resetTimer();
}

function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

window.goToSlide = goToSlide;
slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);

/* ---- PROJECT FILTER ---- */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInDown 0.4s ease both';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ---- TESTIMONIALS SLIDER ---- */
const track     = document.getElementById('testiTrack');
const prevBtn   = document.getElementById('testiPrev');
const nextBtn   = document.getElementById('testiNext');
let testiIndex  = 0;

function getCardsVisible() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function updateTestiSlider() {
  const cardWidth = track.children[0].offsetWidth + 24;
  track.style.transform = `translateX(-${testiIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  const max = track.children.length - getCardsVisible();
  testiIndex = testiIndex < max ? testiIndex + 1 : 0;
  updateTestiSlider();
});

prevBtn.addEventListener('click', () => {
  const max = track.children.length - getCardsVisible();
  testiIndex = testiIndex > 0 ? testiIndex - 1 : max;
  updateTestiSlider();
});

window.addEventListener('resize', updateTestiSlider);

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ---- COUNTER OBSERVER ---- */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

/* ---- SCROLL TO TOP ---- */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

/* ---- ADD REVEAL CLASSES TO SECTIONS ---- */
document.addEventListener('DOMContentLoaded', () => {
  // About
  const aboutImages  = document.querySelector('.about-images');
  const aboutContent = document.querySelector('.about-content');
  if (aboutImages)  aboutImages.classList.add('reveal-left');
  if (aboutContent) aboutContent.classList.add('reveal-right');

  // Why us
  const whyImg     = document.querySelector('.why-img');
  const whyContent = document.querySelector('.why-content');
  if (whyImg)     whyImg.classList.add('reveal-left');
  if (whyContent) whyContent.classList.add('reveal-right');

  // Cards
  document.querySelectorAll('.service-card, .project-card, .team-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.classList.add(`delay-${(i % 4) + 1}`);
  });

  // Section headers
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));

  // Re-observe new elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
});
