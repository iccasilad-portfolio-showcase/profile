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
        // Ensure first card is active on initial load if already in view
        function handleScrollPinning() {
            const rect = experienceContainer.getBoundingClientRect();
            const containerHeight = experienceContainer.offsetHeight;
            const windowHeight = window.innerHeight;

            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                const scrollDistance = -rect.top;
                const maxScroll = containerHeight - windowHeight;
                let progress = scrollDistance / maxScroll;
                progress = Math.max(0, Math.min(1, progress));

                if (progressLine) {
                    progressLine.style.height = `${progress * 100}%`;
                }

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
            } else if (rect.top > 0) {
                experienceCards.forEach((card, idx) => {
                    card.classList.remove('active');
                });
                if (progressLine) progressLine.style.height = '0%';
            } else if (rect.bottom < windowHeight) {
                experienceCards.forEach((card) => {
                    card.classList.add('active');
                });
                if (progressLine) progressLine.style.height = '100%';
            }
        }

        window.addEventListener('scroll', handleScrollPinning);
        window.addEventListener('resize', handleScrollPinning);
        handleScrollPinning(); // trigger once on load
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
