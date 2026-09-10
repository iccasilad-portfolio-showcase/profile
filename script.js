document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // 2. Testimonial Slider Controls
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const slides = track.children;
        const totalSlides = slides.length;

        function getSlidesPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateSlider() {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }

    // 3. Dynamic Timeline Progress Line Tracker
    const timelineContainer = document.querySelector('.experience-sticky-container');
    const progressLine = document.getElementById('timeline-progress-line');

    if (timelineContainer && progressLine) {
        window.addEventListener('scroll', () => {
            const rect = timelineContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const containerTop = rect.top;
            const containerHeight = rect.height;
            
            if (containerTop <= windowHeight && containerTop + containerHeight >= 0) {
                let scrolled = (windowHeight - containerTop) / (containerHeight + windowHeight);
                let percentage = Math.min(Math.max(scrolled * 100, 0), 100);
                progressLine.style.height = `${percentage}%`;
            }
        });
    }
});
