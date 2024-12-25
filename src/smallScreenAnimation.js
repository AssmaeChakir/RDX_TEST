// smallScreenAnimation.js

export function handleSmallScreenSlide(slide) {
    const h1 = slide.querySelector('.vertical-header');
    const content = slide.querySelector('.p');
    const closeBtn = slide.querySelector('.close-btn');

    gsap.to(slide, { width: '100%', height: '100vh', duration: 0.1 });
    closeBtn.style.display = 'block'; // Show close button

    if (content) {
        content.classList.remove('hidden');
        gsap.to(content, { opacity: 1, duration: 0.6 });
    }

    if (h1) {
        gsap.to(h1, { opacity: 0, duration: 0.3 });
    }
}

export function closeAllSlides(isSmallScreen, slides) {
    slides.forEach((slide) => {
        const h1 = slide.querySelector('.vertical-header');
        const content = slide.querySelector('.p');
        const cross = slide.querySelector('.close-btn');

        slide.style.display = 'block';
        gsap.to(slide, { opacity: 1, visibility: 'visible', width: '5%', height: '100%', duration: 0.6 });
        cross.style.display = 'none'; // Hide close button

        if (h1) {
            gsap.to(h1, { opacity: 1, duration: 0.6 });
        }

        if (content) {
            gsap.to(content, { opacity: 0, duration: 0.3, onComplete: () => content.classList.add('hidden') });
        }

        if (!isSmallScreen) {
            gsap.to(slide, { opacity: 0, visibility: 'hidden', duration: 0.3, onComplete: () => (slide.style.display = 'none') });
        }
    });
}
