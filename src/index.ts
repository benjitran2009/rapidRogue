/*!
 * rapidRogue Next v0.0.6d
 * https://github.com/benjitran2009/rapidRogue/blob/main/src/index.js
 *
 * This game is the next version of rapidRogue, now compiled using
 * a new toolchain for better modularily and a cleaner codebase.
 *
 * How to play:
 * - Use W, A, S, D (or the arrow keys) for movement.
 * - Aim the cursor and click to shoot a projectile to kill enemies.
 * - Have fun :)
 *
 * For developers:
 * - Source code: https://github.com/benjitran2009/rapidRogue/ :)
 * - Modding documentation available at the source code repository.
 *
 *
 **/
import * as lazyfill from "./util/lazyfill.js";
lazyfill.initialize();
import * as Modding from "./modules/modding.js";
Modding.initialize();

//export const unsafeEval = eval;
import "es6-promise/auto.js";
//import { Promise } from "es6-promise";
//window.Promise = Promise;
//import ticker from "./util/ticker";-depreceated
//import backgroundImage from "#assets/background.png";
//import backgroundFillImage from "#assets/background_fill.png";
//import cursorImage from "#assets/cursor.png";
//import playerImage from "#assets/player.png";
import assets from "./util/assets.js";
import {
  enemySpawningInterval,
  mainMenu,
  mainMenuMain,
  setEnemySpawningInterval,
} from "./modules/mainMenu.js";
import {
  addPlayerStat,
  playerStats,
  setPlayerStat,
  subPlayerStat,
} from "./modules/playerStats.js";
//playSound(assets.findTheBalance, true);
//enemySpawningInterval
//import {pause, togglePause} from "./modules/pause.js";
//let pause;
import { gameStats, setGameStat } from "./modules/gameStats.js";
import { enemies } from "./modules/enemies.js";
import { movementMain, player } from "./modules/player.js";
import { projectiles } from "./modules/projectiles.js";
import enemySpawning from "./modules/enemySpawning.js";
import performance from "./modules/performance.js";
import {
    background,
  camera,
  CENTER,
  createGroup,
  createSprite,
  drawSprites,
  fill,
  keyWentDown,
  LEFT,
  line,
  loadImage,
  mouseDown,
  mouseWentDown,
  noStroke,
  rect,
  rgb,
  Sprite,
  stroke,
  strokeWeight,
  text,
  textAlign,
  textFont,
  textSize,
  World,
} from "./env.js";
import { inUpgradeScreen, upgradeScreenMain } from "./modules/upgrades.js";
//import keyWentDown from "./util/keyWentDown.js";
//let {pause, togglePause} = _pause
//let {mainMenu, mainMenuMain} = _mainMenu;
console.log(`
=================================================
rapidRogue Next v0.0.6d
"A suprising game made in a suprising environment."
https://github.com/benjitran2009/rapidRogue/
=================================================
`);

//array polyfill?

// This is the main code for the upgrades
// fully coded by me
// code beautified for readability
//var inUpgradeScreen = false;
/*
function draw() {
    background("white");
    drawSprites();
    if (inUpgradeScreen) {
        upgradeScreenMain();
    } else {
        textAlign(CENTER);
        text("no content?\nintentional?\ni think not.",
            camera.x, camera.y);
        displayUpgrade(0, 1,
        2); // those who know arrays
    }
}
*/
/*
Event.recieve("sixSeven", function (d) {
  console.log(d);
});

Event.send("sixSeven", "sprite", "data", function () {
  console.log("callback");
});
*/
//showMobileControls(true,true,false);

var delta = 0;

//(function(RapidAnalytics,By,Ben3Coder,Software){})("");
World.frameRate = 60; //target
var mLock = false;

camera.on();

// theme: break the rules
//var backgroundSprite = createSprite(0,0);
//backgroundSprite.setAnimation("background");

//var backgroundSprite = createSprite(0,0);
//backgroundSprite.setAnimation("background");

var cursor = createSprite(0, 0);
cursor.addAnimation("cursor", assets.cursorImage as string);
cursor.setAnimation("cursor");

//var thing = createSprite(0,0);
//thing.setAnimation("thing");
//thing.scale = 0.175;

function cursorMain() {
  //cursor.x+=Math.round((camera.mouseX-cursor.x)/8);
  //cursor.y+=Math.round((camera.mouseY-cursor.y)/8);
  cursor.x = camera.mouseX;
  cursor.y = camera.mouseY;
}

textFont("monospace");
//textAlign(CENTER);

