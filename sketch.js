let meteor = [];

function setup() {
  createCanvas(300, 700);

  for(let i = 0; i < 10; i++) {
  meteor[i] = new Meteor(random(0, 300),random(0, 700));
}
}

function draw() {
  background(0);

  for(let i=0; i < meteor.length; i++) {
    meteor[i].show();
    meteor[i].update();
  }
}
