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
    this.maxHP = 500;
    this.currentHP = 400;
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
  getMaxHP() {
    return this.maxHP;
  }
  setHp(newMaxHP) {
    this.maxHP = newMaxHP;
  }
  getCurrentHP() {
    return this.currentHP;
  }
  setCurrentHP(newCurrentHP) {
    this.currentHP = newCurrentHP;
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
  rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
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
    console.log(player.getY());
    if (this.getMoving() == false) {
      this.updateDirection();
      this.setMoving(true);
    }
    if (this.getMoving() == true) {
      //move this
      this.move();
    }
  }
  render() {
    //Draw player
    ctx.beginPath();
    ctx.fillStyle = "#ffd966";
    //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
    ctx.arc(this.getX(), this.getY(), 50, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();

    //Draw Destination
    ctx.beginPath();
    ctx.fillStyle = "#a4c2f4";
    //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
    ctx.arc(
      this.getDestinationX(),
      this.getDestinationY(),
      10,
      degToRad(0),
      degToRad(360),
      false
    );
    ctx.fill();
    ctx.closePath();

    //Draw max health (constant)
    
    ctx.beginPath();
    ctx.fillStyle = "#666666";
    ctx.rect((width / 2) - 100, height - 50, 200, 30);
    ctx.fill();
    //Health border
    //ctx.strokeStyle = "#f3f3f3";
    //ctx.lineWidth = 5;
    //ctx.stroke();
    ctx.closePath();
    

    //Draw current health (variable)
    ctx.beginPath();
    //As variable!
    //First draw the color of the hp when it is low
    ctx.fillStyle = "#e06666";
    ctx.rect((width / 2) - 100, height - 50, (this.getCurrentHP()/this.getMaxHP())*200, 30);
    ctx.fill();
    ctx.closePath();

   
    ctx.beginPath();
    //Then blend it with an hp color of increasing opacity??
    ctx.fillStyle = "#93c47d";
    ctx.globalAlpha = (this.getCurrentHP()/this.getMaxHP());
    ctx.rect((width / 2) - 100, height - 50, (this.getCurrentHP()/this.getMaxHP())*200, 30);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.closePath();
    

    //Gotta do something for full hp WIP
    if(this.getCurrentHP() == this.getMaxHP()){
      ctx.beginPath();
      ctx.fillStyle = "#93c47d"
    }
  }
}
