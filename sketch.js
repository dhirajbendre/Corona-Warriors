//Made by dhiraj.
  var runner,runnerImgImg;
  var ground,groundImg;
  var invisibleGround;
  var corona,coronaImg;
  var cough,coughImg;
  var         precaution,precaution1,precaution2,precaution3,precaution4;
  var sound;
  var score=0;
  var START=2;
  var PLAY=0;
  var END=1;
  var gameState=PLAY;


function preload(){
  

  runnerImg= loadAnimation("runner.gif");
  groundImg=loadImage("MG_VH_CITY_ROAD_LOOP_PREW_500x300.jpg");
  coronaImg=loadImage("corona.png");
  precaution1= loadImage("sanitize.png");
  precaution2= loadImage("soap.png");
  precaution3= loadImage("mask.png");
  precaution4= loadImage("socialdistance.png");
  coughImg=loadImage("cough.png");
  gameOverImg=loadImage("game-over.jpg");
  restartImg=loadImage("play_again_button.png");
  playImg=loadImage("runner.gif");
 
  
  }


function setup() {
  createCanvas(500,250);
  
  
   
  ground= createSprite(200,120,600,400);
  ground.addImage("ground",groundImg);
  ground.x=ground.width/2;
  

  invisibleGround=createSprite(390,270,900,10);
  invisibleGround.visible=false;
 
  runner= createSprite(35,50,20,50);
  runner.addAnimation("running",runnerImg);
  runner.scale = 0.2;
 
  runner.setCollider("rectangle",0,0,15,runner.width);
  

  gameOver = createSprite(259,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  play=createSprite(200,200);
  play.addImage(playImg);
  
  starting=createSprite(200,120,600,400);
  
  
  restart = createSprite(100,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  obstaclesGroup= createGroup();
  precautionsGroup= createGroup();
     
}

function draw() {
   
    fill("black");
    textFont("Comic Sans MS");
    textSize(15);
  
  
  

  if(gameState===PLAY) {
    
    
    
    gameOver.visible=false;
    restart.visible=false;
    play.visible=false;
    starting.visible=false;
    
    ground.velocityX=-3;
  

    if(ground.x < 160){
        ground.x =ground.width/2;
      }
  
 if(keyDown("space")){
   runner.velocityY= -10;
 }
  
  spawnObstacles();
  
      spawnPrecaution();
    
    
    if(precautionsGroup.isTouching(runner)){
      score=score+1;
      precautionsGroup.destroyEach();
    }
    
    
    if(obstaclesGroup.isTouching(runner)){
      gameState=END;
    }
   
    
  }

  if(gameState===END){
    
    
    gameOver.visible=true;
    restart.visible=true;
     play.visible=false;
    starting.visible=false;
    
    ground.visible=false;
    
    
    background("black");
    
    
    ground.velocityX=0;
    runner.velocityX=0;
    
    
  obstaclesGroup.destroyEach();
  precautionsGroup.destroyEach();
  
     
    obstaclesGroup.setLifetimeEach(-1);
    precautionsGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    precautionsGroup.setVelocityXEach(0);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
  }
  
  runner.velocityY=runner.velocityY+0.8;
  
  
  runner.collide(invisibleGround);
  
 
  fill("black");
  textFont("Comic Sans MS");
  textSize(15);
  
  drawSprites();
  

  text("Score : "+ score,100,30);
 
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  ground.visible=true;
  
 
  obstaclesGroup.destroyEach();
  precautionsGroup.destroyEach();
  
  score=0;
}

//spawnObstacles function
function spawnObstacles(){
  if (frameCount % 150 === 0) {
    
  corona= createSprite(390,210,40,10);
  corona.addImage(coronaImg);
  corona.scale = 0.1;
  corona.velocityX = -6;
   
    
  corona.lifetime=300;
    
    
    runner.depth = corona.depth;
    runner.depth = runner.depth+1;
    
    
  obstaclesGroup.add(corona);
    
  
}
   if (frameCount % 270 === 0) {
    
  cough= createSprite(400,100,40,10);
  cough.addImage(coughImg);
  cough.y=Math.round(random(10,180));
  cough.scale = 0.05;
  cough.velocityX = -6
    

  cough.lifetime=300;
    
  
  obstaclesGroup.add(cough);   
}
    
}

function spawnPrecaution(){
  
 if(frameCount%100===0){
   precaution= createSprite(450,150,40,10);
   precaution.y=Math.round(random(10,180));
   precaution.scale = 0.09;
   precaution.velocityX = -5;
   
   
   precautionsGroup.add(precaution);
   
       var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: precaution.addImage(precaution1);
              break;
      case 2: precaution.addImage(precaution2);
              break;
      case 3: precaution.addImage(precaution3);
              break;
      case 4: precaution.addImage(precaution4);
              break;
      default: break;
   
    }

   } 

  
}
