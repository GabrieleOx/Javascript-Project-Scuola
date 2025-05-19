const startButton = document.getElementById("buttonStart");
const sacchetto = document.getElementById("containerSacchetto");
const carte = document.getElementById("containerCarte");
const vaso = document.getElementById("containerVaso");
const retry = document.getElementById("retryButton");
const score = document.getElementById("punteggioEffettuato");

var associamenti = new Array(20);
var immagini = new Array(10);
var giratiN = new Array(2);
var giratiId = new Array(2);
var numeriAssociati = new Array(2);
var toccati = 0;
var done = "Imgs/Done.png";
var puntoInterrogativo = "Imgs/Interrogativo.png";
var mosse = 0, punteggio = 100;
var completati = 0;

startButton.addEventListener("click", function(){
    sacchetto.style.display = 'none';
    carte.style.display = 'block';

    let cartaBase = "card", immagineBase = "img";
    let left = 100, top = 10;

    setAssociazioni();

    for(let i = 1; i <= 20; i++){
        let cartaFinita = cartaBase + i;
        let immagineFinita = immagineBase + i;
        let card = document.getElementById(cartaFinita);
        let img = document.getElementById(immagineFinita);
        img.src = puntoInterrogativo;
        card.style.marginLeft = (String) (left + "px");
        card.style.marginTop = (String) (top + "px");
        left += 230;
        if(i == 7){
            left = 100;
            top += 230;
        }else if(i == 14){
            left = 220;
            top += 230;
        }
        addListeners(immagineFinita, associamenti[(i-1)], (i-1));
    }

});

function checkPresenza(n){
    let cont = 0;
    for(let i = 0; i < 20; i++){
        if(associamenti[i] == n){
            cont++;
        }
    }
    
    return (cont == 2);
}

function setAssociazioni(){
    for(let i = 0; i < 20; i++){
        associamenti[i] = 0;
    }

    for(let i = 1; i <= 10; i++){
        switch(i){
            case 1: immagini[i] = "Imgs/Prima.jpeg";break;
            case 2: immagini[i] = "Imgs/Seconda.jpeg";break;
            case 3: immagini[i] = "Imgs/Terza.jpeg";break;
            case 4: immagini[i] = "Imgs/Quarta.jpeg";break;
            case 5: immagini[i] = "Imgs/Quinta.jpeg";break;
            case 6: immagini[i] = "Imgs/Sesta.jpeg";break;
            case 7: immagini[i] = "Imgs/Settima.jpeg";break;
            case 8: immagini[i] = "Imgs/Ottava.jpeg";break;
            case 9: immagini[i] = "Imgs/Nona.jpeg";break;
            case 10: immagini[i] = "Imgs/Decima.jpeg";break;
        }
    }

    for(let i = 0; i < 20; i++){
        let n;
        do{
            n = Math.floor(Math.random() * 10) + 1;
        }while(checkPresenza(n));
        associamenti[i] = n;
    }
}

function addListeners(id, cardN, numAssoc){
    document.getElementById(id).addEventListener("click", function(){
        if(associamenti[numAssoc] != 0 && toccati < 2 && numeriAssociati[0] != numAssoc){
            toccati++;

            if(toccati == 1){
                giratiN[0] = cardN;
                giratiId[0] = id;
                numeriAssociati[0] = numAssoc;

                document.getElementById(giratiId[0]).src = immagini[giratiN[0]];
            }else {
                giratiN[1] = cardN;
                giratiId[1] = id;
                numeriAssociati[1] = numAssoc;

                document.getElementById(giratiId[1]).src = immagini[giratiN[1]];

                if(giratiN[0] == giratiN[1]){
                    setTimeout(() => {
                        document.getElementById(giratiId[0]).src = done;
                        document.getElementById(giratiId[1]).src = done;
                        toccati = 0;
                    }, 500);
                    associamenti[numeriAssociati[0]] = 0;
                    associamenti[numeriAssociati[1]] = 0;
                    completati++;
                }else {
                    setTimeout(() => {
                        document.getElementById(giratiId[0]).src = puntoInterrogativo;
                        document.getElementById(giratiId[1]).src = puntoInterrogativo;
                        toccati = 0;
                    }, 2000);
                }
                updatePunteggio();
            }
            if(completati == 10){
                carte.style.display = 'none';
                score.textContent = 'Score: ' + punteggio;
                vaso.style.display = 'block';
            }
        }
    });
}

function updatePunteggio(){
    mosse++;
    if(mosse > 10 && punteggio != 0)
        punteggio -= 2;
}

startButton.addEventListener("mouseover", function(){
    startButton.style.backgroundSize = '180px 80px';
    startButton.style.fontSize = '24px';
});

startButton.addEventListener("mouseleave", function(){
    startButton.style.backgroundSize = '160px 60px';
    startButton.style.fontSize = '22px';
});

retry.addEventListener("click", function(){
    vaso.style.display = 'none';
    mosse = 0;
    completati = 0;
    punteggio = 100;
    startButton.click();
});