function mainHud() {
  textAlign(CENTER);
  fill("black");
  //textSize(18);
  //text("rapidRogue beta", camera.x,camera.y+150);
  //textSize(14);
  //text("v0.0.5 - the mvp++ update", camera.x,camera.y+170);
  //textSize(10);
  //text("This is a work in progress, things are subject to change.", camera.x,camera.y+185);

  //waves
  textFont("monospace");
  textSize(24);
  text(
    "Waves: " + gameStats.wave + "/" + gameStats.maxWaves,
    camera.x,
    camera.y - 175,
  );
  textSize(18);
  text(
    "Enemies remaining: " + gameStats.currentWave.enemiesLeft,
    camera.x,
    camera.y - 150,
  );

  //fps counter
  //textSize(18);
  //text("FPS: "+Math.floor(World.frameRate),camera.x-155,camera.y-175);
  //textSize(10);
  //text(getUserId(),camera.x+100,camera.y-175);
  //legacy hpbar
  //stroke(NONE);
  //fill("red");
  //rect(player.x-50,player.y-75,100,10);
  //fill("green");
  //if (playerStats.invincible) {
  //  fill("cyan");
  //}
  //rect(player.x-50,player.y-75,100*(playerStats.HP/playerStats.maxHP),10);
  //hpbar
  //stroke(0);--no effect

  fill(rgb(255, 255, 255, 0.5));
  rect(camera.x-200, camera.y+200, 400, 20);


  fill("red");
  rect(camera.x - 185, camera.y + 175, 150, 15);
  fill("green");
  if (playerStats.invincible) {
    fill("cyan");
  }
  rect(
    camera.x - 185,
    camera.y + 175,
    150 * (playerStats.HP / playerStats.maxHP),
    15,
  );

  fill(rgb(0, 0, 0, 0.5));

  //rotation(radians(0));
}

function thingMain() {
  player.pointTo(cursor.x, cursor.y);
  //thing.pointTo(cursor.x,cursor.y);
  //thing.x = player.x;d
  //thing.y = player.y-65;
}

//var projectiles = createGroup();

function projectile() {
  var c = {
    x: cursor.x,
    y: cursor.y,
  };
  //c.x+=c.x>player.x?200:-200;
  //c.y+=c.y>player.y?200:-200;
  var p = createSprite(player.x, player.y);
  p.addAnimation("cursor", assets.cursorImage as string);
  p.setAnimation("cursor");
  p.depth = 999;
  projectiles.add(p);
  p.depth = 1;
  //target = (cursor.x, cursor.y);
  //p (p.x, p.y);
  //(cursor.y-p.y)/(cursor.x-p.x);
  //var s=(cursor.y-p.y)/(cursor.x-p.x);
  //var pn = cursor.x>player.x ? 1 : -1;

  p.pointTo(c.x, c.y);
  /**/
  var angle = (p.rotation * Math.PI) / 180;
  //var deltaX = Math.cos(angle) * 10;
  //var deltaY = Math.sin(angle) * 10;
  //console.log(s);
  p.velocityX = Math.cos(angle) * 10;
  p.velocityY = Math.sin(angle) * 10;
  var _c = setInterval(function () {
    p.displace(projectiles);
    //p.x+=deltaX;
    //p.y+=deltaY;
    if (p.isTouching(enemies)) {
      clearInterval(_c);
      clearTimeout(_a);
      setTimeout(function () {
        p.destroy();
      }, 25);
    }
  }, 1000 / 60);
  var _a = setTimeout(function () {
    p.destroy();
    clearInterval(_c);
  }, 750);
}

/*
 angle = 30 * Math.PI / 180, // 30 degrees
      speed = 1,
      deltaX = Math.cos(angle) * speed,
      deltaY = Math.sin(angle) * speed;
      */

function projectileMain() {
  if (mouseDown("leftButton") && !mLock) {
    mLock = true;
    for (var i = 0; i < playerStats.immune; i++) {
      //playSound("laserShoot(1).wav",false);
      projectile();
    }
    setTimeout(
      function () {
        mLock = false;
      },
      1000 / (3 + playerStats.cooler * 2),
    );
  }
}
var insideViewingRange = createGroup(); // performance master2000
var outsideViewingRange = createGroup();

cursor.depth = 100;
//thing.depth = 99;

function proHackerMode() {
  enemies.forEach(function (_enemy) {
    line(player.x, player.y, _enemy.x, _enemy.y);
  });
  //for (var i = 0; i < enemies.length; i++) {
  //  group
  //}
}

var backgrounds: [Sprite, Sprite, Sprite, Sprite, Sprite, Sprite, Sprite, Sprite, Sprite] = [
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
  createSprite(0, 0),
];

backgrounds.forEach(function (_background) {
  _background.addAnimation("background", loadImage(assets.backgroundImage as string));
  _background.setAnimation("background");
  _background.depth = -1;
  _background.visible = true;
});

/*

around player
---
-*- 3x3 *-current
---
*/

//camera.zoom=0.25;

