const canvas = document.getElementById("fundo");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho do canvas para o tamanho da janela e escala para retina
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(dpr, dpr);
}

resizeCanvas();

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Inverte a direção ao atingir as bordas da janela
    if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "#FA8072";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  const numParticles = 150;
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  // Limpa o canvas inteiro
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Atualiza e desenha cada partícula
  for (let particle of particlesArray) {
    particle.update();
    particle.draw();
  }

  requestAnimationFrame(animate);
}

// Reajusta o canvas e reinicia as partículas ao redimensionar a janela
window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});

// Inicializa e começa a animação
init();
animate();

