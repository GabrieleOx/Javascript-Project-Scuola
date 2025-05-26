const startButton = document.getElementById("buttonStart");
const sacchetto = document.getElementById("containerSacchetto");
const carte = document.getElementById("containerCarte");
const vaso = document.getElementById("containerVaso");
const retry = document.getElementById("retryButton");
const score = document.getElementById("punteggioEffettuato");
const tendina = document.getElementById("tendina-button");
const barra = document.getElementById("barra-fissa");
const titolo = document.getElementById("titoloPagina");
const save = document.getElementById("saveButton");
const saveLink = document.getElementById("saveLink");

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
var tenda_giu = false;
var cardIds = new Array(2);

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
        addListeners(immagineFinita, associamenti[(i-1)], (i-1), card);
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

function addListeners(id, cardN, numAssoc, idCarta){
    document.getElementById(id).addEventListener("click", function(){
        if(associamenti[numAssoc] != 0 && toccati < 2 && numeriAssociati[0] != numAssoc){
            toccati++;

            if(toccati == 1){
                giratiN[0] = cardN;
                giratiId[0] = id;
                numeriAssociati[0] = numAssoc;
                cardIds[0] = idCarta;

                cardIds[0].style.transform = "rotateY(180deg)";

                let im = document.getElementById(giratiId[0]);
                
                setTimeout(() =>{
                    im.src = immagini[giratiN[0]];
                    im.style.transform = "rotateY(180deg)";
                }, 98);
            }else {
                giratiN[1] = cardN;
                giratiId[1] = id;
                numeriAssociati[1] = numAssoc;
                cardIds[1] = idCarta;

                cardIds[1].style.transform = "rotateY(180deg)";

                let im0 = document.getElementById(giratiId[0]);
                let im1 = document.getElementById(giratiId[1]);
                
                setTimeout(() =>{
                    im1.src = immagini[giratiN[1]];
                    im1.style.transform = "rotateY(180deg)";
                }, 98);

                if(giratiN[0] == giratiN[1]){
                    setTimeout(() => {
                        im0.src = done;
                        im1.src = done;
                        toccati = 0;
                    }, 500);
                    associamenti[numeriAssociati[0]] = 0;
                    associamenti[numeriAssociati[1]] = 0;
                    completati++;
                }else {
                    setTimeout(() => {
                        cardIds[0].style.transform = "rotateY(0deg)";
                        cardIds[1].style.transform = "rotateY(0deg)";

                        setTimeout(() => {
                            im0.style.transform = "rotateY(0deg)";
                            im1.style.transform = "rotateY(0deg)";

                            im0.src = puntoInterrogativo;
                            im1.src = puntoInterrogativo;
                        }, 98);
                        
                        toccati = 0;
                    }, 2000);
                }
                updatePunteggio();
            }
            if(completati == 10){
                carte.style.display = 'none';
                score.textContent = 'Score: ' + punteggio;
                vaso.style.display = 'block';

                retry.style.display = 'none';
                save.style.display = 'none';

                const corpo = document.body;

                html2canvas(corpo).then(canvas => {
                    saveLink.download = 'Score.png';
                    saveLink.href = canvas.toDataURL("image/png");
                });
                
                retry.style.display = 'block';
                save.style.display = 'block';
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
    startButton.style.transform = 'scale(1.15)';
});

startButton.addEventListener("mouseleave", function(){
    startButton.style.transform = 'scale(1)';
});

retry.addEventListener("click", function(){
    vaso.style.display = 'none';
    mosse = 0;
    completati = 0;
    punteggio = 100;
    startButton.click();
});

tendina.addEventListener("click", function(){
    if(tenda_giu){
        tendina.style.transform = "translateY(0px)";
        barra.style.transform = "translateY(0px)";
        titolo.style.transform = "translateY(0px)";
    }else {
        tendina.style.transform = "translateY(90px)";
        barra.style.transform = "translateY(90px)";
        titolo.style.transform = "translateY(40px)";
    }

    tenda_giu = !tenda_giu;
});