/* albertguilemany.com — script.js (v4)
   - Cookie banner: fix iOS/Safari
   - Formulari: fetch GET + redirect gracies per idioma
   - Menú mòbil: sistema únic
   - Selector idioma
   - Any actual
*/
document.addEventListener('DOMContentLoaded', () => {

  /* 0) Any actual */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* 1) Email obfuscat */
  const emailLink = document.getElementById('contact-email');
  if (emailLink) {
    const u = 'info', d = 'albertguilemany.com';
    emailLink.href = `mailto:${u}@${d}`;
    emailLink.textContent = `${u}@${d}`;
  }

  /* 2) Menú mòbil */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');
  const body = document.body;

  const closeNav = () => {
    body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('click', (e) => {
      if (!body.classList.contains('nav-open')) return;
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
  }

  /* 3) Cookie banner — fix iOS/Safari */
  const banner = document.getElementById('cookieBanner');
  const btnAccept = document.getElementById('cookieAccept');
  const btnReject = document.getElementById('cookieReject');

  const hideBanner = () => {
    if (banner) { banner.classList.remove('visible'); banner.setAttribute('aria-hidden', 'true'); }
  };

  if (banner) {
    const stored = localStorage.getItem('ag_cookies');
    if (!stored) { banner.classList.add('visible'); banner.setAttribute('aria-hidden', 'false'); }
    if (btnAccept) btnAccept.addEventListener('click', () => { localStorage.setItem('ag_cookies', 'accepted'); hideBanner(); });
    if (btnReject) btnReject.addEventListener('click', () => { localStorage.setItem('ag_cookies', 'rejected'); hideBanner(); });
  }

  /* 4) Formulari — redirigeix a gracies en l'idioma correcte */
  const form = document.getElementById('contactForm');
  if (form) {
    const setHidden = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setHidden('source', document.getElementById('source')?.value || 'web');
    setHidden('page_url', window.location.href);
    setHidden('referrer', document.referrer || '(directe)');
    setHidden('user_agent', navigator.userAgent);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setHidden('page_url', window.location.href);
      setHidden('referrer', document.referrer || '(direct)');

      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = '...'; }

      const params = new URLSearchParams(new FormData(form)).toString();
      fetch(form.action + '?' + params, { method: 'GET', mode: 'no-cors' });

      // Detectar idioma per redirigir al gracies correcte
      const path = window.location.pathname;
      let gracias = 'https://albertguilemany.com/gracies.html';
      if (path.startsWith('/es/') || path.includes('/es/')) {
        gracias = 'https://albertguilemany.com/es/gracies.html';
      } else if (path.startsWith('/en/') || path.includes('/en/')) {
        gracias = 'https://albertguilemany.com/en/gracies.html';
      }

      setTimeout(() => { window.location.href = gracias; }, 800);
    });
  }

  /* 5) Selector d'idioma */
  initLangSelector();
});

function initLangSelector() {
  const BASE = 'https://albertguilemany.com';
  const LANGS = { ca: BASE + '/', es: BASE + '/es/', en: BASE + '/en/' };
  const path = window.location.pathname;

  let currentLang = 'ca';
  if (path.startsWith('/es/') || path.includes('/es/')) currentLang = 'es';
  else if (path.startsWith('/en/') || path.includes('/en/')) currentLang = 'en';

  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('lang-active', el.dataset.lang === currentLang);
  });

  /* Selector mòbil: assegura que el selector del nav mòbil funcioni */
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = el.dataset.lang;
      sessionStorage.setItem('ag_lang_redirected', '1');
      window.location.href = LANGS[lang] || LANGS['ca'];
    });
  });
}
