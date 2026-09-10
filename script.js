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

    // Interactive Experience Section Progress Line & Active Card Highlights
    const experienceSection = document.getElementById('experience');
    const progressLine = document.getElementById('timeline-progress-line');
    const experienceCards = document.querySelectorAll('.experience-pin-card');

    if (experienceSection && progressLine) {
        window.addEventListener('scroll', () => {
            const rect = experienceSection.getBoundingClientRect();
            const sectionHeight = experienceSection.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate how far we've scrolled into the experience section
            let scrollPosition = windowHeight - rect.top;
            let percentage = (scrollPosition / (sectionHeight + windowHeight)) * 140;

            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            progressLine.style.height = `${percentage}%`;

            // Highlight cards based on viewport position
            experienceCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const dot = card.querySelector('.timeline-dot');
                
                if (cardRect.top < windowHeight * 0.7 && cardRect.bottom > windowHeight * 0.2) {
                    card.classList.add('border-neutral-500', 'bg-neutral-900/90');
                    if (dot) {
                        dot.classList.remove('bg-neutral-700');
                        dot.classList.add('bg-[#22c55e]');
                    }
                } else {
                    card.classList.remove('border-neutral-500', 'bg-neutral-900/90');
                    if (dot) {
                        dot.classList.remove('bg-[#22c55e]');
                        dot.classList.add('bg-neutral-700');
                    }
                }
            });
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
