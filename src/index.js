import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

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



class Weapons {
  constructor(){
    this.Weapons = [];
  }
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
  spawnItem() {
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
class GroundItem{
  constructor(texture){
    this.sprite = PIXI.Sprite.from(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x =x
    this.sprite.y =y
    this.hitbox = new PIXI.Rectangle(x, y, 10, 10);
    app.stage.addChild(this.sprite);
  }
  update(delta){

  }
}


//======================================================================================

// Weapons

//
class Projectile{
  constructor(sprite){
    
  }
}
class Weapon{
  constructor(speed, damage, projectileLayer){
  this.sprite.x = app.screen.width/2
  this.sprite.y = app.screen.height/2
  }
  
  use(){
    this.projectileLayer.addProjectile()
  }

}


class Armory{

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
  fire(){
    this.addNewProjectile();
  }
  update(delta){

    this.projectiles.forEach((projectile)=>{
      //console.log(projectile.duration)
      projectile.update(delta);
      //1 to troche na skroty ale nie psuje kodu
      if (projectile.duration <= 1) {
        console.log(projectile.duration)
        this.removeProjectile(projectile)
      }
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  removeProjectile(projectile){
    const index = this.projectiles.indexOf(projectile);
    if (index !== -1){
      this.projectiles.splice(index,1)
      this.container.removeChild(projectile.sprite)
      this.container.removeChild(projectile.hitbox)
    }
  }
}


class randomFireball{
  constructor(duration){
    this.sprite = PIXI.Sprite.from('fireball.png')
    this.sprite.anchor.set(0.5)
    this.sprite.x = app.screen.width/2
    this.sprite.y = app.screen.height/2
    this.speed = 10;
    this.damage = 50;
    this.durationTime = duration;
    this.duration = duration; 
    this.cooldown = 50;
    this.hitbox = new PIXI.Rectangle(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2,
      10,10
  );
  app.stage.addChild(this.sprite)
  this.direction = this.calculateDirection()
  }
  getCooldown(){
    return this.cooldown;
  }
  updateCooldown(n){
    this.cooldown = n;
  }
  updateDuration(duration){
    this.durationTime = duration
    this.duration = duration
  }
  getDuration(){
    return this.durationTime;
  }

  calculateDirection(){
    //dodac celowanie
    let dx = 0 - this.sprite.x;
    let dy = 0;
    const length = Math.sqrt(dx * dx + dy * dy);
    return { vx: (dx / length) * this.speed, vy: (dy / length) * this.speed };
  }
  updateDirection(){
    this.direction = this.calculateDirection();
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
      this.reset();
    }
  }
  destroy() {
    
  if (this.sprite.parent) {
      this.sprite.parent.removeChild(this.sprite);
  } 
  //this.direction = null;
  this.duration =null
}
  reset(){
   
    this.sprite.x = app.screen.width/2
    this.sprite.y = app.screen.height/2
    this.duration = this.durationTime;
    this.show()
  }
  softreset(){
    this.sprite.x = app.screen.width/2
    this.sprite.y = app.screen.height/2
  }
  hide(){
    this.sprite.visible = false;
  }
  show(){
    this.sprite.visible = true;
  }
}

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
    this.inventory = new Inventory(); // to do

    this.hitbox = new PIXI.Rectangle(
      this.sprite.x - this.sprite.width / 2,
      this.sprite.y - this.sprite.height / 2,
      10,10
  );

    app.stage.addChild(this.sprite);

    
  }
  update(delta){
    this.sprite.rotation+= 0.1 * delta;
    
  }
  getPlayer(){
    return this.sprite
  }
  
}
class HP {
  constructor(maxHP, widthPercent){
    this.maxHP = maxHP;
    this.HP = maxHP;
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

  decreaseHP(value){
    if(this.HP>0){
      this.HP -=value;
      const percentage = calculatePercentage(this.HP, this.maxHP)
      const barWidth = calculateAmountFromPercentage(percentage, this.barWidth)
      this.hpBarFront.width = barWidth;
   
      if(this.HP ==0){
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
    var tmp = this.HP += value;
    if(tmp > this.maxHP){
      this.HP += value;
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
      this.gameOver = false;
      this.container = new PIXI.Container();
      this.enemies = [];
      this.container.x = 0; 
      this.container.y = 0; 
      app.stage.addChild(this.container)
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
    const spawnMargin = 50;
    var edge = Math.floor(Math.random() * 4) + 1;
    var randomX = 0;
    var randomY = 0;
    switch (edge) {
      case 1:
        randomX = -spawnMargin +this.container.x;
        randomY = getRandomNumberY()+this.container.y
        break;
      case 2:
        randomX = getRandomNumberX() +this.container.x;
        randomY = app.screen.height + spawnMargin +this.container.y
        break
      case 3:
        randomX = app.screen.width+ spawnMargin +this.container.x;
        randomY = getRandomNumberY() +this.container.y
        break;
      case 4:
        randomX = getRandomNumberX() +this.container.x;
        randomY = -spawnMargin +this.container.y
        break;
      default:
        var randomX = 0;
        var randomY = 0;
    }

    let enem = enemyTypes.getRandomEnemy();
    const newEnemy = new Enemy(enem.spriteTexture, enem.speed,  enem.health,randomX, randomY)

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


class automaticFiringTimer{
  constructor(time, item){
    this.item = item;
    this.time = time;
    this.timeLeft = time;
  }///////////////////////////////////////////////////////////////////////////////////////////////////
  update(delta){

    this.timeLeft -=delta;
    if(this.timeLeft<0){
      this.timeLeft = this.time;
      this.item.fire();
    }
  }


}



class Map{
  constructor(backTexture){

    this.enemy1 = new Enemy('enemy1.png', 1, -100,-100);
    this.randomfireball = new randomFireball(40)
    //tmp
    this.EnemyTimerDuration = 50
    this.EnemyTimer = this.EnemyTimerDuration;

    this.EnemyContainer = new EnemyContainer()
    this.groundLayer = new GroundItemsLayer();

    //test
  
    
    
    this.player = new Player('player.png', 5);
    //app.stage.addChild(this.EnemyContainer.container);
    this.ProjectileLayer = new projectileLayer;
    this.ProjectileLayer.addProjectile(this.randomfireball)
    this.wearponTimers = [];
    this.weaponTimer = new automaticFiringTimer(20,this.ProjectileLayer)
    
  }
  drawBackground(){

  }
  updateWeaponTimers(delta){
    for (const projectile of this.ProjectileLayer.projectiles) {
      console.log(projectile)
    }
    this.weaponTimer.update(delta)
  }
  
  update(delta){
    //weapontimer
    this.updateWeaponTimers(delta)



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
    this.ProjectileLayer.update(delta)
    this.checkCollisions()
    this.checkWeaponCollisions()
    let xDelta = 0;
    let yDelta = 0;
  
    if (keys['ArrowLeft']) xDelta += 1;
    if (keys['ArrowRight']) xDelta -= 1;
    if (keys['ArrowUp']) yDelta += 1;
    if (keys['ArrowDown']) yDelta -= 1;
    this.EnemyContainer.move(xDelta, yDelta, this.player.speed);
    this.groundLayer.move(xDelta, yDelta, this.player.speed);

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
             
              if(enemy.HP.currentHP ==0){
                //console.log(enemy.HP.currentHP)
                //EnemyContainer.removeChild()
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
