import './style.css';

console.log('Initializing Rive...');

// Get the canvas element and scale it
const canvas = document.getElementById('riveCanvas');
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio || 1;


canvas.width = 600 * scale; // Scale the canvas width
canvas.height = 600 * scale; // Scale the canvas height
ctx.scale(scale, scale); // Scale the context to match the canvas

// Initialize the Rive animation
const riveInstance = new rive.Rive({
    src: '/fighters.riv', // Path to your .riv file
    canvas: canvas, // Pass the scaled canvas
    stateMachines: ['State Machine 1'], // State machine to control the animation
    autoplay: true // Start the animation automatically
});

console.log('Rive instance created:', riveInstance);

let widthInput;

// Wait for Rive to load
riveInstance.on("load", () => {
    // Access state machine inputs
    const stateMachineInputs = riveInstance.stateMachineInputs("State Machine 1");

    // Find the `width` input variable
    widthInput = stateMachineInputs.find((input) => input.name === "width");

    if (widthInput) {
        console.log("Width input found:", widthInput);

        // Set the initial width value
        updateWidth();

        // Add a resize listener to update the width dynamically
        window.addEventListener("resize", updateWidth);
    } else {
        console.error("Width input not found in the state machine");
    }
});

// Function to update the width variable
function updateWidth() {
    if (widthInput) {
        const canvasWidth = canvas.offsetWidth;
        widthInput.value = canvasWidth; // Update the `width` variable
        console.log("Updated width to:", canvasWidth);
    }
}
