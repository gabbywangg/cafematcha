let img
let imgX = 650;  
let imgY = 70;  
let imgW = 140;   
let imgH = 160; 
let objects = [];

let myFont;
let bg, poster;
let bluemug, orangemug, stripedmug, glass1, glass2, milk;
let whiskonstand, whisk, kettle, waterkettle, matchacan, scoop;
let syrup, syrupopen, honey, honeyopen;
let chawan, filledchawan, ice, halfice, fullice;
let pouringmilk, milkglass;
let fullScoop; 

let dialogState = 0;
let dialogs = [
  "Yay! Today I'll walk you through how to make a matcha that you can take to go. I'll play some music while we work. (click to continue)", 
  "First you will have to get the chawan (pink bowl). Bring it to the center counter indicated by the circle.", 
  "Perfect! Now add two scoops of matcha powder using the chashaku (scoop). First you need to get matcha powder and then bring it to the chawan.", 
  "Great job! Now you need to add 70 mL of hot water into the chawan by using the kettle. I'll let you know when to stop.", 
  "Stop! That's perfect! Okay, next step is to whisk the matcha. So grab the matcha whisk from the shelf and whisk the matcha in a W motion.", 
  "So fluffy! Great job whisking! Now you can grab the to go cup from the top shelf.",
  "We'll be doing an iced matcha today so add some ice to the glass. Usually six ice cubes is great!",
  "Now add a sweetener of your choice into the glass: syrup or honey!",
  "Nice and sweet! Next we'll add some milk into your glass.",
  "Awesome! You're almost done! The last step is to pour your matcha mixture into the glass.",
  "Congrats! You made your first matcha! You've got some natural skills. I guess I'll be seeing you more often. Click the matcha sign to go drink your matcha."
];
let showDialog = true;

// chawan
let chawanX = 260, chawanY = 160, chawanW = 60, chawanH = 45;
let chawanDragging = false;
let chawanPlaced = false;

// circle
let chawanTargetX = 390, chawanTargetY = 320, chawanTargetR = 45;

// scoop
let scoopX = 140, scoopY = 150, scoopW = 65, scoopH = 50;
let scoopDragging = false;
let scoopFull = false;
let scoopLocked = false;
let scoopCount = 0;

// kettle
let kettleX = 220, kettleY = 220, kettleW = 120, kettleH = 90;
let kettleDragging = false;
let kettleLocked = false;
let pourStartTime = 0;

// whisk
let whiskStandX = 100, whiskStandY = 125;
let whiskX = 100, whiskY = 125, whiskW = 40, whiskH = 75;
let whiskDragging = false;
let whiskPickedUp = false;
let whiskHoverStart = 0;
let whiskHoverTimeRequired = 3000;

let chawanFilled = false; 

// to go cup
let glass1X = 360, glass1Y = 38, glass1W = 49, glass1H = 55;
let glass1Dragging = false;
let glass1Placed = false;

//circle
let glass1TargetX = 490, glass1TargetY = 320, glass1TargetR = 30;

// cup state
let cupState = "empty"; // empty → halfice → fullice

// ice
let iceX = 55, iceY = 230, iceW = 40, iceH = 40;
let iceDragging = false;

// sweetener
let syrupX = 395, syrupY = 120, syrupW = 30, syrupH = 85;
let honeyX = 435, honeyY = 145, honeyW = 30, honeyH = 60;
let syrupDragging = false, honeyDragging = false;
let sweetenerHoverStart = 0, sweetenerHoverTime = 2000;

//milk
let milkX = 340, milkY = 120, milkW = 45, milkH = 85;
let milkDragging = false;
let milkHoverStart = 0, milkHoverTime = 4000;

