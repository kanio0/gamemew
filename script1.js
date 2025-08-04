//Объявление всех структур
let Game = {
    width: 1280,
    height: 720,
    gravityE: 0.25,
    gravity: 1,
    cdMana: 7000,
    groundLevel: 530,
    shopOpen: false,
    bg: new Image(),
    bg2: new Image(),
    bg3: new Image(),
    earth: new Image(),
    imgShop: new Image(),
    scoreFish: new Image(),
}

let Hero = {
    x: 490,
    y: 530,
    width: 60,
    height: 80,
    lives: 5,
    velocityY: 0,
    speed: 5,
    jumpPower: -15,
    score: 0,
    magicPower: 2,
    onGround: true,
    IsRight: true,
    isMoving: false,
    isInvincible: false,
    swordAttacking: false,
    haveSword: false,
    swordPower: 1,
    img1: new Image(),
    img: new Image(),
    img2: new Image(),
    life: new Image(),
    sword: new Image(),
    sword2: new Image(),
}

let attackHero = {
    x: Hero.x,
    y: 2 * Hero.y,
    width: 25,
    height: 25,
    alpha: 1,
    speed: Math.floor(Math.random() * 2 + 2),
    fly: false,
    fading: false,
    attackdir: true,
    attack: new Image(),
    attack2: new Image(),
}

let Enemy1 = {
    x: 120,
    y: 530,
    width: 60,
    height: 80,
    lives: 5,
    speed: 3,
    IsRight: true,
    rotate: false,
    die: true,
    img1: new Image(),
    img2: new Image(),
}

let Enemy2 = {
    x: 1020,
    y: 530,
    width: 60,
    height: 80,
    lives: 5,
    speed: 2.5,
    IsRight: true,
    die: true,
    img1: new Image(),
    img2: new Image(),
}

let Boss = {
    x: 1100,
    y: 470,
    width: 120,
    height: 140,
    lives: 40,
    speed: 2,
    IsRight: true,
    die: true,
    rotate: false,
    img1: new Image(),
    img2: new Image(),
}

let attackBoss = {
    x: Hero.x,
    y: 2 * Hero.y,
    width: 25,
    height: 25,
    alpha: 1,
    speed: Math.floor(Math.random() * 2 + 2),
    fly: false,
    fading: false,
    attack: new Image(),
    attack2: new Image(),
}

let Fish = {
    x: 500,
    y: 445,
    width: 150,
    height: 150,
    score: 0,
    check1: true,
    check2: false,
    img1: new Image(),
    img2: new Image(),
    img3: new Image(),
}

let upgrades = [
    { name: "Меч", price: 5, bought: false },
    { name: "Урон меча", price: 15, bought: false },
    { name: "Скорость маны", price: 20, bought: false },
    { name: "Жизнь", price: 180, bought: false },
    { name: "Урон магии", price: 300, bought: false }
];

var plat = [
    { x: 280, y: 370, width: 130, height: 40 },
    { x: 160, y: 490, width: 100, height: 40 },
    { x: 880, y: 400, width: 110, height: 40 },
    { x: 1080, y: 490, width: 70, height: 40 }
];


//нужные штучки
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");
canvas.width = Game.width;
canvas.height = Game.height;
let keys = {};
let bossBullets = [];
let manaIntervalId = null;
let gameLoopId = null;
let curLVL = 1;
let mana = 100;
let particles = [];
let shopMessage = "";
let shopMessageTimer = null;
let fl = true;
const audio = {
    mag: new Audio("audio/mag.mp3"),
    free: new Audio('audio/free.mp3')
};
for (let key in audio) audio[key].volume = 0.5;

//Фото
let upgradeImages = [
    new Image(), new Image(), new Image(), new Image(), new Image()
];

upgradeImages[0].src = "img/upg1.png";
upgradeImages[1].src = "img/upg2.png";
upgradeImages[2].src = "img/upg3.png";
upgradeImages[3].src = "img/upg4.png";
upgradeImages[4].src = "img/upg5.png";

let manaImages = [
    new Image(), new Image(), new Image(), new Image(), new Image()
]

manaImages[0].src = "img/mana100.png";
manaImages[1].src = "img/mana75.png";
manaImages[2].src = "img/mana50.png";
manaImages[3].src = "img/mana25.png";
manaImages[4].src = "img/mana0.png";

for (let i = 0; i < plat.length; i++) {
    plat[i].img = new Image();
    plat[i].img.src = 'img/plat.png';
}

