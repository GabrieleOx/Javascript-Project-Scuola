// Mostra il testo con effetto fade quando si scrolla
function revealTextOnScroll() {
  const elements = document.querySelectorAll('.fade-text, .fade-title');
  const trigger = window.innerHeight * 0.7;
  elements.forEach(function(element) {
    if (element.getBoundingClientRect().top < trigger) {
      element.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealTextOnScroll);
window.addEventListener('load', revealTextOnScroll);

// Prendi i canvas dal documento
const canvasSole = document.getElementById('sun-cloud');
const canvasPioggia = document.getElementById('rain');
let ctx = null;
if (canvasSole) {
  // Aumenta l'altezza del canvas del sole
  canvasSole.height = 500; // era 400
  ctx = canvasSole.getContext('2d');
}
let ctxRain = null;
if (canvasPioggia) {
  // Sposta a destra il canvas delle nuvole (pioggia)
  canvasPioggia.style.marginLeft = "80px";
  // Aumenta la dimensione del canvas se vuoi anche qui (opzionale)
  // canvasPioggia.width = 700;
  ctxRain = canvasPioggia.getContext('2d');
}

// Dati per il sole
let sun = {
  x: 300,
  y: 200,
  radius: 50,
  numRays: 10,
  rayLength: 20,
  rayAngle: 0,
  raySpeed: 0.003
};

// Dati per la nuvola vicino al sole
let cloud = {
  x: 300,
  y: 130,
  speed: 0.05, // più lenta
  direction: -1
};

// Dati per le nuvole e la pioggia
let cloudsRain = [];
let drops = [];
if (canvasPioggia) {
  cloudsRain = [
    { x: 200, y: 110, dx: -0.01, size: 1.2, min: 180, max: 240 },   // y aumentato di 20
    { x: 320, y: 110, dx: -0.04, size: 1.5, min: 300, max: 370 },   // y aumentato di 20
    { x: 400, y: 125, dx: 0.03, size: 1.4, min: 380, max: 440 },    // y aumentato di 20
    { x: 480, y: 100, dx: 0.02, size: 1.1, min: 470, max: 520 },    // y aumentato di 20
    { x: 260, y: 130, dx: 0.05, size: 1.3, min: 240, max: 300 }     // y aumentato di 20
  ];
  drops = [];
  for (let i = 0; i < 14; i++) { // meno pioggia (prima era 24)
    drops.push({
      x: 180 + Math.random() * 220, // restringi la larghezza da destra (prima era 340)
      y: 180 + Math.random() * (canvasPioggia.height / 2 - 60),
      length: 15 + Math.random() * 10,
      speed: 3 + Math.random() * 2
    });
  }
}

// Disegna il sole
function drawSun() {
  if (!ctx) return;
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

// Disegna i raggi del sole
function drawRays() {
  if (!ctx) return;
  for (let i = 0; i < sun.numRays; i++) {
    let angle = sun.rayAngle + (i * (Math.PI * 2 / sun.numRays));
    let startX = sun.x + Math.cos(angle) * (sun.radius + 16);
    let startY = sun.y + Math.sin(angle) * (sun.radius + 16);
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

// Disegna la nuvola vicino al sole
function drawCloud() {
  if (!ctx) return;
  ctx.save();
  ctx.shadowColor = "rgba(255, 229, 80, 0.62)";
  ctx.shadowBlur = 40;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cloud.x, cloud.y, 40, 0, Math.PI * 2);
  ctx.arc(cloud.x + 40, cloud.y - 20, 50, 0, Math.PI * 2);
  ctx.arc(cloud.x + 80, cloud.y, 40, 0, Math.PI * 2);
  ctx.arc(cloud.x + 40, cloud.y + 20, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Disegna una nuvola per la pioggia
function drawCloudRain(cx, cy, scale) {
  if (!ctxRain) return;
  ctxRain.save();
  ctxRain.translate(cx, cy);
  ctxRain.scale(scale, scale);
  ctxRain.beginPath();
  ctxRain.arc(0, 0, 40, 0, Math.PI * 2);
  ctxRain.arc(40, -20, 50, 0, Math.PI * 2);
  ctxRain.arc(80, 0, 40, 0, Math.PI * 2);
  ctxRain.arc(40, 20, 45, 0, Math.PI * 2);
  ctxRain.fillStyle = "#e0e7ef";
  ctxRain.globalAlpha = 0.97;
  ctxRain.shadowColor = "#b0b8c6";
  ctxRain.shadowBlur = 18;
  ctxRain.fill();
  ctxRain.globalAlpha = 1;
  ctxRain.shadowBlur = 0;
  ctxRain.restore();
}

// Disegna la pioggia
function drawRain() {
  if (!ctxRain) return;
  ctxRain.strokeStyle = "#8ec6f7";
  ctxRain.lineWidth = 2;
  for (let i = 0; i < drops.length; i++) {
    let drop = drops[i];
    ctxRain.beginPath();
    ctxRain.moveTo(drop.x, drop.y);
    ctxRain.lineTo(drop.x, drop.y + drop.length);
    ctxRain.stroke();
  }
}

// Disegna il terreno sotto il sole
function drawGroundSun() {
  if (!ctx || !canvasSole) return;
  ctx.save();
  ctx.fillStyle = "#6e5b36"; // più scuro
  ctx.beginPath();
  // Arco più piccolo
  ctx.moveTo(100, canvasSole.height - 20);
  ctx.quadraticCurveTo(
    canvasSole.width / 2,
    canvasSole.height - 55, // più alto = più piccolo
    canvasSole.width - 100,
    canvasSole.height - 20
  );
  ctx.lineTo(canvasSole.width - 100, canvasSole.height);
  ctx.lineTo(100, canvasSole.height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Disegna il terreno sotto la pioggia
function drawGroundRain() {
  if (!ctxRain || !canvasPioggia) return;
  ctxRain.save();
  ctxRain.fillStyle = "#4d4025"; // più scuro
  ctxRain.beginPath();
  // Arco più piccolo
  ctxRain.moveTo(90, canvasPioggia.height - 25);
  ctxRain.quadraticCurveTo(
    canvasPioggia.width / 2,
    canvasPioggia.height - 65, // più alto = più piccolo
    canvasPioggia.width - 90,
    canvasPioggia.height - 25
  );
  ctxRain.lineTo(canvasPioggia.width - 90, canvasPioggia.height);
  ctxRain.lineTo(90, canvasPioggia.height);
  ctxRain.closePath();
  ctxRain.fill();
  ctxRain.restore();
}

// Disegna un vaso con germoglio sotto il sole
function drawPotAndSproutSun() {
  if (!ctx || !canvasSole) return;
  ctx.save();
  // Germoglio (stelo) - PRIMA del vaso, dimensioni ridotte
  ctx.beginPath();
  ctx.strokeStyle = "#3b7d2c";
  ctx.lineWidth = 5; // meno spesso
  ctx.moveTo(300, canvasSole.height - 90 + 30); // meno in basso
  ctx.bezierCurveTo(
    305, canvasSole.height - 105 + 30,
    295, canvasSole.height - 145 + 30,
    300, canvasSole.height - 180 + 30
  );
  ctx.stroke();
  // Foglioline: sinistra più piccola, destra più grande
  ctx.fillStyle = "#4fc14f";
  ctx.beginPath();
  ctx.ellipse(292, canvasSole.height - 155 + 30, 10, 4, -0.5, 0, Math.PI * 2); // sinistra
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(308, canvasSole.height - 160 + 30, 15, 7, 0.5, 0, Math.PI * 2); // destra più grande
  ctx.fill();
  // Vaso più piccolo
  ctx.fillStyle = "#b97a56";
  ctx.strokeStyle = "#a05a2c";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(275, canvasSole.height - 60 + 30); // bordo alto sinistro
  ctx.lineTo(325, canvasSole.height - 60 + 30); // bordo alto destro
  ctx.lineTo(315, canvasSole.height - 20 + 30); // bordo basso destro
  ctx.lineTo(285, canvasSole.height - 20 + 30); // bordo basso sinistro
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Bordo superiore (ellisse di profilo) più piccolo
  ctx.beginPath();
  ctx.ellipse(300, canvasSole.height - 60 + 30, 22, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#d2a074";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

// Disegna un vaso con germoglio sotto la pioggia
function drawPotAndSproutRain() {
  if (!ctxRain || !canvasPioggia) return;
  ctxRain.save();
  // Germoglio (stelo) - PRIMA del vaso, dimensioni ridotte
  ctxRain.beginPath();
  ctxRain.strokeStyle = "#2e6b23";
  ctxRain.lineWidth = 5;
  ctxRain.moveTo(300, canvasPioggia.height - 100 + 30);
  ctxRain.bezierCurveTo(
    305, canvasPioggia.height - 130 + 30,
    295, canvasPioggia.height - 170 + 30,
    300, canvasPioggia.height - 210 + 30
  );
  ctxRain.stroke();
  // Foglioline: sinistra più piccola, destra più grande
  ctxRain.fillStyle = "#3fa13f";
  ctxRain.beginPath();
  ctxRain.ellipse(292, canvasPioggia.height - 185 + 30, 10, 4, -0.5, 0, Math.PI * 2); // sinistra
  ctxRain.fill();
  ctxRain.beginPath();
  ctxRain.ellipse(308, canvasPioggia.height - 190 + 30, 15, 7, 0.5, 0, Math.PI * 2); // destra più grande
  ctxRain.fill();
  // Vaso più piccolo
  ctxRain.fillStyle = "#a86b32";
  ctxRain.strokeStyle = "#7a4a1c";
  ctxRain.lineWidth = 4;
  ctxRain.beginPath();
  ctxRain.moveTo(275, canvasPioggia.height - 90 + 30); // bordo alto sinistro
  ctxRain.lineTo(325, canvasPioggia.height - 90 + 30); // bordo alto destro
  ctxRain.lineTo(315, canvasPioggia.height - 30 + 30); // bordo basso destro
  ctxRain.lineTo(285, canvasPioggia.height - 30 + 30); // bordo basso sinistro
  ctxRain.closePath();
  ctxRain.fill();
  ctxRain.stroke();
  // Bordo superiore (ellisse di profilo) più piccolo
  ctxRain.beginPath();
  ctxRain.ellipse(300, canvasPioggia.height - 90 + 30, 22, 8, 0, 0, Math.PI * 2);
  ctxRain.fillStyle = "#c4905a";
  ctxRain.fill();
  ctxRain.stroke();
  ctxRain.restore();
}

// Animazione continua
function animate() {
  // Sole e nuvola
  if (ctx && canvasSole) {
    ctx.clearRect(0, 0, canvasSole.width, canvasSole.height);
    drawPotAndSproutSun(); // vaso con germoglio sotto il sole
    drawSun();
    drawRays();
    drawCloud();
    sun.rayAngle += sun.raySpeed;
    cloud.x += cloud.speed * cloud.direction;
    if (cloud.x <= 275 || cloud.x >= 325) {
      cloud.direction *= -1;
    }
  }

  // Pioggia e nuvole
  if (canvasPioggia && ctxRain) {
    ctxRain.clearRect(0, 0, canvasPioggia.width, canvasPioggia.height);
    drawPotAndSproutRain(); // vaso con germoglio sotto la pioggia
    for (let i = 0; i < cloudsRain.length; i++) {
      let c = cloudsRain[i];
      drawCloudRain(c.x, c.y, c.size);
      c.x += c.dx;
      if (c.x < c.min || c.x > c.max) {
        c.dx *= -1;
      }
    }
    for (let i = 0; i < drops.length; i++) {
      let drop = drops[i];
      drop.y += drop.speed;
      if (drop.y > canvasPioggia.height) {
        drop.y = 180 + Math.random() * (canvasPioggia.height / 2 - 60);
        drop.x = 180 + Math.random() * 220;
      }
    }
    drawRain();
  }
  requestAnimationFrame(animate);
}

window.onload = animate;