//pouring matcha
let filledchawanDragging = false;
let pouringMatcha = false;
let matchaHoverStart = 0;
let matchaHoverTime = 2000;

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
  whisk = loadImage("whisk.png");
  kettle = loadImage("kettle.png");
  waterkettle = loadImage("waterkettle.png");
  matchacan = loadImage("matchacan.png");
  scoop = loadImage("scoop.png");
  syrup = loadImage("Syrup.png");
  syrupopen = loadImage("syrupopen.png");
  honey = loadImage("honey.png");
  honeyopen = loadImage("honeyopen.png");
  chawan = loadImage("chawan.png");
  filledchawan = loadImage("filledchawan.png");
  fullScoop = loadImage("fullscoop.png");
  ice = loadImage("ice.png");
  halfice = loadImage("halfice.png");
  fullice = loadImage("fullice.png");
  pouringmilk = loadImage("pouringmilk.png");
  milkglass = loadImage("milkglass.png");
  pouringmatcha = loadImage("pouringmatcha.png");
  fullmatcha = loadImage("fullmatcha.png");
  myFont = loadFont("matchafont.ttf");
  plop = loadSound("plop.mp3")
  mySound = loadSound('lofi.mp3');
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

  image(bluemug, 100, 43, 50, 50);
  image(orangemug, 180, 43, 54, 50);
  image(stripedmug, 270, 44, 54, 50);
  image(glass2, 440, 33, 45, 60);
  image(matchacan, 200, 155, 38, 45);

  // sweetener
  if (!syrupDragging) image(syrup, syrupX, syrupY, syrupW, syrupH);
  else image(syrupopen, syrupX, syrupY, 90, syrupH);

  if (!honeyDragging) image(honey, honeyX, honeyY, honeyW, honeyH);
  else image(honeyopen, honeyX, honeyY, 70, honeyH);
  
  //milk
  if (!milkDragging) image(milk, milkX, milkY, milkW, milkH);
  else image(pouringmilk, milkX, milkY, 90, milkH);

  // circle
  if (dialogState === 1 && !chawanPlaced) {
    push();
    noFill();
    stroke(222,93,131);
    strokeWeight(3);
    ellipse(chawanTargetX, chawanTargetY, chawanTargetR * 2);
    pop();
  }
  
  if (pouringMatcha) {
  image(pouringmatcha, chawanX, chawanY, chawanW, chawanH);
} else if (chawanFilled) {
  image(filledchawan, chawanX, chawanY, chawanW, chawanH);
} else {
  image(chawan, chawanX, chawanY, chawanW, chawanH);
}

  // scoop
  if (scoopFull) {
    image(fullScoop, scoopX, scoopY, scoopW, scoopH);
  } else {
    image(scoop, scoopX, scoopY, scoopW, scoopH);
  }

  // kettle
  let kettleAboveChawan = kettleX < chawanX + chawanW && kettleX + kettleW > chawanX &&
                          kettleY < chawanY + chawanH && kettleY + kettleH > chawanY;

  if (kettleDragging && kettleAboveChawan) {
    image(waterkettle, kettleX, kettleY, kettleW, kettleH);
    if (pourStartTime === 0) pourStartTime = millis();
  } else {
    image(kettle, kettleX, kettleY, kettleW, kettleH);
    pourStartTime = 0;
  }

  if (kettleDragging && kettleAboveChawan && !kettleLocked) {
    if (millis() - pourStartTime > 4000) {
      kettleLocked = true;
      kettleDragging = false;
      kettleX = 220; kettleY = 220;
      dialogState = 4;
      showDialog = true;
      pourStartTime = 0;
    }
  }

  // whisk
  if (!whiskPickedUp) {
    image(whiskonstand, whiskStandX, whiskStandY, whiskW, whiskH);
  } else {
    image(whisk, whiskX, whiskY, whiskW, whiskH);
  }

  let whiskAboveChawan = whiskX < chawanX + chawanW &&
                         whiskX + whiskW > chawanX &&
                         whiskY < chawanY + chawanH &&
                         whiskY + whiskH > chawanY;

  if (whiskPickedUp && whiskAboveChawan) {
    if (whiskHoverStart === 0) whiskHoverStart = millis();
    if (millis() - whiskHoverStart > whiskHoverTimeRequired) {
      whiskPickedUp = false;
      whiskHoverStart = 0;
      whiskX = whiskStandX;
      whiskY = whiskStandY;
      chawanFilled = true;
      dialogState++;
      showDialog = true;
    }
  } else {
    whiskHoverStart = 0;
  }

  // circle 2
  if (dialogState === 5 && !glass1Placed) {
    push();
    noFill();
    stroke(222,93,131);
    strokeWeight(3);
    ellipse(glass1TargetX, glass1TargetY, glass1TargetR * 2);
    pop();
  }

  if (cupState === "empty") image(glass1, glass1X, glass1Y, glass1W, glass1H);
  if (cupState === "halfice") image(halfice, glass1X, glass1Y, glass1W, glass1H);
  if (cupState === "fullice") image(fullice, glass1X, glass1Y, glass1W, glass1H);
  if (cupState === "milkglass") image(milkglass, glass1X, glass1Y, glass1W, glass1H);
  if (cupState === "fullmatcha") image(fullmatcha, glass1X, glass1Y, glass1W, glass1H);

  if (iceDragging) image(ice, iceX, iceY, iceW, iceH);

  if (showDialog) {
    push();
    fill(110, 142, 83, 230);
    noStroke();
    rect(30, 405, 740, 80, 10);
    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(dialogs[dialogState], 45, 432, 680);
    pop();
  }

  let sweetenerAboveGlass = glass1Placed &&
                            ((syrupDragging &&
                              syrupX < glass1X + glass1W && syrupX + syrupW > glass1X &&
                              syrupY < glass1Y + glass1H && syrupY + syrupH > glass1Y) ||
                             (honeyDragging &&
                              honeyX < glass1X + glass1W && honeyX + honeyW > glass1X &&
                              honeyY < glass1Y + glass1H && honeyY + honeyH > glass1Y));

  if (dialogState === 7 && sweetenerAboveGlass) {
    if (sweetenerHoverStart === 0) sweetenerHoverStart = millis();
    if (millis() - sweetenerHoverStart > sweetenerHoverTime) {
      dialogState++;
      showDialog = true;
      sweetenerHoverStart = 0;

      syrupDragging = false;
      honeyDragging = false;
      syrupX = 395; syrupY = 120;
      honeyX = 435; honeyY = 145;
    }
  } else {
    sweetenerHoverStart = 0;
  }
  
  let milkAboveGlass = glass1Placed && 
                        (milkDragging &&
                              milkX < glass1X + glass1W && milkX + milkW > glass1X &&
                              milkY < glass1Y + glass1H && milkY + milkH > glass1Y)
  if (dialogState === 8 && milkAboveGlass) {
  if (milkHoverStart === 0) milkHoverStart = millis();
  if (millis() - milkHoverStart > milkHoverTime) {
    if (cupState === "fullice") {
      cupState = "milkglass";
    }

    dialogState++;
    showDialog = true;
    milkHoverStart = 0;

    milkDragging = false;
    milkX = 340; 
    milkY = 120;
  }
} else {
  milkHoverStart = 0;
}
  
  let matchaAboveGlass = glass1Placed && chawanFilled &&
                       filledchawanDragging &&
                       chawanX < glass1X + glass1W && chawanX + chawanW > glass1X &&
                       chawanY < glass1Y + glass1H && chawanY + chawanH > glass1Y;