function backgroundMain() {
  //precode seems easier & more performant
  // "never code again" - ben
  //0
  backgrounds[0].x = Math.round((player.x - 400) / 400) * 400;
  backgrounds[0].y = Math.round((player.y - 400) / 400) * 400;
  //1
  backgrounds[1].x = Math.round(player.x / 400) * 400;
  backgrounds[1].y = Math.round((player.y - 400) / 400) * 400;
  //2
  backgrounds[2].x = Math.round((player.x + 400) / 400) * 400;
  backgrounds[2].y = Math.round((player.y - 400) / 400) * 400;
  //3
  backgrounds[3].x = Math.round((player.x - 400) / 400) * 400;
  backgrounds[3].y = Math.round(player.y / 400) * 400;
  //4
  backgrounds[4].x = Math.round(player.x / 400) * 400;
  backgrounds[4].y = Math.round(player.y / 400) * 400;
  //5
  backgrounds[5].x = Math.round((player.x + 400) / 400) * 400;
  backgrounds[5].y = Math.round(player.y / 400) * 400;
  //6
  backgrounds[6].x = Math.round((player.x - 400) / 400) * 400;
  backgrounds[6].y = Math.round((player.y + 400) / 400) * 400;
  //7
  backgrounds[7].x = Math.round(player.x / 400) * 400;
  backgrounds[7].y = Math.round((player.y + 400) / 400) * 400;
  //8
  backgrounds[8].x = Math.round((player.x + 400) / 400) * 400;
  backgrounds[8].y = Math.round((player.y + 400) / 400) * 400;
  //var backgrounds = [];
  //var backgroundSprite = createSprite(0,0);
  //backgroundSprite.setAnimation("background");
}

var dead = false;
var secondChance = true;
var deadBackground = createSprite(0, 0);
deadBackground.visible = false;
deadBackground.addAnimation("background_fill", assets.backgroundFillImage as string);
deadBackground.setAnimation("background_fill");

//var enemySpawningInterval;

function statsMain() {
  if (playerStats.iframes > 0) {
    setPlayerStat("invincible", true);
    //playerStats.invincible = true;
    subPlayerStat("iframes", 1);
    //playerStats.iframes-=1;
  } else {
    setPlayerStat("invincible", false);
    //playerStats.invincible = false;
  }
  if (playerStats.HP <= 0) {
    clearInterval(enemySpawningInterval);
    deadBackground.visible = true;
    deadBackground.scale = 5;
    deadBackground.depth = 999;
    deadBackground.x = camera.x;
    deadBackground.y = camera.y;
    deadBackground.alpha = 0.5;
    setGameStat("pause", true);
    //togglePause(true);
    //pause=true;
    dead = true;
    player.tint = "red";
    player.rotationSpeed = 5;
    player.velocityX = 0; //5;
    player.velocityY = 0; //-5;
    //enemySprite.play();ss
    var _reduceSize = setInterval(function () {
      player.scale += 0.1;
      player.alpha -= 0.01;
      if (player.alpha <= 0) {
        clearInterval(_reduceSize);
        player.visible = false;
        if (!secondChance) {
          return;
        }
        secondChance = false;
        //giveQuestion(function () {
        // revive the player.
        //prompt();
        //enemySpawningInterval = setInterval(enemySpawning, 5000);
        setEnemySpawningInterval(setInterval(enemySpawning, 5000));
        deadBackground.visible = false;
        player.visible = true;
        //pause=false;
        setGameStat("pause", false); // = false;
        player.tint = "white";
        player.rotation = 0;
        player.velocityX = 0; //5;
        player.velocityY = 0;
        player.scale = 1;
        player.alpha = 1;
        dead = false;
        //playerStats.HP=playerStats.maxHP;
        setPlayerStat("HP", playerStats.maxHP / 2);
        setPlayerStat("iframes", 300);
        //playerStats.iframes=300;
        //});
      }
    }, 1000 / 60);
    //setTimeout(function () {
    //  player.destroy();
    //}, 1000);

    //inQuestion=true;
  }
}

