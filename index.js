window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.header');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const boxContainer = document.querySelector('.box');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        boxContainer.style.display = navMenu.classList.contains('active') ? 'none' : 'flex';
    });
})


