/* SANZ GAME HUB - vanilla JS */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Navbar scroll effect
  const nav = $('#navbar');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('open', open); burger.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Floating particles
  const box = $('#particles');
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = 8 + Math.random() * 10 + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    box.appendChild(p);
  }

  // Game search
  const input = $('#search'), cards = $$('.card'), none = $('#noResults');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const alias = { gta: 'grand theft auto', ac: "assassin's creed", fc: 'ea sports fc' };
    const terms = [q, alias[q]].filter(Boolean);
    let shown = 0;
    cards.forEach(c => {
      const hit = !q || terms.some(t => c.dataset.title.includes(t) || c.dataset.genre.includes(t));
      c.classList.toggle('hide', !hit);
      if (hit) shown++;
    });
    none.hidden = shown !== 0;
  });

  // Reveal on scroll + counters
  const count = el => {
    const end = +el.dataset.count; let n = 0;
    const t = setInterval(() => { n++; el.textContent = n; if (n >= end) clearInterval(t); }, 1400 / end);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    $$('.num[data-count]', e.target).forEach(count);
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));

  // Video placeholder if file is missing
  const v = $('#trailer'), ph = $('#videoPlaceholder');
  const src = $('source', v);
  src.addEventListener('error', () => { v.hidden = true; ph.hidden = false; });

  // Cursor glow (fine pointers only)
  const glow = $('.cursor-glow');
  if (matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }, { passive: true });
  }
})();
