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
    const setMenuOpen = (open) => {
      hamburger.classList.toggle('active', open);
      navLinks.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };

    hamburger.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        setMenuOpen(false);
      }
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

  // ── MAPA INTERACTIVO ──────────────────────────────────────
  const mapContainer = document.getElementById('peruMap');
  if (mapContainer) {
    // Inicializar mapa centrado en Perú
    const map = L.map('peruMap').setView([-9.19, -75.0152], 5);

    // Capa base oscura
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Datos de ejemplo para Ingeniería de Sistemas (Brecha Digital)
    const sistemasData = [
    { name: 'Amazonas', lat: -6.2308, lng: -77.8691, vulnerability: 'critico', value: 78, desc: 'Extrema brecha, <25% acceso internet' },
    { name: 'Ancash', lat: -9.5320, lng: -77.5314, vulnerability: 'alto', value: 50, desc: 'Baja conectividad en zonas rurales, 50% acceso' },
    { name: 'Apurimac', lat: -13.6333, lng: -72.8833, vulnerability: 'critico', value: 75, desc: 'Muy alta brecha, <25% acceso internet' },
    { name: 'Arequipa', lat: -16.4097, lng: -71.5376, vulnerability: 'bajo', value: 25, desc: 'Alta conectividad, >75% acceso internet' },
    { name: 'Ayacucho', lat: -13.1611, lng: -74.2236, vulnerability: 'critico', value: 77, desc: 'Extrema brecha, <25% acceso internet' },
    { name: 'Cajamarca', lat: -7.1638, lng: -78.5003, vulnerability: 'critico', value: 76, desc: 'Muy alta brecha, <25% acceso internet' },
    { name: 'Callao', lat: -12.0621, lng: -77.1337, vulnerability: 'bajo', value: 10, desc: 'Alta conectividad, >85% acceso internet' },
    { name: 'Cusco', lat: -13.5319, lng: -71.9675, vulnerability: 'alto', value: 55, desc: 'Baja conectividad, 45% acceso a internet' },
    { name: 'Huancavelica', lat: -12.7833, lng: -74.9667, vulnerability: 'critico', value: 80, desc: 'Extrema brecha, <20% acceso internet' },
    { name: 'Huanuco', lat: -9.9312, lng: -76.2429, vulnerability: 'critico', value: 79, desc: 'Extrema brecha, <25% acceso internet' },
    { name: 'Ica', lat: -14.0678, lng: -75.7286, vulnerability: 'bajo', value: 20, desc: 'Alta conectividad, >75% acceso internet' },
    { name: 'Junin', lat: -12.0651, lng: -75.2049, vulnerability: 'medio', value: 45, desc: 'Conectividad moderada, 55% acceso a internet' },
    { name: 'La Libertad', lat: -7.9639, lng: -79.4386, vulnerability: 'medio', value: 40, desc: 'Conectividad moderada, 60% acceso a internet' },
    { name: 'Lambayeque', lat: -6.7727, lng: -79.8378, vulnerability: 'medio', value: 38, desc: 'Conectividad moderada, 62% acceso a internet' },
    { name: 'Lima', lat: -12.0464, lng: -77.0428, vulnerability: 'bajo', value: 15, desc: 'Alta conectividad, 85% acceso a internet' },
    { name: 'Loreto', lat: -3.7647, lng: -73.3037, vulnerability: 'critico', value: 80, desc: 'Extrema brecha digital, 20% acceso a internet' },
    { name: 'Madre de Dios', lat: -12.5933, lng: -69.1891, vulnerability: 'medio', value: 48, desc: 'Conectividad intermedia, 52% acceso a internet' },
    { name: 'Moquegua', lat: -17.1983, lng: -70.9357, vulnerability: 'bajo', value: 28, desc: 'Alta conectividad, 72% acceso a internet' },
    { name: 'Pasco', lat: -10.6728, lng: -76.2625, vulnerability: 'medio', value: 47, desc: 'Conectividad intermedia, 53% acceso a internet' },
    { name: 'Piura', lat: -5.1945, lng: -80.6328, vulnerability: 'alto', value: 60, desc: 'Baja conectividad rural, 40% acceso a internet' },
    { name: 'Puno', lat: -15.8402, lng: -70.0219, vulnerability: 'critico', value: 75, desc: 'Muy baja conectividad, 25% acceso a internet' },
    { name: 'San Martin', lat: -6.4848, lng: -76.3683, vulnerability: 'medio', value: 46, desc: 'Conectividad intermedia, 54% acceso a internet' },
    { name: 'Tacna', lat: -18.0146, lng: -70.2536, vulnerability: 'bajo', value: 22, desc: 'Alta conectividad, >75% acceso a internet' },
    { name: 'Tumbes', lat: -3.5670, lng: -80.4515, vulnerability: 'medio', value: 35, desc: 'Conectividad moderada, 65% acceso a internet' },
    { name: 'Ucayali', lat: -8.3791, lng: -74.5539, vulnerability: 'medio', value: 49, desc: 'Conectividad intermedia, 51% acceso a internet' }
];

    // Datos de ejemplo para Nutrición (Desnutrición)
    const nutricionData = [
      { name: 'Huancavelica', lat: -12.7833, lng: -74.9667, vulnerability: 'critico', value: 24.0, desc: 'Tasa desnutrición 24.0% (2024)' },
  { name: 'Amazonas', lat: -6.2308, lng: -77.8691, vulnerability: 'critico', value: 20.4, desc: 'Tasa desnutrición 20.4% (2024)' },
  { name: 'Cajamarca', lat: -7.1638, lng: -78.5003, vulnerability: 'critico', value: 20.4, desc: 'Tasa desnutrición 20.4% (2024)' },
  { name: 'Loreto', lat: -3.7647, lng: -73.3037, vulnerability: 'critico', value: 19.5, desc: 'Tasa desnutrición 19.5% (2024)' },
  { name: 'Ucayali', lat: -8.3791, lng: -74.5539, vulnerability: 'critico', value: 19.4, desc: 'Tasa desnutrición 19.4% (2024)' },
  
  // ALTO (15-20%)
  { name: 'Ayacucho', lat: -13.1611, lng: -74.2236, vulnerability: 'alto', value: 17.0, desc: 'Tasa desnutrición 17.0% (2024)' },
  { name: 'Junin', lat: -12.0651, lng: -75.2049, vulnerability: 'alto', value: 17.8, desc: 'Tasa desnutrición 17.8% (2024)' },
  { name: 'La Libertad', lat: -7.9639, lng: -79.4386, vulnerability: 'alto', value: 16.8, desc: 'Tasa desnutrición 16.8% (2024)' },
  { name: 'Huanuco', lat: -9.9312, lng: -76.2429, vulnerability: 'alto', value: 16.5, desc: 'Tasa desnutrición 16.5% (2024)' },
  
  // MEDIO (10-14.9%)
  { name: 'Ancash', lat: -9.5320, lng: -77.5314, vulnerability: 'medio', value: 13.5, desc: 'Tasa desnutrición 13.5% (2024)' },
  { name: 'Lambayeque', lat: -6.7727, lng: -79.8378, vulnerability: 'medio', value: 13.1, desc: 'Tasa desnutrición 13.1% (2024)' },
  { name: 'Cusco', lat: -13.5319, lng: -71.9675, vulnerability: 'medio', value: 12.1, desc: 'Tasa desnutrición 12.1% (2024)' },
  { name: 'Puno', lat: -15.8402, lng: -70.0219, vulnerability: 'medio', value: 11.5, desc: 'Tasa desnutrición 11.5% (2024)' },
  { name: 'Tumbes', lat: -3.5670, lng: -80.4515, vulnerability: 'medio', value: 10.4, desc: 'Tasa desnutrición 10.4% (2024)' },
  { name: 'San Martin', lat: -6.4848, lng: -76.3683, vulnerability: 'medio', value: 10.0, desc: 'Tasa desnutrición 10.0% (2024)' },
  { name: 'Pasco', lat: -10.6728, lng: -76.2625, vulnerability: 'medio', value: 14.1, desc: 'Tasa desnutrición 14.1% (2024)' },
  
  // BAJO (<10%)
  { name: 'Lima Metropolitana', lat: -12.0464, lng: -77.0428, vulnerability: 'bajo', value: 4.3, desc: 'Tasa desnutrición 4.3% (2024)' },
  { name: 'Arequipa', lat: -16.4097, lng: -71.5376, vulnerability: 'bajo', value: 5.6, desc: 'Tasa desnutrición 5.6% (2024)' },
  { name: 'Callao', lat: -12.0621, lng: -77.1337, vulnerability: 'bajo', value: 6.2, desc: 'Tasa desnutrición 6.2% (2024)' },
  { name: 'Ica', lat: -14.0678, lng: -75.7286, vulnerability: 'bajo', value: 7.6, desc: 'Tasa desnutrición 7.6% (2024)' },
  { name: 'Madre de Dios', lat: -12.5933, lng: -69.1891, vulnerability: 'bajo', value: 8.4, desc: 'Tasa desnutrición 8.4% (2024)' },
  { name: 'Apurimac', lat: -13.6333, lng: -72.8833, vulnerability: 'bajo', value: 15.7, desc: 'Tasa desnutrición 15.7% (2024)' },
  { name: 'Piura', lat: -5.1945, lng: -80.6328, vulnerability: 'bajo', value: 14.3, desc: 'Tasa desnutrición 14.3% (2024)' },
  { name: 'Moquegua', lat: -17.1983, lng: -70.9357, vulnerability: 'bajo', value: 2.7, desc: 'Tasa desnutrición 2.7% (2024)' },
  { name: 'Tacna', lat: -18.0146, lng: -70.2536, vulnerability: 'bajo', value: 2.9, desc: 'Tasa desnutrición 2.9% (2024)' }
];

    // Colores según vulnerabilidad
    const colors = {
      bajo: '#2ecc71',
      medio: '#f1c40f',
      alto: '#e74c3c',
      critico: '#8e44ad'
    };

    let currentMarkers = [];
    let currentCareer = 'sistemas';

    // Función para crear marcadores
    function createMarkers(data) {
      // Limpiar marcadores existentes
      currentMarkers.forEach(marker => map.removeLayer(marker));
      currentMarkers = [];

      data.forEach(item => {
        // Usar diferente tamaño según la carrera activa
        const radius = currentCareer === 'nutricion' ? item.value / 0.5 : item.value / 2;
        
        const marker = L.circleMarker([item.lat, item.lng], {
          radius: radius,
          fillColor: colors[item.vulnerability],
          color: colors[item.vulnerability],
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.5
        }).addTo(map);

        marker.on('click', () => {
          showRegionInfo(item);
        });

        marker.on('mouseover', () => {
          marker.setStyle({ fillOpacity: 0.8, weight: 3 });
        });

        marker.on('mouseout', () => {
          marker.setStyle({ fillOpacity: 0.5, weight: 2 });
        });

        currentMarkers.push(marker);
      });

      // Actualizar estadísticas
      updateStats(data);
    }

    // Función para mostrar información de región
    function showRegionInfo(item) {
      const panel = document.getElementById('mapInfoPanel');
      const regionName = document.getElementById('regionName');
      const infoContent = document.getElementById('infoPanelContent');

      regionName.textContent = item.name;
      infoContent.innerHTML = `
        <p><strong>Nivel de Vulnerabilidad:</strong> ${item.vulnerability.charAt(0).toUpperCase() + item.vulnerability.slice(1)}</p>
        <p><strong>Índice:</strong> ${item.value}%</p>
        <p><strong>Descripción:</strong> ${item.desc}</p>
      `;

      panel.classList.add('active');
    }

    // Función para actualizar estadísticas
    function updateStats(data) {
      const totalRegions = data.length;
      const highVulnerability = data.filter(d => d.vulnerability === 'alto' || d.vulnerability === 'critico').length;
      
      // Calcular índice promedio según la carrera activa
      let avgIndex;
      if (currentCareer === 'sistemas') {
        // Valor personalizado para Ingeniería de Sistemas
        avgIndex = 36.7; // Puedes ajustar este valor
      } else {
        // Valor personalizado para Nutrición
        avgIndex = 12.1; // Puedes ajustar este valor
      }

      document.getElementById('totalRegions').textContent = totalRegions;
      document.getElementById('highVulnerability').textContent = highVulnerability;
      document.getElementById('avgIndex').textContent = avgIndex + '%';
    }

    // Inicializar con datos de sistemas
    createMarkers(sistemasData);

    // Switch de carreras
    const switchBtns = document.querySelectorAll('.switch-btn');
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover clase active de todos
        switchBtns.forEach(b => b.classList.remove('active'));
        // Agregar clase active al clickeado
        btn.classList.add('active');

        const career = btn.dataset.career;
        currentCareer = career;

        // Cerrar panel de información
        document.getElementById('mapInfoPanel').classList.remove('active');

        // Cambiar datos según carrera
        if (career === 'sistemas') {
          createMarkers(sistemasData);
        } else {
          createMarkers(nutricionData);
        }
      });
    });

    // Cerrar panel de información
    const closePanel = document.getElementById('closePanel');
    if (closePanel) {
      closePanel.addEventListener('click', () => {
        document.getElementById('mapInfoPanel').classList.remove('active');
      });
    }
  }

  // ── YOUTUBE MODAL (vista panorámica) ─────────────────────
  const ytModal = document.getElementById('ytModal');
  const ytModalIframe = document.getElementById('ytModalIframe');
  const ytModalTitle = document.getElementById('ytModalTitle');

  const isValidYoutubeId = (id) => {
    return id && !id.includes('TU_VIDEO') && /^[\w-]{6,}$/.test(id);
  };

  const buildYoutubeEmbed = (id) => {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  };

  const openYoutubeModal = (id, title) => {
    if (!ytModal || !ytModalIframe) return;
    ytModalIframe.src = buildYoutubeEmbed(id);
    if (ytModalTitle) ytModalTitle.textContent = title || 'Video';
    ytModal.classList.add('is-open');
    ytModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeYoutubeModal = () => {
    if (!ytModal || !ytModalIframe) return;
    ytModal.classList.remove('is-open');
    ytModal.setAttribute('aria-hidden', 'true');
    ytModalIframe.src = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.yt-play-trigger').forEach((trigger) => {
    const id = trigger.dataset.youtubeId;
    const preview = trigger.closest('.yt-video-preview');
    const thumb = preview?.querySelector('.yt-preview-thumb');

    if (isValidYoutubeId(id)) {
      preview?.classList.add('is-ready');
      if (thumb) {
        thumb.hidden = false;
        thumb.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
        thumb.onerror = () => {
          thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        };
      }
    }

    trigger.addEventListener('click', () => {
      if (!isValidYoutubeId(id)) return;
      openYoutubeModal(id, trigger.dataset.youtubeTitle);
    });
  });

  ytModal?.querySelectorAll('[data-yt-close]').forEach((el) => {
    el.addEventListener('click', closeYoutubeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ytModal?.classList.contains('is-open')) {
      closeYoutubeModal();
    }
  });
});
