let myFont;
let bg;
let fullmatcha, halfmatcha, onefourthmatcha, fullice;
let mail, letter;

let dialogState = 0;
let dialogs = [
  "Tap to drink!!",
  "Delicious! Ooo looks like you've got a letter. Tap it to open."
];
let showDialog = true;

let matchaX = 320, matchaY = 140, matchaW = 180, matchaH = 230;
let cupState = "fullmatcha";

let mailX = 630, mailY = 50, mailW = 120, mailH = 90;
let showMail = false;
let showLetter = false;

let soundEnabled = true;
let plop, celly;

function preload() {
  bg = loadImage("zoomed.png");
  fullmatcha = loadImage("fullmatcha.png");
  halfmatcha = loadImage("halfmatcha.png");
  onefourthmatcha = loadImage("onefourthmatcha.png");
  fullice = loadImage("fullice.png");
  mail = loadImage("mail.png");
  letter = loadImage("letter.png");
  myFont = loadFont("matchafont.ttf");
  plop = loadSound("plop.mp3");
  celly = loadSound("celly.mp3");
}

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("sketch");

  textFont(myFont);
  textSize(24);
  textAlign(CENTER, CENTER);

  // attach sound toggle button here
  const toggleBtn = document.getElementById("toggle-sound");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      toggleBtn.textContent = soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF";
    });
  }
}

function draw() {
  background(bg);

  if (cupState === "fullmatcha") image(fullmatcha, matchaX, matchaY, matchaW, matchaH);
  if (cupState === "halfmatcha") image(halfmatcha, matchaX, matchaY, matchaW, matchaH);
  if (cupState === "onefourthmatcha") image(onefourthmatcha, matchaX, matchaY, matchaW, matchaH);
  if (cupState === "fullice") image(fullice, matchaX, matchaY, matchaW, matchaH);

  if (dialogState === 1 && !showLetter) {
    showMail = true;
  }

  if (showMail) {
    image(mail, mailX, mailY, mailW, mailH);
  }

  if (showLetter) {
    image(letter, 225, 50, 350, 400);
  }

  if (showDialog) {
    drawDialog(dialogs[dialogState]);
  }
}

function drawDialog(txt) {
  // highlight mail when hovered
  if (mouseX > mailX && mouseX < mailX + mailW &&
      mouseY > mailY && mouseY < mailY + mailH) {
    push();
    noFill();
    stroke(255, 255, 255, 160);
    strokeWeight(6);
    rect(mailX - 1, mailY - 1, mailW + 2, mailH + 2, 2);
    pop();
  }

  // dialog box
  let boxX = 50, boxY = 380, boxW = 700, boxH = 80;
  fill(110, 142, 83, 230);
  noStroke();
  rect(boxX, boxY, boxW, boxH, 20);

  fill(255);
  text(txt, boxX + boxW / 2, boxY + boxH / 2);
}

function mousePressed() {
  if (plop && soundEnabled && !plop.isPlaying()) {
    plop.play();
  }

  // click on cup
  if (
    dialogState == 0 &&
    mouseX > matchaX &&
    mouseX < matchaX + matchaW &&
    mouseY > matchaY &&
    mouseY < matchaY + matchaH
  ) {
    if (cupState === "fullmatcha") {
      cupState = "halfmatcha";
    } else if (cupState === "halfmatcha") {
      cupState = "onefourthmatcha";
    } else if (cupState === "onefourthmatcha") {
      cupState = "fullice";
      dialogState = 1;
      showDialog = true;
    }
  }

  // click on mail
  if (
    showMail &&
    mouseX > mailX &&
    mouseX < mailX + mailW &&
    mouseY > mailY &&
    mouseY < mailY + mailH
  ) {
    showMail = false;
    showLetter = true;
    showDialog = false;

    if (celly && soundEnabled) {
      celly.play();
    }
  }
}
