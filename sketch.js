let blockImage;
let hammerImage;
let synth;
let showBlock = true; // Variable to track if the block should be shown
let showHammer = false; // Variable to control the display of the hammer
let blockWidth = 200; // Width of the block image
let blockHeight = 100; // Height of the block image
let blockX, blockY; // Variables to store the block's position
let hammerWidth = 50; // Width of the hammer image
let hammerHeight = 50; // Height of the hammer image

function preload() {
  blockImage = loadImage('assets/block.jpg'); // Preload the block image
  hammerImage = loadImage('assets/hammer.jpg'); // Preload the hammer image
}

function setup() {
  createCanvas(400, 400);
  synth = new Tone.MembraneSynth().toDestination();
  imageMode(CENTER); // Set imageMode to CENTER for easier positioning
  noLoop();
  resetBlock(); // Set the initial position of the block
}

function draw() {
  background(220);

  // Only draw the block if showBlock is true
  if (showBlock) {
    image(blockImage, blockX, blockY, blockWidth, blockHeight);
  }

  // Draw the hammer only if showHammer is true
  if (showHammer) {
    image(hammerImage, mouseX, mouseY, hammerWidth, hammerHeight);
  }
}

function resetBlock() {
  // Position the block randomly in the bottom half of the canvas
  blockX = random(blockWidth / 2, width - blockWidth / 2);
  blockY = random(height / 2 + blockHeight / 2, height - blockHeight / 2);
}

function mousePressed() {
  // Play the sound
  synth.triggerAttackRelease("C2", "8n");

  // Modulate some parameters
  let filter = new Tone.AutoFilter(4).toDestination().start();
  synth.connect(filter);

  // Check if the click is within the block's boundaries
  if (showBlock && mouseX > blockX - blockWidth / 2 && mouseX < blockX + blockWidth / 2 && mouseY > blockY - blockHeight / 2 && mouseY < blockY + blockHeight / 2) {
    // Hide the block if it's currently shown
    showBlock = false;

    // Show the hammer image where the mouse was clicked
    showHammer = true;
    redraw(); // Redraw to show the hammer image

    // Set a timeout to hide the hammer and reset the block's position
    setTimeout(() => {
      showHammer = false;
      resetBlock(); // Reset the block to a new position
      showBlock = true; // Make the block visible again
      redraw(); // Redraw to update the canvas
    }, 100); // After 100 milliseconds
  }
}
