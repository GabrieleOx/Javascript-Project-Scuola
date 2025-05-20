document.querySelectorAll(".elemento").forEach(el => {
    el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.05)";
    });
    el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
    });
});
document.querySelectorAll(".elemento").forEach((el, index) => {
    el.style.opacity = "0";
    setTimeout(() => {
        el.style.transition = "opacity 0.5s ease-in-out";
        el.style.opacity = "1";
    }, index * 200); // Effetto sfalsato per ogni elemento
});
document.addEventListener("DOMContentLoaded", function() {
    const terrenoSelect = document.getElementById("terreno");
    const acquaSelect = document.getElementById("acqua");
    const soleSelect = document.getElementById("sole");
    const elementi = document.querySelectorAll(".elemento");

    function filtraCatalogo() {
        const terreno = terrenoSelect.value;
        const acqua = acquaSelect.value;
        const sole = soleSelect.value;

        elementi.forEach(elemento => {
            // Definisci i criteri per ogni pianta
            const criteri = {
                "Orchidea": { terreno: "limoso", acqua: "moderata", sole: "indiretto" },
                "Ficus": { terreno: "argilloso", acqua: "moderata", sole: "ombra" },
                "Lavanda": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" },
                "Rosmarino": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" },
                "Azalea": { terreno: "limoso", acqua: "abbondante", sole: "indiretto" },
                "Cactus": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" },
                "Felce": { terreno: "argilloso", acqua: "abbondante", sole: "ombra" },
                "Anthurium": { terreno: "limoso", acqua: "moderata", sole: "indiretto" },
                "Basilico": { terreno: "limoso", acqua: "moderata", sole: "diretto" },
                "Peperoncino": { terreno: "sabbioso", acqua: "moderata", sole: "diretto" }
            };

            const nomePianta = elemento.id;
            const condizioni = criteri[nomePianta];

            if (condizioni.terreno === terreno && condizioni.acqua === acqua && condizioni.sole === sole) {
                elemento.style.display = "block";
            } else {
                elemento.style.display = "none";
            }
        });
    }

    // Applica il filtro ogni volta che cambia un selettore
    terrenoSelect.addEventListener("change", filtraCatalogo);
    acquaSelect.addEventListener("change", filtraCatalogo);
    soleSelect.addEventListener("change", filtraCatalogo);
});


document.addEventListener("DOMContentLoaded", function() {
    const terrenoSelect = document.getElementById("terreno");
    const acquaSelect = document.getElementById("acqua");
    const soleSelect = document.getElementById("sole");
    const elementi = document.querySelectorAll(".elemento");
    const resetButton = document.getElementById("reset");

    function filtraCatalogo() {
        const terreno = terrenoSelect.value;
        const acqua = acquaSelect.value;
        const sole = soleSelect.value;

        elementi.forEach(elemento => {
            const criteri = {
                "Orchidea": { terreno: "limoso", acqua: "moderata", sole: "indiretto" },
                "Ficus": { terreno: "argilloso", acqua: "moderata", sole: "ombra" },
                "Lavanda": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" },
                "Rosmarino": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" },
                "Azalea": { terreno: "limoso", acqua: "abbondante", sole: "indiretto" },
                "Cactus": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" },
                "Felce": { terreno: "argilloso", acqua: "abbondante", sole: "ombra" },
                "Anthurium": { terreno: "limoso", acqua: "moderata", sole: "indiretto" },
                "Basilico": { terreno: "limoso", acqua: "moderata", sole: "diretto" },
                "Peperoncino": { terreno: "sabbioso", acqua: "moderata", sole: "diretto" }
            };

            const nomePianta = elemento.id;
            const condizioni = criteri[nomePianta];

            if (condizioni.terreno === terreno && condizioni.acqua === acqua && condizioni.sole === sole) {
                elemento.style.display = "block";
            } else {
                elemento.style.display = "none";
            }
        });
    }

    // Pulsante di reset per ripristinare tutto
    resetButton.addEventListener("click", function() {
        terrenoSelect.selectedIndex = 0;
        acquaSelect.selectedIndex = 0;
        soleSelect.selectedIndex = 0;
        elementi.forEach(elemento => elemento.style.display = "block"); // Mostra tutte le piante
    });

    // Applica il filtro quando cambiano i selettori
    terrenoSelect.addEventListener("change", filtraCatalogo);
    acquaSelect.addEventListener("change", filtraCatalogo);
    soleSelect.addEventListener("change", filtraCatalogo);
});

