// Search Function
document.getElementById('search-btn')?.addEventListener('click', function () {
  const query = document.getElementById('search-input').value.toLowerCase();
  if (!query) {
    alert('Please type something to search.');
    return;
  }
  if (query.includes('service')) location.href = 'services.html';
  else if (query.includes('about')) location.href = 'about.html';
  else if (query.includes('contact')) location.href = 'contact.html';
  else alert('No results found for "' + query + '".');
});

// Sticky Navbar Color Change
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Fade-in Animations
const fadeElems = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  fadeElems.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) el.style.animation = 'fadeInUp 1s forwards';
  });
});

// Contact form
document.querySelector('.contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for contacting ER Solutions! We’ll get back to you shortly.');
  e.target.reset();
});


// Image Slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
  slides.forEach(slide => slide.classList.remove('active'));
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].classList.add('active');
  setTimeout(showSlides, 4000); // Change every 4 seconds
}

if (slides.length > 0) showSlides();

// Simple search bar (optional)
document.getElementById('search-btn')?.addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    alert(`Searching for "${query}"...`);
  }
});


