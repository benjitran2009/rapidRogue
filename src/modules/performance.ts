import {
    camera,
    CENTER,
    fill,
    getUserId,
    rgb,
    text,
    textAlign,
    textSize,
    World,
} from "../env";

export default () => {
    fill(rgb(0, 0, 0, 0.5));
    textAlign(CENTER);
    textSize(18);
    text("FPS: " + Math.floor(World.frameRate), camera.x - 160, camera.y - 180);
};
