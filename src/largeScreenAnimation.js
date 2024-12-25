// largeScreenAnimation.js

export function handleLargeScreenSlide(slide) {
    const closeBtn = slide.querySelector('.close-btn');

    slide.addEventListener('click', () => {
        if (currentSlide === slide) {
            return;
        }

        if (!clicked) {
            clicked = true;
        }

        slides.forEach((s) => {
            const h1 = s.querySelector('.vertical-header');
            const content = s.querySelector('.p');

            if (s !== slide) {
                if (content) {
                    gsap.to(content, {
                        opacity: 0,
                        x: -50,
                        duration: 0.1,
                        ease: 'power1.out',
                        onComplete: () => content.classList.add('hidden'),
                    });
                }
                gsap.to(s, { width: '5%', ease: 'power2.out', duration: 0.6 });

                if (h1) {
                    setTimeout(() => {
                        gsap.to(h1, {
                            opacity: 1,
                            margin: '24px',
                            duration: 0.6,
                            ease: 'power2.out',
                            delay: 0.2,
                        });
                    }, 500);
                }
            } else {
                gsap.to(s, { width: '100%', ease: 'power2.out', duration: 0.6 });

                if (h1) {
                    gsap.to(h1, { opacity: 0, margin: 0, duration: 0.1 });
                }

                if (content) {
                    content.classList.add('hidden');
                    setTimeout(() => {
                        content.classList.remove('hidden');
                        gsap.fromTo(
                            content,
                            { opacity: 0, x: -50 },
                            { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' }
                        );
                    }, 1000);
                }
            }
        });
    })
}
