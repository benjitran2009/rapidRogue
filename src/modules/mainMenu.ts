import config from "../config";
import {
    alert,
    camera,
    CENTER,
    createSprite,
    fill,
    getUserId,
    keyWentDown,
    LEFT,
    loadImage,
    text,
    textAlign,
    textFont,
    textSize,
    World,
} from "../env";
import assets from "../util/assets";
//import keyWentDown from "../util/keyWentDown";
import enemySpawning from "./enemySpawning";
import { resetGameTimer } from "./gameStats";
import { getPrettyModList } from "./modding";
import { player } from "./player";
import playerHealing from "./playerHealing";
import { setSetting, settings } from "./settings";
export let enemySpawningInterval: any; // Should be a interval
export let setEnemySpawningInterval = (x: any) => (enemySpawningInterval = x);
export let playerHealingInterval: any;
export let setPlayerHealingInterval = (x: any) => (playerHealingInterval = x);
export let mainMenu = true;
var page = 0;
var mmInternals = {
    p0SelectedOption: 0,
    p2SelectedOption: 0,
};

var mmBackgrounds = [createSprite(0, 0), createSprite(0, 0)];
mmBackgrounds.forEach(function (backgroundSprite, indx) {
    backgroundSprite.addAnimation(
        "background",
        loadImage(assets.backgroundImage as string),
    );
    //console.log(indx);
    backgroundSprite.setAnimation("background");
    backgroundSprite.y = camera.y;
    backgroundSprite.x = camera.x + (indx + 0.5) * 400 + -400;
});

let logo = createSprite(0, 0);
logo.addAnimation("logo", assets.logo as string);

//soun
var ct = 0;

const splashes = [
    "You should try doing your work!",
    "This game is never updating!",
    "v1.0.0 when?",
    "Vampire Survivors Ripoff",
    "Don't lose at 00:30 again!",
    "60:00 is impossible.",
    "You can quit the game now",
    "Now 90% slower!",
    Math.PI.toString(),
    "You should also try Minecraft!",
    "Snap back to reality!",
    "tip - kill all your enemies",
    "Now starting at 3499$",
    "rapid > rogue",
];
let selectedSplash = splashes[Math.floor(Math.random() * splashes.length)];

export const initMainMenu = () => {
    mainMenu = true;
    page = 0;
    mmInternals = {
        p0SelectedOption: 0,
        p2SelectedOption: 0,
    };
    mmBackgrounds = [createSprite(0, 0), createSprite(0, 0)];
    mmBackgrounds.forEach(function (backgroundSprite, indx) {
        backgroundSprite.addAnimation(
            "background",
            loadImage(assets.backgroundImage as string),
        );
        //console.log(indx);
        backgroundSprite.setAnimation("background");
        backgroundSprite.y = camera.y;
        backgroundSprite.x = camera.x + (indx + 0.5) * 400 + -400;
    });

    logo = createSprite(0, 0);
    logo.addAnimation("logo", assets.logo as string);
    selectedSplash = splashes[Math.floor(Math.random() * splashes.length)];
};

