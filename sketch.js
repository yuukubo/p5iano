// p5iano

let game_title = "* p5iano * c3.3"
let [canvas_W, canvas_H] = [600, 240];
let key_X = [];
let key_Y = [];
let key_W = 80;
let key_H = 200;
let key_RGB = [240, 240, 240];
let is_key_on = [];
let background_RGB = [130, 230 ,230];
let on_RGB = [250, 250, 250, 150];
let off_RGB = [50, 50, 50, 150];
let is_touch = 0;
let osc = [];
let amp_vol = 0.2;
let scale_w = [261.626, 293.665, 329.628, 349.228, 391.995, 440.000, 493.883];
// C4 -> B4
let scale_b = [277.183, 311.127, 369.994, 415.305, 466.164];
// C#4 -> A#4

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove",  function (event) { event.preventDefault(); }, { passive: false });
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
  for (let i = 0; i < 7; i++) {
    key_X[i] = key_W / 2 + 2 + canvas_W * i / 7;
    key_Y[i] = key_H / 2;
    is_key_on[i] = 0;
//    osc[i] = new p5.TriOsc();
//    osc[i] = new p5.Oscillator('sine');
//    osc[i] = new p5.Oscillator('triangle');
    osc[i] = new p5.Oscillator('sawtooth');
//    osc[i] = new p5.Oscillator('square');
    osc[i].amp(amp_vol);
    osc[i].freq(scale_w[i]);
  }
}

function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_game_title();
  for (let i = 0; i < 7; i++) {
    set_key(key_RGB[0], key_RGB[1], key_RGB[2], key_X[i], key_Y[i], key_W, key_H, is_key_on[i]);
  }
  if (1 == is_touch) {
    touched();
    is_touch = 0;
  }
  set_pointer();
}

function set_pointer() {
  push();
  noStroke();
  fill(250, 100, 10)
  circle(mouseX, mouseY, 4);
  pop();
}

function touchStarted() {
  is_touch = 1;
}
function touched() {
  mousePressed();
  is_touch = 0;
}
function touchEnded() {
  is_touch = 0;
}
function mousePressed() {
  for (let i=0; i < 7; i++) {
    if ((key_X[i] - key_W / 2 < mouseX && mouseX < key_X[i] + key_W / 2) && (key_Y[i] - key_H / 2 < mouseY && mouseY < key_Y[i] + key_H / 2)) {
      if (is_key_on[i]) {
        is_key_on[i] = 0;
        sound_off(osc[i]);
      } else {
        is_key_on[i] = 1;
        sound_on(osc[i]);
      }
    }
  }
}
function set_key(key_R, key_G, key_B, key_X, key_Y, key_W, key_H, is_key_on) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(key_R, key_G, key_B);
  if (!is_key_on) {
    fill(key_R - 30, key_G - 30, key_B - 30);
    rect(key_X, key_Y, key_W, key_H, 5);
    fill(key_R, key_G, key_B);
    rect(key_X - 5, key_Y - 5, key_W, key_H, 5);
  } else {
    fill(key_R, key_G, key_B);
    rect(key_X, key_Y, key_W, key_H, 5);
  }
  pop();
}

function set_game_title() {
  push();
  textSize(10);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(10);
  text(game_title, canvas_W * 8 / 10, canvas_H -20);
  pop();
}

function sound_on(osc) {
  osc.start();
}

function sound_off(osc) {
  osc.stop();
}