Game.bg.src = 'img/bg.jpg';
Game.bg2.src = 'img/bg2.png';
Game.bg3.src = 'img/bg3.png';
Game.earth.src = 'img/earth.png';
Game.scoreFish.src = 'img/fish.png';
Game.imgShop.src = 'img/shop.png';
Hero.img.src = 'img/hero_sprite.png';
Hero.img1.src = 'img/hero2.png';
Hero.img2.src = 'img/hero.png';
Hero.life.src = 'img/life.png';
Hero.sword.src = 'img/sword.png';
Hero.sword2.src = 'img/sword2.png';
attackHero.attack.src = 'img/attack.png';
attackHero.attack2.src = 'img/attack2.png';
attackBoss.attack.src = 'img/attackE.png';
attackBoss.attack2.src = 'img/attackE2.png';
Enemy1.img1.src = 'img/enemy.png';
Enemy1.img2.src = 'img/enemy2.png';
Enemy2.img1.src = 'img/enemy.png';
Enemy2.img2.src = 'img/enemy2.png';
Fish.img1.src = 'img/fish2.png';
Fish.img2.src = 'img/fish3.png';
Fish.img3.src = 'img/fish4.png';
Boss.img1.src = 'img/boss1.png';
Boss.img2.src = 'img/boss2.png';

let imgload = 0;

Game.bg.onload = checkload;
Game.bg2.onload = checkload;
Game.bg3.onload = checkload;
Game.earth.onload = checkload;
Game.scoreFish.onload = checkload;
Game.imgShop.onload = checkload;
Hero.img.onload = checkload;
Hero.img1.onload = checkload;
Hero.img2.onload = checkload;
Hero.life.onload = checkload;
Hero.sword.onload = checkload;
Hero.sword2.onload = checkload;
attackHero.attack.onload = checkload;
attackHero.attack2.onload = checkload;
attackBoss.attack2.onload = checkload;
attackBoss.attack.onload = checkload;
Enemy1.img1.onload = checkload;
Enemy1.img2.onload = checkload;
Enemy2.img1.onload = checkload;
Enemy2.img2.onload = checkload;
Fish.img1.onload = checkload;
Fish.img2.onload = checkload;
Fish.img3.onload = checkload;
Boss.img1.onload = checkload;
Boss.img2.onload = checkload;
plat[0].img.onload = checkload;
manaImages[0].onload = checkload;
upgradeImages[0].onload = checkload;

function checkload() {
    imgload++
    if (imgload == 28) {
        start()
    }
}

//объявление уровней
function lvl1() {
    Hero.x = 0;
    Hero.y = Game.groundLevel;
}

function lvl2() {
    Hero.x = Game.width - Hero.width;
    Hero.y = Game.groundLevel;
}

function lvl3() {
    Hero.x = 0;
    Hero.y = Game.groundLevel;
}

function lvl13() {
    Hero.x = Game.width - Hero.width;
    Hero.y = Game.groundLevel;
}

//Отрисовка фрейма
function drawFrame() {
    updateHero();
    canvasContext.clearRect(0, 0, Game.width, Game.height);
    drawConstImg();
    if (curLVL === 1) {
        if (Enemy1.lives > 0) {
            updEnemy();
            drawEnemy();
        }
        if (Enemy2.lives > 0) {
            updEnemy2();
            drawEnemy2();
        }
    }
    else if (curLVL === 2) {
        if (!Fish.check1 && !Fish.check2) {
            flyFish();
        }
        drawFish2();
    }
    else if (curLVL === 3) {
        updateBossBullets();
        drawBossBullets();
        requestAnimationFrame(attackplayE)
    }
    if (Hero.lives <= 0) {
        end()
    }
    drawHero();
    requestAnimationFrame(attackplay);
}

function drawConstImg() {
    checkLife();
    checkEnemy();
    checkFishScore();
    drawBg();
    drawScore();
    drawLives();
    drawMana();
    updateParticles();
    drawParticles();
    if (curLVL === 1) {
        drawShop();
        showShop();
    }
    else if (curLVL === 2) {
        drawFishScore();
    }
    else if (curLVL === 3) {
        if (Boss.lives > 0) {
            drawPlatform();
            updBoss();
            drawBoss();
        }
    }
}

function drawPlatform() {
    for (let i = 0; i < plat.length; i++) {
        if (plat[i].img) {
            canvasContext.drawImage(plat[i].img, plat[i].x, plat[i].y, plat[i].width, plat[i].height);
        }
    }
}

//рисовка не взаимодействуемых
function drawBg() {
    if (curLVL == 1) {
        canvasContext.drawImage(Game.bg, 0, 0, Game.width, Game.height);
    }
    else if (curLVL == 2) {
        canvasContext.drawImage(Game.bg2, 0, 0, Game.width, Game.height);
    }
    else if (curLVL == 3) {
        canvasContext.drawImage(Game.bg3, 0, 0, Game.width, Game.height);
        canvasContext.drawImage(Game.earth, -20, 590, Game.width + 40, 130);
    }
}

function drawScore() {
    canvasContext.drawImage(Game.scoreFish, 120, 60, 50, 40);
    canvasContext.fillStyle = 'white'
    canvasContext.font = "48px Marauders Map";
    canvasContext.textAlign = "left";
    canvasContext.fillText(Hero.score, 180, 90);
}

