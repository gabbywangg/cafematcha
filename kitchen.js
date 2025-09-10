let bg;     
let img;        
let imgX = 650;  
let imgY = 70;  
let imgW = 140;   
let imgH = 160;   

let myFont;

let dialogState = 0;
let dialogs = [
  "Welcome to the kitchen! This is where we make all the drinks. (click to continue)",
  "We have a selection of mugs on the top shelf and matcha ingredients below.  (click to continue)",
  "Take some time to explore the items in the kitchen (by hovering), and then click the matcha sign once you are ready for training! (click to continue)",
];
let showDialog = true;

let objects = [];

let hoverZone = {
  x: 55, 
  y: 230, 
  w: 120, 
  h: 80, 
  tip: "ice maker"
};

let soundEnabled = true;

function preload() {
  bg = loadImage("kitchen.png");  
  img = loadImage("matchaposter.png");

  bluemug = loadImage("bluemug.png");
  orangemug = loadImage("orangemug.png");
  stripedmug = loadImage("stripedmug.png");
  glass1 = loadImage("glass1.png");
  glass2 = loadImage("glass2.png");
  milk = loadImage("milk.png");
  whiskonstand = loadImage("whiskonstand.png");
  kettle = loadImage("kettle.png");
  matchacan = loadImage("matchacan.png");
  scoop = loadImage("scoop.png");
  syrup = loadImage("Syrup.png");
  honey = loadImage("honey.png");
  chawan = loadImage("chawan.png");
  
  myFont = loadFont("matchafont.ttf");
  plop = loadSound("plop.mp3");
}

function setup() {
  let cnv = createCanvas(800, 500);
cnv.parent("sketch"); 
  textFont(myFont);

  // Add all kitchen objects with tooltip text
  objects = [
    {img: glass2, x:440, y:33, w:45, h:60, tip:"glass"},
    {img: glass1, x:360, y:38, w:49, h:55, tip:"to go cup"},
    {img: stripedmug, x:270, y:44, w:54, h:50, tip:"striped mug"},
    {img: orangemug, x:180, y:43, w:54, h:50, tip:"orange mug"},
    {img: bluemug, x:100, y:43, w:50, h:50, tip:"blue mug"},
    {img: kettle, x:220, y:220, w:120, h:90, tip:"water kettle"},
    {img: honey, x:435, y:145, w:30, h:60, tip:"honey"},
    {img: syrup, x:395, y:120, w:30, h:85, tip:"simple syrup"},
    {img: milk, x:340, y:120, w:45, h:85, tip:"milk"},
    {img: chawan, x:260, y:160, w:60, h:45, tip:"chawan"},
    {img: matchacan, x:200, y:155, w:38, h:45, tip:"matcha powder"},
    {img: scoop, x:140, y:150, w:65, h:50, tip:"chashaku"},
    {img: whiskonstand, x:100, y:125, w:40, h:75, tip:"bamboo whisk"}
  ];
}

function draw() {
  background(bg);

  if (showDialog) {
    push();
    fill(110, 142, 83, 230);
    noStroke();
    rect(40, 390, 740, 80, 10);

    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(dialogs[dialogState], 60, 420, 670);
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
      rect(290, 400, 230, 60, 10);

      fill(255);
      textSize(28);
      textAlign(CENTER, CENTER);
      text("Let's get started!!", 155, 430, 500);
      pop();
    }
  }

  image(img, imgX, imgY, imgW, imgH); 

  for (let obj of objects) {
    image(obj.img, obj.x, obj.y, obj.w, obj.h);

    if (!showDialog &&
        mouseX > obj.x && mouseX < obj.x + obj.w &&
        mouseY > obj.y && mouseY < obj.y + obj.h) {
      push();
      fill(110, 142, 83, 230); 
      noStroke();
      rect(mouseX + 10, mouseY - 25, textWidth(obj.tip) + 32, 30, 5);

      fill(255);
      textSize(16);
      textAlign(LEFT, CENTER);
      text(obj.tip, mouseX + 20, mouseY - 10);
      pop();
    }
  }

if (!showDialog &&
    mouseX > hoverZone.x && mouseX < hoverZone.x + hoverZone.w &&
    mouseY > hoverZone.y && mouseY < hoverZone.y + hoverZone.h) {
  
  push();
  fill(110, 142, 83, 230); 
  noStroke();
  rect(mouseX + 10, mouseY - 25, textWidth(hoverZone.tip) + 35, 30, 5);

  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text(hoverZone.tip, mouseX + 20, mouseY - 10);
  pop();
}

}

function mousePressed() {
    if (plop && soundEnabled && !plop.isPlaying()) {
  plop.play();
}
  if (mouseX > 40 && mouseX < 760 &&
      mouseY > 390 && mouseY < 470) {
    dialogState++;
    if (dialogState >= dialogs.length) {
      showDialog = false; 
    }
  }

  if (!showDialog) {
    if (mouseX > imgX && mouseX < imgX + imgW &&
        mouseY > imgY && mouseY < imgY + imgH) {
      window.location.href = "training.html";
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