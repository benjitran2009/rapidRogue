import config from "../config";
import {
    camera,
    fill,
    LEFT,
    rgb,
    text,
    textAlign,
    textSize,
    World,
} from "../env";
import { settings } from "./settings";

export default () => {
    if (settings.developerMode) {
        fill(rgb(255, 255, 255));
        textAlign(LEFT);
        textSize(18);
        text(
            "FPS: " + Math.floor(World.frameRate),
            camera.x - 200,
            camera.y - 185,
        );
        text(
            `${config.name} ${config.version}`,
            camera.x - 200,
            camera.y + 195,
        );
    }
};
