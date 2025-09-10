let bg;     
let img;        
let imgX = 520;  
let imgY = 175;  
let imgW = 110;   
let imgH = 65;   

let myFont;

let dialogState = 0;
let dialogs = [
  "Hi there! Welcome to Cafe Matcha. I'm Mr. Bear. What can I get started for you today? (click Mr. Bear to continue)",
  "Oh! How wonderful! Business is pretty low right now so if you're up to it you could complete your training today! (click Mr. Bear to continue)",
  "Great! Follow me into the back kitchen through the employees only door whenever you're ready. (click Mr. Bear to continue)",
];
let showDialog = true;

let soundEnabled = true;

function preload() {
  bg = loadImage("cafe.gif");  
  img = loadImage("employeesonly.png");
  myFont = loadFont("matchafont.ttf");
  plop = loadSound("plop.mp3")
}

function setup() {
  let cnv = createCanvas(800, 500);
cnv.parent("sketch"); 
  textFont(myFont);
}

function draw() {

  background(bg);

  if (showDialog) {
    push();
    fill(110, 142, 83, 230);
    noStroke();
    rect(55, 405, 660, 70, 10);

    fill(255);
    textSize(21);
    textAlign(CENTER, CENTER);
    text(dialogs[dialogState], 90, 430, 600);
    pop();
  }

  if (!showDialog) {
    if (mouseX > imgX && mouseX < imgX + imgW &&
        mouseY > imgY && mouseY < imgY + imgH) {
      push();
      noFill();
      stroke(255, 255, 255, 160);
      strokeWeight(6);
      rect(imgX - 1, imgY - 1, imgW + 2, imgH + 2, 2);

      fill(110, 142, 83, 230);
      noStroke();
      rect(55, 405, 660, 70, 10);

      fill(255);
      textSize(21);
      textAlign(CENTER, CENTER);
      text("Let's head to the kitchen, and I'll walk you through all the steps! Don't worry, this will be a piece of cake!!", 90, 430, 600);
      pop();
    }
  }

  image(img, imgX, imgY, imgW, imgH);        
}

function mousePressed() {
  if (plop && soundEnabled && !plop.isPlaying()) {
  plop.play();
}
  if (mouseX > 310 && mouseX < 400 + 130 &&
      mouseY > 130 && mouseY < 200 + 120) {
    dialogState++;
    if (dialogState >= dialogs.length) {
      showDialog = false; 
    }
  }

  if (!showDialog) {
    if (mouseX > imgX && mouseX < imgX + imgW &&
        mouseY > imgY && mouseY < imgY + imgH) {
      window.location.href = "kitchen.html";
    }
  }
}

// Toggle button hookup
window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sound");
  toggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    toggleBtn.textContent = soundEnabled ? "sound on" : "sound off";
  });
});