if (dialogState === 9 && matchaAboveGlass) {
  if (matchaHoverStart === 0) matchaHoverStart = millis();
  pouringMatcha = true;

  if (millis() - matchaHoverStart > matchaHoverTime) {
    cupState = "fullmatcha";
    chawanFilled = false;
    pouringMatcha = false;
    filledchawanDragging = false;

    chawanX = 260; 
    chawanY = 160;

    dialogState++;
    showDialog = true;
    matchaHoverStart = 0;
  }
} else {
  pouringMatcha = false;
  matchaHoverStart = 0;
}

  image(img, imgX, imgY, imgW, imgH);

  if (dialogState === 10 &&
      mouseX > imgX && mouseX < imgX + imgW &&
      mouseY > imgY && mouseY < imgY + imgH) {
    push();
    noFill();
    stroke(222, 93, 131);
    strokeWeight(6);
    rect(imgX - 4, imgY - 4, imgW + 8, imgH + 8, 10);
    pop();
  }

}

function mousePressed() {
  if (plop && soundEnabled && !plop.isPlaying()) {
  plop.play();
}
  if (dialogState === 0 &&
      mouseX > 40 && mouseX < 760 && mouseY > 390 && mouseY < 470) {
    dialogState = 1;
    showDialog = true;
  }
  
  // chawan
  if (dialogState === 1 && !chawanPlaced &&
      mouseX > chawanX && mouseX < chawanX + chawanW &&
      mouseY > chawanY && mouseY < chawanY + chawanH) chawanDragging = true;

  // scoop
  if (dialogState === 2 && !scoopLocked &&
      mouseX > scoopX && mouseX < scoopX + scoopW &&
      mouseY > scoopY && mouseY < scoopY + scoopH) scoopDragging = true;

  // kettle
  if (dialogState === 3 && !kettleLocked &&
      mouseX > kettleX && mouseX < kettleX + kettleW &&
      mouseY > kettleY && mouseY < kettleY + kettleH) kettleDragging = true;

  // whisk
if (dialogState === 4) {
  if (!whiskPickedUp &&
      mouseX > whiskStandX && mouseX < whiskStandX + whiskW &&
      mouseY > whiskStandY && mouseY < whiskStandY + whiskH) {
    whiskPickedUp = true;
    whiskDragging = true;
  } else if (whiskPickedUp &&
             mouseX > whiskX && mouseX < whiskX + whiskW &&
             mouseY > whiskY && mouseY < whiskY + whiskH) {
    whiskDragging = true;
  }
}
  
  if (dialogState === 5 && !glass1Placed &&
      mouseX > glass1X && mouseX < glass1X + glass1W &&
      mouseY > glass1Y && mouseY < glass1Y + glass1H) glass1Dragging = true;

  if (dialogState === 6 &&
      mouseX > 55 && mouseX < 55 + 120 &&
      mouseY > 230 && mouseY < 230 + 80) {
    iceDragging = true;
    iceX = mouseX - iceW/2;
    iceY = mouseY - iceH/2;
  }

  // syrup
  if (dialogState === 7 &&
      mouseX > syrupX && mouseX < syrupX + syrupW &&
      mouseY > syrupY && mouseY < syrupY + syrupH) syrupDragging = true;

  // honey
  if (dialogState === 7 &&
      mouseX > honeyX && mouseX < honeyX + honeyW &&
      mouseY > honeyY && mouseY < honeyY + honeyH) honeyDragging = true;
  
  // milk
  if (dialogState === 8 &&
      mouseX > milkX && mouseX < milkX + milkW &&
      mouseY > milkY && mouseY < milkY + milkH) milkDragging = true;
  
  // chawan
  if (dialogState === 9 && chawanFilled &&
      mouseX > chawanX && mouseX < chawanX + chawanW &&
      mouseY > chawanY && mouseY < chawanY + chawanH) {
    filledchawanDragging = true;
  }

  if (dialogState === 10 &&
      mouseX > imgX && mouseX < imgX + imgW &&
      mouseY > imgY && mouseY < imgY + imgH) {
    window.location.href = "drinking.html";
  }
}

