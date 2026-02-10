//Navbar
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

//Ativo no Navbar

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
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

// função que aplica o filtro
function filtrarProjetos(categoria) {
  projetos.forEach(projeto => {
    if (projeto.classList.contains(categoria)) {
      projeto.style.display = "block";
    } else {
      projeto.style.display = "none";
    }
  });
}

// clique nos botões
filtros.forEach(botao => {
  botao.addEventListener("click", () => {

    filtros.forEach(btn => btn.classList.remove("ativo"));
    botao.classList.add("ativo");

    const categoria = botao.getAttribute("data-filter");
    filtrarProjetos(categoria);

  });
});

// filtro inicial ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  filtrarProjetos("comercial");
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
const speed = 0.35;

// largura fixa (já definida no CSS)
const itemWidth = 220;

// hover pausa
track.addEventListener('mouseenter', () => isPaused = true);
track.addEventListener('mouseleave', () => isPaused = false);

function animate() {
  if (!isPaused) {
    position -= speed;

    if (Math.abs(position) >= itemWidth) {
      track.appendChild(track.firstElementChild);
      position += itemWidth;
    }

    track.style.transform = `translate3d(${position}px, 0, 0)`;
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




