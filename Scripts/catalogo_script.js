document.querySelectorAll(".elemento").forEach((el, index) => {
    el.addEventListener("mouseenter", () => el.style.transform = "scale(1.05)");
    el.addEventListener("mouseleave", () => el.style.transform = "scale(1)");

    el.style.opacity = "0";
    setTimeout(() => {
        el.style.transition = "opacity 0.5s ease-in-out";
        el.style.opacity = "1";
    }, index * 200); // Effetto sfalsato
});

document.addEventListener("DOMContentLoaded", function() {
    const terrenoSelect = document.getElementById("terreno");
    const acquaSelect = document.getElementById("acqua");
    const soleSelect = document.getElementById("sole");
    const elementi = document.querySelectorAll(".elemento");
    const resetButton = document.getElementById("reset");

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
        "Peperoncino": { terreno: "sabbioso", acqua: "moderata", sole: "diretto" },
        "Pothos": { terreno: "limoso", acqua: "moderata", sole: "indiretto" },
        "Sansevieria": { terreno: "sabbioso", acqua: "scarsa", sole: "indiretto" },
        "Geranio": { terreno: "limoso", acqua: "moderata", sole: "diretto" },
        "Begonia": { terreno: "limoso", acqua: "abbondante", sole: "indiretto" },
        "Aralia": { terreno: "argilloso", acqua: "moderata", sole: "indiretto" },
        "Gelsomino": { terreno: "sabbioso", acqua: "moderata", sole: "diretto" },
        "Edera": { terreno: "argilloso", acqua: "moderata", sole: "ombra" },
        "Oleandro": { terreno: "sabbioso", acqua: "moderata", sole: "diretto" },
        "Kentia": { terreno: "limoso", acqua: "moderata", sole: "indiretto" },
        "Aloe Vera": { terreno: "sabbioso", acqua: "scarsa", sole: "diretto" }
    };

    function filtraCatalogo() {
        const terreno = terrenoSelect.value;
        const acqua = acquaSelect.value;
        const sole = soleSelect.value;

        elementi.forEach(elemento => {
            const condizioni = criteri[elemento.id];

            elemento.style.display = (condizioni && condizioni.terreno === terreno && condizioni.acqua === acqua && condizioni.sole === sole)
                ? "block"
                : "none";
        });
    }

    // Reset filtri
    resetButton.addEventListener("click", () => {
        terrenoSelect.selectedIndex = 0;
        acquaSelect.selectedIndex = 0;
        soleSelect.selectedIndex = 0;
        elementi.forEach(elemento => elemento.style.display = "block");
    });

    // Assegna il filtro agli eventi
    [terrenoSelect, acquaSelect, soleSelect].forEach(select => select.addEventListener("change", filtraCatalogo));
});
