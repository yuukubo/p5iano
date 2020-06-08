// p5iano

let game_title = "* p5iano * c2.0"
let [canvas_W, canvas_H] = [400, 400];
let key_X = canvas_W / 2;
let key_Y = canvas_H / 2;
let key_W = 80;
let key_H = 80;
let key_RGB = [150, 150, 150];
let is_key_on = 0;
let background_RGB = [230, 230 ,230];
let on_RGB = [250, 250, 250, 150];
let off_RGB = [50, 50, 50, 150];
let is_touch = 0;
let osc;
let amp_vol = 0.2;
let scale = [261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305, 440.000, 466.164, 493.883];
// C4 -> B4
let freq = 440; //A4

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove",  function (event) { event.preventDefault(); }, { passive: false });
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
  osc = new p5.TriOsc();
  osc.amp(amp_vol);
}
 
function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_game_title();
  set_switch(key_RGB[0], key_RGB[1], key_RGB[2], key_X, key_Y, key_W, key_H);
  set_light();
  if (1 == is_touch) {
    touched();
    is_touch = 0;
  }
  set_pointer();
}

function set_pointer() {
  push();
  noStroke();
  fill(255, 255, 0)
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
  if ((key_X - key_W / 2 < mouseX && mouseX < key_X + key_W / 2) && (key_Y - key_H / 2 < mouseY && mouseY < key_Y + key_H / 2)) {
    if (is_key_on) {
      is_key_on = 0;
      sound_off();
      freq = scale[Math.floor(Math.random(0,11) * scale.length)];
      osc.freq(freq);
    } else {
      is_key_on = 1;
      sound_on();
    }
  }
}
function set_switch(key_R, key_G, key_B, key_X, key_Y, key_W, key_H) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(key_R, key_G, key_B);
  rect(key_X, key_Y, key_W, key_H, 5);
  if (!is_key_on) {
    fill(key_R + 30, key_G + 30, key_B + 30);
    rect(key_X - 5, key_Y -5, key_W, key_H, 10);
  }
  pop();
}

function set_light() {
  push();
  noStroke();
  rectMode(CENTER);
  if (is_key_on) {
    fill(on_RGB[0], on_RGB[1], on_RGB[2], on_RGB[3]);
    rect(canvas_W / 2, canvas_H / 2, canvas_W, canvas_H);
  } else {
    fill(off_RGB[0], off_RGB[1], off_RGB[2], off_RGB[3]);
    rect(canvas_W / 2, canvas_H / 2, canvas_W, canvas_H);
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

function sound_on() {
  osc.start();
}

function sound_off() {
  osc.stop();
}
