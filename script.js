const header = document.querySelector('#header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = [...document.querySelectorAll('.nav a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const whatsappMessage = encodeURIComponent('Olá! Gostaria de agendar um serviço para meu veículo na Garagem Estética Automotiva.');
const whatsappUrl = `https://wa.me/5527996973201?text=${whatsappMessage}`;

document.querySelectorAll('[data-whatsapp]').forEach((link) => { link.href = whatsappUrl; });

function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 36); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const comparison = document.querySelector('#comparison');
const range = comparison.querySelector('input');
const afterWrap = comparison.querySelector('.after-wrap');
const compareLine = comparison.querySelector('.compare-line');
function updateComparison() {
  const value = `${range.value}%`;
  afterWrap.style.width = value;
  compareLine.style.left = value;
}
range.addEventListener('input', updateComparison);
updateComparison();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%' });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

if (!reducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const mobile = window.matchMedia('(max-width: 760px)').matches;
  const strength = mobile ? 0.38 : 1;

  const heroTimeline = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
  });
  heroTimeline
    .to('.hero-environment', { yPercent: 7 * strength, scale: 1.04, ease: 'none' }, 0)
    .to('.hero-grid', { yPercent: 13 * strength, ease: 'none' }, 0)
    .to('.hero-light,.hero-particles', { yPercent: 22 * strength, xPercent: -3 * strength, opacity: 0.08, ease: 'none' }, 0)
    .to('.hero-streak', { yPercent: 38 * strength, xPercent: -7 * strength, ease: 'none' }, 0)
    .to('.car-stage', { yPercent: -18 * strength, xPercent: 4 * strength, scale: 1 + (.09 * strength), ease: 'none' }, 0)
    .to('.hero-reflection', { yPercent: -35 * strength, xPercent: -8 * strength, scaleX: 1.12, opacity: 0, ease: 'none' }, 0)
    .to('.hero-content', { yPercent: -11 * strength, opacity: mobile ? .5 : 0, ease: 'none' }, 0)
    .to('.scroll-cue', { opacity: 0, y: -30, ease: 'none' }, 0);

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.fromTo(element, { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } });
  });
  gsap.fromTo('.service-card', { y: 55, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.service-grid', start: 'top 82%', once: true } });
  gsap.fromTo('.benefits div', { x: 35, opacity: 0 }, { x: 0, opacity: 1, duration: .7, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.benefits', start: 'top 82%', once: true } });
  gsap.to('.difference-image img', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.difference', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.cta-bg', { yPercent: 8 * strength, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '.final-cta', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  if (!mobile) {
    const track = document.querySelector('.gallery-track');
    const gallery = document.querySelector('.gallery');
    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, { x: () => -getDistance(), ease: 'none', scrollTrigger: { trigger: '.gallery-viewport', start: 'top top', end: () => `+=${getDistance()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
  }
} else {
  document.querySelectorAll('.reveal,.benefits div,.service-card').forEach((element) => {
    element.style.opacity = '1';
    element.style.transform = 'none';
  });
}
