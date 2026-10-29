import { camera, createSprite, keyDown, loadImage } from "../env";
import assets from "../util/assets";
import {playerStats} from "./playerStats";

export let player = createSprite(0,0);
player.addAnimation("player", loadImage(assets.playerImage as string));
player.setAnimation("player");
player.depth = 9;
player.scale=1;
export var playerX = 0;
export var playerY = 0;
export function movementMain() {
  player.velocityX=0;
  player.velocityY=0;
  if (keyDown("w") || keyDown("up")) {
    //player.velocityY-=5;
    playerY-=4+(playerStats.friction*1);
  }
  if (keyDown("a") || keyDown("left")) {
    //player.velocityX-=5;
    playerX-=4+(playerStats.friction*1);
  }
  if (keyDown("s") || keyDown("down")) {
    //player.velocityY+=5;
    playerY+=4+(playerStats.friction*1);
  }
  if (keyDown("d") || keyDown("right")) {
    //player.velocityX+=5;
    playerX+=4+(playerStats.friction*1);
  }
  //if (player.velocityX !== 0 && player.velocityY !== 0) {
    /*
    
    var angle = enemySprite.rotation * Math.PI / 180;
    //var deltaX = Math.cos(angle) * 3;
    //var deltaY = Math.sin(angle) * 3;
    //enemySprite.x+=deltaX;
    //enemySprite.y+=deltaY;
    enemySprite.velocityX = Math.cos(angle);
    enemySprite.velocityY = Math.sin(angle);
    
    */
    //
    //var cS = Math.sqrt()
    //player.velocityX=player.velocityY
    //player.velocityY=player.velocityY
  //}

  //camera.x=player.x;
  //camera.y=player.y;

  //player.x+=Math.round((playerX-player.x)/8);
  //player.y+=Math.round((playerY-player.y)/8);
  
  player.velocityX = Math.round((playerX-player.x)/2);
  player.velocityY = Math.round((playerY-player.y)/2);
  camera.x=player.x;
  camera.y=player.y;
  
  //camera.x+=Math.round((playerX-camera.x)/8);
  //camera.y+=Math.round((playerY-camera.y)/8);
}