class Enemy extends Entity {
  constructor(newId) {
    //We spawn enemies at the top OR bottom of the screen with a random direction.
    super(newId);
    this.name;
    this.x = width/2;
    this.y = height/2;
    this.radius = 25;
    this.direction = 5*Math.PI/4;
    this.moving = true;
    this.velocity = 340;
    this.ccd = false;
  }
  getX() {
    return this.x;
  }
  setX(newX) {
    this.x = newX;
  }
  getY() {
    return this.y;
  }
  setY(newY) {
    this.y = newY;
  }
  getMoving() {
    return this.moving;
  }
  setMoving(newMoving) {
    this.moving = newMoving;
  }
  getDirection() {
    return this.direction;
  }
  //Get's
  getRandomDirection() {}
  getReflectedY(angle) {
    //reflect over y-axis
    //If angle is above x axis
    if (this.getDirection() < Math.PI) {
      return Math.PI - angle;
    }
    //If angle is underneath x axis
    else {
      return 3 * Math.PI - angle;
    }
  }
  getReflectedX(angle) {
    //reflect over x-axis
    return 2 * Math.PI - angle;
  }
  setDirection(newDirection) {
    this.direction = newDirection;
  }
  getVelocity() {
    return this.velocity;
  }
  setVelocity(newVelocity) {
    this.velocity = newVelocity;
  }
  getCcd() {
    return this.ccd;
  }
  getRadius(){
    return this.radius;
  }
  setRadius(newRadius){
    this.radius = newRadius;
  }
  move() {
    //If velocity is 20%, we move across 20% of the screen in 1 second.
    //.2/60 = the amount we move in one frame.
    var r = this.getVelocity() / 60;
    var dx = r * Math.cos(this.getDirection()).toFixed(15);
    var dy = r * Math.sin(this.getDirection()).toFixed(15);
    var collisionX = false;
    var collisionY = false;

    //If we are colliding against the left or right side
    if (this.getX() - this.getRadius() + dx < 0) {
      //var extraX = -this.getX()-this.getRadius()-dx;
      //Set X to extraX
      this.setX(0 + this.getRadius());
      //Reverse direction
      this.setDirection(this.getReflectedY(this.getDirection()));
      collisionX = true;
    } else if (this.getX() + this.getRadius() + dx > width) {
      //var extraX = 2*width - this.getX() - this.getRadius()-dx;
      //Set X to width
      this.setX(width - this.getRadius());
      //Reverse direction
      this.setDirection(this.getReflectedY(this.getDirection()));
      collisionX = true;
    }
    //If we are colliding on the top or bottom
    if (this.getY() - this.getRadius() + dy < 0) {
      //var extraY = -this.getY()-this.getRadius()-dy;
      //Set Y to 0
      this.setY(0 + this.getRadius());
      //Reverse direction
      this.setDirection(this.getReflectedX(this.getDirection()));
      collisionY = true;
    } else if (this.getY() + this.getRadius() + dy > height) {
      //var extraY = 2*height - this.getY() - this.getRadius() - dy;
      //Set Y to height
      this.setY(height - this.getRadius());
      //Reverse direction
      this.setDirection(this.getReflectedX(this.getDirection()));
      collisionY = true;
    }

    if (!collisionX) {
      this.setX(this.getX() + dx);
    }
    if (!collisionY) {
      this.setY(this.getY() + dy);
    }
  }
  tick() {
    if (this.getMoving() == true) {
      //move this
      this.move();
    }
  }
  render() {
    //Draw player
    ctx.fillStyle = "#e06666";
    //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
    ctx.beginPath();
    ctx.arc(this.getX(), this.getY(), 25, degToRad(0), degToRad(360), false);
    ctx.fill();
  }
}
