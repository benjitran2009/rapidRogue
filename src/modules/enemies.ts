import { camera, createGroup, createSprite } from "../env";
import assets from "../util/assets";
import enemySpawning from "./enemySpawning";
import { gameStats, gameTimer, setGameStat } from "./gameStats";
import { addXp } from "./levels";
import { player } from "./player";
import { playerStats, subPlayerStat } from "./playerStats";
import { projectiles } from "./projectiles";
import { inUpgradeScreen } from "./upgrades";
//let gameStats.wave;
export let enemies = createGroup();

function  enemyDeathCallback() {
  addXp(5);
  //console.log(gameStats.currentWave.enemiesLeft)/*
  //currentWave.enemiesKilled++;
  //currentWave.enemiesLeft--;*/
}

export function enemy() {
  //find random 
  var rd1 = Math.round(Math.random()*1);
  var rd2 = Math.round(Math.random()*1);
  var rd3 = Math.floor(Math.random()*200);
  var rd4 = Math.floor(Math.random()*200);
  var enemyX = camera.x+(rd1?200:-200)+(rd3*(rd1?1:-1));
  var enemyY = camera.y+(rd2?200:-200)+(rd4*(rd2?1:-1));
  var enemySprite = createSprite(enemyX,enemyY);
  enemySprite.HP = 100+((gameStats.timer*1.005)*50);
  enemySprite.maxHP = 100+((gameStats.timer*1.005)*50);
  enemySprite.canBeHit = true;
  var tempEnemyConfig = {
    hasHit: false,
  };
  //enemySprite.pause();
  enemies.add(enemySprite);
  enemySprite.addAnimation("enemy", assets[`enemy${1/*gameStats.wave* TODO*/}`] as string)
  enemySprite.setAnimation("enemy");
  //enemySprite.bounceOff(enemies);
  var enemyInterval = setInterval(function () {
    if (gameStats.pause || inUpgradeScreen) {
      enemySprite.velocityX=0;
      enemySprite.velocityY=0;
      return;
    }
    if (enemySprite.outofbounds) {
      //if (((World.frameCount%2)==0)) { // every other frame is skipped
        //console.log("SKIP")
      //  return;
      //} else {
        enemySprite.pointTo(player.x,player.y);
        var angle = enemySprite.rotation * Math.PI / 180;
        enemySprite.velocityX = Math.cos(angle) * ((gameStats.timer/1000)*1.005); // TODO : BELWO
        enemySprite.velocityY = Math.sin(angle) * ((gameStats.timer/1000)*1.005); // TODO: set to timer formula
        return;
      //}
      //return;
    }
    enemySprite.pointTo(player.x,player.y);
    var angle = enemySprite.rotation * Math.PI / 180;
    //var deltaX = Math.cos(angle) * 3;
    //var deltaY = Math.sin(angle) * 3;
    //enemySprite.x+=deltaX;
    //enemySprite.y+=deltaY;
    enemySprite.velocityX = Math.cos(angle) * ((gameStats.timer/1000)*1.005); // TODO: set to timer formula
    enemySprite.velocityY = Math.sin(angle) * ((gameStats.timer/1000)*1.005); // TODO: set to timer formula
    if (enemySprite.collide(player)) {
      //enemySprite.velocityX = -Math.cos(angle);
      //enemySprite.velocityY = -Math.sin(angle);
      if (playerStats.invincible || tempEnemyConfig.hasHit) {
        return;
      }
      subPlayerStat("HP",7.5)
      //playerStats.HP-=7.5;
      tempEnemyConfig.hasHit = true;
      setTimeout(function () {
        tempEnemyConfig.hasHit = false;
      }, 1000/5);
    }
    enemySprite.displace(enemies);// this feels the most normal-like, better than -angle;
    /*
    if (enemySprite.collide(enemies)) {
      enemySprite.velocityX = -Math.cos(angle);
      enemySprite.velocityY = -Math.sin(angle);
    };*/
    if (enemySprite.collide(projectiles)) {
      if (enemySprite.canBeHit) {
        enemySprite.HP-=50*playerStats.cells;
        enemySprite.canBeHit = false;
        setTimeout(function () {
          enemySprite.canBeHit = true;
        }, 1000/5);
      }
      if (enemySprite.HP<=0) {
        clearInterval(enemyInterval);
        enemies.remove(enemySprite); // DO NOT recreate the incident.
        enemySprite.tint = "red";
        enemySprite.alpha = 0.5;
        enemySprite.rotationSpeed=15;
        enemyDeathCallback();
        //enemySprite.play();ss
        setTimeout(function () {
          enemySprite.destroy();
        }, 100);
      }
    }
  }, 1000/60); //!! cinematic test [makes projectiles too inaccurate]
  enemySprite.cleanUp = function () {
    clearInterval(enemyInterval);
    enemySprite.destroy();
  };
}