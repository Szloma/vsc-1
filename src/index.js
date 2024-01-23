import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ background: '#509B66', resizeTo: window });

document.body.appendChild(app.view);

function calculatePercentage(value, total) {
  const percentage = (value / total) * 100;
  return percentage;
}
function calculateAmountFromPercentage(percentage, total) {
  const amount = (percentage / 100) * total;
  return amount;
}
function getRandomNumberX() {
  var screenWidth = app.screen.width;
  var randomNumber = Math.floor(Math.random() * screenWidth);
  return randomNumber;
}
function getRandomNumberY() {
  var screenHeight = app.screen.height;
  var randomNumber = Math.floor(Math.random() * screenHeight);
  return randomNumber;
}




class rangedWeapon {
  constructor()
  {
    this.projectiles = [];
  }
  shoot(player, target){
  }
}

//todo
class Inventory{
  constructor(){
    this.inventory = [];
  }
}
//======================================================================================

// Ground layer

//
//trzeba poprawic bronki przed zrobieniem tego
class weaponTypes{
  
}

class itemTypes {
  static getHPrefill() {
      return {
          spriteTexture: "item1.png",
          speed: 0,
          health: 100,
      };
  }

  static getRandomItem() {
    const itemTypeList = [
        this.getHPrefill()
    ];

    const randomIndex = Math.floor(Math.random() * itemTypeList.length);
    return itemTypeList[randomIndex];
}

}

class GroundItemsLayer{
  constructor(){
    this.container = new PIXI.Container();
    this.items = [];
    this.container.x = 0; 
    this.container.y = 0; 
    app.stage.addChild(this.container)
  }
  update(delta){

  }
  move(xDelta, yDelta, speed) {
    const length = Math.sqrt(xDelta ** 2 + yDelta ** 2);

    if (length !== 0) {
      const vx = (xDelta / length) * speed;
      const vy = (yDelta / length) * speed;
      this.container.x += vx;
      this.container.y += vy;
    }
  }
  spawnItem(target) {
    const spawnMargin = 50;
    var edge = Math.floor(Math.random() * 4) + 1;
    var randomX = 90;
    var randomY = 90;


    let enem = itemTypes.getRandomItem();
    const newEnemy = new GroundItem 
    this.addEnemy(newEnemy);
}

  update() {
    
  }
  removeEnemy(enemy){
    const index = this.enemies.indexOf(enemy);
    if (index !== -1){
      this.enemies.splice(index,1)
      this.container.removeChild(enemy.sprite)
    }
  }
  


}
class Item{
  constructor(texture){
    this.sprite = PIXI.Sprite.from(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x =x
    this.sprite.y =y
    this.hitbox = new PIXI.Rectangle(x, y, 10, 10);
    app.stage.addChild(this.sprite);
  }
  animate(){

  }
  update(delta){

  }
}


//======================================================================================

// Weapons

//



//======================================================================================

// Player

//
class Player {
  constructor(texture, speed){

    this.sprite = PIXI.Sprite.from(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = app.screen.width / 2;
    this.sprite.y = app.screen.height / 2;
    this.speed = speed;
    this.HP = new HP(100,50);
    this.autoHealValue = 0.01;
    this.inventory = new Inventory(); // to do

    this.hitbox = new PIXI.Rectangle(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2,
      10,10
  );
    this.viewport = new PIXI.Rectangle(0,0,app.width, app.height)
    app.stage.addChild(this.sprite);

    
  }
  lvlup(){

  }
  hpup(value){
    this.HP.setNewHp(value);
  }
  autoheal(){
    this.HP.increaseHP(this.autoHealValue)
  }
  update(delta){
    //console.log(this.HP.HP)
    this.autoheal()
    this.sprite.rotation+= 0.1 * delta;
    
  }
  getPlayer(){
    return this.sprite
  }
  
}
class HP {
  constructor(maxHP, widthPercent){
    this.maxHP = maxHP;
    this.HP = this.maxHP;
    this.dead = false;
    this.hpBarBack = PIXI.Sprite.from("hpbarback.png")
    this.hpBarBack.x = 0;
    this.hpBarBack.y = 0;
    this.hpBarBack.width = calculateAmountFromPercentage(widthPercent, app.screen.width)+20

    this.hpBarFront = PIXI.Sprite.from("hpbarfront.png")
    this.hpBarFront.x = 10;
    this.hpBarFront.y = 10;
    this.barWidth = calculateAmountFromPercentage(widthPercent, app.screen.width);
    this.hpBarFront.width = this.barWidth
    //console.log(this.hpBarFront.width)
    app.stage.addChild(this.hpBarBack)
    app.stage.addChild(this.hpBarFront);
  }
  updateBar(){
    const percentage = calculatePercentage(this.HP, this.maxHP)
    const barWidth = calculateAmountFromPercentage(percentage, this.barWidth)
    this.hpBarFront.width = barWidth;
  }
  setNewHp(value){
    console.log("setting up new hp")
    this.maxHP += value
    this.HP += value;
    console.log(this.maxHP)
  }

