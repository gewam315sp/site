// ====================================
// GRUPO ESCOTEIRO WELLINGTON A. MEDEIROS
// JavaScript Principal
// ====================================

// ===== MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu mobile
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');

      // Animação do ícone hamburger
      const spans = menuToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Fechar menu ao clicar em link
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 968) {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // ===== ACTIVE LINK NA NAVEGAÇÃO =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== SCROLL SUAVE PARA ÂNCORAS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
  });

  // ===== ANIMAÇÃO DE FADE IN AO SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .sobre-content, .ramo-destaque').forEach((el) => {
    observer.observe(el);
  });

  // ===== CAROUSEL DE IMAGENS =====
  const carouselContainer = document.querySelector('.carousel-container');

  if (carouselContainer) {
    const images = carouselContainer.querySelectorAll('.carousel-image');
    const indicators = carouselContainer.querySelectorAll('.indicator');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');

    let currentIndex = 0;
    let autoPlayInterval;

    function showImage(index) {
      images.forEach((img) => img.classList.remove('active'));
      indicators.forEach((ind) => ind.classList.remove('active'));

      images[index].classList.add('active');
      indicators[index].classList.add('active');
      currentIndex = index;
    }

    function nextImage() {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    }

    function prevImage() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(prevIndex);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(nextImage, 5000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevImage();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextImage();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showImage(index);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
  }

  // ===== FORMULÁRIO DE CONTATO =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validação básica
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !email || !mensagem) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
      }

      // Simular envio (você pode integrar com um serviço de email aqui)
      showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      contactForm.reset();

      // Aqui você pode adicionar integração com serviços como FormSpree, EmailJS, etc.
      // Exemplo: fetch('seu-endpoint', { method: 'POST', body: formData })
    });
  }

  // ===== LAZY LOADING DE IMAGENS =====
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// ===== FUNÇÕES AUXILIARES =====

// Validar email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Mostrar notificação
function showNotification(message, type = 'info') {
  // Remover notificação existente
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Criar nova notificação
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  // Estilos inline (você pode mover isso para o CSS)
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Botão de fechar
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  `;

  closeBtn.addEventListener('click', function () {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remover após 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Adicionar animações de notificação ao CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== ANO DINÂMICO NO RODAPÉ =====
document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// ===== GOOGLE ANALYTICS (Opcional) =====
// Descomente e adicione seu ID do Google Analytics
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'SEU-ID-DO-GOOGLE-ANALYTICS');
*/
