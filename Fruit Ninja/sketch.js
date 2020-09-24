var PLAY =1;
var END =0;
var gameState =1;
var kinfe;
var score=0;
var fruitGroup;
var enemyGroup;

function preload(){
  kinfeImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png")
  fruit2Image=loadImage("fruit2.png")
  fruit3Image=loadImage("fruit3.png")
  fruit4Image=loadImage("fruit4.png")
  swordSound = loadSound("knifeSound.mp3")
  monster1Image = loadImage("alien1.png")
  monster2Image = loadImage("alien2.png")
  overSound = loadSound("gameover.mp3")
  overImage = loadImage("gameover.png")
}
function setup(){
  createCanvas(400,400)
  kinfe=createSprite(200,200,100,100);
  kinfe.addImage("sword.png",kinfeImage)
  kinfe.scale=0.7
  gameState=PLAY;
  
 fruitGroup=new Group();
 enemyGroup=new Group();
  gameOver = createSprite(200,200,100,100)
  gameOver.addImage("gameover.png",overImage)
  
}
function draw(){
  background("blue"); 
  if (gameState===PLAY){
    kinfe.x=mouseX;
    kinfe.y=mouseY;
    gameOver.visible=false;
    if (frameCount%60===0){
      fruit();
    }
    if (kinfe.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      score=score+1
      swordSound.play();
    }

    if (frameCount%200 === 0){
      Enemy();
    }
    if (kinfe.isTouching(enemyGroup)) {
       gameState = END
       overSound.play();
    }
  }
    if(gameState === END){
      gameOver.visible=true;
      
    }
  
  console.log(gameState);
  text("score :"+ score,300,10)
  
  
  
  drawSprites();
}


function fruit(){
  if (frameCount % 60 === 0){
   var fruit = createSprite(Math.round(random(50,350)),Math.round(random(10,200)),10,40);
    fruit.scale=0.2;
    fruit.velocityY=(7+(score/4));
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Image);
              break;
      case 2: fruit.addImage(fruit2Image);
              break;
      case 3: fruit.addImage(fruit3Image);
              break;
      case 4: fruit.addImage(fruit4Image);
              break;
      default: break;
     
    }
    fruitGroup.add(fruit)
    }

}
function Enemy(){
  if (frameCount%200 === 0){
    var monster =createSprite(Math.round(random(50,350)),Math.round(random(10,200)),10,40);
    monster.velocityY=(7+(score/4));
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: monster.addImage(monster1Image);
              break;
      case 2: monster.addImage(monster2Image);
              break;
              default: break;
  }
     enemyGroup.add(monster)
  }
}