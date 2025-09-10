let bg;       
let img;     
let imgX = 257;   
let imgY = 255;   
let imgW = 45;   
let imgH = 55;   
let dialogText = "Oh look!!! A new matcha cafe just opened in town. I've been craving matcha for so so long. What's that sign on the door?? Lets check it out!";
let myFont;
let mySound;
let myClick;
let hoverActive = false;

let soundEnabled = true;

function preload() {
  bg = loadImage("cafestorefront.png");  
  img = loadImage("hiringsign.png");
  myFont = loadFont("matchafont.ttf")
  mySound = loadSound('street.mp3');
  plop = loadSound("plop.mp3")
}

function setup() {
  let cnv = createCanvas(800, 500);
cnv.parent("sketch"); 
  textFont(myFont);
  if (soundEnabled) {
    mySound.loop();
  }
}

function draw() {

  background(bg);

  image(img, imgX, imgY, imgW, imgH);

  if (mouseX > imgX && mouseX < imgX + imgW &&
      mouseY > imgY && mouseY < imgY + imgH) {

    push();
    noFill();
    stroke(255, 255, 255,160);
    strokeWeight(6);
    rect(imgX - 1, imgY - 1, imgW + 2, imgH + 2,2);
    
    fill(110, 142, 83,230);
    noStroke();
    rect(40,405,720,70,10)
    
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(dialogText, 85, 425, 620);

    pop();
  }

}

function mousePressed() {
if (plop && soundEnabled && !plop.isPlaying()) {
  plop.play();
}
  
  if (mouseX > imgX && mouseX < imgX + imgW &&
      mouseY > imgY && mouseY < imgY + imgH) {

    window.location.href = "hiring.html"; 


  }
}

// Toggle button hookup
window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sound");
  toggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      mySound.loop();   // resume background music
      toggleBtn.textContent = "sound on";
    } else {
      mySound.stop();   // stop background music immediately
      toggleBtn.textContent = "sound off";
    }
  });
});