function mouseDragged() {
  if (chawanDragging) {
    chawanX = mouseX - chawanW / 2;
    chawanY = mouseY - chawanH / 2;
  }
  
  if (scoopDragging) {
    scoopX = mouseX - scoopW / 2;
    scoopY = mouseY - scoopH / 2;
  }
  
  if (kettleDragging) {
    kettleX = mouseX - kettleW / 2;
    kettleY = mouseY - kettleH / 2;
  }
  
  if (whiskDragging) {
    whiskX = mouseX - whiskW / 2;
    whiskY = mouseY - whiskH / 2;
  }
  
  if (glass1Dragging) {
    glass1X = mouseX - glass1W /2;
    glass1Y = mouseY - glass1H / 2;
  }

  if (iceDragging) {
    iceX = mouseX - iceW / 2;
    iceY = mouseY - iceH / 2;
  }

  if (syrupDragging) {
    syrupX = mouseX - syrupW / 2;
    syrupY = mouseY - syrupH / 2;
  }

  if (honeyDragging) {
    honeyX = mouseX - honeyW / 2;
    honeyY = mouseY - honeyH / 2;
  }
  
  if (milkDragging) {
    milkX = mouseX - milkW / 2;
    milkY = mouseY - milkH / 2;
  }
  
  if (filledchawanDragging) {
  chawanX = mouseX - chawanW / 2;
  chawanY = mouseY - chawanH / 2;
}
}

