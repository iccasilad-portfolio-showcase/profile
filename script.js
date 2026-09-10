document.addEventListener('DOMContentLoaded', () => {
    const row1 = document.querySelector('.marquee-row-1');
    const row2 = document.querySelector('.marquee-row-2');

    if (row1) {
        row1.innerHTML += row1.innerHTML; // Seamlessly duplicate track items for infinite marquee loop
    }
    if (row2) {
        row2.innerHTML += row2.innerHTML; // Seamlessly duplicate track items for infinite marquee loop
    }
});
