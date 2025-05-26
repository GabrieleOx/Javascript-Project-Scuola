// Fade-in effect for text on scroll
function mostraTestoConFadeScroll() {
  const elementi = document.querySelectorAll('.fade-text, .fade-title');
  const soglia = window.innerHeight * 0.7;
  elementi.forEach(el => {
    if (el.getBoundingClientRect().top < soglia) el.classList.add('visible');
  });
}
window.addEventListener('scroll', mostraTestoConFadeScroll);
window.addEventListener('load', mostraTestoConFadeScroll);

// Canvas setup
const canvasSole = document.getElementById('sun-cloud');
const canvasPioggia = document.getElementById('rain');
const canvasTermometro = document.getElementById('thermo');
let ctx = canvasSole ? canvasSole.getContext('2d') : null;
let ctxPioggia = canvasPioggia ? canvasPioggia.getContext('2d') : null;
let ctxTermometro = canvasTermometro ? canvasTermometro.getContext('2d') : null;

// Termometro animation state
let termometro = { min: 0, max: 100, valore: 60, direzione: 1 };

function disegnaTermometro() {
  if (!ctxTermometro || !canvasTermometro) return;
  ctxTermometro.clearRect(0, 0, canvasTermometro.width, canvasTermometro.height);
  const cx = canvasTermometro.width / 2, topY = 40, bottomY = canvasTermometro.height - 40;
  const larghezzaTubo = 18, tuboInterno = 10, raggioBulbo = 28;
  ctxTermometro.save();
  ctxTermometro.shadowColor = "#aaa";
  ctxTermometro.shadowBlur = 18;
  ctxTermometro.beginPath();
  ctxTermometro.moveTo(cx - larghezzaTubo / 2, topY);
  ctxTermometro.lineTo(cx - larghezzaTubo / 2, bottomY - raggioBulbo);
  ctxTermometro.arc(cx, bottomY - raggioBulbo, larghezzaTubo / 2, Math.PI, 0, false);
  ctxTermometro.lineTo(cx + larghezzaTubo / 2, topY);
  ctxTermometro.closePath();
  ctxTermometro.fillStyle = "#e0e0e0";
  ctxTermometro.globalAlpha = 0.7;
  ctxTermometro.fill();
  ctxTermometro.globalAlpha = 1;
  ctxTermometro.shadowBlur = 0;
  ctxTermometro.restore();
  ctxTermometro.beginPath();
  ctxTermometro.arc(cx, bottomY, raggioBulbo, 0, Math.PI * 2);
  ctxTermometro.fillStyle = "#e0e0e0";
  ctxTermometro.globalAlpha = 0.7;
  ctxTermometro.fill();
  ctxTermometro.globalAlpha = 1;
  let minY = bottomY - raggioBulbo, maxY = topY + 10, h = minY - maxY;
  let yMercurio = minY - (termometro.valore / 100) * h;
  ctxTermometro.beginPath();
  ctxTermometro.moveTo(cx, minY);
  ctxTermometro.lineTo(cx, yMercurio);
  ctxTermometro.lineWidth = tuboInterno;
  ctxTermometro.strokeStyle = "#e74c3c";
  ctxTermometro.shadowColor = "#e74c3c";
  ctxTermometro.shadowBlur = 10;
  ctxTermometro.stroke();
  ctxTermometro.shadowBlur = 0;
  ctxTermometro.beginPath();
  ctxTermometro.arc(cx, bottomY, raggioBulbo - 7, 0, Math.PI * 2);
  ctxTermometro.fillStyle = "#e74c3c";
  ctxTermometro.shadowColor = "#e74c3c";
  ctxTermometro.shadowBlur = 18;
  ctxTermometro.fill();
  ctxTermometro.shadowBlur = 0;
  ctxTermometro.save();
  ctxTermometro.globalAlpha = 0.32;
  ctxTermometro.beginPath();
  ctxTermometro.arc(cx - raggioBulbo / 2.5, bottomY - raggioBulbo / 2.5, raggioBulbo / 5, 0, Math.PI * 2);
  ctxTermometro.fillStyle = "#fff";
  ctxTermometro.fill();
  ctxTermometro.globalAlpha = 1;
  ctxTermometro.restore();
  ctxTermometro.lineWidth = 2;
  ctxTermometro.strokeStyle = "#fff";
  for (let i = 0; i <= 10; i++) {
    let y = minY - (i / 10) * h;
    ctxTermometro.beginPath();
    ctxTermometro.moveTo(cx + larghezzaTubo / 2 + 3, y);
    ctxTermometro.lineTo(cx + larghezzaTubo / 2 + 13, y);
    ctxTermometro.stroke();
    ctxTermometro.font = "bold 0.55em Segoe UI, Arial";
    ctxTermometro.fillStyle = "#fff";
    ctxTermometro.textAlign = "left";
    let temp = Math.round((i / 10) * 20 + 10);
    ctxTermometro.fillText(temp + "°", cx + larghezzaTubo / 2 + 16, y + 3);
  }
  ctxTermometro.restore();
}

