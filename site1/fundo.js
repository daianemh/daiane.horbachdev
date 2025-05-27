// Seleciona o canvas
const canvas = document.getElementById("fundo");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho para preencher a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array para armazenar as partículas
let particlesArray = [];

// Classe Partícula
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebater nas bordas
    if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
    if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "#f94d6a";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inicializa partículas
function init() {
  particlesArray = [];
  const total = 150;

  for (let i = 0; i < total; i++) {
    particlesArray.push(new Particle());
  }
}

// Anima as partículas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

// Ajusta ao redimensionar janela
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Inicialização
init();
animate();
