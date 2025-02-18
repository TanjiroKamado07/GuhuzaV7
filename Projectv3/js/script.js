/*document.getElementById('mobile-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
  });*/
  document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuContent = document.getElementById("mobile-menu-content");

    if (mobileMenu && mobileMenuContent) {
        mobileMenu.addEventListener("click", function () {
            mobileMenuContent.classList.toggle("active");
        });
    }
});
