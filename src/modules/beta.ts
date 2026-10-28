import { camera, CENTER, fill, getUserId, rgb, text, textAlign, textSize, World } from "../env";

export default () => {
    fill(rgb(0,0,0,0.5))
    textAlign(CENTER);
    textSize(18);
  text("rapidRogue Next", camera.x,camera.y+150);
  textSize(14);
  text("v0.0.6d - the nEXT generation update", camera.x,camera.y+170);
  textSize(10);
  text("This is a work in progress, things are subject to change.", camera.x,camera.y+185);
  textSize(12);
  text("FPS: "+Math.floor(World.frameRate),camera.x-175,camera.y-180);
  textSize(24);
  text(getUserId(),camera.x,camera.y);
  textSize(150);
  //rotate(radian(45));
  text("BETA",camera.x,camera.y+50);
}