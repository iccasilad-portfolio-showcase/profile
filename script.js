// Sticky Experience Row-Pinning & Scroll Line Color Fill Animation Handler
document.addEventListener('DOMContentLoaded', () => {
    console.log("Ian Carlo Casilad Portfolio Loaded Successfully.");

    const cards = document.querySelectorAll('.experience-pin-card');
    const container = document.querySelector('.experience-sticky-container');
    const progressLine = document.getElementById('timeline-progress-line');
    
    // Optional dynamic elevation or stacking visual enhancements on desktop
    if (window.innerWidth >= 1024) {
        cards.forEach((card, index) => {
            // Stagger top offsets slightly so stacked cards form a neat card-deck visual layer when pinned
            card.style.top = `${120 + (index * 24)}px`;
        });
    }

    // Scroll-driven line fill and card active highlighting
    const updateTimelineProgress = () => {
        if (!container || !progressLine) return;

        const containerRect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate how far the user has scrolled into the experience container block
        const scrollDistanceFromTop = windowHeight / 2 - containerRect.top;
        
        let scrollPercentage = (scrollDistanceFromTop / containerHeight) * 100;
        scrollPercentage = Math.max(0, Math.min(100, scrollPercentage)); // Clamp between 0% and 100%

        // Apply dynamic height to the fill line
        progressLine.style.height = `${scrollPercentage}%`;

        // Check each card's viewport intersection to trigger active states and glowing nodes
        cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            // If the card has scrolled past or reached the upper middle of the viewport
            if (cardRect.top <= windowHeight * 0.5) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress(); // Initial check on load
});
