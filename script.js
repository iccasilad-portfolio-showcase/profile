// Duplicate row items dynamically on load to ensure completely seamless infinite marquee looping
document.addEventListener('DOMContentLoaded', () => {
    const row1 = document.querySelector('.marquee-row-1');
    const row2 = document.querySelector('.marquee-row-2');

    if (row1 && row2) {
        // Clone elements for continuous loop illusion
        row1.innerHTML += row1.innerHTML;
        row2.innerHTML += row2.innerHTML;
    }
});
