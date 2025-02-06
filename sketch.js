let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize webcam capture
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // Initialize Handpose with the video element and a callback when the model is ready
  handpose = ml5.handpose(video, modelReady);

  // Listen for new predictions
  handpose.on("predict", results => {
    predictions = results;
    console.log("Hands detected:", results);
  });
}

function modelReady() {
  console.log("Handpose model loaded successfully.");
}

function draw() {
  background(180, 200, 255);

  // Optionally, you can mirror the video by using push/pop with translate/scale:
  // push();
  // translate(width, 0);
  // scale(-1, 1);
  // image(video, 0, 0, width, height);
  // pop();
  
  // For now, we just draw the video normally:
  image(video, 0, 0, width, height);

  // If at least one hand is detected, draw an ellipse over the palm base.
  if (predictions.length > 0) {
    let hand = predictions[0];
    let palmBase = hand.landmarks[0];   // Palm base keypoint
    let thumbTip = hand.landmarks[4];     // Thumb tip keypoint
    let pinkyTip = hand.landmarks[20];    // Pinky tip keypoint

    // Calculate an approximate hand size based on the distance between thumb tip and pinky tip.
    let handSize = dist(thumbTip[0], thumbTip[1], pinkyTip[0], pinkyTip[1]);

    fill(255, 204, 0, 150); // Semi-transparent yellow
    noStroke();
    ellipse(palmBase[0], palmBase[1], handSize * 1.5, handSize * 1.5); // Draw ellipse at palm base
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
}
