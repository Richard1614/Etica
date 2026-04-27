// ============================================================
// BRÚJULA ÉTICA — script.js
// Portafolio Digital 2026-I
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ── LOADER ───────────────────────────────────────────────
  const loader = document.getElementById('loader');
  
  // Ocultar loader después de cargar
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1500);
  });

  // ── NAVBAR SCROLL ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── HAMBURGER MENU ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── SHARE BUTTON ──────────────────────────────────────────
  const shareBtn = document.getElementById('shareBtn');
  
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: document.title,
            url: window.location.href
          });
        } else {
          // Fallback: copiar al portapapeles
          await navigator.clipboard.writeText(window.location.href);
          const originalText = shareBtn.querySelector('span').textContent;
          shareBtn.querySelector('span').textContent = '¡Copiado!';
          setTimeout(() => {
            shareBtn.querySelector('span').textContent = originalText;
          }, 2000);
        }
      } catch (err) {
        console.log('Error al compartir:', err);
      }
    });
  }

  // ── SMOOTH SCROLL PARA ANCLAS ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
