// p5iano

let game_title = "* p5iano * c1.0"
let [canvas_W, canvas_H] = [400, 400];
let switch_X = canvas_W / 2;
let switch_Y = canvas_H / 2;
let switch_W = 80;
let switch_H = 80;
let switch_RGB = [150, 150, 150];
let is_switch_on = 0;
let background_RGB = [230, 230 ,230];
let on_RGB = [250, 250, 250, 150];
let off_RGB = [50, 50, 50, 150];
let is_touch = 0;
let osc;
let amp_vol=0.2;

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
  set_switch(switch_RGB[0], switch_RGB[1], switch_RGB[2], switch_X, switch_Y, switch_W, switch_H);
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
  if ((switch_X - switch_W / 2 < mouseX && mouseX < switch_X + switch_W / 2) && (switch_Y - switch_H / 2 < mouseY && mouseY < switch_Y + switch_H / 2)) {
    if (is_switch_on) {
      is_switch_on = 0;
      sound_off();
    } else {
      is_switch_on = 1;
      sound_on();
    }
  }
}
function set_switch(switch_R, switch_G, switch_B, switch_X, switch_Y, switch_W, switch_H) {
  push();
  noStroke();
  rectMode(CENTER);
  fill(switch_R, switch_G, switch_B);
  rect(switch_X, switch_Y, switch_W, switch_H, 5);
  if (!is_switch_on) {
    fill(switch_R + 30, switch_G + 30, switch_B + 30);
    rect(switch_X - 5, switch_Y -5, switch_W, switch_H, 10);
  }
  pop();
}

function set_light() {
  push();
  noStroke();
  rectMode(CENTER);
  if (is_switch_on) {
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
