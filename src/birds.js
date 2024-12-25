
console.log('Initializing Rive...');

// Get the canvas element and scale it
const canvas = document.getElementById('birds');
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio || 1;

canvas.width = 500 * scale; // Scale the canvas width
canvas.height = 500 * scale; // Scale the canvas height
ctx.scale(scale, scale); // Scale the context to match the canvas


// Initialize the Rive animation
const riveInstance = new rive.Rive({
    src: '/birds.riv', // Path to your .riv file
    canvas: canvas, // Pass the scaled canvas
    stateMachines: ['State Machine 1'], // State machine to control the animation
    autoplay: true // Start the animation automatically
});

console.log('Rive instance created:', riveInstance);
