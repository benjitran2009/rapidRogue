import config from "../config";
import {
    camera,
    fill,
    keyDown,
    LEFT,
    line,
    rgb,
    rgba,
    text,
    textAlign,
    textSize,
    World,
} from "../env";
import { enemies } from "./enemies";
import { addXp } from "./levels";
import { player } from "./player";
import { playerStats, setPlayerStat } from "./playerStats";
import { settings } from "./settings";

let invc = false;

export default () => {
    if (settings.developerMode) {
        fill(rgb(146, 3, 255));
        textAlign(LEFT);
        textSize(18);
        text(
            `s:${World.allSprites.length};px:${player.x};py:${player.y};e:${enemies.length};oob:<ni>`,
            camera.x - 200,
            camera.y - 185,
        );
        text(
            "FPS: " + Math.floor(World.frameRate),
            camera.x - 200,
            camera.y - 160,
        );
        text(
            `${config.name} ${config.version}`,
            camera.x - 200,
            camera.y + 195,
        );
        //function proHackerMode() {
        enemies.forEach(function (_enemy) {
            line(player.x, player.y, _enemy.x, _enemy.y);
        });
        if (keyDown("i")) {
            camera.zoom+=0.01;
        }
        if (keyDown("o")) {
            camera.zoom-=0.01;
        }
        if (keyDown("z")) {
            addXp(Infinity);
        }
        if (keyDown("x")) {
            invc=!invc;
            setPlayerStat("iframes", invc ? Infinity : 0);
        }
        //for (var i = 0; i < enemies.length; i++) {
        //  group
        //}
        //}
    }
};