function animaTermometro() {
  if (!canvasTermometro) return;
  termometro.valore += 0.02 * termometro.direzione;
  if (termometro.valore > 80) { termometro.valore = 80; termometro.direzione = -1; }
  if (termometro.valore < 15) { termometro.valore = 15; termometro.direzione = 1; }
  disegnaTermometro();
  requestAnimationFrame(animaTermometro);
}

// Ridimensiona i canvas in base alla finestra
function ridimensionaCanvas() {
  if (canvasSole) {
    canvasSole.width = window.innerWidth * 0.45;
    canvasSole.height = window.innerHeight * 0.6;
    ctx = canvasSole.getContext('2d');
  }
  if (canvasPioggia) {
    canvasPioggia.width = window.innerWidth * 0.45;
    canvasPioggia.height = window.innerHeight * 0.6;
    canvasPioggia.style.marginLeft = (window.innerWidth * 0.05) + "px";
    ctxPioggia = canvasPioggia.getContext('2d');
  }
}
ridimensionaCanvas();
window.addEventListener('resize', () => {
  ridimensionaCanvas();
  aggiornaOggettiScene();
});

// Stato per sole, nuvola e pioggia
let sole = {
  x: 0, y: 0, raggio: 0, numRaggi: 10, lunghezzaRaggio: 0, angoloRaggio: 0, velocitaRaggio: 0.003
};
let nuvola = {
  x: 0, y: 0, baseX: 0, baseY: 0, velocita: 0.015, direzione: -1, t: 0
};
let nuvolePioggia = [], gocce = [];

// Aggiorna le posizioni e dimensioni delle figure in base al canvas
function aggiornaOggettiScene() {
  if (canvasSole) {
    sole.x = canvasSole.width * 0.43;
    sole.y = canvasSole.height * 0.4;
    sole.raggio = Math.min(canvasSole.width, canvasSole.height) * 0.09;
    sole.lunghezzaRaggio = sole.raggio * 0.4;
    nuvola.baseX = canvasSole.width * 0.43;
    nuvola.baseY = canvasSole.height * 0.26;
    nuvola.velocita = 0.015;
  }
  if (canvasPioggia) {
    nuvolePioggia = [
      { x: canvasPioggia.width * 0.29, y: canvasPioggia.height * 0.22, dx: -0.001, size: 1.2, min: canvasPioggia.width * 0.26, max: canvasPioggia.width * 0.35 },
      { x: canvasPioggia.width * 0.47, y: canvasPioggia.height * 0.22, dx: -0.003, size: 1.5, min: canvasPioggia.width * 0.44, max: canvasPioggia.width * 0.54 },
      { x: canvasPioggia.width * 0.59, y: canvasPioggia.height * 0.25, dx: 0.0015, size: 1.4, min: canvasPioggia.width * 0.56, max: canvasPioggia.width * 0.67 },
      { x: canvasPioggia.width * 0.71, y: canvasPioggia.height * 0.20, dx: 0.001, size: 1.1, min: canvasPioggia.width * 0.69, max: canvasPioggia.width * 0.78 },
      { x: canvasPioggia.width * 0.38, y: canvasPioggia.height * 0.26, dx: 0.004, size: 1.3, min: canvasPioggia.width * 0.34, max: canvasPioggia.width * 0.43 }
    ];
    gocce = [];
    for (let i = 0; i < 14; i++) {
      gocce.push({
        x: canvasPioggia.width * 0.24 + Math.random() * (canvasPioggia.width * 0.32),
        y: canvasPioggia.height * 0.36 + Math.random() * (canvasPioggia.height * 0.25),
        lunghezza: canvasPioggia.height * 0.03 + Math.random() * (canvasPioggia.height * 0.02),
        velocita: 3 + Math.random() * 2
      });
    }
  }
}
aggiornaOggettiScene();

