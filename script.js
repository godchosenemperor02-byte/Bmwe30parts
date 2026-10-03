const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Open full-screen mobile menu
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling when menu is open
});

// Close full-screen mobile menu
const closeMenu = () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = 'auto'; // Restore scrolling
};

closeBtn.addEventListener('click', closeMenu);

// Close menu when clicking any menu link
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
