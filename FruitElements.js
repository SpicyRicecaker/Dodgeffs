var canvas;
var width;
var height;
var ctx;
var entityList = [];
var player;
var playerId = "bob";
var enemyId = "BIGSCARYENEMY";

function init() {
  //Deals with game window
  canvas = document.querySelector(".gameCanvas");
  canvas.addEventListener("mousedown", onMouseClick);
  canvas.addEventListener("contextmenu", function (noContext) {
    noContext.preventDefault();
  });
  window.addEventListener("keydown", onKeyDown);
  resizeCanvas();
  ctx = canvas.getContext("2d");
  //Makes a new player
  player = new Player(playerId);
  entityList.push(player);
  //Pushes new enemy onto array
  entityList.push(new Enemy(enemyId));
}

function resizeCanvas(){
  width = (canvas.width = window.innerWidth);
  height = (canvas.height = window.innerHeight);
}
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
var totalGameTime = 0;
var currentFps = 0;
var oldTimeStamp = 0;
var secondsPassed;

function game(timeStamp) {
  //timeStamp - oldTimeStamp should be around 1000/60, resulting in 1/60 in seconds passed
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  //Update past time
  oldTimeStamp = timeStamp;
  //1/(1/60) would just be 60
  currentFps = Math.round(1 / secondsPassed);
  //Update game time
  totalGameTime = totalGameTime + secondsPassed;
  //Actual game 
  tick();
  render();
  //Recursively call the next frame
  requestAnimationFrame(game);
}

function tick() {
  for(var i = 0; i < entityList.length; ++i){
    entityList[i].tick();
  }
}

function render() {
  //Account for window resizing if needed
  resizeCanvas();
  //Reset canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Draw background
  ctx.fillStyle = "#434343";
  ctx.fillRect(0, 0, width, height);
  //Display total fps elapsed
  ctx.fillStyle = "#f3f3f3";
  ctx.font = "48px arial";
  ctx.fillText(currentFps, 10, 50);
  //Display total game time, in minutes
  ctx.fillStyle = "#f3f3f3";
  ctx.font = "48px arial";
  ctx.fillText((padNumber(Math.floor(totalGameTime/60)) + ":" + padNumber(Math.floor((totalGameTime%60)))), width/2-60, 50);
  //Render entities
  for(var i = 0; i < entityList.length; ++i){
    entityList[i].render();
  }
}

function degToRad(degrees) {
  return (Math.PI / 180) * degrees;
}

function padNumber(n){
  return (n < 10 ? '0':'') + n;
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

init();
requestAnimationFrame(game);
