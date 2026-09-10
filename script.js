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

    // Pinned Timeline Scroll-Driven Sequential Card Reveal Logic
    const experienceContainer = document.querySelector('.experience-pin-container');
    const experienceCards = document.querySelectorAll('.experience-pin-card');
    const progressLine = document.getElementById('timeline-progress-line');

    if (experienceContainer && experienceCards.length > 0) {
        window.addEventListener('scroll', () => {
            const rect = experienceContainer.getBoundingClientRect();
            const containerHeight = experienceContainer.offsetHeight;
            const windowHeight = window.innerHeight;

            // Check if the container is currently occupying the viewport pin zone
            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                // Calculate raw progress ratio (0 to 1) inside the tall container
                const scrollDistance = -rect.top;
                const maxScroll = containerHeight - windowHeight;
                let progress = scrollDistance / maxScroll;
                progress = Math.max(0, Math.min(1, progress));

                // Update vertical green progress line height percentage
                if (progressLine) {
                    progressLine.style.height = `${progress * 100}%`;
                }

                // Determine active index step based on total cards count
                const totalCards = experienceCards.length;
                const activeIndex = Math.min(
                    Math.floor(progress * totalCards),
                    totalCards - 1
                );

                // Apply active state classes sequentially
                experienceCards.forEach((card, idx) => {
                    if (idx === activeIndex) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
            } else if (rect.top > 0) {
                // Reset to state before entering section
                experienceCards.forEach((card, idx) => {
                    card.classList.remove('active');
                });
                if (progressLine) progressLine.style.height = '0%';
            } else if (rect.bottom < windowHeight) {
                // Lock to final card when scrolling past container bottom
                experienceCards.forEach((card, idx) => {
                    if (idx === experienceCards.length - 1) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
                if (progressLine) progressLine.style.height = '100%';
            }
        });
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
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Loop to end
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }
});