function drawLives() {
    for (let i = 0; i < Hero.lives; i++) {
        canvasContext.drawImage(Hero.life, 100 + i * 30, 20, 65, 40)
    }
}

function drawMana() {
    if (mana == 100) {
        canvasContext.drawImage(manaImages[0], 10, 5, 110, 110);
    }
    else if (mana == 75) {
        canvasContext.drawImage(manaImages[1], 10, 5, 110, 110);
    }
    else if (mana == 50) {
        canvasContext.drawImage(manaImages[2], 10, 5, 110, 110);
    }
    else if (mana == 25) {
        canvasContext.drawImage(manaImages[3], 10, 5, 110, 110);
    }
    else if (mana <= 0) {
        canvasContext.drawImage(manaImages[4], 10, 5, 110, 110);
    }
}

function drawShop() {
    if (Game.imgShop) {
        canvasContext.drawImage(Game.imgShop, 570, 360, 220, 250)
    }
}

function drawShopID() {
    canvasContext.fillStyle = "rgba(79, 79, 79, 0.9)";
    canvasContext.fillRect(250, 80, 810, 260);
    for (let i = 0; i < upgrades.length; i++) {
        canvasContext.save();
        canvasContext.globalAlpha = upgrades[i].bought ? 1 : 0.5;
        let x = 290 + (i * 160), y = 120, w = 80, h = 80;
        canvasContext.drawImage(upgradeImages[i], x, y, w, h);
        canvasContext.globalAlpha = 1;
        canvasContext.restore();
        canvasContext.font = "24px Marauders Map";
        canvasContext.fillStyle = upgrades[i].bought ? "blue" : "red";
        canvasContext.textAlign = "center";
        canvasContext.fillText(upgrades[i].name, 330 + (i * 160), 220);
        canvasContext.font = "20px Marauders Map";
        canvasContext.fillStyle = "#fff";
        canvasContext.fillText(upgrades[i].price + " 🐟", 330 + (i * 160), 250);
    }
    if (shopMessage) {
        canvasContext.font = "36px Marauders Map";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "center";
        canvasContext.fillText(shopMessage, Game.width / 2, 320);
    }
}

function drawFishScore() {
    canvasContext.fillStyle = 'black'
    if (Hero.x > 470 && Hero.x < 760 && Fish.check1) {
        canvasContext.font = "48px Marauders Map";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Ударь меня мечом 1000 раз и получишь много рыбок", 600, 300);
    }
    else if (Hero.x > 470 && Hero.x < 760 && Fish.check2) {
        canvasContext.font = "48px Marauders Map";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Этого достаточно, можешь идти, вот тебе рыбки", 600, 300);
    }
    else if (Hero.x > 470 && Hero.x < 760 && !Fish.check1 && !Fish.check2) {
        canvasContext.font = "48px Marauders Map";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Не думал, что ты дойдешь до конца. Ты заслужил.", 600, 300);
        if (fl){
        audio.free.play();
        fl = false;
        }
    }
    canvasContext.font = "48px Marauders Map";
    canvasContext.textAlign = "center";
    if (!(!Fish.check1 && !Fish.check2)) {
        canvasContext.fillText(Fish.score, 570, 100);
        canvasContext.fillText("/ 1000", 690, 100);
    }
}

function drawFish2() {
    if (Fish.check1 && Fish.img1) {
        canvasContext.drawImage(Fish.img1, Fish.x, Fish.y, Fish.width, Fish.height)
    }
    else if (Fish.check2 && Fish.img2) {
        canvasContext.drawImage(Fish.img2, Fish.x, Fish.y, Fish.width, Fish.height)
    }
    else if (!Fish.check1 && !Fish.check2) {
        canvasContext.drawImage(Fish.img3, Fish.x, Fish.y, Fish.width, Fish.height)
    }

}

function drawHero() {
    canvasContext.save();
    if (Hero.isInvincible) {
        canvasContext.globalAlpha = 0.4 + 0.6 * Math.sin(Date.now() / 90);
    }
    if (!attackHero.fly && !attackHero.fading) {
        attackHero.attackdir = Hero.IsRight
    }
    if (Hero.isMoving) {
        if (Hero.IsRight) {
            canvasContext.drawImage(Hero.img, Hero.x, Hero.y, Hero.width, Hero.height);
        }
        else {
            canvasContext.drawImage(Hero.img1, Hero.x, Hero.y, Hero.width, Hero.height);
        }
    }
    else {
        canvasContext.drawImage(Hero.img2, Hero.x, Hero.y, Hero.width, Hero.height);
    }
    if (Hero.swordAttacking && Hero.haveSword) {
        canvasContext.save();
        if (Hero.IsRight) {
            canvasContext.drawImage(Hero.sword, Hero.x + 45, Hero.y + 20, 70, 50)
        } else {
            canvasContext.drawImage(Hero.sword2, Hero.x - 45, Hero.y + 20, 70, 50)
        }
        canvasContext.restore();
    }
    canvasContext.restore();
}

