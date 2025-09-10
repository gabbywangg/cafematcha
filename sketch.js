let particles = []; 
let img;
let x = 80;
let y = 280;
let following = false;

let textSizeVal = 50;
let textColor = '#ffffff';

function preload() {
  img = loadImage('web narratives/flowermug.png')
  mySound = loadSound('web narratives/meditation-music-sound-bite-339735.mp3');
}

function setup() {
  const c = createCanvas(500, 500);
  c.parent('sketch');  // attach canvas inside the <div id="sketch">
  clear();

   // ADD: hook up text size slider
  const textSizeSlider = document.getElementById('text-size');
  const textSizeDisplay = document.getElementById('textSizeVal');

  textSizeSlider.addEventListener('input', () => {
    textSizeVal = parseInt(textSizeSlider.value);
    textSizeDisplay.textContent = textSizeVal;
  });

    // ADD: hook up color picker for text
  const textColorPicker = document.getElementById('text-color');
  textColorPicker.addEventListener('input', () => {
    textColor = textColorPicker.value; // hex string like "#aabbcc"
  });
  }

class Particle {
  constructor() {
    this.x = random(80, width - 90); 
    this.y = 80;
    this.vy = random(-2, -4);
    this.alpha = 255;
  }

  update() {
    this.y -= this.vy;
    this.alpha -= 3;
  }

  show() {
    stroke(0, 120, 200, this.alpha);
    strokeWeight(2);
    line(this.x, this.y, this.x, this.y + 15);
  }

  isFinished() {
    return this.alpha <= 0;
  }

}

function draw() {
  // MODIFY: use textSizeVal instead of fixed size


  // background(118, 134, 90); 
  clear();
 
  fill(109,49,33);
  stroke(149, 69, 53);
  strokeWeight(6);
  rect(70, 70, width - 140, height - 200);

  fill(10, 25, 100);
  noStroke();
  rect(80, 80, width - 160, height - 220);


  particles.push(new Particle());
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();

    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
  fill(109,49,33);
  noStroke();
  rect(60,400,380,400)
  triangle(440, 400, 440, 500, 500, 500);
  triangle(60, 400, 60, 500, 0, 500);
  stroke(100,40,25);
  line(50,420,450,420);
  line(38,440,462,440);
  line(26,460,474,460);
  line(14,480,486,480);
  if (following) {
    x = mouseX-110;
    y = mouseY-130;
  }
  
  image(img, x, y,400,300);
  
//  // MODIFY: use textSizeVal instead of fixed size
//   fill(255);
//   textFont(font);
//   textSize(textSizeVal);
//   text("Cafe Matcha", width / 2 - 250, height / 2 - 150);

  textSize(textSizeVal);
    fill(textColor);
  noStroke();
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  text("Cafe Matcha", width / 2, height / 2 - 50);

}

function mousePressed() {
  following = !following;
  }