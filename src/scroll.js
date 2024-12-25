import { Rive } from "@rive-app/canvas";

const canvas = document.getElementById("scroll");

// Adjust for device pixel ratio
const scale = window.devicePixelRatio || 1;
canvas.width = canvas.offsetWidth * scale; // Match CSS width
canvas.height = canvas.offsetHeight * scale; // Match CSS height
const ctx = canvas.getContext("2d");
ctx.scale(scale, scale);

// Initialize the Rive instance
const riveInstance = new Rive({
    src: "/scroll.riv", // Ensure path is correct and accessible
    canvas: canvas,
    stateMachines: ["State Machine 1"], // Match your Rive setup
    autoplay: true,
});

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

// Add hover interaction
canvas.addEventListener("mouseenter", () => {
    riveInstance.play("Hover Animation"); // Replace with your specific animation name
});
canvas.addEventListener("mouseleave", () => {
    riveInstance.stop("Hover Animation"); // Or transition back to idle
});