function mouseReleased() {
  if (chawanDragging) {
    let d = dist(chawanX + chawanW / 2, chawanY + chawanH / 2, chawanTargetX, chawanTargetY);
    if (d < chawanTargetR) {
      chawanX = chawanTargetX - chawanW / 2;
      chawanY = chawanTargetY - chawanH / 2;
      chawanPlaced = true;
      dialogState = 2;
      showDialog = true;
    }
    chawanDragging = false;
  }

  if (scoopDragging) {
    if (!scoopFull &&
        scoopX < 200 + 38 && scoopX + scoopW > 200 &&
        scoopY < 155 + 45 && scoopY + scoopH > 155) {
      scoopFull = true;
    }
    if (scoopFull && chawanPlaced &&
        scoopX < chawanX + chawanW && scoopX + scoopW > chawanX &&
        scoopY < chawanY + chawanH && scoopY + scoopH > chawanY) {
      scoopFull = false;
      scoopCount++;
      if (scoopCount >= 2) {
        scoopLocked = true;
        scoopX = 140;
        scoopY = 150;
        dialogState = 3;
        showDialog = true;
      }
    }
    scoopDragging = false;
  }

  if (kettleDragging) kettleDragging = false;

  if (whiskDragging) whiskDragging = false;
  
  if (glass1Dragging) {
    let d = dist(glass1X + glass1W / 2, glass1Y + glass1H / 2, glass1TargetX, glass1TargetY);
    if (d < glass1TargetR) {
      glass1X = glass1TargetX - glass1W / 2;
      glass1Y = glass1TargetY - glass1H / 2;
      glass1Placed = true;
      dialogState = 6;
      showDialog = true;
    }
    glass1Dragging = false;
  }

  if (iceDragging) {
    let iceAboveGlass = glass1Placed &&
                        iceX < glass1X + glass1W && iceX + iceW > glass1X &&
                        iceY < glass1Y + glass1H && iceY + iceH > glass1Y;
    if (iceAboveGlass) {
      if (cupState === "empty") {
        cupState = "halfice";
      } else if (cupState === "halfice") {
        cupState = "fullice";
        dialogState = 7;
        showDialog = true;
      }
    }
    iceDragging = false;
  }

  if (syrupDragging) {
    syrupDragging = false;
    syrupX = 395;
    syrupY = 120;
  }
  if (honeyDragging) {
    honeyDragging = false;
    honeyX = 435;
    honeyY = 145;
  }
  
  if (filledchawanDragging) {
  filledchawanDragging = false;
}
}

window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sound");
  toggleBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      mySound.loop();  
      toggleBtn.textContent = "sound on";
    } else {
      mySound.stop();  
      toggleBtn.textContent = "sound off";
    }
  });
});
