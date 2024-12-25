const slides = document.querySelectorAll('.slide');
const initialSlide = slides[0]; // Reference to the initial slide

let currentSlide = initialSlide; // Track the currently open slide
let clicked = false; // Flag to track if the user has clicked a slide

// Set the initial slide width and content visible
gsap.set(initialSlide, { width: '100%' });
initialSlide.querySelector('.p')?.classList.remove('hidden');
gsap.set(initialSlide.querySelector('.p'), { opacity: 1 });

// Function to check and handle small screen logic
function handleSmallScreen() {
  const isSmallScreen = window.matchMedia('(max-width: 996px)').matches;

  // Add close button dynamically to each slide
  slides.forEach((slide) => {
    let closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn');
    closeBtn.textContent = '✖';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        display: none; /* Hidden by default */
    `;
    slide.appendChild(closeBtn);
  });

  if (isSmallScreen) {
    slides.forEach((slide) => {
      const closeBtn = slide.querySelector('.close-btn');

      slide.addEventListener('click', () => {
        if (slide === initialSlide) {
          return; // Prevent any action on the initial slide
        }
        if (currentSlide === slide) {
          return;
        }

        if (!clicked) {
          clicked = true;
        }

        slides.forEach((s) => {
          const h1 = s.querySelector('.vertical-header');
          const content = s.querySelector('.p');
          const cross = s.querySelector('.close-btn');

          if (s !== slide) {
            gsap.to(s, {
              opacity: 0,
              visibility: 'hidden',
              duration: 0.1,
              onComplete: () => (s.style.display = 'none'),
            });
          } else {
            s.style.display = 'block'; // Ensure it's visible
            gsap.to(s, { width: '100%', height: '100%', duration: 0.1 });
            h1 && gsap.to(h1, { opacity: 0, duration: 0.3 });
            cross.style.display = 'block'; // Show close button
            content &&
              setTimeout(() => {
                content.classList.remove('hidden');
                gsap.to(content, { opacity: 1, duration: 0.6 });
              }, 500);
          }
        });

        currentSlide = slide;
      });

      // Close button click event
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the slide click event

        slides.forEach((s) => {
          const h1 = s.querySelector('.vertical-header');
          const content = s.querySelector('.p');
          const cross = s.querySelector('.close-btn');

          s.style.display = 'block';
          gsap.set(s, { width: '100%', height: '64px', display: 'flex', alignitems: 'center' }); // Collapse all slides except the first one
          gsap.set(s, { opacity: 1, visibility: 'visible' }); // Ensure visibility

          // Handle the initial slide separately
          if (s === initialSlide) {
            gsap.to(s, { height: '100%', duration: 0.6 });
            initialSlide.querySelector('.p')?.classList.remove('hidden');
            gsap.to(initialSlide.querySelector('.p'), { opacity: 1, visibility: 'visible', duration: 0.6 });
          } else {
            content && gsap.to(content, { opacity: 0, duration: 0.3, onComplete: () => content.classList.add('hidden') });
            cross.style.display = 'none'; // Hide close button
          }

          if (h1) {
            gsap.to(h1, { opacity: 1, duration: 0.3 });
          }
        });

        currentSlide = null;
        clicked = false;
      });
    });
  } else {
    slides.forEach((slide) => {
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

        currentSlide = slide;
      });

      // Close button click event
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        slides.forEach((s) => {
          const h1 = s.querySelector('.vertical-header');
          const content = s.querySelector('.p');
          const cross = s.querySelector('.close-btn');

          s.style.display = 'block';
          gsap.to(s, { opacity: 1, visibility: 'visible', width: '5%', height: '100%', duration: 0.6 });

          h1 && gsap.to(h1, { opacity: 1, duration: 0.6 });
          content &&
            gsap.to(content, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => content.classList.add('hidden'),
            });
          cross.style.display = 'none';
        });

        currentSlide = null;
        clicked = false;
      });
    });
  }
}

// Initial check when the page loads
handleSmallScreen();

// Re-check when the window is resized
window.addEventListener('resize', handleSmallScreen);
