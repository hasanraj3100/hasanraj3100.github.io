'use strict';

// ──────────────────────────────────────────────────────────────────
// Utilities
// ──────────────────────────────────────────────────────────────────
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ──────────────────────────────────────────────────────────────────
// Mobile Navigation
// ──────────────────────────────────────────────────────────────────
const hamburger  = $('#hamburger');
const mobileMenu = $('#mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close on nav link or CTA click
$$('.mobile-nav-links a, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ──────────────────────────────────────────────────────────────────
// Smooth Scrolling
// ──────────────────────────────────────────────────────────────────
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    e.preventDefault();
    const target = document.querySelector(id);
    if (!target) return;
    const navH = $('#navbar').offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ──────────────────────────────────────────────────────────────────
// Navbar — scroll-linked glass appearance
// ──────────────────────────────────────────────────────────────────
const navbar = $('#navbar');
const navBg  = $('.nav-bg');

function updateNavbar() {
  const scrolled = window.scrollY > 50;
  if (navBg) {
    navBg.style.background = scrolled
      ? 'rgba(5,5,6,0.85)'
      : 'rgba(5,5,6,0.72)';
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ──────────────────────────────────────────────────────────────────
// Active nav link scroll-spy
// ──────────────────────────────────────────────────────────────────
const sections  = $$('section[id]');
const navLinks  = $$('.nav-menu a[href^="#"]');

const spyObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.35 }
);
sections.forEach(s => spyObserver.observe(s));

// ──────────────────────────────────────────────────────────────────
// Hero — Parallax on scroll (opacity + scale + translateY)
// ──────────────────────────────────────────────────────────────────
const heroSection   = $('#home');
const heroParallax  = $('#hero-parallax');

function updateHeroParallax() {
  if (!heroParallax || !heroSection) return;
  const ratio = Math.min(window.scrollY / (heroSection.offsetHeight * 0.65), 1);
  heroParallax.style.opacity   = 1 - ratio * 0.92;
  heroParallax.style.transform = `translateY(${ratio * 55}px) scale(${1 - ratio * 0.04})`;
}

window.addEventListener('scroll', updateHeroParallax, { passive: true });

// ──────────────────────────────────────────────────────────────────
// Card Mouse-Tracking Spotlight
// ──────────────────────────────────────────────────────────────────
$$('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
  });
});

// ──────────────────────────────────────────────────────────────────
// Scroll-Reveal via IntersectionObserver
// ──────────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

$$('[data-animate], [data-stagger]').forEach(el => revealObserver.observe(el));
