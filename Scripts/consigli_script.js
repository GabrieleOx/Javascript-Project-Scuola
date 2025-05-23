function revealTextOnScroll() {
  const fadeElements = document.querySelectorAll('.fade-text, .fade-title');
  const triggerBottom = window.innerHeight * 0.7;
  fadeElements.forEach(el => {
    if (el.getBoundingClientRect().top < triggerBottom) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealTextOnScroll);
window.addEventListener('load', revealTextOnScroll);

const canvasSole = document.getElementById('sun-cloud');
const canvasPioggia = document.getElementById('rain');
const ctx = canvasSole.getContext('2d');

// Sole e nuvola
const sun = { x: 300, y: 200, radius: 50, numRays: 10, rayLength: 40, rayDistance: 50, rayAngle: 0, raySpeed: 0.01 };
const cloud = { x: 300, y: 130, speed: 0.5, direction: -1 };

// Pioggia e nuvole
let ctxRain, cloudsRain, drops;
if (canvasPioggia) {
  ctxRain = canvasPioggia.getContext('2d');
  // La nuvola più grossa (prima) viene disegnata per ultima per essere in sovrapposizione
  cloudsRain = [
    { x: 270, y: 90, dx: -0.04, size: 1.0, min: 250, max: 320 },   // media
    { x: 330, y: 105, dx: 0.03, size: 0.95, min: 310, max: 370 },  // piccola
    { x: 200, y: 110, dx: 0.05, size: 1.1, min: 180, max: 240 }    // grande (disegnata per ultima)
  ];
  // Diminuisci la quantità di pioggia (meno gocce)
  drops = Array.from({ length: 24 }, () => ({
    x: 230 + Math.random() * 140, // solo tra 230 e 370 px
    y: Math.random() * canvasPioggia.height / 2 + 120,
    length: 15 + Math.random() * 10,
    speed: 3 + Math.random() * 2
  }));
}

function drawSun() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.shadowColor = "rgba(255, 165, 0, 0.7)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fill();
  ctx.restore();
}

function drawRays() {
  for (let i = 0; i < sun.numRays; i++) {
    const angle = sun.rayAngle + (i * (Math.PI * 2 / sun.numRays));
    const startX = sun.x + Math.cos(angle) * sun.radius;
    const startY = sun.y + Math.sin(angle) * sun.radius;
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(angle);
    ctx.fillStyle = "orange";
    ctx.shadowColor = "rgba(255, 165, 0, 0.5)";
    ctx.shadowBlur = 50;
    ctx.fillRect(0, -4, sun.rayLength, 8);
    ctx.restore();
  }
}

function drawCloud() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cloud.x, cloud.y, 40, 0, Math.PI * 2);
  ctx.arc(cloud.x + 40, cloud.y - 20, 50, 0, Math.PI * 2);
  ctx.arc(cloud.x + 80, cloud.y, 40, 0, Math.PI * 2);
  ctx.arc(cloud.x + 40, cloud.y + 20, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Nuvola della pioggia con la stessa forma della nuvola del sole
function drawCloudRain(cx, cy, scale = 1) {
  ctxRain.save();
  ctxRain.translate(cx, cy);
  ctxRain.scale(scale, scale);
  ctxRain.beginPath();
  ctxRain.arc(0, 0, 40, 0, Math.PI * 2); // centro sinistra
  ctxRain.arc(40, -20, 50, 0, Math.PI * 2); // sopra centro
  ctxRain.arc(80, 0, 40, 0, Math.PI * 2); // centro destra
  ctxRain.arc(40, 20, 45, 0, Math.PI * 2); // sotto centro
  ctxRain.fillStyle = "#e0e7ef";
  ctxRain.globalAlpha = 0.97;
  ctxRain.shadowColor = "#b0b8c6";
  ctxRain.shadowBlur = 18;
  ctxRain.fill();
  ctxRain.globalAlpha = 1;
  ctxRain.shadowBlur = 0;
  ctxRain.restore();
}

function drawRain() {
  ctxRain.strokeStyle = "#8ec6f7"; // colore più chiaro
  ctxRain.lineWidth = 2;
  for (let drop of drops) {
    ctxRain.beginPath();
    ctxRain.moveTo(drop.x, drop.y);
    ctxRain.lineTo(drop.x, drop.y + drop.length);
    ctxRain.stroke();
  }
}

function animate() {
  // Sole e nuvola
  ctx.clearRect(0, 0, canvasSole.width, canvasSole.height);
  drawSun();
  drawRays();
  drawCloud();
  sun.rayAngle += sun.raySpeed;
  cloud.x += cloud.speed * cloud.direction;
  if (cloud.x <= 250 || cloud.x >= 350) cloud.direction *= -1;

  // Pioggia e nuvole
  if (canvasPioggia && ctxRain) {
    ctxRain.clearRect(0, 0, canvasPioggia.width, canvasPioggia.height);
    // Disegna le nuvole: la più grossa è l'ultima per essere sopra
    for (let c of cloudsRain) {
      drawCloudRain(c.x, c.y, c.size);
      c.x += c.dx;
      // Movimento limitato tra min e max
      if (c.x < c.min || c.x > c.max) c.dx *= -1;
    }
    for (let drop of drops) {
      drop.y += drop.speed;
      if (drop.y > canvasPioggia.height) {
        drop.y = 140 + Math.random() * 60;
        drop.x = 230 + Math.random() * 140; // restringi la fascia anche qui
      }
    }
    drawRain();
  }
  requestAnimationFrame(animate);
}

window.onload = animate;