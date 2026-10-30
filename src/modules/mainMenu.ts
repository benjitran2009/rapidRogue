import { camera, CENTER, createSprite, fill, getUserId, keyWentDown, LEFT, loadImage, text, textAlign, textFont, textSize, World } from "../env";
import assets from "../util/assets";
//import keyWentDown from "../util/keyWentDown";
import enemySpawning from "./enemySpawning";
import playerHealing from "./playerHealing";
export let enemySpawningInterval: any; // Should be a interval
export let setEnemySpawningInterval = (x: any) => enemySpawningInterval = x;
export let playerHealingInterval: any;
export let setPlayerHealingInterval = (x: any) => playerHealingInterval = x;
export let mainMenu = true;
var page = 0;
var mmInternals = {
    p0SelectedOption: 0,
};

var mmBackgrounds = [createSprite(0, 0), createSprite(0, 0)];
mmBackgrounds.forEach(function (backgroundSprite, indx) {
    backgroundSprite.addAnimation("background", loadImage(assets.backgroundImage as string));
    //console.log(indx);
    backgroundSprite.setAnimation("background");
    backgroundSprite.y = camera.y;
    backgroundSprite.x = (camera.x) + ((indx+0.5) * 400) + -400;
});

//soun
var ct = 0;

const splashes = [
    "You should try doing your work!",
    "This game is never updating!",
    "0.0.7d when?",
    "Vampire Survivors Ripoff",
    "Don't lose at wave 2 again!",
    "Wave 10 is impossible.",
    "You can quit the game now",
    "Now 90% slower!",
    Math.PI.toString(),
    "You should also try Minecraft!",
    "Snap back to reality!",
    "tip - kill all your enemies",
    "Now starting at 3499$",
    "rapid > rogue",
];
let selectedSplash = splashes[Math.floor(Math.random()*splashes.length)];

export function mainMenuMain() {
    switch (page) {
        case 0:

            mmBackgrounds.forEach(function (backgroundSprite, indx) {
                //backgroundSprite.setAnimation("santa_1");
                backgroundSprite.y = camera.y;
                backgroundSprite.x += backgroundSprite.x >= (camera.x + (indx+1) * 400 + -400) ? -400 : 1.25;
                //console.log(backgroundSprite.x>(indx*200+-200)?5:-200);
            });

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
                        prompt(`rapidRogue Next v0.0.6d
https://github.com/benjitran2009/rapidRogue/

Some ideas inspired by Vampire Survivors, and other roguelites.

Contributor(s):
Ben3Coder

Game Testers:
<nobody>

Assets:
studio.code.org`,getUserId());
                        break;
                    case 2:
                        prompt(`Game Version: <none>
Builtin Mod SDK Version: <unknown>

Detected Mods:`); // TODO: mod list page
                        break;
                    default: break;
                }
                //console.log("startgame");
            }
            if (mmInternals.p0SelectedOption == -1) { 
                mmInternals.p0SelectedOption = 2; // rollback down
                // TODO: find more efficenty super binary bithacking technique to make this better
            }
            mmInternals.p0SelectedOption = mmInternals.p0SelectedOption % 3;

            textAlign(CENTER);
            textSize(48);
            textFont("monospace");
            fill("purple");
            text("rapidRogue", camera.x, camera.y - 150);
            //fill("yellow");
            textSize(18 + (Math.sin(World.frameCount / 4) * 0.5));
            //fill("gray");
            fill("gold");
            text(selectedSplash as string, camera.x, camera.y - 120);
            fill("white");
            textSize(36);
            text(mmInternals.p0SelectedOption == 0 ? "> Play <" : "Play", camera.x, camera.y - 50);
            text(mmInternals.p0SelectedOption == 1 ? "> Credits <" : "Credits", camera.x, camera.y);
            text(mmInternals.p0SelectedOption == 2 ? "> Mods <" : "Mods", camera.x, camera.y + 50);
            textSize(24);
            fill("black");
            textAlign(LEFT);
            //text("dev mode is on!", camera.x - 182.5, camera.y + 175);
            break;

        case 1:
            //var ct=0;
            mmBackgrounds.forEach(function (backgroundSprite) {
                //backgroundSprite.setAnimation("santa_1");
                if (backgroundSprite.centered) { return; }
                backgroundSprite.x += ((camera.x - backgroundSprite.x) / 2);//backgroundSprite.x>=(camera.x+indx*400+-400)?-400:1.25;
                if (-1 <= (camera.x - backgroundSprite.x) && (camera.x - backgroundSprite.x) <= 1) {
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
                        _backgroundSprite.destroy();//=false;
                    });
                    /*enemies.forEach(function (__enemy) {
                        __enemy.cleanUp();
                    });*/ // TODO: reimplement menu enemies, but useless for now.
                    mainMenu = false;
                    //console.log("bye bye bye")
                    enemySpawningInterval = setInterval(enemySpawning, 5000);
                    playerHealingInterval = setInterval(playerHealing, 1000);
                    //console.log("startgame");
                }
                //console.log(backgroundSprite.x>(indx*200+-200)?5:-200);
            });
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