  decreaseHP(value){
    if(this.HP>0){
      this.HP -=value;
      this.updateBar()
   
      if(this.HP <0){
        this.hpBarFront.visible = false;
        this.dead = true;
      }
    }
  }
  setHealth(percentage) {
    this.HP = Math.max(0, Math.min(100, percentage));

    const newWidth = (this.HP / 100) * this.width;
    this.hpBarFront.width = newWidth;
  }

  increaseHP(value){
    
    //let tmp = this.HP += value;
    if((this.HP + value)>this.maxHP){
      this.HP = this.maxHP
    }
    if(this.HP<this.maxHP){

      this.HP +=value;
      this.updateBar()
    }
   
    
  }

}
//======================================================================================

// ENEMIES

//

class EnemyHP{
  constructor(maxHP){
    this.maxHP = maxHP;
    this.dead = false;
    this.currentHP = maxHP;
  }
  decreaseHP(value){
    if(this.currentHP>0){
      this.currentHP -=value;
      if(this.currentHP ==0){
        this.dead = true;
      }
    }
  }
  increaseHP(value){
    var tmp = this.currentHP += value;
    if(tmp > this.maxHP){
      this.currentHP += value;
    }
    
  }
}



class enemyTypes {
  static getBasicEnemy() {
      return {
          spriteTexture: "enemy1.png",
          speed: 2,
          health: 100,
      };
  }

  static getZombie() {
      return {
          spriteTexture: "zombie.png",
          speed: 1,
          health: 150,
      };
  }
  static getRandomEnemy() {
    const enemyTypeList = [
        this.getBasicEnemy(),
        this.getZombie(),
    ];

    const randomIndex = Math.floor(Math.random() * enemyTypeList.length);
    return enemyTypeList[randomIndex];
}

}


class Enemy {
  constructor(texture, speed, hp, x, y){
    this.sprite = PIXI.Sprite.from(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x =x
    this.sprite.y =y
    this.hitbox = new PIXI.Rectangle(x, y, 10, 10);
    this.speed = speed;
    this.HP = new EnemyHP(hp)
    app.stage.addChild(this.sprite);

  }
  updateCoordinates(x,y){
    this.sprite.x = x;
    this.sprite.y =y;
  }

  chasePlayer(player) {
    //const playerGlobalBounds = player.sprite.getBounds();
    const playerX = app.screen.width/2
    const playerY =  app.screen.height/2

    const dx = playerX - this.sprite.getBounds().x;
    const dy = playerY - this.sprite.getBounds().y;


    const length = Math.sqrt(dx * dx + dy * dy);
    const vx = (dx / length) * this.speed;
    const vy = (dy / length) * this.speed;

    this.sprite.x += vx;
    this.sprite.y += vy;

    this.hitbox.x = this.sprite.x;
    this.hitbox.y = this.sprite.y;
}
  update(delta){
    this.moveTowards(player, map1);
  }
  getEnemy(){
    return this.sprite
  }
  destroy(){
    if (this.sprite.parent) {
      this.sprite.parent.removeChild(this.sprite);
  }
    if (this.hitbox.parent) {
    this.hitbox.parent.removeChild(this.sprite);
}  

  //this.direction = null;
  }
}

class EnemyContainer {
  constructor() {
      //this.player = player;
      this.gameOver = false;
      this.container = new PIXI.Container();
      this.enemies = [];
      this.container.x = 0; 
      this.container.y = 0; 

      this.absoluteX = 0 //app.screen.width / 2;;
      this.absoluteY = 0 //app.screen.width / 2;;

      this.randomX= 0;
      this.randomY = 0;
      app.stage.addChild(this.container)
  }
  getRandomEnemy(){
    const randomIndex = Math.floor(Math.random() * this.enemies.length);
    return this.enemies[randomIndex];
  }

