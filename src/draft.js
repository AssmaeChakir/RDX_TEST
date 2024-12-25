const slides = document.querySelectorAll('.slide');
const initialSlide = slides[0]; // Reference to the initial slide
let currentSlide = initialSlide; // Track the currently open slide

// Set the initial slide width and content visible
gsap.set(initialSlide, { width: '100%' });
initialSlide.querySelector('.p')?.classList.remove('hidden');
gsap.set(initialSlide.querySelector('.p'), { opacity: 1 });

const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

// Initially hide the h1 for the first slide
const initialH1 = initialSlide.querySelector('.vertical-header');
if (initialH1) {
    gsap.set(initialH1, { opacity: 0, margin: 0 });
}

// Add click event to each slide
slides.forEach((slide) => {
    const crossIcon = slide.querySelector('.cross-icon');

    // Show slide in full screen
    slide.addEventListener('click', () => {
        if (currentSlide === slide) return; // Skip if already active

        slides.forEach((s) => {
            const h1 = s.querySelector('.vertical-header');
            const content = s.querySelector('.p');
            const cross = s.querySelector('.cross-icon');

            if (s !== slide) {
                // Completely hide other slides
                gsap.to(s, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.3,
                    onComplete: () => (s.style.display = 'none'),
                });
            } else {
                // Show only the clicked slide
                s.style.display = 'block'; // Ensure it's visible
                gsap.to(s, { width: '100%', height: '100vh', duration: 0.6 });
                h1 && gsap.to(h1, { opacity: 0, duration: 0.3 });
                cross && cross.classList.remove('hidden'); // Show cross icon
                content &&
                    setTimeout(() => {
                        content.classList.remove('hidden');
                        gsap.to(content, { opacity: 1, duration: 0.6 });
                    }, 500);
            }
        });

        currentSlide = slide;
    });

    // Exit full screen when cross icon is clicked
    crossIcon?.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the slide click event

        // Restore the layout to show all slides
        slides.forEach((s) => {
            const h1 = s.querySelector('.vertical-header');
            const content = s.querySelector('.p');
            const cross = s.querySelector('.cross-icon');

            s.style.display = 'block'; // Make all slides visible
            gsap.to(s, { opacity: 1, visibility: 'visible', width: '5%', height: '100%', duration: 0.6 });
            h1 && gsap.to(h1, { opacity: 1, duration: 0.6 });
            content && gsap.to(content, { opacity: 0, duration: 0.3, onComplete: () => content.classList.add('hidden') });
            cross && cross.classList.add('hidden'); // Hide cross icon
        });

        currentSlide = initialSlide; // Reset to initial slide
    });
});
