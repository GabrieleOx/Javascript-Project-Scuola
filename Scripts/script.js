// Effetto ingrandimento su hover per menu e logo

document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti i link del menu
    const menuLinks = document.querySelectorAll('.barra-navigazione-fissa a');
    // Seleziona il logo
    const logo = document.querySelector('.barra-navigazione-fissa .logo-navigazione img');

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            link.style.transform = 'scale(1.15)';
            link.style.transition = 'transform 0.2s ease';
        });
        link.addEventListener('mouseleave', function() {
            link.style.transform = '';
        });
    });

    if (logo) {
        logo.addEventListener('mouseenter', function() {
            logo.style.transform = 'scale(1.15)';
            logo.style.transition = 'transform 0.2s ease';
        });
        logo.addEventListener('mouseleave', function() {
            logo.style.transform = '';
        });
    }

    //da rivedere: Effetto ingrandimento su hover per il titolo
    // Animazione continua lettere titolo Happy Plants (SVG)
    const textPath = document.getElementById('percorso'); // Prende il textPath del titolo
    if (textPath) {
        const testo = textPath.textContent; // Prende il testo originale
        textPath.textContent = ''; // Svuota il textPath
        // Crea un tspan per ogni lettera
        testo.split('').forEach((lettera, i) => { // Per ogni lettera del titolo
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); // Crea un tspan SVG
            tspan.textContent = lettera; // Inserisce la lettera nel tspan
            tspan.setAttribute('class', 'lettera-animata'); // Aggiunge una classe per selezionare dopo
            tspan.setAttribute('data-indice', i); // Salva l'indice della lettera
            tspan.setAttribute('dy', '0'); // Imposta la posizione verticale iniziale
            textPath.appendChild(tspan); // Aggiunge il tspan al textPath
        });
        // Funzione animazione continua
        function animaLettereSVG() {
            const lettere = textPath.querySelectorAll('.lettera-animata'); // Prende tutte le lettere animate
            lettere.forEach((tspan, i) => { // Per ogni lettera
                const fase = (Date.now() / 400 + i) % (2 * Math.PI); // Calcola la fase per il movimento
                const y = Math.sin(fase) * 5; // Calcola la posizione verticale (su e giù)
                tspan.setAttribute('dy', y); // Applica la posizione verticale
            });
            requestAnimationFrame(animaLettereSVG); // Ripete l'animazione continuamente
        }
        animaLettereSVG(); // Avvia l'animazione
    }
});