  addEnemy(enemy) {
      //console.log("enemy added")
      this.enemies.push(enemy);
      this.container.addChild(enemy.sprite);
  }
  spwnEn(sprite, speed, x,y){
    const newEnemy = new Enemy(sprite, speed, 100, randomX, randomY);
    this.addEnemy(newEnemy);
  }
  enemyWave(howMany){
    const spawnMargin = 50;
    var edge = Math.floor(Math.random() * 4) + 1;
    var noOfEnemies =Math.floor(Math.random() * howMany) + 1;
  }
  spawnEnemy() {
    //console.log(this.container.getBounds())
    const spawnMargin = 50;
    var edge =  Math.floor(Math.random() * 4) + 1;
    if(this.container.x !== undefined){
      switch (edge) {
        case 1:
          
          this.randomX = -this.absoluteX - spawnMargin
          this.randomY = -this.absoluteY + getRandomNumberY()

          break;
        case 2:
          this.randomX = getRandomNumberX() -this.absoluteX
          this.randomY =-this.absoluteY - spawnMargin
          break
        case 3:
          this.randomX = -this.absoluteX + app.screen.width+spawnMargin
          this.randomY = -this.absoluteY+ getRandomNumberY()
          break;
        case 4:
          this.randomX = getRandomNumberX() -this.absoluteX
          this.randomY = app.screen.height- this.absoluteY+spawnMargin;
          break;
        default:
          this.randomX = 0;
          this.randomY = 0;
      }
  
      let enem = enemyTypes.getRandomEnemy();
      const newEnemy = new Enemy(enem.spriteTexture, enem.speed,  enem.health,this.randomX, this.randomY)
      //newEnemy.updateCoordinates(this.randomX, this.randomY)
      this.addEnemy(newEnemy);
    }

}


  update() {
    
  }
  removeEnemy(enemy){
    const index = this.enemies.indexOf(enemy);
    if (index !== -1){
      this.enemies.splice(index,1)
      this.container.removeChild(enemy.sprite)
    }
  }
  updateX(x){
    this.container.x +=x;
  }
  updateY(y){
    this.container.y +=y;
  }
  move(xDelta, yDelta, speed) {
    const length = Math.sqrt(xDelta ** 2 + yDelta ** 2);

    if (length !== 0) {
      const vx = (xDelta / length) * speed;
      const vy = (yDelta / length) * speed;
      this.absoluteX += vx;
      this.absoluteY +=vy
      this.container.x += vx;
      this.container.y += vy;
    }
  }
}

//======================================================================================

// GUI

//

class GameOverScreen{
  constructor() {
    this.container = new PIXI.Container();
    app.stage.addChild(this.container);

    const titleStyle = new PIXI.TextStyle({
        fill: '#ffffff',
        fontSize: 48,
        fontWeight: 'bold',
    });
    const title = new PIXI.Text('game over', titleStyle);
    title.anchor.set(0.5);
    title.x = app.screen.width / 2;
    title.y = app.screen.height / 3;

    const instructionsStyle = new PIXI.TextStyle({
        fill: '#ffffff',
        fontSize: 24,
    });
    const instructions = new PIXI.Text('Press F5 to restart', instructionsStyle);
    instructions.anchor.set(0.5);
    instructions.x = app.screen.width / 2;
    instructions.y = app.screen.height / 2;

    this.container.addChild(title, instructions);

    this.container.visible = false;
}

hide() {
    this.container.visible = false;
}
show(){
  this.container.visible = true;
}
}

class StartMenu {
  constructor() {
      this.container = new PIXI.Container();
      app.stage.addChild(this.container);

      const titleStyle = new PIXI.TextStyle({
          fill: '#ffffff',
          fontSize: 48,
          fontWeight: 'bold',
      });
      const title = new PIXI.Text('VSC-1', titleStyle);
      title.anchor.set(0.5);
      title.x = app.screen.width / 2;
      title.y = app.screen.height / 3;

      const instructionsStyle = new PIXI.TextStyle({
          fill: '#ffffff',
          fontSize: 24,
      });
      const instructions = new PIXI.Text('Press Enter to Start', instructionsStyle);
      instructions.anchor.set(0.5);
      instructions.x = app.screen.width / 2;
      instructions.y = app.screen.height / 2;

      this.container.addChild(title, instructions);

      this.container.visible = true;
  }

