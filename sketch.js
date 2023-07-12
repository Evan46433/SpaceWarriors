var bg,bgImg
var ss,ssImg
var alien,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12
var laser
var score = 0
var gameState = "play"
var alienGroup,laserGroup
var edges


function preload(){
bgImg = loadImage("assets/bg3.jpg")   
ssImg = loadImage("assets/ss2.png") 
a1 = loadImage("assets/a1.png")
a2 = loadImage("assets/a2.png")
a3 = loadImage("assets/a3.png")
a4 = loadImage("assets/a4.png")
a5 = loadImage("assets/a5.png")
a6 = loadImage("assets/a6.png")
a7 = loadImage("assets/a7.png")
a8 = loadImage("assets/a8.png")
a9 = loadImage("assets/a9.png")
a10 = loadImage("assets/a10.png")
a11 = loadImage("assets/a11.png")
a12 = loadImage("assets/a12.png")
}

function setup(){
createCanvas(2000,1000)

//Background sprite 
bg = createSprite(1000,500,2000,1000)
bg.addImage(bgImg)

//SpaceShip sprite 
ss = createSprite(100,500)
ss.addImage(ssImg)

//Groups
alienGroup = new Group()
laserGroup = new Group()

edges = createEdgeSprites()

}

function draw(){
background(0)
drawSprites()

//Score 
fill("white")
textSize(30)
text("Score = "+score,50,50)
textSize(20)
text("Spacewarriors by Evan Dennis",1600,900)

//Game State Play 
if(gameState==="play"){
  if(keyDown(UP_ARROW)){
    ss.y-=9
  }
  if(keyDown(DOWN_ARROW)){
    ss.y+=9
  }
  if(keyDown("space")){
    releaseLaser()
  }
  ss.collide(edges[2])
  ss.collide(edges[3])

  spawnAliens()


laserGroup.isTouching(alienGroup,destroyAlien)

if(alienGroup.isTouching(ss)){
gameState="end"
}
}
if(gameState==="end"){
  gameOver()
}
}

function releaseLaser(){
laser = createSprite(200,ss.y,60,5)  
laser.shapeColor = "lime"
laser.velocityX = 10
laser.lifetime = 200
laserGroup.add(laser)
}

function spawnAliens(){
  if(frameCount % 50==0){
    var rand = random(100,900)
    alien = createSprite(2100,rand)
    var e = Math.round(random(1,12))
    switch(e){
     case 1:
      alien.addImage(a1)
      alien.scale = 0.1
      alien.velocityX = -14
      break
     case 2:
       alien.addImage(a2)
       alien.velocityX = -12
       break 
     case 3:
        alien.addImage(a3)
        alien.velocityX = -15
        break 
     case 4:
        alien.addImage(a4)
        alien.velocityX = -13
        break   
     case 5:
        alien.addImage(a5)
        alien.velocityX = -17
        break
     case 6:
        alien.addImage(a6)
        alien.velocityX = -16
        break  
     case 7:
        alien.addImage(a7)
        alien.velocityX = -18
        break
     case 8:
        alien.addImage(a8)
        alien.velocityX = -13
        break 
     case 9:
        alien.addImage(a9)
        alien.scale = 0.3
        alien.velocityX = -15
        break 
     case 10:
        alien.addImage(a10)
        alien.scale = 0.1
        alien.velocityX = -12
        break   
     case 11:
        alien.addImage(a11)
        alien.scale = 0.5
        alien.velocityX = -18
        break
     case 12:
        alien.addImage(a12)
        alien.velocityX = -16
          break          
                   
    }

    
    alien.lifetime = 500
    alienGroup.add(alien)
  }  
}

function destroyAlien(laser,alien){
alien.destroy()
laserGroup.destroyEach()
score+=5
}

function gameOver(){
 alienGroup.destroyEach()
 swal({
  title:"Game Over!!",
  text:"You Lost The Game",
  imageUrl:"assets/a11.png",
  imageSize:"300x300",
  confirmButtonText:"Play Again"

 },function(isConfirm){
  if(isConfirm){
    location.reload()
  }
 })
 
}
