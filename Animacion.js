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
      { name: 'Lima', lat: -12.0464, lng: -77.0428, vulnerability: 'bajo', value: 15, desc: 'Alta conectividad, 85% acceso a internet' },
      { name: 'Arequipa', lat: -16.4097, lng: -71.5376, vulnerability: 'medio', value: 35, desc: 'Conectividad moderada, 65% acceso a internet' },
      { name: 'Cusco', lat: -13.5319, lng: -71.9675, vulnerability: 'alto', value: 55, desc: 'Baja conectividad, 45% acceso a internet' },
      { name: 'Puno', lat: -15.8402, lng: -70.0219, vulnerability: 'critico', value: 75, desc: 'Muy baja conectividad, 25% acceso a internet' },
      { name: 'Loreto', lat: -3.7647, lng: -73.3037, vulnerability: 'critico', value: 80, desc: 'Extrema brecha digital, 20% acceso a internet' },
      { name: 'Piura', lat: -5.1945, lng: -80.6328, vulnerability: 'alto', value: 60, desc: 'Baja conectividad rural, 40% acceso a internet' },
      { name: 'La Libertad', lat: -7.9639, lng: -79.4386, vulnerability: 'medio', value: 40, desc: 'Conectividad moderada, 60% acceso a internet' },
      { name: 'Ancash', lat: -9.532, lng: -77.5314, vulnerability: 'alto', value: 50, desc: 'Baja conectividad en zonas rurales, 50% acceso' }
    ];

    // Datos de ejemplo para Nutrición (Desnutrición)
    const nutricionData = [
      { name: 'Lima', lat: -12.0464, lng: -77.0428, vulnerability: 'bajo', value: 10, desc: 'Baja desnutrición infantil, 5% casos' },
      { name: 'Arequipa', lat: -16.4097, lng: -71.5376, vulnerability: 'medio', value: 25, desc: 'Desnutrición moderada, 15% casos' },
      { name: 'Cusco', lat: -13.5319, lng: -71.9675, vulnerability: 'alto', value: 45, desc: 'Alta desnutrición infantil, 30% casos' },
      { name: 'Puno', lat: -15.8402, lng: -70.0219, vulnerability: 'critico', value: 65, desc: 'Desnutrición severa, 45% casos' },
      { name: 'Loreto', lat: -3.7647, lng: -73.3037, vulnerability: 'critico', value: 70, desc: 'Desnutrición extrema, 50% casos' },
      { name: 'Piura', lat: -5.1945, lng: -80.6328, vulnerability: 'alto', value: 50, desc: 'Alta desnutrición rural, 35% casos' },
      { name: 'La Libertad', lat: -7.9639, lng: -79.4386, vulnerability: 'medio', value: 30, desc: 'Desnutrición moderada, 20% casos' },
      { name: 'Ancash', lat: -9.532, lng: -77.5314, vulnerability: 'alto', value: 40, desc: 'Alta desnutrición en sierra, 28% casos' }
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
        const marker = L.circleMarker([item.lat, item.lng], {
          radius: item.value / 5,
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
      const avgIndex = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length);

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
});
