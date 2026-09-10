// Sticky Experience Row-Pinning, Scroll Line Color Fill & Testimonial Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log("Ian Carlo Casilad Portfolio Loaded Successfully.");

    // --- TIMELINE STICKY & SCROLL LINE EFFECT ---
    const cards = document.querySelectorAll('.experience-pin-card');
    const container = document.querySelector('.experience-sticky-container');
    const progressLine = document.getElementById('timeline-progress-line');
    
    if (window.innerWidth >= 1024) {
        cards.forEach((card, index) => {
            card.style.top = `${120 + (index * 24)}px`;
        });
    }

    const updateTimelineProgress = () => {
        if (!container || !progressLine) return;

        const containerRect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollDistanceFromTop = windowHeight / 2 - containerRect.top;
        
        let scrollPercentage = (scrollDistanceFromTop / containerHeight) * 100;
        scrollPercentage = Math.max(0, Math.min(100, scrollPercentage));

        progressLine.style.height = `${scrollPercentage}%`;

        cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top <= windowHeight * 0.5) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();


    // --- TESTIMONIAL SLIDER LOGIC ---
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (track && prevBtn && nextBtn) {
        const slides = track.children;
        let currentIndex = 0;

        // Determine number of visible slides based on screen width
        const getVisibleSlidesCount = () => {
            if (window.innerWidth >= 1024) return 3; // lg
            if (window.innerWidth >= 768) return 2;  // md
            return 1;                                // sm
        };

        const updateSliderPosition = () => {
            const visibleCount = getVisibleSlidesCount();
            const maxIndex = Math.max(0, slides.length - visibleCount);
            
            // Prevent out-of-bounds index
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const visibleCount = getVisibleSlidesCount();
            const maxIndex = slides.length - visibleCount;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateSliderPosition();
        });

        prevBtn.addEventListener('click', () => {
            const visibleCount = getVisibleSlidesCount();
            const maxIndex = slides.length - visibleCount;
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Loop to end
            }
            updateSliderPosition();
        });

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            updateSliderPosition();
        });
    }
});
