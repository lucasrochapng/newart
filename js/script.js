//Navbar
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});


//Eu sou
const texts = [
    "Illustration",
    "Illustration",
    "Illustration"
];

const typingElement = document.getElementById("typing");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 120;   // velocidade digitando
const deletingSpeed = 80;  // velocidade apagando
const delayBetween = 1500; // pausa antes de apagar

function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, delayBetween);
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(
        typeEffect,
        isDeleting ? deletingSpeed : typingSpeed
    );
}

typeEffect();

// PROJETOS

const filtros = document.querySelectorAll(".filtro");
const projetos = document.querySelectorAll(".projeto-item");

filtros.forEach(botao => {
    botao.addEventListener("click", () => {

        filtros.forEach(btn => btn.classList.remove("ativo"));
        botao.classList.add("ativo");

        const categoria = botao.getAttribute("data-filter");

        projetos.forEach(projeto => {
            if (categoria === "all" || projeto.classList.contains(categoria)) {
                projeto.style.display = "block";
            } else {
                projeto.style.display = "none";
            }
        });

    });
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // anima só uma vez
            }
        });
    },
    {
        threshold: 0.2
    }
);

reveals.forEach(el => observer.observe(el));

if (window.innerWidth > 768) {
    // parallax aqui
}

// CARROSSEL DE IMAGENS
const track = document.getElementById('carouselTrack');
let isPaused = false;
let position = 0;
const speed = 0.5; // velocidade do movimento

// Pausa no hover
track.addEventListener('mouseenter', () => {
  isPaused = true;
});

track.addEventListener('mouseleave', () => {
  isPaused = false;
});

function animate() {
  if (!isPaused) {
    position -= speed;
    track.style.transform = `translateX(${position}px)`;

    const firstItem = track.children[0];
    const firstItemWidth = firstItem.offsetWidth;

    // Se o primeiro item saiu totalmente da tela
    if (Math.abs(position) >= firstItemWidth) {
      track.appendChild(firstItem);
      position += firstItemWidth;
    }
  }

  requestAnimationFrame(animate);
}

animate();

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

// Abrir modal ao clicar na imagem
document.querySelectorAll('.tech-carousel-item img').forEach(img => {
  img.addEventListener('click', () => {
    modalImage.src = img.src;
    modal.classList.add('active');
    isPaused = true; // pausa o carrossel
  });
});

// Fechar pelo botão X
modalClose.addEventListener('click', closeModal);

// Fechar clicando fora da imagem
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('active');
  modalImage.src = '';
  isPaused = false; // retoma o carrossel
}
