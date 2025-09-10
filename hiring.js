let bg;    
let img;  
let imgX = 270;  
let imgY = 40;  
let imgW = 290;   
let imgH = 350; 
let dialogText = "Job opening? Hmmm...If it comes with free drinks, I'm in!!";
let myFont;

function preload() {
  bg = loadImage("doorbackground.png");  
  img = loadImage("hiringsign.png"); 
  myFont = loadFont("matchafont.ttf")
  plop = loadSound("plop.mp3")
}

function setup() {
  createCanvas(800, 500);
  textFont(myFont);
}

function draw() {

  background(bg);

  if (mouseX > imgX && mouseX < imgX + imgW &&
      mouseY > imgY && mouseY < imgY + imgH) {
   
    push();
    noFill();
    stroke(255, 255, 255,150);
    strokeWeight(9);
    rect(imgX, imgY, imgW, imgH, 1);
    
     fill(110, 142, 83,230);
    noStroke();
    rect(75,425,650,60,10)
    
    fill(255);
    textSize(27);
    textAlign(CENTER, CENTER);
    text(dialogText, 90, 453,630);
    pop();
  }


  image(img, imgX, imgY, imgW, imgH);
}

function mousePressed() {
 if (plop && !plop.isPlaying()) {
    plop.play();
  }
  if (mouseX > imgX && mouseX < imgX + imgW &&
      mouseY > imgY && mouseY < imgY + imgH) {

    window.location.href = "meet.html"; 
  }
}
