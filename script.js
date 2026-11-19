const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.querySelector('span').textContent = isOpen ? '−' : '+';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  const sign = menuButton?.querySelector('span');
  if (sign) sign.textContent = '+';
}));

// Slight pointer tilt on the hero graphic; disabled for touch and reduced-motion users.
const art = document.querySelector('.hero-art');
if (art && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  art.addEventListener('pointermove', event => {
    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    art.style.transform = `rotate(2deg) perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  });
  art.addEventListener('pointerleave', () => art.style.transform = '');
}