  hide() {
      this.container.visible = false;
  }
  show(){
    this.container.visible = true;
  }
}

class simpleTimer{
  constructor(time){
    this.time = time;
    this.timeLeft = time;
  }///////////////////////////////////////////////////////////////////////////////////////////////////
  update(delta){

    this.timeLeft -=delta;
    if(this.timeLeft<0){
      this.timeLeft = this.time;
    }
  }

}
class randomFireball{
  constructor(damage =50){
    this.sprite = PIXI.Sprite.from('fireball.png')
    this.sprite.anchor.set(0.5)
    this.sprite.x = app.screen.width/2
    this.sprite.y = app.screen.height/2
    this.speed = 10;
    this.damage = damage;
    this.durationTime = 150;
    this.duration = this.durationTime; 
    this.cooldown = 50;
    this.hitbox = new PIXI.Rectangle(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2,
      10,10
  );
  app.stage.addChild(this.sprite)
  this.direction = this.randomDirection()
  }
  randomDirection(){
    let dx = getRandomNumberX() - this.sprite.x;
    let dy = getRandomNumberY() - this.sprite.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    return { vx: (dx / length) * this.speed, vy: (dy / length) * this.speed };
  }
  calculateDirection(target){
    if(target!== undefined){
      const location = target.sprite.getBounds()
      //console.log(target.sprite)
      let dx = location.x - this.sprite.getBounds().x;
      let dy = location.y - this.sprite.getBounds().y;
      const length = Math.sqrt(dx * dx + dy * dy);
      return { vx: (dx / length) * this.speed, vy: (dy / length) * this.speed };
    }
    else {
      return {vx: 0, vy:0}
    }
 
  }
  updateDirection(target){
    this.direction = this.calculateDirection(target);
  }
  update(delta){
    //console.log(this.sprite.x)
    this.sprite.x += this.direction.vx;
    this.sprite.y += this.direction.vy;
    this.hitbox.x = this.sprite.x;
    this.hitbox.y = this.sprite.y;
    this.duration -= delta;
    if (this.duration <= 0) {
      this.updateDirection()
      //this.reset();
    }
  }
}

class projectileLayer{
  constructor(){
    this.container = new PIXI.Container();
    this.projectiles = [];
    this.container.x = 0; 
    this.container.y = 0; 
    app.stage.addChild(this.container)
  }
  addProjectile(projectile){
    this.projectiles.push(projectile)
    this.container.addChild(projectile.sprite)
  }
  addNewProjectile(){
    const np = new randomFireball(50);
    this.projectiles.push(np);
    this.container.addChild(np.sprite)
  }
  removeProjectile(projectile){
    const index = this.projectiles.indexOf(projectile);

    if (index !== -1){
      this.projectiles.splice(index,1)
      this.container.removeChild(projectile.sprite)
      this.container.removeChild(projectile.hitbox)
    }
  }
  update(delta){

    this.projectiles.forEach((projectile)=>{
      projectile.update(delta);
      if (projectile.duration <= 1) {
        
        this.removeProjectile(projectile)
      }
    })
  }
}
class dagger{
  constructor(dmg=150){
    this.sprite = PIXI.Sprite.from('dagger.png')
    this.sprite.anchor.set(0.5)
    this.sprite.x = app.screen.width/2
    this.sprite.y = app.screen.height/2
    this.speed = 10;
    this.damage = dmg;
    console.log(this.damage)
    this.durationTime = 10;
    this.duration = this.durationTime; 
    this.cooldown = 50;
    this.hitbox = new PIXI.Rectangle(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2,
      10,10
  );
  app.stage.addChild(this.sprite)
  this.direction = this.randomDirection()
  }
  randomDirection(){
    let dx = 180//getRandomNumberX() - this.sprite.x;
    let dy =0//getRandomNumberY() - this.sprite.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    return { vx: (dx / length) * this.speed, vy: (dy / length) * this.speed };
  }
  calculateDirection(target){
    if(target!== undefined){
      const location = target.sprite.getBounds()
      //console.log(target.sprite)
      let dx = location.x - this.sprite.getBounds().x;
      let dy = location.y - this.sprite.getBounds().y;
      const length = Math.sqrt(dx * dx + dy * dy);
      return { vx: (dx / length) * this.speed, vy: (dy / length) * this.speed };
    }
    else {
      return {vx: 0, vy:0}
    }
 
  }
  updateDirection(target){
    this.direction = this.calculateDirection(target);
  }
  updateRotation(target){

    this.sprite.rotation = target.sprite.rotation
  }
  update(delta){
    //console.log(this.sprite.x)
    this.sprite.x += this.direction.vx;
    this.sprite.y += this.direction.vy;
    this.hitbox.x = this.sprite.x;
    this.hitbox.y = this.sprite.y;
    this.duration -= delta;
    if (this.duration <= 0) {
      this.updateDirection()
      //this.reset();
    }
  }
}

class WeaponDagger {
  constructor(player, projectileLayer, enemyLayer){
    this.player = player
    this.projectileLayer = projectileLayer
    this.enemyLayer = enemyLayer;
    this.fireRate = 150;
    this.cooldown = this.fireRate;
    this.lvl = 1;
    this.dmg = 150;
  }
  lvlup(){
    if(this.lvl <5){
      this.lvl +=1;
      this.cooldown -=5;
      this.dmg +=10;
    }
  }
  fire(){
    const projectile = new dagger(this.dmg);
    projectile.x = this.player.x;
    projectile.y = this.player.y;
    //const target = this.enemyLayer.getRandomEnemy();

   // projectile.calculateDirection(this.enemyLayer.getRandomEnemy())
    //projectile.updateRotation(this.player)
    this.projectileLayer.addProjectile(projectile)
   
  }
  update(delta){
    this.cooldown -= delta;

    if (this.cooldown <= 2) {
      this.fire()  
      this.cooldown = this.fireRate
    }

  }
}

class WeaponWand {
  constructor(player, projectileLayer, enemyLayer){
    this.player = player
    this.projectileLayer = projectileLayer
    this.enemyLayer = enemyLayer;
    this.fireRate = 30;
    this.cooldown = this.fireRate;
    this.lvl = 1;
    this.dmg = 30;
  }
  lvlup(){
    if(this.lvl <5){
      this.lvl +=1;
      this.cooldown -=5;
      this.dmg +=10;
    }
  }
  fire(){
    const projectile = new randomFireball(this.dmg);
    projectile.x = this.player.x;
    projectile.y = this.player.y;
    const target = this.enemyLayer.getRandomEnemy();

   // projectile.calculateDirection(this.enemyLayer.getRandomEnemy())
   if(target !== undefined){
    projectile.updateDirection(this.enemyLayer.getRandomEnemy())
    this.projectileLayer.addProjectile(projectile)
    //console.log(this.projectileLayer.enemies)
   } else{
    //console.log("notarget")
    this.projectileLayer.addProjectile(projectile)
   }
   
  }
  update(delta){
    this.cooldown -= delta;

    if (this.cooldown <= 2) {
      this.fire()  
      this.cooldown = this.fireRate
    }

  }
}


class Tile {
  constructor(x, y, texture) {
    
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    //app.stage.addChild(this.sprite);
  }
  update(xDelta,yDelta,speed){
    const length = Math.sqrt(xDelta ** 2 + yDelta ** 2);

    if (length !== 0) {
      const vx = (xDelta / length) * speed;
      const vy = (yDelta / length) * speed;
      this.move(vx,vy);
    }

  }
  move(x, y) {
    
      this.sprite.x += x;
      this.sprite.y += y;

      if (this.sprite.x > app.screen.width) {
          this.sprite.x = 0;
      } else if (this.sprite.x < 0) {
          this.sprite.x = app.screen.width;
      }

      if (this.sprite.y > app.screen.height) {
          this.sprite.y = 0;
      } else if (this.sprite.y < 0) {
          this.sprite.y = app.screen.height;
      }
  }
}

class Background {
  constructor() {
    this.container = new PIXI.Container()
    this.backgroundWidth = app.screen.width +128;
    this.backgroundHeight = app.screen.height +128
    this.container.x -=64;
    this.container.y -=64
    console.log(app.screen.width)
    console.log(this.backgroundWidth)
    this.container.width = app.screen.width +128;
    this.container.height = app.screen.height +128
    console.log(this.container.width)
  
    //this.container.anchorX = 1000
    //this.container.anchorY = 1000;
    this.tileTextures = [
      PIXI.Texture.from('Grass1.png'),
      PIXI.Texture.from('Grass2.png'),
      PIXI.Texture.from('Grass3.png'),
  ];
    this.tileSize = 64;
    this.columns = Math.ceil(this.backgroundWidth / this.tileSize);
    this.rows = Math.ceil(this.backgroundWidth / this.tileSize);

    //this.container.x = (app.screen.width - this.backgroundWidth) / 2;
    //this.container.y = (app.screen.height - this.backgroundHeight) / 2;

      for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.columns; col++) {
        
              const x = ((col) * this.tileSize);
              const y = ((row) * this.tileSize);
              const tile = new Tile(x, y, this.randomTexture())
              this.container.addChild(tile.sprite)
          }
      }

