var p1,p2,eny1,eny2,eny3;
var blast,blastImage,road,roadImage;
var car1,car1Image, laserImage;
//var shoot = 0;
var score = 0;
var music2;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
var music
var road2,road2Img;
function preload() {
  roadImage = loadImage("bg11.jpg");
  car1Image = loadImage("c1.png");

  eny1 = loadImage("c22.png");
  eny2 = loadImage("c22.png");
  eny3 = loadImage("c22.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  music2 = loadSound("bg4.mp3")
  music = loadSound("bgSound.mp3")
  road2Img=loadImage("bg22.jpg")
}

function setup() {  
  canvas = createCanvas(1000,700);
  



  road2=createSprite(1000,700,10,10);
  road2.addImage(road2Img);
  road2.scale=0.8

road = createSprite(500,350,30,20);
road.addImage(roadImage);
road.velocityY = (15 + score/10);
road.scale=3;

  car1 = createSprite(500,600);
  car1.addImage(car1Image);
  car1.scale = 0.6;
  //car1.debug=true;
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  enyGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(road2Img);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(road.y > 800) {
      road.y = 300;
    }
    
   // shoot = shoot - 1;

    

    if(keyDown("right") && car1.x < 1400) {
      car1.x = car1.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && car1.x > 50) {
      car1.x = car1.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(enyGroup.isTouching(car1) || enyGroup.isTouching(car1)) {
      enyGroup.destroyEach();
      var blast = createSprite(car1.x,car1.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      car1.destroy();
      gameState = end;
    }
    
    if(enyGroup.isTouching(laserGroup)) {
      enyGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    eny();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    score = score + Math.round(getFrameRate()/60);
    
    if(enyGroup.isTouching(endline)) {
      enyGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    road.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("Try again :)",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

 
  }


  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("CAR RACE",canvas.width/2-300,canvas.height/2-300);
   
    stroke("white");
    fill("white");
    textSize(35);
    textFont("Apple Chancery");
    text("-Sawan",canvas.width/2-300,canvas.height/2+150);
   
    text("  Use right and left arrows to move.",canvas.width/2-300,canvas.height/2-100);
    text("  Press 'P' to start the game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("p")) {
      gameState = play;
    //  music.loop();
      music2.loop();
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function eny() {
  if(frameCount % 110 === 0) {
  
    var eny = createSprite(Math.round(random(200,1000)),-20);
    eny.velocityY = (6 + score/10);
    eny.lifetime = 200;
    eny.scale =(0.6);
   // eny.debug = true;
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: eny.addImage(eny1);
      //asteroid.debug = true;
      eny.setCollider("rectangle",0,0,150,220);
              break;
      case 2: eny.addImage(eny2);
      //asteroid.debug = true;
      eny.setCollider("rectangle",0,0,150,220);
              break;
      case 3: eny.addImage(eny3);
      //asteroid.debug = true;
      eny.setCollider("rectangle",0,0,150,220)
      default: break;
    }
    
    //console.log(asteroid.x);
    enyGroup.add(eny);
  }
  drawSprites();
}