// Sole e raggi
function disegnaSole() {
  if (!ctx) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(sole.x, sole.y, sole.raggio, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.shadowColor = "rgba(180, 100, 0, 0.9)";
  ctx.shadowBlur = 45;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fill();
  ctx.restore();
}
let angoloPulseRaggio = 0;
function disegnaRaggi() {
  if (!ctx) return;
  angoloPulseRaggio += 0.012;
  let pulse = 0.65 + 0.35 * Math.sin(angoloPulseRaggio);
  let lunghezzaDinamica = sole.lunghezzaRaggio * pulse;
  for (let i = 0; i < sole.numRaggi; i++) {
    let angolo = sole.angoloRaggio + (i * (Math.PI * 2 / sole.numRaggi));
    let startX = sole.x + Math.cos(angolo) * (sole.raggio + 16);
    let startY = sole.y + Math.sin(angolo) * (sole.raggio + 16);
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(angolo);
    ctx.fillStyle = "orange";
    ctx.shadowColor = "rgba(255, 165, 0, 0.5)";
    ctx.shadowBlur = 50;
    ctx.fillRect(0, -4, lunghezzaDinamica, 8);
    ctx.restore();
  }
}

// Nuvola vicino al sole
function disegnaNuvola() {
  if (!ctx) return;
  nuvola.t += 0.003;
  let offsetX = Math.sin(nuvola.t) * (sole.raggio * 0.4);
  let offsetY = Math.cos(nuvola.t * 0.7) * (sole.raggio * 0.10) + sole.raggio * 0.5;
  let cx = (nuvola.baseX || nuvola.x) + offsetX;
  let cy = (nuvola.baseY || nuvola.y) + offsetY;
  ctx.save();
  ctx.shadowColor = "rgba(60, 60, 60, 0.22)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(cx, cy, 40, 0, Math.PI * 2);
  ctx.arc(cx + 40, cy - 20, 50, 0, Math.PI * 2);
  ctx.arc(cx + 80, cy, 40, 0, Math.PI * 2);
  ctx.arc(cx + 40, cy + 20, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Nuvole e pioggia
function disegnaNuvolaPioggia(cx, cy, scala) {
  if (!ctxPioggia) return;
  ctxPioggia.save();
  ctxPioggia.translate(cx, cy);
  ctxPioggia.scale(scala, scala);
  ctxPioggia.beginPath();
  ctxPioggia.arc(0, 0, 40, 0, Math.PI * 2);
  ctxPioggia.arc(40, -20, 50, 0, Math.PI * 2);
  ctxPioggia.arc(80, 0, 40, 0, Math.PI * 2);
  ctxPioggia.arc(40, 20, 45, 0, Math.PI * 2);
  ctxPioggia.fillStyle = "#e0e7ef";
  ctxPioggia.globalAlpha = 0.97;
  ctxPioggia.shadowColor = "rgba(50, 60, 90, 0.22)";
  ctxPioggia.shadowBlur = 12;
  ctxPioggia.fill();
  ctxPioggia.globalAlpha = 1;
  ctxPioggia.shadowBlur = 0;
  ctxPioggia.restore();
}
function disegnaPioggia() {
  if (!ctxPioggia) return;
  ctxPioggia.save();
  ctxPioggia.strokeStyle = "#8ec6f7";
  ctxPioggia.lineWidth = 2;
  ctxPioggia.shadowColor = "rgba(40, 80, 160, 0.55)";
  ctxPioggia.shadowBlur = 12;
  const offsetX = canvasPioggia.width * 0.12;
  for (let i = 0; i < gocce.length; i++) {
    let goccia = gocce[i];
    let fade = 1 - Math.pow(goccia.y / canvasPioggia.height, 2.2);
    fade = Math.max(0, Math.min(1, fade));
    ctxPioggia.globalAlpha = fade;
    ctxPioggia.beginPath();
    ctxPioggia.moveTo(goccia.x + offsetX, goccia.y);
    ctxPioggia.lineTo(goccia.x + offsetX, goccia.y + goccia.lunghezza);
    ctxPioggia.stroke();
  }
  ctxPioggia.globalAlpha = 1;
  ctxPioggia.shadowBlur = 0;
  ctxPioggia.restore();
}

// Animazione principale: aggiorna sole, nuvole, pioggia
function anima() {
  if (ctx && canvasSole) {
    ctx.clearRect(0, 0, canvasSole.width, canvasSole.height);
    disegnaSole();
    disegnaRaggi();
    disegnaNuvola();
    sole.angoloRaggio += sole.velocitaRaggio;
    nuvola.x += nuvola.velocita * nuvola.direzione;
    if (nuvola.x <= canvasSole.width * 0.39 || nuvola.x >= canvasSole.width * 0.47) {
      nuvola.direzione *= -1;
    }
  }
  if (canvasPioggia && ctxPioggia) {
    ctxPioggia.clearRect(0, 0, canvasPioggia.width, canvasPioggia.height);
    for (let i = 0; i < nuvolePioggia.length; i++) {
      let n = nuvolePioggia[i];
      disegnaNuvolaPioggia(n.x, n.y, n.size);
      n.x += n.dx * canvasPioggia.width * 0.01;
      if (n.x < n.min || n.x > n.max) n.dx *= -1;
    }
    for (let i = 0; i < gocce.length; i++) {
      let goccia = gocce[i];
      goccia.y += goccia.velocita;
      if (goccia.y > canvasPioggia.height) {
        goccia.y = canvasPioggia.height * 0.36 + Math.random() * (canvasPioggia.height * 0.25);
        goccia.x = canvasPioggia.width * 0.24 + Math.random() * (canvasPioggia.width * 0.32);
      }
    }
    disegnaPioggia();
  }
  requestAnimationFrame(anima);
}

window.onload = function() {
  anima();
  animaTermometro();
};