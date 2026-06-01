document.addEventListener("DOMContentLoaded", () => {
    
    // ========================================================
    // 1. GERENCIAMENTO DE ACESSIBILIDADE (FONTE E CONTRASTE)
    // ========================================================
    const btnIncrease = document.getElementById("btn-increase");
    const btnDecrease = document.getElementById("btn-decrease");
    const btnContrast = document.getElementById("btn-contrast");
    const htmlElement = document.documentElement;

    let currentFontSize = 16;

    btnIncrease.addEventListener("click", () => {
        let novaFonte = currentFontSize + 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            htmlElement.style.setProperty("--base-font", `${currentFontSize}px`);
        }
    });

    btnDecrease.addEventListener("click", () => {
        let novaFonte = currentFontSize - 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            htmlElement.style.setProperty("--base-font", `${currentFontSize}px`);
        }
    });

    btnContrast.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
    });

    // ========================================================
    // 2. COMPONENTE CARROSSEL (ARRAY DE OBJETOS)
    // ========================================================
    const testimonialsData = [
        {
            text: "O Mentes Plurais mudou completamente a dinâmica na minha sala de aula. Meu aluno com TDAH agora consegue focar e terminar as atividades no tempo certo.",
            author: "Profª. Carla Mendes - Fundamental I"
        },
        {
            text: "Pela primeira vez, meu filho autista se sente entusiasmado com os deveres de casa. A interface limpa tira toda a sobrecarga visual que o estressava.",
            author: "Mariana Rocha - Mãe do Lucas (9 anos)"
        },
        {
            text: "Criar planos de aula estruturados para dislexia costumava levar horas. Com os modelos prontos da plataforma, faço em minutos.",
            author: "Prof. Marcos Souza - Especialista em Inclusão"
        }
    ];

    const carouselContainer = document.getElementById("carousel-container");
    let currentSlide = 0;

    function renderTestimonials() {
        carouselContainer.innerHTML = testimonialsData.map((item, index) => `
            <div class="testimonial-item ${index === 0 ? 'active' : ''}" data-slide="${index}">
                <p class="testimonial-text">"${item.text}"</p>
                <p class="testimonial-author">${item.author}</p>
            </div>
        `).join('');
    }

    function showSlide(index) {
        const slides = document.querySelectorAll(".testimonial-item");
        slides.forEach(slide => slide.classList.remove("active"));
        
        currentSlide = (index + testimonialsData.length) % testimonialsData.length;
        slides[currentSlide].classList.add("active");
    }

    document.getElementById("next-testimonial").addEventListener("click", () => showSlide(currentSlide + 1));
    document.getElementById("prev-testimonial").addEventListener("click", () => showSlide(currentSlide - 1));

    // ========================================================
    // 3. COMPONENTE ACORDEÃO (ARRAY DE OBJETOS)
    // ========================================================
    const faqData = [
        {
            question: "Quais neurodivergências a plataforma atende?",
            answer: "Atendemos de forma customizada perfis de Autismo (TEA), TDAH, Dislexia, Discalculia e Processamento Auditivo Central (PAC). Cada perfil ativa regras específicas de design e fontes."
        },
        {
            question: "O professor pode usar suas próprias atividades?",
            answer: "Sim! O professor pode criar atividades do zero utilizando nosso editor simplificado que avisa se o layout está acessível, ou adaptar nosso banco de templates estruturados."
        },
        {
            question: "Como o aluno escolhe o formato da página?",
            answer: "Ao logar ou acessar o link da tarefa, o aluno clica em cartões visuais simples indicando sua preferência ou diagnóstico. O sistema reconfigura fontes (como a OpenDyslexic) e espaçamentos instantaneamente."
        }
    ];

    const accordionContainer = document.getElementById("accordion-container");

    function renderAccordion() {
        accordionContainer.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item" data-index="${index}">
                <button class="accordion-header" aria-expanded="false">
                    <span>${item.question}</span>
                    <span class="accordion-icon">▼</span>
                </button>
                <div class="accordion-content">
                    <p style="padding: 1rem 0;">${item.answer}</p>
                </div>
            </div>
        `).join('');

        setupAccordionListeners();
    }

    function setupAccordionListeners() {
        const headers = document.querySelectorAll(".accordion-header");
        
        headers.forEach(header => {
            header.addEventListener("click", function() {
                const item = this.parentElement;
                const content = this.nextElementSibling;
                const isOpen = item.classList.contains("open");

                // Fecha todos os outros itens antes de abrir o atual (comportamento exclusivo)
                document.querySelectorAll(".accordion-item").forEach(el => {
                    el.classList.remove("open");
                    el.querySelector(".accordion-content").style.maxHeight = null;
                    el.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
                });

                if (!isOpen) {
                    item.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px";
                    this.setAttribute("aria-expanded", "true");
                }
            });
        });
    }

    // Inicialização da Engine Visual de Alta Fidelidade
    renderTestimonials();
    renderAccordion();
});