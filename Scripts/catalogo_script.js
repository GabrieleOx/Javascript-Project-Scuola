document.addEventListener("DOMContentLoaded", function () {
    const terrenoSelect = document.getElementById("terreno");
    const acquaSelect = document.getElementById("acqua");
    const soleSelect = document.getElementById("sole");
    const elementi = document.querySelectorAll(".elemento");

    const criteri = {
        "Orchidea": { terreno: ["limoso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Ficus": { terreno: ["argilloso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["ombra", "qualsiasi"] },
        "Lavanda": { terreno: ["sabbioso", "qualsiasi"], acqua: ["scarsa", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Rosmarino": { terreno: ["sabbioso", "qualsiasi"], acqua: ["scarsa", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Azalea": { terreno: ["limoso", "qualsiasi"], acqua: ["abbondante", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Cactus": { terreno: ["sabbioso", "qualsiasi"], acqua: ["scarsa", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Felce": { terreno: ["argilloso", "qualsiasi"], acqua: ["abbondante", "qualsiasi"], sole: ["ombra", "qualsiasi"] },
        "Anthurium": { terreno: ["limoso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Basilico": { terreno: ["limoso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Peperoncino": { terreno: ["sabbioso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Sansevieria": { terreno: ["sabbioso", "qualsiasi"], acqua: ["scarsa", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Geranio": { terreno: ["limoso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Begonia": { terreno: ["limoso", "qualsiasi"], acqua: ["abbondante", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Aralia": { terreno: ["argilloso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Gelsomino": { terreno: ["sabbioso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Edera": { terreno: ["argilloso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["ombra", "qualsiasi"] },
        "Oleandro": { terreno: ["sabbioso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["diretto", "qualsiasi"] },
        "Kentia": { terreno: ["limoso", "qualsiasi"], acqua: ["moderata", "qualsiasi"], sole: ["indiretto", "qualsiasi"] },
        "Aloe Vera": { terreno: ["sabbioso", "qualsiasi"], acqua: ["scarsa", "qualsiasi"], sole: ["diretto", "qualsiasi"] }
    };

    // Effetto di fade-in + scala al mouse
    elementi.forEach((el, index) => {
        el.addEventListener("mouseenter", () => el.style.transform = "scale(1.05)");
        el.addEventListener("mouseleave", () => el.style.transform = "scale(1)");

        el.style.opacity = "0";
        setTimeout(() => {
            el.style.transition = "opacity 0.5s ease-in-out";
            el.style.opacity = "1";
        }, index * 200); // Effetto sfalsato

        // Flip al clic con rotazione di 180°
        const inner = el.querySelector(".inner");
        if (inner) {
            el.addEventListener("click", () => {
                inner.classList.toggle("flipped");
            });
        }
    });

    // Filtraggio delle piante
    function filtraCatalogo() {
        const terreno = terrenoSelect.value;
        const acqua = acquaSelect.value;
        const sole = soleSelect.value;

        elementi.forEach(elemento => {
            const condizioni = criteri[elemento.id];

            if (condizioni) {
                const terrenoValido = terreno === "qualsiasi" || condizioni.terreno.includes(terreno);
                const acquaValida = acqua === "qualsiasi" || condizioni.acqua.includes(acqua);
                const soleValido = sole === "qualsiasi" || condizioni.sole.includes(sole);

                elemento.style.display = (terrenoValido && acquaValida && soleValido) ? "block" : "none";
            } else {
                elemento.style.display = "none";
            }
        });
    }

    // Assegna il filtro agli eventi
    [terrenoSelect, acquaSelect, soleSelect].forEach(select => {
        select.addEventListener("change", filtraCatalogo);
    });

    // Esegui il filtro iniziale
    filtraCatalogo();
});
