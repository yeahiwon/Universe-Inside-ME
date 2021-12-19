var cx = 150;
var cy = 350;
var cr = 50;
var speed = 5;

let meteor = [];

function setup() {
  createCanvas(300, 700);

  for(let i = 0; i < 10; i++) {
  meteor[i] = new Meteor(random(0, 300),random(0, 700));
}
}

function draw() {
  background(0);
  fill(255,0,0);
  if (overCircle(cx,cy,cr)){
  cx = cx + random(-speed,speed);
  cy = cy + random(-speed,speed);
  }
  ellipse(cx,cy,cr*2,cr*2);

  for(let i=0; i < meteor.length; i++) {
    meteor[i].show();
    meteor[i].update();
  }
}

function overCircle(x,y,r){
  if (dist(x,y,mouseX,mouseY)<r){
    return true;
  } else {
    return false;
  }
}
