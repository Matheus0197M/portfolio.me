// 1. Lógica do Tema Claro / Escuro
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

themeBtn.addEventListener('click', () => {
    // Alterna a classe 'light-theme' no body
    body.classList.toggle('light-theme');
    
    // Altera o ícone do botão dependendo do tema ativo
    if (body.classList.contains('light-theme')) {
        themeBtn.textContent = '☀️';
    } else {
        themeBtn.textContent = '🌙';
    }
});

// 2. Lógica do Menu Mobile (Toggle)
const menuBtn = document.getElementById('menuToggle');
const nav = document.querySelector('header nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuBtn.textContent = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu automaticamente ao clicar em um link (bom para mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-label', 'Abrir menu');
            }
        });
    });
}

// 3. Lógica de Animação ao Rolar a Página (Scroll Reveal nativo)
// Seleciona todos os elementos que têm a classe .reveal
const reveals = document.querySelectorAll('.reveal');

// Cria um observador que dispara quando o elemento aparece na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Se o elemento entrou na área visível da tela (viewport)
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { 
    threshold: 0.1 // Dispara quando 10% do elemento estiver visível
});

// Pede para o observador vigiar cada elemento .reveal
reveals.forEach(reveal => {
    observer.observe(reveal);
});

// 4. CARD FLIP - RESPONSIVO (Desktop hover + Mobile click)
// Detecta se está em dispositivo touch/mobile
const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;

// Seleciona todos os cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    // EM MOBILE: Adiciona listener de click para flip
    card.addEventListener('click', (e) => {
        // Só executa em mobile
        if (isMobile()) {
            // Impede propagação se clicar em um link dentro do card
            if (e.target.tagName === 'A') return;
            
            card.classList.toggle('flipped');
            
            // Feedback visual: muda o cursor
            card.style.cursor = card.classList.contains('flipped') ? 'pointer' : 'pointer';
        }
    });
});

// Reindetecta tamanho ao redimensionar (melhora responsividade)
window.addEventListener('resize', () => {
    if (!isMobile()) {
        // Remove a classe 'flipped' ao voltar para desktop (hover funcionará)
        cards.forEach(card => card.classList.remove('flipped'));
    }
});