function drawAttack() {
    if (!attackHero.fly && !attackHero.fading) {
        return;
    }
    canvasContext.save();
    canvasContext.globalAlpha = attackHero.alpha;
    if (attackHero.attackdir) {
        canvasContext.drawImage(attackHero.attack, attackHero.x, attackHero.y - 10, attackHero.width + 15, attackHero.height + 15);
    }
    else {
        canvasContext.drawImage(attackHero.attack2, attackHero.x, attackHero.y - 10, attackHero.width + 15, attackHero.height + 15);
    }
    canvasContext.restore();
}

function drawEnemy() {
    if (Enemy1.IsRight) {
        canvasContext.drawImage(Enemy1.img1, Enemy1.x, Enemy1.y, Enemy1.width, Enemy1.height);
    }
    else {
        canvasContext.drawImage(Enemy1.img2, Enemy1.x, Enemy1.y, Enemy1.width, Enemy1.height);
    }
    drawHealthBar(Enemy1);
}

function drawEnemy2() {
    if (Enemy2.IsRight) {
        canvasContext.drawImage(Enemy2.img1, Enemy2.x, Enemy2.y, Enemy2.width, Enemy2.height);
    }
    else {
        canvasContext.drawImage(Enemy2.img2, Enemy2.x, Enemy2.y, Enemy2.width, Enemy2.height);
    }
    drawHealthBar(Enemy2);
}

function drawHealthBar(enemy) {
    let barWidth = 60;
    let barHeight = 8;
    let x = enemy.x;
    let y = enemy.y - 16;
    canvasContext.save();
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(x, y, barWidth, barHeight);
    let percent = Math.max(enemy.lives, 0) / 5;
    canvasContext.fillStyle = percent > 0.6 ? "#18b722" : percent > 0.3 ? "#d4d415" : "#c72b2b";
    canvasContext.fillRect(x + 1, y + 1, (barWidth - 2) * percent, barHeight - 2);
    canvasContext.restore();
}

function drawBoss() {
    if (Boss.IsRight) {
        canvasContext.drawImage(Boss.img2, Boss.x, Boss.y, Boss.width, Boss.height);
    }
    else {
        canvasContext.drawImage(Boss.img1, Boss.x, Boss.y, Boss.width, Boss.height);
    }
    drawHealthBarBoss(Boss);
}

function drawAttackE() {
    console.log('1')
    canvasContext.save();
    canvasContext.globalAlpha = attackBoss.alpha;
    if (Boss.IsRight) {
        canvasContext.drawImage(attackBoss.attack, attackBoss.x, attackBoss.y - 10, attackBoss.width + 15, attackBoss.height + 15);
    }
    else {
        canvasContext.drawImage(attackBoss.attack2, attackBoss.x, attackBoss.y - 10, attackBoss.width + 15, attackBoss.height + 15);
    }
    canvasContext.restore();
}

