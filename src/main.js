// Ensure the animations start after the page has loaded
window.onload = () => {
    const timeline = gsap.timeline();

    // Animate the main slider container
    timeline.from(".slider", {
        opacity: 0,
        scale: 0.9,
        duration: 2,
        ease: "power2.out",
    }, "-=0.5"); // Overlap with the previous animation

    // Animate individual slides
    timeline.from(".slide", {
        x: -50,
        opacity: 0,
        stagger: 0.3, // Stagger effect for multiple slides
        duration: 1,
        ease: "power2.out",
    }, "-=1"); // Overlap with the previous animation
};
