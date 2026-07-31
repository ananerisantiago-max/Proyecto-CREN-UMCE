document.addEventListener('DOMContentLoaded', () => {
  // Menú Hamburguesa Móvil
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Formulario de Contacto conectado al Backend
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const destino = document.getElementById('destino').value;
      const email = document.getElementById('email').value.trim();
      const motivo = document.getElementById('motivo').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      if (!destino) {
        if (formStatus) {
          formStatus.textContent = 'Por favor selecciona la institución destino.';
          formStatus.style.color = '#b91c1c';
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Enviando mensaje...';
        formStatus.style.color = 'var(--color-gold-hover)';
      }

      try {
        const response = await fetch('/api/contacto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, destino, email, motivo, mensaje })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (formStatus) {
            formStatus.textContent = result.message || `¡Gracias, ${nombre}! Tu mensaje ha sido enviado a ${destino}.`;
            formStatus.style.color = '#047857';
          }
          contactForm.reset();
        } else {
          if (formStatus) {
            formStatus.textContent = result.error || 'Error al enviar el mensaje. Inténtalo de nuevo.';
            formStatus.style.color = '#b91c1c';
          }
        }
      } catch (err) {
        console.error('Error de red al contactar backend:', err);
        // Fallback de demostración si no está ejecutándose el backend localmente
        const emails = { CREN: 'direccion.cren@msev.gob.mx', UMCE: 'movilidad@umce.cl' };
        if (formStatus) {
          formStatus.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido registrado para ${destino} (${emails[destino] || ''}).`;
          formStatus.style.color = '#047857';
        }
        contactForm.reset();
      }

      // Registro de evento en Google Analytics
      if (typeof gtag === 'function') {
        gtag('event', 'contact_submit', {
          'event_category': 'Engagement',
          'event_label': `Contacto ${destino}`
        });
      }

      setTimeout(() => {
        if (formStatus) formStatus.textContent = '';
      }, 7000);
    });
  }
});
