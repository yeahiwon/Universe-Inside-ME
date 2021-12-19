var cx = 150;
var cy = 350;
var cr = 50;
var speed = 5;


let meteor = [];
///////////////////
let planets = []
let sun;
let numPlanets = 4;
let G = 120;
let destabilise = 0.15;
/////////////////
let t = 100;

let myUniverse;

function preload() {
  myUniverse = loadSound('firststep.mp3');
}

function setup() {

  createCanvas(300, 700);
  myUniverse.loop();
  // myUniverse.play();
  for(let i = 0; i < 10; i++) {
  meteor[i] = new Meteor(random(0, 300),random(0, 700));
}
//////////
sun = new Body(20,createVector(0,0),createVector(0,0))

   // Initialise the planets
 for (let i = 0; i < numPlanets; i++) {
   let mass = random(5, 15)
   let radius = random(sun.d, min(windowWidth/2,windowHeight/2))
   let angle = random(0, TWO_PI)
   let planetPos = createVector(radius * cos(angle), radius * sin(angle))

   // Find direction of orbit and set velocity
   let planetVel = planetPos.copy()
   if (random(1) < 0.1) planetVel.rotate(-HALF_PI)
   else planetVel.rotate(HALF_PI)  // Direction of orbit
   planetVel.normalize()
   planetVel.mult( sqrt((G * sun.mass)/(radius)) ) // Circular orbit velocity
   planetVel.mult( random( 1-destabilise, 1+destabilise) ) // create elliptical orbit

   planets.push( new Body(mass, planetPos, planetVel) )
 }
 //////
}

function draw() {
  background(0);

    //me shaking
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
  translate(width/2, height/2)
 for (let i = numPlanets-1; i >= 0; i--) {
   sun.attract(planets[i])
   planets[i].move()
   planets[i].show()
 }
}

function overCircle(x,y,r){
  if (dist(x,y,mouseX,mouseY)<r){
   t = 200;
    return true;
  } else {
    t = 50;
    return false;
  }
}

function Body(_mass, _pos, _vel){
  this.mass = _mass
  this.pos = _pos
  this.vel = _vel
  this.d = this.mass*2
  this.thetaInit = 0
  this.path = []
  this.pathLen = Infinity

  this.show = function() {
    stroke(220,50)
    for (let i = 0; i < this.path.length-2; i++) {
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y,)
    }
    fill(200,t); noStroke()
    ellipse(this.pos.x, this.pos.y, this.d, this.d)
  }


  this.move = function() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.path.push(createVector(this.pos.x,this.pos.y))
    if (this.path.length > 200) this.path.splice(0,1)
  }

  this.applyForce = function(f) {
    this.vel.x += f.x / this.mass
    this.vel.y += f.y / this.mass
  }

  this.attract = function(child) {
    let r = dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y)
    let f = (this.pos.copy()).sub(child.pos)
    f.setMag( (G * this.mass * child.mass)/(r * r) )
    child.applyForce(f)
  }
}

function mousePressed() {
  myUniverse.play();
}
