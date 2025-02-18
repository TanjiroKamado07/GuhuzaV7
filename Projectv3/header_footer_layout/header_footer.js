document.getElementById('mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
  });