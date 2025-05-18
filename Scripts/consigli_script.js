function revealTextOnScroll() {
  const fadeElements = document.querySelectorAll('.fade-text, .fade-title');
  const triggerBottom = window.innerHeight * 0.7; // Ridotto per attivare più in basso

  fadeElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealTextOnScroll);
window.addEventListener('load', revealTextOnScroll);

// Codice per disegnare il sole con raggi animati e ombre
const canvas = document.getElementById('sunCanvas');
const ctx = canvas.getContext('2d');

// Proprietà del sole
const sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 40,            // Sole più piccolo
  numRays: 10,
  rayLength: 20,
  rayDistance: 50,
  rayAngle: 0,
  raySpeed: 0.01
};

// Funzione per disegnare il sole
function drawSun() {
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  // Aggiunta ombra al sole
  ctx.shadowColor = "rgba(255, 165, 0, 0.7)";
  ctx.shadowBlur = 30; // Ombra più intensa
  ctx.shadowOffsetX = 10; // Distanza maggiore
  ctx.shadowOffsetY = 10; // Distanza maggiore
  ctx.fill();
  ctx.closePath();
}

// Funzione per disegnare i raggi come rettangoli
function drawRays() {
  for (let i = 0; i < sun.numRays; i++) {
    const angle = sun.rayAngle + (i * (Math.PI * 2 / sun.numRays));
    const startX = sun.x + Math.cos(angle) * sun.radius; // Posizione di inizio raggi
    const startY = sun.y + Math.sin(angle) * sun.radius; // Posizione di inizio raggi
    const endX = sun.x + Math.cos(angle) * (sun.radius + sun.rayDistance); // Posizione finale dei raggi
    const endY = sun.y + Math.sin(angle) * (sun.radius + sun.rayDistance); // Posizione finale dei raggi

    // Disegna ogni raggio come rettangolo
    const rayWidth = 8; // Larghezza maggiore
    const rayHeight = sun.rayLength; // Altezza maggiore

    // Aggiungi ombra ai raggi
    ctx.shadowColor = "rgba(255, 165, 0, 0.5)";
    ctx.shadowBlur = 50; // Ombra più sfocata
    ctx.shadowOffsetX = 8; // Distanza dell'ombra maggiore
    ctx.shadowOffsetY = 8; // Distanza dell'ombra maggiore

    // Ruota il rettangolo per allinearlo correttamente
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(angle);

    ctx.fillStyle = "orange"; // Colore dei raggi
    ctx.fillRect(0, -rayWidth / 2, rayHeight, rayWidth); // Posiziona e disegna il rettangolo
    ctx.restore();
  }
}

// Funzione per animare la scena
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas ad ogni frame
  drawSun(); // Disegna il sole
  drawRays(); // Disegna i raggi
  sun.rayAngle += sun.raySpeed; // Ruota i raggi attorno al sole
  requestAnimationFrame(animate); // Richiama il frame successivo
}

animate(); // Inizia l'animazione del sole