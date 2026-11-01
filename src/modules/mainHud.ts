import {
    camera,
    CENTER,
    fill,
    LEFT,
    rect,
    rgb,
    text,
    textAlign,
    textFont,
    textSize,
} from "../env";
import { secondsToPrettyString } from "../util/timer";
import { gameStats } from "./gameStats";
import { level, xp, xpToNextLevel } from "./levels";
import { playerStats } from "./playerStats";

export default () => {
    textAlign(CENTER);
    //fill("white");
    //textSize(18);
    //text("rapidRogue beta", camera.x,camera.y+150);
    //textSize(14);
    //text("v0.0.5 - the mvp++ update", camera.x,camera.y+170);
    //textSize(10);
    //text("This is a work in progress, things are subject to change.", camera.x,camera.y+185);

    //waves
    fill(rgb(0, 0, 0));
    rect(camera.x - 200, camera.y - 200, 400, 20);
    fill(rgb(66, 135, 245));
    rect(camera.x - 200, camera.y - 200, (xp / xpToNextLevel) * 400, 20);

    fill("white");
    textFont("monospace");
    textSize(24);
    const timerSeconds = Math.floor(gameStats.timer / 1000);
    text(
        secondsToPrettyString(timerSeconds),
        //"Waves: " + gameStats.wave + "/" + gameStats.maxWaves,
        camera.x,
        camera.y - 150,
    );
    textSize(18);
    text(
        `Level: ${level} | ${xp} / ${xpToNextLevel} xp`,
        camera.x,
        camera.y - 185,
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
    /**
   *  currentWave: {
        enemyTarget: 0,
        enemiesKilled: 0,
        enemiesLeft: 0,
    },
   */

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
    fill("white");
    textAlign(LEFT);
    textSize(12);
    text(
        `${playerStats.HP} / ${playerStats.maxHP}`,
        camera.x - 175,
        camera.y + 187.5,
    );

    fill(rgb(0, 0, 0, 0.5));

    //rotation(radians(0));
};
