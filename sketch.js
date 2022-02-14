var papaiNoel, papaiParado;
var bg
var cat
var presente
var parede
var parede2
var pontosPapeiNoel = 0
var pontosGato = 0
var bomba
var estados = "JOGAR"
var youWin
var catMorto
var papaiNoelMorto
function preload() {
 papaiNoel = loadAnimation("images/Run (2).png","images/Run (3).png","images/Run (5).png","images/Run (9).png","images/Run (10).png","images/Run (11).png")
 bg = loadImage("images/BG.png")
 papaiParado = loadImage("images/Idle (1).png")
 cat = loadImage("images/Idle (3).png")
 presentes = loadImage("images/presentinho.png")
 bomba = loadImage("images/bomb.png")
 youWin = loadImage("images/you win.png")
 catMorto = loadImage("images/f cat.png")
 papaiNoelMorto = loadImage("images/press f.png")
}

function setup() {
  createCanvas(800,600);
  
  papaiNoel2 = createSprite(200,550,40,40) 
  papaiNoel2.addImage("parado",papaiParado)
  papaiNoel2.addAnimation("andando",papaiNoel)
  papaiNoel2.addImage("morto1",papaiNoelMorto)
  papaiNoel2.scale = 0.2
  papaiNoel2.debug = false
  papaiNoel2.setCollider ("circle",0,0,40)

  cat2 = createSprite(600,550,40,38)
  cat2.addImage("catinho",cat)
  cat2.addImage("morto2",catMorto)
  cat2.scale = 0.23
  cat2.debug = false
  cat2.setCollider ("circle",0,0,35)

  youWin2 = createSprite(400,300,20,20)
  youWin2.addImage("vitoria",youWin)
  youWin2.visible = false

  parede1 = createSprite(0,300,40,800)
  parede1.visible = false
  

  parede3 = createSprite(800,300,40,800)
  parede3.visible = false
  
  grupoObjetos = new Group();
  grupoBomba = new Group();
}

function draw() {
  background(bg); 

textSize(15)
fill("black")
text("gatos: " + pontosGato,600,35)


textSize(15)
fill("black")
text("Papai Natal: " + pontosPapeiNoel,150,35)


  
 

papaiNoel2.collide(parede1)
papaiNoel2.collide(parede3)
cat2.collide(parede1)
cat2.collide(parede3)




if (estados == "JOGAR"){
  if(keyDown("LEFT_ARROW")){
    papaiNoel2.x = papaiNoel2.x  -7
   papaiNoel2.changeAnimation("andando")
  }
  
 
 
  if(keyDown("RIGHT_ARROW")){
   papaiNoel2.x = papaiNoel2.x +7
  papaiNoel2.changeAnimation("andando")
 }
 
 
 if(keyDown("D")){
   cat2.x = cat2.x +7
 
 }
 
 if(keyDown("A")){
   cat2.x = cat2.x  -7
 
 }
 


  if (frameCount % 30 == 0){
    criarPresente ()
  }
  
  if (frameCount % 15 == 0){
    criarBomba ()
  }
  
  if (grupoObjetos.isTouching(papaiNoel2)){
    grupoObjetos.destroyEach();
    pontosPapeiNoel = pontosPapeiNoel +5
  
  
  }
  
  if (grupoBomba.isTouching(papaiNoel2)){
    grupoBomba.destroyEach();
    pontosPapeiNoel = pontosPapeiNoel -10
  
  
  }
  
  if (grupoObjetos.isTouching(cat2)){
    grupoObjetos.destroyEach();
    pontosGato = pontosGato +5
  
  
  }
  
  if (grupoBomba.isTouching(cat2)){
    grupoBomba.destroyEach();
    pontosGato = pontosGato -10
  
  
  }
  if (pontosGato >=100){
    estados = "ENCERRAR"
    youWin2.visible = true
    
    cat2.x = (404)
    cat2.y = (200)
    papaiNoel2.changeAnimation("morto1",papaiNoelMorto)
  }

  if (pontosPapeiNoel >=100){
    estados = "ENCERRAR"
    youWin2.visible = true

    
    papaiNoel2.x = (413)
    papaiNoel2.y = (200)
    cat2.changeAnimation("morto2",catMorto)  
   
  }

}



else if(estados == "ENCERRAR"){
  grupoBomba.setVelocityYEach(0);
  grupoObjetos.setVelocityYEach(0);

  grupoBomba.destroyEach();
  grupoObjetos.destroyEach();

  
}

  drawSprites()
}

function criarPresente () {
  presente2 = createSprite(random(10,790),60,60)
  presente2.addImage("present",presentes)
  presente2.scale = 0.16
  presente2.velocityY = 10
  grupoObjetos.add(presente2)
}

function criarBomba () {
  bomba2 = createSprite(random(10,790),60,60)
  bomba2.addImage("bombinha",bomba)
  bomba2.scale = 0.1
  bomba2.velocityY = 25
  grupoBomba.add(bomba2)
}