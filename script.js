/* script.js — AG landing (v72)
   - Mobile menu toggle (robust)
   - Cookie banner
   - Footer year
*/

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav.nav");

  if (btn && nav) {
    // Ensure button is clickable
    btn.style.pointerEvents = "auto";

    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
      const isOpen = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    // Init
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-expanded", "false");

    // Click on button
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Close on link click
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMenu());
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("nav-open")) return;
      const inside = nav.contains(e.target) || btn.contains(e.target);
      if (!inside) closeMenu();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Cookie banner
  const KEY = "ag_cookie_consent";
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    const saved = localStorage.getItem(KEY);
    if (!saved) banner.hidden = false;

    document.getElementById("cookie-accept")?.addEventListener("click", () => {
      localStorage.setItem(KEY, "accepted");
      banner.hidden = true;
    });

    document.getElementById("cookie-reject")?.addEventListener("click", () => {
      localStorage.setItem(KEY, "rejected");
      banner.hidden = true;
    });

    window.agOpenCookieBanner = function () {
      localStorage.removeItem(KEY);
      banner.hidden = false;
      banner.scrollIntoView({ behavior: "smooth", block: "end" });
    };
  }
});