export function mainMenuMain() {
    switch (page) {
        case 0:
            logo.visible = true;
            mmBackgrounds.forEach(function (backgroundSprite, indx) {
                //backgroundSprite.setAnimation("santa_1");
                backgroundSprite.y = camera.y;
                backgroundSprite.x +=
                    backgroundSprite.x >= camera.x + (indx + 1) * 400 + -400
                        ? -400
                        : 1.25;
                //console.log(backgroundSprite.x>(indx*200+-200)?5:-200);
            });

            logo.x = camera.x;
            logo.y = camera.y - 165;
            logo.scale = 1.25; // TODO: rescale it to prevent pixel messups

            if (keyWentDown("up")) {
                //console.log(mmInternals.p0SelectedOption)
                mmInternals.p0SelectedOption--;
            }
            if (keyWentDown("down")) {
                //console.log(mmInternals.p0SelectedOption);
                mmInternals.p0SelectedOption++;
            }
            if (keyWentDown("enter") || keyWentDown("space")) {
                switch (mmInternals.p0SelectedOption) {
                    case 0:
                        //mainMenu=false;
                        //console.log("startgame");
                        page++;
                        break;
                    case 1:
                        page=2;
                        //alert("Not implemented!");
                        break;
                    case 3:
                        prompt(
                            `${config.name} ${config.version}
https://github.com/benjitran2009/rapidRogue/

Some ideas inspired by Vampire Survivors, and other roguelites.

Contributor(s):
Ben3Coder

Game Testers:
<nobody>

Assets:
studio.code.org`,
                            getUserId(),
                        );
                        break;
                    case 2:
                        prompt(`Game Version: ${config.version}
Mod SDK Version: ${config.sdk}

Detected Mods:
${getPrettyModList()}`);
                        break;
                    default:
                        break;
                }
                //console.log("startgame");
            }
            if (mmInternals.p0SelectedOption == -1) {
                mmInternals.p0SelectedOption = 3; // rollback down
            }
            mmInternals.p0SelectedOption = mmInternals.p0SelectedOption % 4;

            textAlign(CENTER);
            //textSize(48);
            //textFont("monospace");
            //fill("purple");
            //text("rapidRogue", camera.x, camera.y - 150);
            //fill("yellow");
            textSize(18 + Math.sin(World.frameCount / 4) * 0.5);
            //fill("gray");
            fill("gold");
            text(selectedSplash as string, camera.x, camera.y - 120);
            fill("white");
            textSize(36);
            text(
                mmInternals.p0SelectedOption == 0 ? "> Play <" : "Play",
                camera.x,
                camera.y - 50,
            );
            text(
                mmInternals.p0SelectedOption == 1 ? "> Settings <" : "Settings",
                camera.x,
                camera.y,
            );
            text(
                mmInternals.p0SelectedOption == 2 ? "> Mods <" : "Mods",
                camera.x,
                camera.y + 50,
            );
            text(
                mmInternals.p0SelectedOption == 3 ? "> Credits <" : "Credits",
                camera.x,
                camera.y + 100,
            );

            textSize(24);
            fill("black");
            textAlign(LEFT);
            //text("dev mode is on!", camera.x - 182.5, camera.y + 175);
            break;

        case 1:
            //var ct=0;
            mmBackgrounds.forEach(function (backgroundSprite) {
                //backgroundSprite.setAnimation("santa_1");
                if (backgroundSprite.centered) {
                    return;
                }
                backgroundSprite.x += (camera.x - backgroundSprite.x) / 2; //backgroundSprite.x>=(camera.x+indx*400+-400)?-400:1.25;
                if (
                    -1 <= camera.x - backgroundSprite.x &&
                    camera.x - backgroundSprite.x <= 1
                ) {
                    backgroundSprite.x = camera.x;
                    //console.log("ct"+ct);
                    ct++;
                    backgroundSprite.centered = true;
                }
                //console.log(camera.x-backgroundSprite.x)
                /*if (backgroundSprite.x == camera.x) {
                  console.log("ct");
                  ct++;
                  backgroundSprite.centered=true;
                }*/
                if (ct == 2) {
                    mmBackgrounds.forEach(function (_backgroundSprite) {
                        _backgroundSprite.destroy(); //=false;
                    });
                    /*enemies.forEach(function (__enemy) {
                        __enemy.cleanUp();
                    });*/ // TODO: reimplement menu enemies, but useless for now.
                    mainMenu = false;
                    //console.log("bye bye bye")
                    player.visible = true;
                    enemySpawningInterval = setInterval(enemySpawning, 1000);
                    playerHealingInterval = setInterval(playerHealing, 1000);
                    resetGameTimer();
                    logo.destroy();
                    //console.log("startgame");
                }
                //console.log(backgroundSprite.x>(indx*200+-200)?5:-200);
            });
            break;

        case 2:
            logo.visible =false;
            mmBackgrounds.forEach(function (backgroundSprite, indx) {
                //backgroundSprite.setAnimation("santa_1");
                backgroundSprite.y = camera.y;
                backgroundSprite.x +=
                    backgroundSprite.x >= camera.x + (indx + 1) * 400 + -400
                        ? -400
                        : 1.25;
                //console.log(backgroundSprite.x>(indx*200+-200)?5:-200);
            });

            if (keyWentDown("up")) {
                //console.log(mmInternals.p0SelectedOption)
                mmInternals.p2SelectedOption--;
            }
            if (keyWentDown("down")) {
                //console.log(mmInternals.p0SelectedOption);
                mmInternals.p2SelectedOption++;
            }
            if (keyWentDown("enter") || keyWentDown("space")) {
                switch (mmInternals.p2SelectedOption) {
                    case 0:
                        //mainMenu=false;
                        //console.log("startgame");
                        page=0;
                        break;
                    case 1:
                        setSetting("developerMode", !settings.developerMode);
                        //alert("Not implemented!");
                        break;
                    case 3:
                        // TODO: error class or something
                        throw new Error("You asked for it?");
                        //break;
                    case 2:
                        setSetting("betaFeatures", !settings.betaFeatures);
                        break;
                    default:
                        break;
                }
                //console.log("startgame");
            }
            if (mmInternals.p2SelectedOption == -1) {
                mmInternals.p2SelectedOption = 3; // rollback down
            }
            mmInternals.p2SelectedOption = mmInternals.p2SelectedOption % 4;

            textAlign(CENTER);
            textSize(48);
            textFont("monospace");
            fill("white");
            text("Settings", camera.x, camera.y - 150);
            //fill("gray");
            fill("white");
            textSize(24);
            text(
                mmInternals.p2SelectedOption == 0 ? "> Back <" : "Back",
                camera.x,
                camera.y - 50,
            );
            text(
                mmInternals.p2SelectedOption == 1 ? `> Developer Mode: ${settings.developerMode} <` : `Developer Mode: ${settings.developerMode}`,
                camera.x,
                camera.y,
            );
            text(
                mmInternals.p2SelectedOption == 2 ? `> Beta Features: ${settings.betaFeatures} <` : `Beta Features: ${settings.betaFeatures}`,
                camera.x,
                camera.y + 50,
            );
            text(
                mmInternals.p2SelectedOption == 3 ? "> Crash <" : "Crash",
                camera.x,
                camera.y + 100,
            );

            textSize(24);
            fill("black");
            textAlign(LEFT);
            //text("dev mode is on!", camera.x - 182.5, camera.y + 175);
            break;

        default:
            break;
    }
}
/*
export default {
    mainMenu: mainMenu,
    mainMenuMain: mainMenuMain,
}*/
/*
window.mainMenu=mainMenu;
window.mainMenuMain=mainMenuMain;
*/
