let ballslist = [];
const num = 15;
let maxdist = 0;
const diameter = 15;

class balls {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.xvelo = random(-2, 2);
    this.yvelo = random(-2, 2);
    this.number = 0;
  }

  update() {
    if (this.x > width || this.x < 0) {
      this.xvelo *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.yvelo *= -1;
    }

    this.x += this.xvelo;
    this.y += this.yvelo;
  }

  lines() {
    for (let i = this.number + 1; i < num; i++) {
      let x1 = ballslist[i].x;
      let y1 = ballslist[i].y;
      let distance = dist(this.x, this.y, x1, y1);
      let weight = map(distance, 0, maxdist, 5, 0);
      //let hue = map(distance, 0, maxdist, 0, 255);
      strokeWeight(weight);
      //stroke(hue, 255, 255);
      line(this.x, this.y, x1, y1);
    }
  }

  collide() {
    for (let i = this.number + 1; i < num; i++) {
      let x1 = ballslist[i].x;
      let y1 = ballslist[i].y;
      if (dist(x1, y1, this.x, this.y) < diameter) {
        let xvel = ballslist[i].xvelo;
        let yvel = ballslist[i].yvelo;
        let angle = atan2(this.x - x1, this.y - y1);
        this.yvelo = sin(angle) * sqrt(sq(this.xvelo) + sq(this.yvelo));
        this.xvelo = cos(angle) * sqrt(sq(this.xvelo) + sq(this.yvelo));
        ballslist[i].yvelo = -(sin(angle) * sqrt(sq(xvel) + sq(yvel)));
        ballslist[i].xvelo = -(cos(angle) * sqrt(sq(xvel) + sq(yvel)));
      }
    }
  }

  display() {
    circle(this.x, this.y, diameter);
  }
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < num; i++) {
    ballslist[i] = new balls();
    ballslist[i].number = i;
  }

  maxdist = sqrt(sq(width) + sq(height));
  
  colorMode(HSB);
}

function draw() {
  background(255);

  for (let i = 0; i < num; i++) {
    ballslist[i].update();
    ballslist[i].collide();
    ballslist[i].lines();
  }

  for (let i = 0; i < num; i++) {
    strokeWeight(1);
    stroke(0);
    ballslist[i].display();
  }
}
