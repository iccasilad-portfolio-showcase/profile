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


    // --- TESTIMONIAL SLIDER LOGIC (Fixed & Autoplay) ---
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const sliderSection = document.getElementById('testimonials');

    if (track && prevBtn && nextBtn) {
        const slides = Array.from(track.children);
        let currentIndex = 0;
        let autoplayTimer = null;
        const AUTOPLAY_INTERVAL = 4500; // Time in ms between transitions

        // Determine number of visible slides based on screen width
        const getVisibleCount = () => {
            if (window.innerWidth >= 1024) return 3; // lg: 3 visible
            if (window.innerWidth >= 768) return 2;  // md: 2 visible
            return 1;                                // sm: 1 visible
        };

        const updateSliderPosition = (smooth = true) => {
            if (!track.children.length) return;
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, slides.length - visibleCount);

            if (currentIndex > maxIndex) {
                currentIndex = 0; // Loop back around seamlessly
            } else if (currentIndex < 0) {
                currentIndex = maxIndex;
            }

            // Temporarily toggle transition state if needed
            track.style.transition = smooth ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';

            // Calculate precise slide width including gap/padding offsets
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const nextSlide = () => {
            currentIndex++;
            updateSliderPosition(true);
        };

        const prevSlide = () => {
            currentIndex--;
            updateSliderPosition(true);
        };

        // Event Listeners for Buttons
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        // Autoplay Logic
        const startAutoplay = () => {
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => {
                nextSlide();
            }, AUTOPLAY_INTERVAL);
        };

        const stopAutoplay = () => {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        };

        const resetAutoplay = () => {
            stopAutoplay();
            startAutoplay();
        };

        // Pause autoplay on hover for better user control
        sliderSection.addEventListener('mouseenter', stopAutoplay);
        sliderSection.addEventListener('mouseleave', startAutoplay);

        // Recalculate dimensions on window resize
        window.addEventListener('resize', () => {
            updateSliderPosition(false);
        });

        // Initialize Autoplay loop
        startAutoplay();
    }
});
