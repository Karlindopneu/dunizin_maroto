var trex, trex_running, trex_collided;
var ground, groundImage;
var cade_o_chao;
var ih_vai_chuve;
var ih_vai_chuve_image;
var trio_dos_cacto;
var cacto;
var cacto_com_terrinha;
var o_bonde_dos_cacto;
var duprinha_de_cacto_com_terrinha;
var duprinha_de_cacto;
var PLAY=1;
var END=0;
var game_stats=PLAY;
var obstacle_group;
var clouds_group;
var checkpoint;
var morreu_parsa;
var pulin;
var us_pontin=0;
function preload() {
  checkpoint=loadSound("checkpoint.mp3");
  morreu_parsa=loadSound("die.mp3");
  pulin=loadSound("jump.mp3");
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ih_vai_chuve_image=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  trio_dos_cacto=loadImage("obstacle6.png");
  cacto=loadImage("obstacle5.png");
  cacto_com_terrinha=loadImage("obstacle4.png");
  o_bonde_dos_cacto=loadImage("obstacle3.png");
  duprinha_de_cacto_com_terrinha=loadImage("obstacle2.png");
  duprinha_de_cacto=loadImage("obstacle1.png");
}

function setup() {
  createCanvas(600, 200);

  //criar sprite trex
  obstacle_group=createGroup();
  clouds_group=createGroup();
  trex = createSprite(50,160,20,50);
  trex.setCollider("circle",0,0,40);
  cade_o_chao=createSprite(200,190,400,10);
  cade_o_chao.visible=false;
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crriar sprite ground (chão)
  ground = createSprite(200,180,400,20);
  
  ground.addAnimation("chãzin geuado",groundImage);
  

  
  
}

function draw() {
  background(255,255,255);
  text("Pontin: "+us_pontin,490,50);
  if(game_stats==PLAY){
    ground.velocityX = -4;
    us_pontin=us_pontin+Math.round(frameCount/60);
    if(us_pontin>0&&us_pontin%100==0){
      checkpoint.play();
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space")&& trex.y>=156.4){
    trex.velocityY = -15;
    pulin.play();
  }
  trex.velocityY = trex.velocityY + 0.8;
  deus_criou_as_nuvi()
  //pular quando barra de espaço é pressionada
  deus_criou_as_difirculdade()
if(obstacle_group.isTouching(trex)){
game_stats=END;
morreu_parsa.play();
}
  }
  if(game_stats==END){
    ground.velocityX = 0;
    us_pontin=0
    trex.velocityY=0
    obstacle_group.setVelocityXEach(0);
    clouds_group.setVelocityXEach(0);
    trex.changeAnimation()
    trex.changeAnimation("collided", trex_collided);
    obstacle_group.setLifetimeEach(-1);
    clouds_group.setLifetimeEach(-1);
  }
  //impedir trex de cair
  trex.collide(cade_o_chao);

  drawSprites();
}
function deus_criou_as_nuvi(){
  if(frameCount%60==0){     //A nuvem só aparecera quando o valor do frameCount for um número que ao ser dividido por 60 o resto de 0.
    ih_vai_chuve=createSprite(600,100,40,10);
    ih_vai_chuve.addImage("a nuvi passando",ih_vai_chuve_image);
    ih_vai_chuve.scale=0.1;
  ih_vai_chuve.velocityX=-5.5;
  ih_vai_chuve.y=Math.round(random(10,60));
  ih_vai_chuve.depth=trex.depth;
  trex.depth=trex.depth+1;
  ih_vai_chuve.lifetime=170;
  clouds_group.add(ih_vai_chuve);
  }
}
function deus_criou_as_difirculdade(){
  if(frameCount%60==0){     //O cacto só aparecera quando o valor do frameCount for um número que ao ser dividido por 60 o resto de 0.
    var obistaculuzin=createSprite(400,165,10,40);
    obistaculuzin.velocityX=-4;
    var a_image_n_sou_eu_q_escolho=Math.round(random(1,6));
switch (a_image_n_sou_eu_q_escolho){
  case 1:obistaculuzin.addImage(duprinha_de_cacto);
  break;
  case 2:obistaculuzin.addImage(duprinha_de_cacto_com_terrinha);
  break;
  case 3:obistaculuzin.addImage(o_bonde_dos_cacto);
  break;
  case 4:obistaculuzin.addImage(cacto_com_terrinha);
  break;
  case 5:obistaculuzin.addImage(cacto);
  break;
  case 6:obistaculuzin.addImage(trio_dos_cacto);
  break;
  default:break;
}
obistaculuzin.scale=0.5;
    obistaculuzin.lifetime=300;
    obstacle_group.add(obistaculuzin);
  }
}