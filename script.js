// ===================================
// ER Solutions - Chimney Services JS
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  initSmoothScroll();
  initHeaderScroll();
  initActiveNavigation();
  initHeroSlider();
  initFadeInAnimations();
  initCounterAnimation();
});

// ===================================
// SMOOTH SCROLLING
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===================================
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===================================
// HERO SLIDER
// ===================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let slideInterval;

function initHeroSlider() {
  // Start auto-play
  startAutoPlay();
  
  // Pause on hover
  const slider = document.querySelector('.hero-slider');
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
}

function showSlide(n) {
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Handle wrap-around
  currentSlide = (n + totalSlides) % totalSlides;
  
  // Add active class to current slide and dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
  resetAutoPlay();
}

function goToSlide(n) {
  showSlide(n);
  resetAutoPlay();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function startAutoPlay() {
  slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

function stopAutoPlay() {
  clearInterval(slideInterval);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// ===================================
// FADE-IN ANIMATION ON SCROLL
// ===================================
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease-out';
    fadeObserver.observe(element);
  });
}

// ===================================
// COUNTER ANIMATION
// ===================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  if (counters.length > 0) {
    counterObserver.observe(document.querySelector('.stats-section'));
  }

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (target === 100 ? '%' : '+');
        }
      };

      updateCounter();
    });
  }
}

// ===================================
// KEYBOARD NAVIGATION FOR SLIDER
// ===================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  }
});

// ===================================
// TOUCH SUPPORT FOR MOBILE SLIDER
// ===================================
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.hero-slider');

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - next slide
      changeSlide(1);
    } else {
      // Swiped right - previous slide
      changeSlide(-1);
    }
  }
}

// ===================================
// FORM VALIDATION (if contact form added)
// ===================================
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
}

// ===================================
// LOADING OPTIMIZATION
// ===================================
// Lazy load images when they come into view
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// lazyLoadImages();

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c ER Solutions - Chimney Services ', 'background: #1e3a8a; color: white; font-size: 20px; padding: 10px;');
console.log('%c Website Loaded Successfully! ', 'background: #0ea5e9; color: white; font-size: 14px; padding: 5px;');