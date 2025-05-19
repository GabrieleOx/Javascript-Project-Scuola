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
