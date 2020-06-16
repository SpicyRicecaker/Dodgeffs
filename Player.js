class Player extends Entity {
  constructor(newId) {
    super(newId);
    this.name;
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 50;
    this.destinationX = width / 2;
    this.destinationY = height / 2;
    this.direction = 0;
    this.moving = false;
    this.velocity = 340;
    this.HP = 500;
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
  getDestinationX() {
    return this.destinationX;
  }
  setDestinationX(newDestinationX) {
    this.destinationX = newDestinationX;
  }
  getDestinationY() {
    return this.destinationY;
  }
  setDestinationY(newDestinationY) {
    this.destinationY = newDestinationY;
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
  setDirection(newDirection) {
    this.direction = newDirection;
  }
  getHP() {
    return this.HP;
  }
  setHp(newHP) {
    this.HP = newHP;
  }
  updateDirection() {
    var dx = this.getDestinationX() - this.getX();
    var dy = this.getDestinationY() - this.getY();
    var tempRad = 0;
    //Calculate angle
    tempRad = Math.atan(dy / dx);
    if (dx == 0) {
      //If origin
      if (dy == 0) {
        //leave
        return;
      }
    } else if (dx > 0) {
      //First quadrant, do nothing
      //dy < 0, fourth quadrant
      if (dy < 0) {
        tempRad = 2 * Math.PI + tempRad;
      }
    }
    //dx < 0
    else {
      //second & third quadrant
      tempRad = Math.PI + tempRad; //good
    }
    this.setDirection(tempRad);
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

    //If we're about to go over
    var exactDx = this.getDestinationX() - this.getX();
    var exactDy = this.getDestinationY() - this.getY();
    //That is, the distance to the destination is less than dx
    if (
      Math.abs(exactDx) <= Math.abs(dx) &&
      Math.abs(exactDy) <= Math.abs(dy)
    ) {
      //Set it so
      this.setX(this.getX() + exactDx);
      this.setY(this.getY() + exactDy);
      this.setMoving(false);
    } else {
      //Movement!
      this.setX(this.getX() + dx);
      this.setY(this.getY() + dy);
    }
    //return
  }
  tick() {
    if (this.getMoving() == true) {
      //move this
      this.move();
    }
    if (this.getMoving() == false) {
      if (
        this.getDestinationX() != this.getX() ||
        this.getDestinationY() != this.getY()
      ) {
        //Update this direction
        this.updateDirection();
        //console.log(tempRad);
        this.setMoving(true);
      }
    }
  }
  render() {
    //Draw player
    ctx.fillStyle = "#ffd966";
    //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
    ctx.beginPath();
    ctx.arc(this.getX(), this.getY(), 50, degToRad(0), degToRad(360), false);
    ctx.fill();

    //Draw Destination
    ctx.fillStyle = "#a4c2f4";
    //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
    ctx.beginPath();
    ctx.arc(
      this.getDestinationX(),
      this.getDestinationY(),
      10,
      degToRad(0),
      degToRad(360),
      false
    );
    ctx.fill();
  }
}