    app.stage.addChild(this.container)
    //this.offsetTiles()
  }
  randomTexture(){
    const randomIndex = Math.floor(Math.random() * this.tileTextures.length);
    return this.tileTextures[randomIndex]
  }
  offsetTiles(){
    const offsetX = (this.backgroundWidth - app.screen.width) / 2;
    const offsetY = (this.backgroundHeight - app.screen.height) / 2;
    this.tiles.forEach(tile =>{
      tile.sprite.x -= offsetX;
      tile.sprite.y -= offsetY;
    })
  }
  update(xDelta,yDelta,speed){
    const length = Math.sqrt(xDelta ** 2 + yDelta ** 2);

    if (length !== 0) {
      const vx = (xDelta / length) * speed;
      const vy = (yDelta / length) * speed;
      
      this.container.children.forEach(tile => {
        tile.x+=vx;
        tile.y+=vy;
        
      if (tile.x >  this.backgroundWidth) {
        tile.x = 0;
      } else if (tile.x < 0) {
        tile.x =  this.backgroundWidth;
      }

      if (tile.y > this.backgroundHeight) {
        tile.y = 0;
      } else if (tile.y < 0) {
        tile.y = this.backgroundHeight;
      }
    });
    }
    
  }
}


class Map{
  constructor(backTexture){

    this.background = new Background(10,10)
    this.EnemyTimerDuration = 20 
    this.EnemyTimer = this.EnemyTimerDuration;
    this.EnemyContainer = new EnemyContainer()
    this.groundLayer = new GroundItemsLayer();
    this.player = new Player('player.png', 5);
    //testing
    this.player.hpup(100)
    console.log("inithp")
    console.log(this.player.HP.HP)

    //tmp


    //app.stage.addChild(this.EnemyContainer.container);
    this.ProjectileLayer = new projectileLayer;
    
    this.weapons= [];
    this.tmpweapon = new WeaponWand(this.player, this.ProjectileLayer, this.EnemyContainer)
    this.tmpweapon.lvlup()
    this.tmpweapon.lvlup()
    this.tmpweapon.lvlup()
    this.tmpweapon.lvlup()
    this.tmpweapon.lvlup()
    this.weapons.push(this.tmpweapon) 
    this.weapons.push(new WeaponWand(this.player, this.ProjectileLayer, this.EnemyContainer)) 
    this.weapons.push(new WeaponDagger(this.player, this.ProjectileLayer, this.EnemyContainer))

  }
  drawBackground(){

  }
  updateWeaponTimers(delta){
    for (const projectile of this.ProjectileLayer.projectiles) {
      //console.log(projectile)
    }
    this.weaponTimer.update(delta)
  }
  updateWeapons(delta){
    for (const weapon of this.weapons) {
      weapon.update(delta)
    }
  }
  
