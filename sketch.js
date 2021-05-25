var fox;
var END = 0,PLAY;
var gameState = PLAY;
var score = 0;
var luckGroup;
var psts;

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
}

function setup(){
    var canvas = createCanvas(windowWidth - 20,windowHeight);
    fox = createSprite(windowWidth/2,550,50,50);
    fox.shapeColor = "orange";
    ground = createSprite(windowHeight,windowHeight,windowWidth + 10000,windowHeight/4);
    ground.shapeColor = "brown";
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);
    score = 0;
    
    luckGroup = new Group();

    // if(mousePressedOver(restart)) {
    // reset();
    // }
    //ground = new Ground(windowHeight,windowHeight,windowWidth + 100,windowHeight/4);
    //fox = new Fox(windowWidth/2,windowHeight/2,50,50);
    //fox = new Fox(10,30,50,50);
}

function draw(){
    background("darkblue");
    textSize(20);
    fill("black");
    text("PRESS SPACE TO JUMP",50,50);
    textSize(30);
    fill("white");
    text("SCORE : "+ score, 1100,50);


    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
      
        if(keyDown("space") && fox.y >= 159) {
          fox.velocityY = -10;
        }
      
        fox.velocityY = fox.velocityY + 0.8
      
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
      
        fox.collide(ground);
        spawnBluck();
      
        if(luckGroup.isTouching(fox)){
           gameState = END;
        }
      }
      else if (gameState === END) {
        
        //set velcity of each game object to 0
        ground.velocityX = 0;
        fox.velocityY = 0;
        luckGroup.setVelocityXEach(0);
        fill(rgb(200,30,10,105));
        textSize(50);
        stroke(7);
        text("GAME OVER",windowWidth/2-100,windowHeight/3);
      }

    //Engine.update(engine);
    //ground.display();
   // fox.display();
   drawSprites();
}

function spawnBluck() {
    //write code here to spawn the clouds
    if (frameCount % 80 === 0) {
      var badLuck = createSprite(1300,120,40,40);
      badLuck.shapeColor = rgb(random(0,255),random(0,255),random(0,255))
      badLuck.y = Math.round(random(300,550));
      //badLuck.scale = 0.5;
      badLuck.velocityX = -3;
      
      //assign lifetime to the variable
      badLuck.lifetime = 400;
      
      //adjust the depth
      badLuck.depth = fox.depth;
      fox.depth = fox.depth + 1;
      
      //add each cloud to the group
      luckGroup.add(badLuck);
    }
    
  }
  