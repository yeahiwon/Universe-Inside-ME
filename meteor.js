class Meteor {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.length = 10;
    this.r = 0;
    this.c = color(74, 168,random(150,225));
    this.mass = 10;
    this.opacity = 200;
    }

  show() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.length);
  }

  update() {
    this.length+=random(-5,-2);
    this.length-=random(-5,-2);
 }
}
