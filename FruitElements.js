var canvas = document.querySelector(".gameCanvas");
canvas.addEventListener("mousedown", onMouseClick);
canvas.addEventListener("contextmenu", function (noContext) {
  noContext.preventDefault();
});
window.addEventListener("keydown", onKeyDown);
var width = (canvas.width = window.innerWidth);
var height = (canvas.height = window.innerHeight);
var ctx = canvas.getContext("2d");

var player = {
  x: width / 2,
  y: height / 2,
  destinationX: width / 2,
  destinationY: height / 2,
  direction: 0,
  moving: false,
  velocity: 340,
  ccd: false,
  getX: function () {
    return this.x;
  },
  setX: function (newX) {
    this.x = newX;
  },
  getY: function () {
    return this.y;
  },
  setY: function (newY) {
    this.y = newY;
  },
  getDestinationX: function () {
    return this.destinationX;
  },
  setDestinationX: function (newDestinationX) {
    this.destinationX = newDestinationX;
  },
  getDestinationY: function () {
    return this.destinationY;
  },
  setDestinationY: function (newDestinationY) {
    this.destinationY = newDestinationY;
  },
  getMoving: function () {
    return this.moving;
  },
  setMoving: function (newMoving) {
    this.moving = newMoving;
  },
  getDirection: function () {
    return this.direction;
  },
  setDirection: function (newDirection) {
    this.direction = newDirection;
  },
  updateDirection: function () {
    var dx = player.getDestinationX() - player.getX();
    var dy = player.getDestinationY() - player.getY();
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
    player.setDirection(tempRad);
  },
  getVelocity: function () {
    return this.velocity;
  },
  setVelocity: function (newVelocity) {
    this.velocity = newVelocity;
  },
  getCcd: function () {
    return this.ccd;
  },
  move: function(){
      //If velocity is 20%, we move across 20% of the screen in 1 second.
      //.2/60 = the amount we move in one frame.
      var r = player.getVelocity() / 60;
      var dx = r * Math.cos(player.getDirection()).toFixed(15);
      var dy = r * Math.sin(player.getDirection()).toFixed(15);

      //If we're about to go over
      var exactDx = player.getDestinationX() - player.getX();
      var exactDy = player.getDestinationY() - player.getY();
      //That is, the distance to the destination is less than dx
      if (
        Math.abs(exactDx) <= Math.abs(dx) &&
        Math.abs(exactDy) <= Math.abs(dy)
      ) {
        //Set it so
        player.setX(player.getX() + exactDx);
        player.setY(player.getY() + exactDy);
        player.setMoving(false);
      } else {
        //Movement!
        player.setX(player.getX() + dx);
        player.setY(player.getY() + dy);
      }
      //return
  },
  tick: function () {
    if (player.getMoving() == true) {
        //move player
        player.move();
    }
    if (player.getMoving() == false) {
      if (
        player.getDestinationX() != player.getX() ||
        player.getDestinationY() != player.getY()
      ) {
        //Update player direction
        player.updateDirection();
        //console.log(tempRad);
        player.setMoving(true);
      }     }
  },
};

var enemy = {
  x: width / 2,
  y: height / 2,
  destinationX: width / 2,
  destinationY: height / 2,
  direction: 0,
  moving: false,
  velocity: 340,
  ccd: false,
  getX: function () {
    return this.x;
  },
  setX: function (newX) {
    this.x = newX;
  },
  getY: function () {
    return this.y;
  },
  setY: function (newY) {
    this.y = newY;
  },
  getDestinationX: function () {
    return this.destinationX;
  },
  setDestinationX: function (newDestinationX) {
    this.destinationX = newDestinationX;
  },
  getDestinationY: function () {
    return this.destinationY;
  },
  setDestinationY: function (newDestinationY) {
    this.destinationY = newDestinationY;
  },
  getMoving: function () {
    return this.moving;
  },
  setMoving: function (newMoving) {
    this.moving = newMoving;
  },
  getDirection: function () {
    return this.direction;
  },
  setDirection: function (newDirection) {
    this.direction = newDirection;
  },
  getVelocity: function () {
    return this.velocity;
  },
  setVelocity: function (newVelocity) {
    this.velocity = newVelocity;
  },
  getCcd: function () {
    return this.ccd;
  },
  tick: function(){

  }
};

/*
ctx.fillStyle = 'rgb(255, 0, 0)';
//Top left corner distance from top and left, width, height
ctx.fillRect(50,50,100,150);
ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.fillRect(75,75,100,100);
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = 5;
ctx.strokeRect(25,25,175,200);
*/
/*
    First, define the game loop
    Every frame, draw a circle at the character location
    The character should be a class with x,y,angle,dx,dy, moveX, moveY, moving, vel,loc

    On mouse click, define the location to move towards, update the angle.
    So long as the player location does not equal the location to move to, moving is true
    Keyboard s means to stop movement.
*/
var currentFps = 0;
var oldTimeStamp = new Date().getTime();
var secondsPassed;

function game(timeStamp) {
  //timeStamp - oldTimeStamp should be around 1000/60, resulting in 1/60 in seconds passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  //Update past time
  oldTimeStamp = timeStamp;
  //1/(1/60) would just be 60
  currentFps = Math.round(1 / secondsPassed);
  mechanics();
  graphics();
  requestAnimationFrame(game);
}

function mechanics() {
  player.tick();
  enemy.tick();
}

function graphics() {
  //Account for window resizing if needed
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  //Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Draw background
  ctx.fillStyle = "#434343";
  ctx.fillRect(0, 0, width, height);
  //Display total fps elapsed
  ctx.fillStyle = "#f3f3f3";
  ctx.font = "48px arial";
  ctx.fillText(currentFps, 10, 50);
  //Draw player
  ctx.fillStyle = "#ffd966";
  //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
  ctx.beginPath();
  ctx.arc(player.getX(), player.getY(), 50, degToRad(0), degToRad(360), false);
  //console.log("Current location is:", player.getX(), player.getY());
  ctx.fill();
  //Draw Destination
  ctx.fillStyle = "#a4c2f4";
  //Locationx, locationy, radius, start and end angles, clockwise or anticlockwise
  ctx.beginPath();
  ctx.arc(
    player.getDestinationX(),
    player.getDestinationY(),
    10,
    degToRad(0),
    degToRad(360),
    false
  );
  //console.log("Destination is:", player.getDestinationX(), player.getDestinationY());
  ctx.fill();
}

function degToRad(degrees) {
  return (Math.PI / 180) * degrees;
}

function onMouseClick(e) {
  //debug
  //player.setX(e.clientX);
  //player.setY(e.clientY);
  //end
  player.setDestinationX(e.clientX);
  player.setDestinationY(e.clientY);
  player.setMoving(false);
}

function onKeyDown(e) {
  const keyName = e.key;

  //Stops movement!
  if (keyName == "s") {
    player.setDestinationX(player.getX());
    player.setDestinationY(player.getY());
  }
}

requestAnimationFrame(game);