  update(delta){
    this.updateWeapons(delta)
    this.ProjectileLayer.update(delta)

    this.groundLayer.update()
    //tmp 
    this.EnemyTimer -= delta;
    if (this.EnemyTimer <= 0) {
      this.EnemyContainer.spawnEnemy(this.enemy1)
      this.EnemyTimer= this.EnemyTimerDuration;
    }

    this.player.update(delta)
    this.EnemyContainer.enemies.forEach((enemy) => {
      if(enemy.currentHP!=0){
        enemy.chasePlayer(this.player);
      }
 
  });

    this.checkCollisions()
    this.checkWeaponCollisions()
    let xDelta = 0;
    let yDelta = 0;
  
    if (keys['ArrowLeft']) {
      xDelta += 1;
    }
    if (keys['ArrowRight']) {
      xDelta -= 1
    };
    if (keys['ArrowUp']) {
      yDelta += 1
    };
    if (keys['ArrowDown']) {
      yDelta -= 1
    };
    this.EnemyContainer.move(xDelta, yDelta, this.player.speed);
    this.groundLayer.move(xDelta, yDelta, this.player.speed);
    this.background.update(xDelta,yDelta,this.player.speed)
   

    //this.EnemyContainer.x = Math.max(0, Math.min(app.screen.width, this.sprite.x));
    //this.EnemyContainer.y = Math.max(0, Math.min(app.screen.height, this.sprite.y));
  }

