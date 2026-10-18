// Lightweight progressive enhancement. Everything remains readable if JS is disabled.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elements = [...document.querySelectorAll('[data-reveal]')];
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-ready');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.07, rootMargin: '0px 0px 55px 0px' });
  elements.forEach((el) => observer.observe(el));
}
const progress = document.querySelector('.reading-progress');
let rafPending = false;
const updateProgress = () => {
  rafPending = false;
  const room = document.documentElement.scrollHeight - window.innerHeight;
  const percent = room > 0 ? (window.scrollY / room) * 100 : 0;
  progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
};
window.addEventListener('scroll', () => {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateProgress, { passive: true });
updateProgress();