var outOfBounds = createGroup();
//var inBounds = createGroup();
function enemyHud() {
  //s1: categorize
  enemies.forEach(function (_enemy) {
    //match
    if (
      player.x - 400 <= _enemy.x &&
      _enemy.x <= player.x + 400 &&
      player.y - 400 <= _enemy.y &&
      _enemy.y <= player.y + 400
    ) {
      //render hud
      //hpbar
      //fill("red");
      //rect(_enemy.x-50,_enemy.y-75,100,10);
      //fill("green");
      //rect(_enemy.x-50,_enemy.y-75,100*(_enemy.HP/_enemy.maxHP),10);//TODO
    } else {
      if (_enemy.destructionImminent) {
        return;
      }
      //console.log("enemy went out of bounds.");
      _enemy.destructionImminent = true;
      _enemy.outofbounds = true;
      outOfBounds.add(_enemy);
      enemies.remove(_enemy);
      //var _checkInterval = setInterval(function () {
      //  if ((player.x-400 <= _enemy.x && _enemy.x <= player.x+400) &&
      //  (player.y-400 <= _enemy.y && _enemy.y <= player.y+400)) {
      //    //console.log("re-activated enemy!");
      //    clearInterval(_checkInterval);
      //    clearTimeout(_checkTimeout);
      //    enemies.add(_enemy);
      //    outOfBounds.remove(_enemy);
      //    _enemy.outofbounds = false;
      //    _enemy.destructionImminent = false;
      //  }
      //}, 1000/12);
      _enemy._checkTimeout = setTimeout(function () {
        if (
          !(
            player.x - 400 <= _enemy.x &&
            _enemy.x <= player.x + 400 &&
            player.y - 400 <= _enemy.y &&
            _enemy.y <= player.y + 400
          )
        ) {
          //console.log("destroyed inactive enemy!");
          //clearInterval(_checkInterval);
          clearTimeout(_enemy._checkTimeout);
          _enemy.destroy();
        }
      }, 5000);
    }
  });
  //s2: processor
}

setInterval(function () {
  outOfBounds.forEach(function (_enemy) {
    if (
      player.x - 400 <= _enemy.x &&
      _enemy.x <= player.x + 400 &&
      player.y - 400 <= _enemy.y &&
      _enemy.y <= player.y + 400
    ) {
      //sconsole.log("re-activated enemy!");
      //clearInterval(_checkInterval);
      clearTimeout(_enemy._checkTimeout);
      enemies.add(_enemy);
      outOfBounds.remove(_enemy);
      _enemy.outofbounds = false;
      _enemy.destructionImminent = false;
    }
  });
}, 1000 / 12);

//playSound("https://analytics.example.com/v1/audio.mp3?r=1",0)

//pause

var won = false;

function draw() {
  delta = 1000 / World.frameRate;
  if (won) {
    background("white");
    drawSprites();
    textAlign(CENTER);
    //textSize(32);
    textFont("monospace");
    rect(camera.x - 200, camera.y - 44, 400, 100);
    fill("white");
    textSize(58);
    text("You won!!!", camera.x, camera.y + 30);
    performance();
    throw new Error("This is intentional.");
    return;
  }
  if (mainMenu) {
    //console.log(mainMenu)
    //playerStats.iframes=60;
    //playerStats.invincible=true;
    player.x = camera.x;
    player.y = camera.y;

    background("white");
    drawSprites();
    mainMenuMain(); // unintellisense
    performance();
    return;
  }
  //if (inQuestion) {
  //  displayQuestionMain();
  //  return;
  //};
  if (dead) {
    background("white");
    drawSprites();
    textAlign(CENTER);
    //textSize(32);
    textFont("monospace");
    rect(camera.x - 200, camera.y - 44, 400, 100);
    fill("white");
    if (secondChance) {
      textSize(16);
      text("[to_be_implemented]", camera.x, camera.y);
      textSize(14);
      text("[todo]", camera.x, camera.y + 25);
    } else {
      textSize(58);
      text("You died!", camera.x, camera.y + 30);
    }
    performance();
    return;
  }
  //drawSprites();
  if (inUpgradeScreen) {
    //background("white");
    drawSprites();
    upgradeScreenMain();
    performance();
    return;
  }
  /*} else {
      textAlign(CENTER);
      text("no content?\nintentional?\ni think not.", camera.x, camera.y);
      displayUpgrade(0, 1, 2); // those who know arrays
    }*/
  if (keyWentDown("p") && !dead) {
    setGameStat("pause", !gameStats.pause);
    //pause=!pause;
    //pause=!pause;
  }
  if (!gameStats.pause) {
    background("white");
    backgroundMain();
    movementMain();
    thingMain();
    cursorMain();
    projectileMain();
    drawSprites();
    mainHud();
    enemyHud();
    statsMain();
    performance();
    //playerStats.HP=Math.abs(Math.sin(World.frameCount/60)*100);
    //proHackerMode();
  } else {
    //background(rgb(0,0,0,0.5));
    //background("white");
    player.velocityX = 0;
    player.velocityY = 0;
    textAlign(CENTER);
    textSize(48);
    //fill(rgb(0,0,0,0.5));
    noStroke();
    //rect(camera.x-200,camera.y-50,400,100);
    text("Game Paused", camera.x, camera.y);
    performance();
    //textSize(18);
    //text("*-This doesn't do anything btw.", camera.x,camera.y+25);
    //textSize(14);
    //text("*-You might be ded.", camera.x,camera.y+50);
  }
}

//enemySpawning();
// lock em up
window.rapidRogueDraw = draw;
//export default {draw: draw};

//export const d = draw// draw;