  checkWeaponCollisions(){
    
    for (const projectile of this.ProjectileLayer.projectiles) {
      const projectileGlobalBounds = projectile.sprite.getBounds();
        for (const enemy of this.EnemyContainer.enemies){
          const enemyGlobalBounds = enemy.sprite.getBounds();
          if(projectile.sprite.visible){
            if(this.hitTestRectangle(projectileGlobalBounds, enemyGlobalBounds)){
              enemy.HP.decreaseHP(projectile.damage);
              //projectile.hide()
              this.ProjectileLayer.removeProjectile(projectile)
              //this.ProjectileLayer.addNewProjectile()
             
              if(enemy.HP.currentHP <=0){
                //console.log(enemy.HP.currentHP)
                //EnemyContainer.removeChild()


                // tutaj drop
                this.EnemyContainer.removeEnemy(enemy)
                //console.log("it's over")
                //this.EnemyContainer.enemies.splice(i,1)
              }
              
              
            }
          }
       
      
        }
        }
    }
  

  checkCollisions() {
    const playerGlobalBounds = this.player.sprite.getBounds();

    for (const enemy of this.EnemyContainer.enemies) {
        const enemyGlobalBounds = enemy.sprite.getBounds();

        if (this.hitTestRectangle(playerGlobalBounds, enemyGlobalBounds)) {
            //console.log('Collision with enemy!');
            //
            this.player.HP.decreaseHP(1)
            this.gameOver = true;

        }
    }
}
hitTestRectangle(rect1, rect2) {

  return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
  );
}
}


const globalStage = new Map('Grass2.png')

const menu = new StartMenu()
const gameOverScreen = new GameOverScreen();

const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

app.ticker.add((delta) =>
{
  if (!menu.container.visible ) {
    if(!gameOverScreen.container.visible ){
      globalStage.update(delta)
    }

}
  if (keys['Enter']) {
    menu.hide();
    
  }
  if (globalStage.player.HP.dead ==true){
    gameOverScreen.show()
  }
    
});
