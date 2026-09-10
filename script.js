// Sticky Experience Row-Pinning & Scroll Interaction Handler
document.addEventListener('DOMContentLoaded', () => {
    console.log("Ian Carlo Casilad Portfolio Loaded Successfully.");

    const cards = document.querySelectorAll('.experience-pin-card');
    
    // Optional dynamic elevation or stacking visual enhancements on desktop
    if (window.innerWidth >= 1024) {
        cards.forEach((card, index) => {
            // Stagger top offsets slightly so stacked cards form a neat card-deck visual layer when pinned
            card.style.top = `${120 + (index * 24)}px`;
        });
    }
});
