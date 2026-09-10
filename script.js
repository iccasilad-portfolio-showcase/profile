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


    // --- MARQUEE & VELOCITY WAVE PREVIEW ENGINE ---
    const track1 = document.getElementById('marqueeTrack1');
    const track2 = document.getElementById('marqueeTrack2');
    const container1 = document.getElementById('marqueeContainer1');
    const container2 = document.getElementById('marqueeContainer2');
    const preview = document.querySelector('.wave-preview-wrapper');
    const previewImg = document.querySelector('.wave-preview-img');

    if (track1 && track2 && container1 && container2 && preview && previewImg) {
        track1.innerHTML += track1.innerHTML;
        track2.innerHTML += track2.innerHTML;

        let marqueeX1 = 0;
        let marqueeX2 = 0;
        let speed = 1.0;
        let isPaused1 = false;
        let isPaused2 = false;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let velocityX = 0;
        let velocityY = 0;
        const lerpFactor = 0.12;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX + 30;
            mouseY = e.clientY - 175;
        });

        container1.addEventListener('mouseenter', () => isPaused1 = true);
        container1.addEventListener('mouseleave', () => isPaused1 = false);
        container2.addEventListener('mouseenter', () => isPaused2 = true);
        container2.addEventListener('mouseleave', () => isPaused2 = false);

        function runEngine() {
            if (!isPaused1) {
                marqueeX1 -= speed;
                const halfWidth1 = track1.scrollWidth / 2;
                if (Math.abs(marqueeX1) >= halfWidth1) marqueeX1 = 0;
                track1.style.transform = `translate3d(${marqueeX1}px, 0, 0)`;
            }

            if (!isPaused2) {
                marqueeX2 += speed;
                const halfWidth2 = track2.scrollWidth / 2;
                if (marqueeX2 >= 0) marqueeX2 = -halfWidth2;
                track2.style.transform = `translate3d(${marqueeX2}px, 0, 0)`;
            }

            currentX += (mouseX - currentX) * lerpFactor;
            currentY += (mouseY - currentY) * lerpFactor;

            velocityX = mouseX - lastMouseX;
            velocityY = mouseY - lastMouseY;
            lastMouseX = mouseX;
            lastMouseY = mouseY;

            const skewX = velocityY * 0.15;
            const skewY = velocityX * -0.15;
            const scaleMultiplier = Math.min(Math.max(1.15 + (Math.abs(velocityX) + Math.abs(velocityY)) * 0.002, 1.15), 1.35);

            preview.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            previewImg.style.transform = `scale(${scaleMultiplier}) skew(${skewX}deg, ${skewY}deg)`;

            requestAnimationFrame(runEngine);
        }

        requestAnimationFrame(runEngine);

        document.querySelectorAll('.project-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                const targetImage = card.getAttribute('data-image');
                if (targetImage) {
                    previewImg.src = targetImage;
                    preview.classList.add('active');
                }
            });

            card.addEventListener('mouseleave', () => {
                preview.classList.remove('active');
            });
        });
    }
});
