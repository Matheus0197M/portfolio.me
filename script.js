const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Alterna a classe 'light-theme' no body
    body.classList.toggle('light-theme');
    
    // Altera o texto do botão dependendo do tema atual
    if (body.classList.contains('light-theme')) {
        themeToggleBtn.innerText = '☀️';
    } else {
        themeToggleBtn.innerText = '🌙';
    }
});

const reveals = document.querySelectorAll(".reveal")
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add("show")
        }
    })
}, { threshold: 0.2 })
reveals.forEach((el) => observer.observe(el))