function drawBossBullets() {
    canvasContext.save();
    bossBullets.forEach(bullet => {
        canvasContext.globalAlpha = bullet.alpha;
        if (bullet.vx < 0) {
            canvasContext.drawImage(attackBoss.attack2, bullet.x, bullet.y, bullet.width, bullet.height);
        } else {
            canvasContext.drawImage(attackBoss.attack, bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });
    canvasContext.restore();
}

function drawHealthBarBoss(enemy) {
    let barWidth = 200;
    let barHeight = 30;
    let x = Game.width / 2 - barWidth / 2;
    let y = 90;
    canvasContext.fillStyle = 'white';
    canvasContext.font = "36px Marauders Map";
    canvasContext.textAlign = "center";
    canvasContext.fillText('HP King of Rat', 710, 58);
    canvasContext.save();
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(x, y, barWidth + 131, barHeight);
    let percent = enemy.lives / 30;
    canvasContext.fillStyle = percent > 0.6 ? "#18b722" : percent > 0.3 ? "#d4d415" : "#c72b2b";
    canvasContext.fillRect(x + 1, y + 1, (barWidth - 2) * percent, barHeight - 2);
    canvasContext.restore();
}

//при убийстве врага прикольный эффект
function spawnSparks(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push({ x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, life: 30 });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    canvasContext.save();
    particles.forEach(p => {
        canvasContext.fillStyle = `rgba(139,0,0,1)`;
        canvasContext.fillRect(p.x, p.y, 4, 4);
    });
    canvasContext.restore();
}

//движение героя
function updateHero() {
    if (keys['ArrowRight'] || keys['KeyD']) {
        Hero.x += Hero.speed;
        Hero.isMoving = true;
        Hero.IsRight = true;
    } else if (keys['ArrowLeft'] || keys['KeyA']) {
        Hero.x -= Hero.speed;
        Hero.isMoving = true;
        Hero.IsRight = false;
    } else {
        Hero.isMoving = false;
    }
    Hero.y += Hero.velocityY;
    Hero.velocityY += Game.gravity;
    let onAnyPlatform = false;
    if (Hero.y >= Game.groundLevel) {
        Hero.y = Game.groundLevel;
        Hero.velocityY = 0;
        onAnyPlatform = true;
    }
    if (curLVL === 3) {
        for (let i = 0; i < plat.length; i++) {
            let p = plat[i];
            if (
                Hero.velocityY >= 0 &&
                Hero.y + Hero.height - Hero.velocityY <= p.y &&
                Hero.y + Hero.height >= p.y &&
                Hero.x + Hero.width - 5 > p.x &&
                Hero.x + 5 < p.x + p.width
            ) {
                Hero.y = p.y - Hero.height;
                Hero.velocityY = 0;
                onAnyPlatform = true;
            }
            if (
                Hero.velocityY < 0 &&
                Hero.y - Hero.velocityY >= p.y + p.height &&
                Hero.y <= p.y + p.height &&
                Hero.x + Hero.width - 5 > p.x &&
                Hero.x + 5 < p.x + p.width
            ) {
                Hero.y = p.y + p.height;
                Hero.velocityY = 0;
            }
        }
    }
    if (curLVL === 1 && Hero.x < 0) {
        clearInterval(gameLoopId);
        curLVL = 2;
        lvl2();
        start();
        return;
    }
    else if (curLVL === 2 && Hero.x + Hero.width > Game.width) {
        clearInterval(gameLoopId);
        curLVL = 1;
        lvl1();
        start();
        return;
    }
    else if (curLVL === 1 && Hero.x + Hero.width > Game.width) {
        clearInterval(gameLoopId);
        Boss.lives = 50;
        curLVL = 3;
        lvl1();
        start();
        return;
    }
    else if (curLVL === 3 && Hero.x < 0) {
        clearInterval(gameLoopId);
        curLVL = 1;
        lvl13();
        start();
        return;
    }
    if (Hero.x < 0) {
        Hero.x = 0
    };
    if (Hero.x + Hero.width > Game.width) {
        Hero.x = Game.width - Hero.width
    };
    Hero.onGround = onAnyPlatform;
}

//движение крыс и босса
function updEnemy() {
    if (Enemy1.x < 400 && !Enemy1.rotate) {
        Enemy1.x += Enemy1.speed;
        Enemy1.IsRight = true;
    }
    else {
        Enemy1.rotate = true
        Enemy1.IsRight = false
    }
    if (Enemy1.rotate && Enemy1.x > 100) {
        Enemy1.IsRight = false
        Enemy1.x -= Enemy1.speed;
    }
    else {
        Enemy1.rotate = false;
    }
}

function updEnemy2() {
    if (Enemy2.x < 1200 && !Enemy2.rotate) {
        Enemy2.x += Enemy2.speed;
        Enemy2.IsRight = true;
    }
    else {
        Enemy2.rotate = true
        Enemy2.IsRight = false
    }
    if (Enemy2.rotate && Enemy2.x > 800) {
        Enemy2.IsRight = false
        Enemy2.x -= Enemy2.speed;
    }
    else {
        Enemy2.rotate = false;
    }
}

function updBoss() {
    if (Boss.x < Hero.x && !Boss.rotate) {
        Boss.x += Boss.speed;
        Boss.IsRight = true;
    }
    else {
        Boss.rotate = true
        Boss.IsRight = false
    }
    if (Boss.rotate && Boss.x > Hero.x) {
        Boss.IsRight = false
        Boss.x -= Boss.speed;
    }
    else {
        Boss.rotate = false;
    }
    if (Math.abs(Boss.x - Hero.x) < Boss.speed) {
        Boss.x = Hero.x;
    }
}

//атаки героя и крысинга короля
function updAttack() {
    if (!attackHero.fly) {
        return;
    }
    attackHero.x += attackHero.speed;
    if (attackHero.x + attackHero.width > Game.width) {
        attackHero.fly = false;
        attackHero.fading = true;
        fadeAttack();
        return;
    }
    if (attackHero.x <= 0) {
        attackHero.fly = false;
        attackHero.fading = true;
        fadeAttack();
        return;
    }
    if (curLVL === 1) {
        if (
            attackHero.y + attackHero.height > Enemy1.y &&
            attackHero.y < Enemy1.y + Enemy1.height &&
            attackHero.x + attackHero.width > Enemy1.x &&
            attackHero.x < Enemy1.x + Enemy1.width &&
            Enemy1.lives > 0
        ) {
            attackHero.fly = false;
            Enemy1.lives -= Hero.magicPower;
            attackHero.fading = true;
            audio.mag.play();
            fadeAttack();
            return;
        }
        if (
            attackHero.y + attackHero.height > Enemy2.y &&
            attackHero.y < Enemy2.y + Enemy2.height &&
            attackHero.x + attackHero.width > Enemy2.x &&
            attackHero.x < Enemy2.x + Enemy2.width &&
            Enemy2.lives > 0
        ) {
            attackHero.fly = false;
            Enemy2.lives -= Hero.magicPower;
            attackHero.fading = true;
            fadeAttack();
            audio.mag.play();
            return;
        }
    }
    else if (curLVL === 3) {
        if (
            attackHero.y + attackHero.height > Boss.y &&
            attackHero.y < Boss.y + Boss.height &&
            attackHero.x + attackHero.width > Boss.x &&
            attackHero.x < Boss.x + Boss.width &&
            Boss.lives > 0
        ) {
            attackHero.fly = false;
            Boss.lives -= Hero.magicPower;
            attackHero.fading = true;
            audio.mag.play();
            fadeAttack();
            return;
        }
    }
}

function fadeAttack() {
    if (!attackHero.fading) {
        return;
    }
    drawAttack();
    attackHero.alpha -= 0.05;
    attackHero.width *= 0.96;
    attackHero.height *= 0.96;
    if (attackHero.alpha <= 0.05) {
        attackHero.fading = false;
        attackHero.fly = false;
        attackHero.alpha = 1;
        attackHero.width = 20;
        attackHero.height = 20;
        return;
    }
    requestAnimationFrame(fadeAttack);
}

function attackplay() {
    if (!attackHero.fly)
        return;
    drawAttack();
    updAttack();
}

function updAttackE() {
    if (!attackBoss.fly) {
        return;
    }
    if (!Boss.IsRight) {
        attackBoss.x -= attackBoss.speed;
    } else {
        attackBoss.x -= attackBoss.speed;
    }
    if (attackBoss.x + attackBoss.width > Game.width || attackBoss.x <= 0) {
        attackBoss.fly = false;
        attackBoss.fading = true;
        fadeAttackE();
        return;
    }
    if (
        attackBoss.y + attackBoss.height > Hero.y &&
        attackBoss.y < Hero.y + Hero.height &&
        attackBoss.x + attackBoss.width > Hero.x &&
        attackBoss.x < Hero.x + Hero.width &&
        Hero.lives > 0
    ) {
        attackBoss.fly = false;
        audio.mag.play();
        Hero.lives -= 1;
        attackBoss.fading = true;
        fadeAttackE();
    }
}

function playE() {
    if (!attackBoss.fly && Boss.die) {
        if (Boss.lives > 10) {
            attackBoss.x = Boss.x;
            attackBoss.y = Boss.y + 60;
            attackBoss.speed = Boss.IsRight ?
                -(Math.floor(Math.random() * 5 + 5)) :
                Math.floor(Math.random() * 5 + 5);
            attackBoss.fly = true;
            attackplayE();
        } else {
            circularBossAttack(Boss.x + Boss.width / 2, Boss.y + Boss.height / 2, 8, 3);
        }
    }
}

function circularBossAttack(x, y, bulletCount, speed) {
    let angleStep = (2 * Math.PI) / bulletCount;
    for (let i = 0; i < bulletCount; i++) {
        let angle = i * angleStep;
        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;
        bossBullets.push({ x: x, y: y, vx: velocityX, vy: velocityY, radius: 10, alpha: 1, width: 25, height: 25, fading: false });
    }
}

function updateBossBullets() {
    for (let i = bossBullets.length - 1; i >= 0; i--) {
        let bullet = bossBullets[i];
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        if (
            bullet.y + bullet.height > Hero.y &&
            bullet.y < Hero.y + Hero.height &&
            bullet.x + bullet.width > Hero.x &&
            bullet.x < Hero.x + Hero.width &&
            Hero.lives > 0 && !Hero.isInvincible
        ) {
            Hero.lives--;
            Hero.isInvincible = true;
            setTimeout(() => {
                Hero.isInvincible = false;
            }, 1000);
            bossBullets.splice(i, 1);
            continue;
        }
        if (bullet.x < 0 || bullet.x > Game.width ||
            bullet.y < 0 || bullet.y > Game.height) {
            bossBullets.splice(i, 1);
        }
    }
}

function fadeAttackE() {
    if (!attackBoss.fading) {
        return;
    }
    drawAttackE();
    attackBoss.alpha -= 0.05;
    attackBoss.width *= 0.96;
    attackBoss.height *= 0.96;
    if (attackBoss.alpha <= 0.05) {
        attackBoss.fading = false;
        attackBoss.fly = false;
        attackBoss.alpha = 1;
        attackBoss.width = 20;
        attackBoss.height = 20;
        return;
    }
    requestAnimationFrame(fadeAttackE);
}

function attackplayE() {
    if (curLVL === 3) {
        if (!attackBoss.fly)
            return;
        drawAttackE();
        updAttackE();
    }
}


//камбэк маны
function plusMana() {
    if (mana < 100) {
        mana += 25;
        if (mana > 100) {
            mana = 100;
        }
    }
}

//Запуск
function start() {
    if (curLVL === 3) {
        setInterval(playE, 4000);
    }
    if (manaIntervalId) {
        clearInterval(manaIntervalId);
    }
    attackHero.fly = false;
    manaIntervalId = setInterval(plusMana, Game.cdMana);
    if (gameLoopId) {
        clearInterval(gameLoopId)
    };
    gameLoopId = setInterval(drawFrame, 1000 / 60);
}

//ну че заново???
function end() {
    clearInterval(gameLoopId);
    canvasContext.fillStyle = "rgba(0,0,0,0.6)";
    canvasContext.fillRect(0, 0, Game.width, Game.height);
    curLVL = 1;
    setTimeout(resetGame, 1500);
}

function resetGame() {
    Hero.x = 490;
    Hero.y = 530;
    Boss.x = 1100;
    Boss.y = 470;
    Hero.lives = 5;
    Hero.onGround = true;
    Hero.velocityY = 0;
    Hero.score -= Math.floor(Hero.score * 20 / 100)
    attackHero.fly = false;
    attackBoss.fly = false,
    attackBoss.fading =false,
    Enemy1.lives = 5;
    Enemy2.lives = 5;
    start();
}

function win() {
    clearInterval(gameLoopId);
    canvasContext.fillStyle = "rgba(0,0,0,0.6)";
    canvasContext.fillRect(0, 0, Game.width, Game.height);
    canvasContext.font = "36px Marauders Map";
    canvasContext.fillStyle = "white";
    canvasContext.textAlign = "center";
    canvasContext.fillText('win!', Game.width / 2, 320);
}

function buyUpgrade(idx) {
    if (upgrades[idx].bought) {
        showShopMessage("Вы его уже купили");
        return;
    }
    if (Hero.score < upgrades[idx].price) {
        showShopMessage("Недостаточно рыбок!");
        return;
    }
    upgrades[idx].bought = true;
    Hero.score -= upgrades[idx].price;
    if (idx == 0) {
        Hero.haveSword = true;
    }
    else if (idx == 1) {
        Hero.swordPower += 1;
    }
    else if (idx == 2) {
        Game.cdMana -= 3000;
        if (manaIntervalId) {
            clearInterval(manaIntervalId)
        };
        manaIntervalId = setInterval(plusMana, Game.cdMana);
    }
    else if (idx == 3) {
        Hero.lives += 10;
    }
    else if (idx == 4) {
        Hero.magicPower += 1;
    }
    showShopMessage("Куплено: " + upgrades[idx].name + "!");
}

function showShopMessage(msg) {
    shopMessage = msg;
    if (shopMessageTimer) clearTimeout(shopMessageTimer);
    shopMessageTimer = setTimeout(() => {
        shopMessage = "";
    }, 1500);
}

function showShop() {
    if (Game.shopOpen) {
        drawShopID()
    }
}

function flyFish() {
    Fish.y -= 5;
}


document.addEventListener("keyup", function (e) {
    keys[e.code] = false;
    Hero.isMoving = false;
});


//много проверок
function checkSwordHit(hero, enemy) {
    let range = 70;
    if (Hero.IsRight) {
        return (
            enemy.x < hero.x + hero.width + range &&
            enemy.x + enemy.width > hero.x + hero.width &&
            Math.abs(enemy.y - hero.y) < hero.height
        );
    } else {
        return (
            enemy.x + enemy.width > hero.x - range &&
            enemy.x < hero.x &&
            Math.abs(enemy.y - hero.y) < hero.height
        );
    }
}

function checkFish() {
    if (
        (Hero.x + 100 > 500) &&
        (Hero.x - 50 < 650) &&
        (curLVL === 2)) {
        Fish.score += 1;
    }
}

function checkEnemy() {
    if (curLVL === 1) {
        if ((Enemy1.y + Enemy1.height > Hero.y - 10) &&
            (Enemy1.y - Enemy1.height < Hero.y + Hero.height - Enemy1.height) &&
            (Enemy1.x + Enemy1.width > Hero.x) &&
            (Enemy1.x - Enemy1.width < Hero.x + Hero.width - Enemy1.width && Enemy1.die)) {
            if (!Hero.isInvincible) {
                Hero.lives--;
                Hero.isInvincible = true;
                setTimeout(() => {
                    Hero.isInvincible = false;
                }, 1000);
            }
        }
        if ((Enemy2.y + Enemy2.height > Hero.y - 10) &&
            (Enemy2.y - Enemy2.height < Hero.y + Hero.height - Enemy2.height) &&
            (Enemy2.x + Enemy2.width > Hero.x) &&
            (Enemy2.x - Enemy2.width < Hero.x + Hero.width - Enemy2.width &&
                Enemy2.die)) {
            if (!Hero.isInvincible) {
                Hero.lives--;
                Hero.isInvincible = true;
                setTimeout(() => {
                    Hero.isInvincible = false;
                }, 1000);
            }
        }
    }
    else if (curLVL === 3) {
        if ((Boss.y + Boss.height > Hero.y) &&
            (Boss.y - Boss.height < Hero.y + Hero.height - Boss.height) &&
            (Boss.x + Boss.width > Hero.x) &&
            (Boss.x - Boss.width < Hero.x + Hero.width - Boss.width && Boss.die)) {
            if (!Hero.isInvincible) {
                Hero.lives--;
                Hero.isInvincible = true;
                setTimeout(() => {
                    Hero.isInvincible = false;
                }, 1000);
            }
        }
    }
}

function checkFishScore() {
    if (Fish.score == 10 && Fish.check1) {
        Fish.check2 = true;
        Fish.check1 = false;
        Hero.score += Math.floor(Math.random() * 999 + 1);
    }
    else if (Fish.score == 20 && Fish.check2) {
        Fish.check2 = false;
        Hero.score += 1000;
    }
}

function checkLife() {
    if (Enemy2.lives <= 0 && Enemy2.die) {
        Hero.score += Math.floor(Math.random() * 3 + 1)
        Enemy2.die = false;
        spawnSparks(
            Enemy2.x + Enemy2.width / 2,
            Enemy2.y + Enemy2.height / 2
        );
        setTimeout(() => {
            Enemy2.lives = 5;
            Enemy2.die = true;
            Enemy2.x = 1020;
            Enemy2.y = 530;
        }, 20000);
    }
    if (Enemy1.lives <= 0 && Enemy1.die) {
        Hero.score += Math.floor(Math.random() * 3 + 1)
        Enemy1.die = false;
        spawnSparks(
            Enemy1.x + Enemy1.width / 2,
            Enemy1.y + Enemy1.height / 2
        );
        setTimeout(() => {
            Enemy1.lives = 5;
            Enemy1.die = true;
            Enemy1.x = 20;
            Enemy1.y = 530;
        }, 20000);
    }
    if (Boss.lives <= 0 && Boss.die) {
        Hero.score += Math.floor(Math.random() * 999 + 1)
        Boss.die = false;
        spawnSparks(
            Boss.x + Boss.width / 2,
            Boss.y + Boss.height / 2
        );
        setTimeout(() => {
            win()
        }, 5000);
    }
}

//events
document.addEventListener("keydown", function (e) {
    keys[e.code] = true;
    if ((e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') && Hero.onGround) {
        Hero.velocityY = Hero.jumpPower;
        Hero.onGround = false;
    }
    if (e.code === 'KeyQ' && mana >= 25) {
        if (!attackHero.fly && !attackHero.fading && Hero.IsRight) {
            attackHero.x = Hero.x + Hero.width / 2;
            attackHero.y = Hero.y + Hero.height / 2;
            attackHero.speed = Math.floor(Math.random() * 3 + 7);
            attackHero.width = 20;
            attackHero.height = 20;
            attackHero.alpha = 1;
            attackHero.fly = true;
            attackHero.fading = false;
            attackplay();
            mana -= 25;
        }
        if (!attackHero.fly && !attackHero.fading && !Hero.IsRight) {
            attackHero.x = Hero.x + Hero.width / 2;
            attackHero.y = Hero.y + Hero.height / 2;
            attackHero.speed = -(Math.floor(Math.random() * 3 + 7));
            attackHero.width = 20;
            attackHero.height = 20;
            attackHero.alpha = 1;
            attackHero.fly = true;
            attackHero.fading = false;
            attackplay();
            mana -= 25;
        }
    }
    if (e.code === 'KeyP' && Hero.haveSword) {
        if (!Hero.swordAttacking) {
            Hero.swordAttacking = true;
            [Enemy1, Enemy2, Boss].forEach(enemy => {
                if (enemy.lives > 0 && checkSwordHit(Hero, enemy)) {
                    enemy.lives -= Hero.swordPower;
                }
            });
            Hero.swordAttackTimer = setTimeout(() => {
                Hero.swordAttacking = false;
            }, 200);
            checkFish();
        }
    }
    if (e.code === 'KeyT' && (Hero.x > 570 && Hero.x < 790)) {
        Game.shopOpen = true
    }
    if (e.code === 'KeyX') {
        Game.shopOpen = false;
    }
    if (Game.shopOpen) {
        let upgradeIndex = -1;
        if (e.code === "Digit1") upgradeIndex = 0;
        if (e.code === "Digit2") upgradeIndex = 1;
        if (e.code === "Digit3") upgradeIndex = 2;
        if (e.code === "Digit4") upgradeIndex = 3;
        if (e.code === "Digit5") upgradeIndex = 4;
        if (upgradeIndex !== -1) {
            buyUpgrade(upgradeIndex);
        }
    }
});

//музыка
var muzStart = false;
var muz = new Audio('audio/muz.mp3')
muz.volume = 0.2;

function playMuz() {
    if (muzStart) return;
    muzStart = true
    muz.addEventListener('ended', function () {
        muz.play()
    });
    muz.addEventListener('canplaythrough', function () {
        muz.play()
    }, false);
    muz.play();
}

function initEventListeners() {
    window.addEventListener('click', () => {
        playMuz();
    }, { once: true });
}

initEventListeners()