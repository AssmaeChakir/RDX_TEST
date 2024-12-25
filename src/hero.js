// Select the canvas and get the 2D rendering context
const canvas = document.getElementById('hero');
const ctx = canvas.getContext('2d');

// Set the desired scaling factor for the content
const scaleX = 0.9; // Scale horizontally to 80% of original size
const scaleY = 0.9; // Scale vertically to 80% of original size

// Set canvas dimensions (without scaling it)
canvas.width = 500; // Set the actual width
canvas.height = 500; // Set the actual height

// Save the current context state
ctx.save();

// Apply scaling to the content
ctx.scale(scaleX, scaleY);

// Render your content (e.g., animation, shapes, images, etc.)
// Assuming you're using a Rive animation:
const riveInstance = new rive.Rive({
    src: '/hero.riv', // Path to your .riv file
    canvas: canvas,
    stateMachines: ['State Machine 1'],
    autoplay: true,
});

// Restore the context state to avoid affecting other drawings
ctx.restore();
