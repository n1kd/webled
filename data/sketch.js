var socket;
let colors = [];
var c = (255,255,255);
var shift_h;
var shift_w;

function setup() {
  createCanvas(400, 400);
  shift_h = height/2;
    shift_w = width/2;
  colorMode(HSB);
  for (let i = 0; i < 360; i++) {
     colors[i] = color(i, 100, 100);
  }
  colorMode(RGB);

  socket = new WebSocket('ws://webled.local/ws/');
  socket.addEventListener('open', function (event) {
    socket.send('Hello is web led!');
  });
  socket.onmessage = function (event) {
    console.log('message ', event.data);
  };
}

function draw() {
  background(255);
  rain();
  minicir();
}

function rain(){
  noStroke();
  translate(shift_w, shift_h);
  for (let i = 0; i < 360; i++) {
    fill(colors[i]);
    let angle = map(i, 0, 360, 0, TWO_PI);
    arc(0, 0, 400, 400, angle, angle + TWO_PI / 360.0 + 0.01);
  }
  fill(color(c));
  ellipse(0, 0, 150, 150);
}

function minicir(){
  let xx = (mouseX - shift_w)*(mouseX - shift_w);
  let yy = (mouseY - shift_h)*(mouseY - shift_h); 
  if (sqrt(xx + yy) < 200 & sqrt(xx + yy) > 75){
    translate(-shift_w, -shift_h);
    stroke(0); 
    noFill();
    ellipse(mouseX, mouseY, 10, 10);
    if (mouseIsPressed){
      c = get(mouseX, mouseY);
      socket.send("$" + c);
    }
  }
}
