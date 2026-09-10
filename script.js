document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Functionality
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Pinned Timeline Scroll-Driven 3-Column Card Reveal & Dot Lighting Logic
    const experienceContainer = document.querySelector('.experience-pin-container');
    const experienceCards = document.querySelectorAll('.experience-pin-card');
    const timelineDots = document.querySelectorAll('.timeline-dot-indicator');

    if (experienceContainer && experienceCards.length > 0) {
        function handleScrollPinning() {
            const rect = experienceContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if the container is currently in view
            if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
                const scrollDistance = windowHeight * 0.5 - rect.top;
                const containerHeight = experienceContainer.offsetHeight - windowHeight;
                let progress = containerHeight > 0 ? scrollDistance / containerHeight : 0;
                progress = Math.max(0, Math.min(1, progress));

                const totalCards = experienceCards.length;
                const activeIndex = Math.min(
                    Math.floor(progress * totalCards),
                    totalCards - 1
                );

                experienceCards.forEach((card, idx) => {
                    if (idx <= activeIndex) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });

                timelineDots.forEach((dot, idx) => {
                    if (idx <= activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            } else if (rect.top > windowHeight * 0.5) {
                // Before section comes into view
                experienceCards.forEach((card) => card.classList.remove('active'));
                timelineDots.forEach((dot) => dot.classList.remove('active'));
            } else if (rect.bottom < windowHeight * 0.5) {
                // After section has passed
                experienceCards.forEach((card) => card.classList.add('active'));
                timelineDots.forEach((dot) => dot.classList.add('active'));
            }
        }

        window.addEventListener('scroll', handleScrollPinning, { passive: true });
        window.addEventListener('resize', handleScrollPinning);
        handleScrollPinning(); // Trigger once on load
    }

    // Testimonials Carousel Logic
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const slides = track.querySelectorAll('.testimonial-slide');
        
        function getSlidesPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateCarousel() {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }
});
