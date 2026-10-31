import config from "../config";
import {
    camera,
    CENTER,
    fill,
    getUserId,
    LEFT,
    rgb,
    text,
    textAlign,
    textSize,
    World,
} from "../env";

export default () => {
    fill(rgb(255, 255, 255));
    textAlign(LEFT);
    textSize(18);
    text("FPS: " + Math.floor(World.frameRate), camera.x - 200, camera.y - 185);
    text(`${config.name} ${config.version}`, camera.x -200, camera.y+195);
};
