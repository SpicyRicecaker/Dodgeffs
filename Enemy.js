class Enemy extends Entity {
  constructor(newId) {
    //We spawn enemies at the top OR bottom of the screen with a random direction.
    super(newId);
    this.name;
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 25;
    this.direction = Math.PI / 4;
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
  move() {
    //If velocity is 20%, we move across 20% of the screen in 1 second.
    //.2/60 = the amount we move in one frame.
    var r = this.getVelocity() / 60;
    var dx = r * Math.cos(this.getDirection()).toFixed(15);
    var dy = r * Math.sin(this.getDirection()).toFixed(15);
    var collision = false;

    //If we are colliding against the left or right side
    if (this.getX() + dx < 0) {
      //Set X to 0
      this.setX(0);
      //Set Y to whatever it should be
      this.setY(this.getY() + dy);
      //Reverse direction
      this.setDirection(this.getReflectedY(this.getDirection()));
      collision = true;
    } else if (this.getX() + dx > width) {
      //Set X to width
      this.setX(width);
      //Set Y to whatever it should be
      this.setY(this.getY() + dy);
      //Reverse direction
      this.setDirection(this.getReflectedY(this.getDirection()));
      collision = true;
    }
    //If we are colliding on the top or bottom
    if (this.getY() + dy < 0) {
      //Set Y to 0
      this.setY(0);
      //Set X to whatever it should be
      this.setX(this.getX() + dx);
      //Reverse direction
      this.setDirection(this.getReflectedX(this.getDirection()));
      collision = true;
    } else if (this.getY() + dy > height) {
      //Set Y to height
      this.setY(height);
      //Set X to whatever it should be
      this.setX(this.getX() + dx);
      //Reverse direction
      this.setDirection(this.getReflectedX(this.getDirection()));
      collision = true;
    }

    if (!collision) {
      this.setX(this.getX() + dx);
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
