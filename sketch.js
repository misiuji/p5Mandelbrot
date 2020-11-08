

class compositeNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  getMag() {
    return sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }
  square() {
    let real = this.real * this.real - this.imaginary * this.imaginary;
    let imaginary = 2 * this.real * this.imaginary;
    this.real = real;
    this.imaginary = imaginary;
  }
  add(other) {
    this.real += other.real;
    this.imaginary += other.imaginary;
  }
};

function distance(x, y) {
  return sqrt(x * x + y * y);
}

const scaleVar = 50000000; //px per 1 unit
// const scaleVar = 100; //px per 1 unit
const reps = 512;
const step = 25; //px per block
// const step = 10; //px per block
const offsetX = -1.45, offsetY = 0;
// const offsetX = 0, offsetY = 0;
var numberOfNochesX, numberOfNochesY, stepsX, stepsY, scalingFactor = step / scaleVar;
var x, y;
var startX, startY, stopX, stopY;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  numberOfNochesX = floor(floor(width / 2) * scalingFactor) * 2;
  numberOfNochesY = floor(floor(height / 2) * scalingFactor) * 2;

  stepsX = floor(floor(width / 2) / step);
  stepsY = floor(floor(height / 2) / step);

  startX = (-stepsX - 1) * scalingFactor + offsetX;
  startY = (-stepsY - 1) * scalingFactor + offsetY;
  if (startX < -2) startX = -2;
  if (startY < -2) startY = -2;
  x = startX;
  y = startY;

  stopX = (stepsX + 1) * scalingFactor + offsetX;
  stopY = (stepsY + 1) * scalingFactor + offsetY;
  if (stopX > 2) stopX = 2;
  if (stopY > 2) stopY = 2;
  background(200);
}

function draw() {
  translate(width / 2, height / 2);
  scale(scaleVar);
  noStroke();
  if (y > stopY) {
    y = startY;
    x += scalingFactor;
    if (x > stopX) {
      resetMatrix();
      // lines();
      noLoop();
    }
  }


  fill(0);
  var z = new compositeNumber(0, 0);
  var c = new compositeNumber(x, y);
  for (var i = 0; i < reps; i++) {
    z.square();
    z.add(c);
    if (z.real == 0 && z.imaginary == 0) {
      break;
    }
    if (z.getMag() >= 2) {
      colorMode(HSB, 100);
      fill((i) % 100, 100, 100);
      colorMode(RGB, 255);
    }
  }
  rect(x - offsetX, y - offsetY, scalingFactor, scalingFactor);

  y += scalingFactor;
}
function mousePressed() {
  resetMatrix();
  // lines();
  noLoop();

}
