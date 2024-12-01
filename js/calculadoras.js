// Seleccionar elementos
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Agregar evento de clic
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active'); // Alterna la clase 'active' en el sidebar
});
