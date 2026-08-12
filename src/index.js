/*!
 * rapidRogue Next v0.0.6d
 * 
 * This game is the next version of rapidRogue, now compiled using
 * a new toolchain for better modularily and a cleaner codebase.
 * 
 * How to play:
 * - Use W, A, S, D (or the arrow keys) for movement.
 * - Aim the cursor and click to shoot a projectile to kill enemies.
 * - Have fun :)
 * 
 * For developers:
 * - A source code release is planned soon™.
 * - A modding sdk is also planned soon™.
 * 
 **/
import "es6-promise/auto.js"
//import { Promise } from "es6-promise";
//window.Promise = Promise;
//import ticker from "./util/ticker";-depreceated
//import backgroundImage from "#assets/background.png";
//import backgroundFillImage from "#assets/background_fill.png";
//import cursorImage from "#assets/cursor.png";
//import playerImage from "#assets/player.png";
import assets from "./util/assets";
import {enemySpawningInterval, mainMenu, mainMenuMain, setEnemySpawningInterval} from "./modules/mainMenu.js";
import {addPlayerStat, playerStats, setPlayerStat, subPlayerStat} from "./modules/playerStats.js";
//enemySpawningInterval
//import {pause, togglePause} from "./modules/pause.js";
//let pause;
import { gameStats, setGameStat } from "./modules/gameStats.js";
import { enemies } from "./modules/enemies.js";
import { movementMain, player } from "./modules/player.js";
import { projectiles } from "./modules/projectiles.js";
import enemySpawning from "./modules/enemySpawning.js";
//let {pause, togglePause} = _pause
//let {mainMenu, mainMenuMain} = _mainMenu;
console.log(`
=================================================
rapidRogue Next v0.0.6d
"A suprising game made in a suprising environment." - Not Ben3Coder

${getURL().match(/^https:\/\/studio\.code\.org\/projects\/gamelab\/647349ff-9222-4852-85b3-5f1c3d521fa8\/edit.*/gm) ? "You are on the original game!" : "You are on a modified/remixed game!"}
Made with <3 by Ben3Coder
=================================================
`)

/*!
 * rapidRogue Next v0.0.6d
 * "the nEXT generation"
 * - it has been ported to more professional tooling to help speed up development
 * - assets are now bundled within the code
 * - potential performance mode?
 * - science questions are removed, school project is done
 * - TODO: asset changes
 * - TODO: new things
 * 
 * A collection of all the rapidScience-era (school project) updates below:
 * rapidRogue v0.0.5
 * "the actual mvp update" (mininum viable product)
 * target:
 * - playable waves
 * - in-between shop or upgrade paths\
 * features:
 * - modified offloading to be more efficient
 * - ui rework preparation of waves system
 * - upgrade paths
 * - playable waves
 * - enemy scaling? done
 * - refresh upgrade? unlimited timeszz
 * 
 * rapidRogue v0.0.3-0.0.4 (mix)
 * "the question update & the bigger update"
 * "the 3 hours of debugging was NOT worth it" - ben
 * - added questions api (for preparation of the rapidScience project)
 * - added enemy health
 * - added player death
 * - added enemy offloading & despawning (higher performance)
 * - added working questions (if u die, revive attempt (once))
 * 
 * rapidRogue v0.0.2
 * "the mvp update"
 * - made working health & performance improvements (pretty massive improvements)
 * 
 * rapidRogue v0.0.1
 * "the proof of concept update"
 **/

// If rules were to change at a moments notice, these feature flags should disable/enable theme
/*NOT-IMPLEMENTED
var fflag = {
  fflagEnabled: false,
  fflagDisableDeath: false,//losing condition
  fflagDisableRevive: false,
  fflagDisableEnemyOffloading: false, // disables offloading
  fflagDisableEasterEggs: false,
  fflagExtremePerformanceMode: false, // this is required for terrible computer
  fflagEnableDeveloperConsoleDoNotAbuseOrYouWillbeFired: false,
};
*/
//background("black");

const camera=window.camera;

//array polyfill?

// This is the main code for the upgrades
// fully coded by me
// code beautified for readability
(function() {

    var inUpgradeScreen = false;

    var backgroundFill =
        createSprite(0, 0);
        backgroundFill.addAnimation("background_fill", assets.backgroundFillImage);

    backgroundFill.setAnimation(
        "background_fill");
    backgroundFill.scale = 1;
    backgroundFill.visible = false;
/*
cells: 1,
  immune: 1,
  size: 1,
  cooler: 1,
};
*/
    var upgrades = [/*{
            name: "Upgrade1",
            icon: "upgrade_example",
            description: "Template 1 Upgrade",
            onUpgrade: function() {
                console.log(
                    "upgrade1"
                    );
            },
        },
        {
            name: "Upgrade2",
            icon: "upgrade_example",
            description: "Template 2 Upgrade",
            onUpgrade: function() {
                console.log(
                    "upgrade2"
                    );
            },
        },
        {
            name: "Upgrade3",
            icon: "upgrade_example",
            description: "Template 3 Upgrade",
            onUpgrade: function() {
                console.log(
                    "upgrade3"
                    );
            },
        },*/
        {
            name: "Cells+",
            icon: assets.upgradeCells,
            description: "More white blood\ncells combine and\nyou get more\ndamage.",
            onUpgrade: function() {
              addPlayerStat("cells",1);
                //playerStats.cells++;
            },
        },
        {
            name: "Immune+",
            icon: assets.upgradeImmune,
            description: "Better immune\nsystem which\nresults in more\nprojectiles.",
            onUpgrade: function() {
              addPlayerStat("immune",1);
                //playerStats.immune++;
            },
        },
        {
            name: "Size+",
            icon: assets.upgradeSize,
            description: "Bigger cell\ngiving more\nmore health.",
            onUpgrade: function() {
              addPlayerStat("size",1);
              addPlayerStat("maxHP",50+(playerStats.size*50));
                //playerStats.size++;
                //playerStats.maxHP=50+(playerStats.size*50);
            },
        },
        {
            name: "Cooler+",
            icon: assets.upgradeCooler,
            description: "Cooling the\ncell allowing\nfor faster\ncooldown.",
            onUpgrade: function() {
              addPlayerStat("cooler", 1)
                //playerStats.cooler++;
            },
        },
        {
            name: "Friction-",
            icon: assets.upgradeFriction,
            description: "Less friction\nallowing for\nmore speed.",
            onUpgrade: function() {
              addPlayerStat("friction", 1)
                //playerStats.friction++;//?????????????
            },
        },
        {
            name: "Stability+",
            icon: assets.upgradeMedkit,
            description: "More stable\ngiving more\nregeneration.",
            onUpgrade: function() {
              addPlayerStat("regen", 1);  
              //playerStats.regen++;//?????????????
            },
        },
    ];


    var upgradeInternals = {
        image1: createSprite(0,
            0),
        image2: createSprite(0,
            0),
        image3: createSprite(0,
            0),
        upgade1: {},
        upgrade2: {},
        upgrade3: {},
    };

    upgradeInternals.image1
        .visible = false;
    upgradeInternals.image2
        .visible = false;
    upgradeInternals.image3
        .visible = false;

    function upgradeScreenMain() {
        backgroundFill.visible =
            true;
        backgroundFill.x = camera.x;
        backgroundFill.y = camera.y;
        backgroundFill.depth = 1024;
        backgroundFill.alpha = 0.25;
        //this is my ui of the century -ben
        textAlign(CENTER);
        textFont(
        "monospace"); // 99th time btw
        //texttop
        textSize(24);
        fill("white");
        text("Choose a upgrade:",
            camera.x, camera.y -
            160);

        //upgrades
        //noStroke(); //incidnet // those who know the stroke none incident
        strokeWeight(2);
        stroke("black");
        // the 133.33... incident
        var inBounds = {
            upgrade1: (0 <=
                    World
                    .mouseX &&
                    World
                    .mouseX <=
                    133.33) &&
                (60 <= World
                    .mouseY &&
                    World
                    .mouseY <=
                    400),
            upgrade2: (133.33 <=
                    World
                    .mouseX &&
                    World
                    .mouseX <=
                    266.66) &&
                (60 <= World
                    .mouseY &&
                    World
                    .mouseY <=
                    400),
            upgrade3: (266.66 <=
                    World
                    .mouseX &&
                    World
                    .mouseX <=
                    399.99) &&
                (60 <= World
                    .mouseY &&
                    World
                    .mouseY <=
                    400),
          refresh: (10 <= World.mouseX && World.mouseX <= 50) && (10 <= World.mouseY && World.mouseY <= 50),
        };
        
        //refresh
        fill(inBounds.refresh ? rgb(255,255,255,0.9) : rgb(255,255,255,0.5))
        rect(camera.x-190,camera.y-190,40,40);
        fill("white");
        //textAlign();
        text("🔄",camera.x-170,camera.y-162);// anything BUT microspritesaaaaaaaaaaaa
        
        if (inBounds.refresh && mouseWentDown("leftButton")) {
          //IMPLEMENT ON RR-PROD
          //console.log("refresh!");
          //giveQuestion(function () {
            // top tier naming system
            var keys = Object.keys(upgrades)
            var ___temp=[];
            keys.forEach(function (__key, _indx) {
              //var //___temp = [];
              ___temp.push(_indx);
            });
            keys = ___temp;
            var __temp = [0,0,0];
            var ___temp= [];
            __temp.forEach(function (_, _indx) {
              var rnd = Math.floor(Math.random()*keys.length);
              __temp[_indx] = keys[rnd];
              keys.splice(rnd,1);
              //console.log(keys);
              console.log(rnd);
            });
            console.log(__temp);
            displayUpgrade(__temp[0], __temp[1], __temp[2] ,upgradeInternals.callback);
        //});
      }

        //upgrade1
        //camera.zoom=0.5
        fill(inBounds.upgrade1 ?
            rgb(255, 0, 0,
            0.9) : rgb(255, 0,
                0, 0.75)); //silver?
        rect(camera.x - 200, camera
            .y - 140, 133.33,
            340);
        //upgradetitlespace
        fill(rgb(0, 0, 0, 0.5));
        rect(camera.x - 200, camera
            .y - 140, 133, 50);

        //upgradeimagespace
        fill(rgb(255, 255, 255,
            0.5));
        rect(camera.x - 200, camera
            .y - 90, 133, 133);

        //upgradedescriptionspace
        fill(rgb(255, 255, 255,
            0.5));
        rect(camera.x - 200, camera
            .y + 44, 133, 157);

        //upgrade2
        fill(inBounds.upgrade2 ?
            rgb(0, 255, 0,
            0.9) : rgb(0, 255,
                0, 0.75)); //gold?
        rect(camera.x - 66.67,
            camera.y - 140,
            133.33, 340);

        //upgradetitlespace
        fill(rgb(0, 0, 0, 0.5));
        rect(camera.x - 66.67,
            camera.y - 140, 133,
            50);

        //upgradeimagespace
        fill(rgb(255, 255, 255,
            0.5));
        rect(camera.x - 66.67,
            camera.y - 90, 133,
            133);

        //upgradedescriptionspace
        fill(rgb(255, 255, 255,
            0.5));
        rect(camera.x - 66.67,
            camera.y + 44, 133,
            157);

        //upgrade3
        fill(inBounds.upgrade3 ?
            rgb(0, 0, 255,
            0.9) : rgb(0, 0,
                255, 0.75)
            ); //bronze
        rect(camera.x + 66.66,
            camera.y - 140,
            133.33, 340);

        //upgradetitlespace
        fill(rgb(0, 0, 0, 0.5));
        rect(camera.x + 66.66,
            camera.y - 140, 133,
            50);

        //upgradedescriptionspace
        fill(rgb(255, 255, 255,
            0.5));
        rect(camera.x + 66.66,
            camera.y + 44, 133,
            157);

        //upgrade1
        textSize(14);
        noStroke();
        fill("white");
        //console.log(upgradeInternals);
        text(upgradeInternals
            .upgrade1.name,
            camera.x - 135,
            camera.y - 110);
        //img
        upgradeInternals.image1.x =
            camera.x - 133;
        upgradeInternals.image1.y =
            camera.y - 23;
        upgradeInternals.image1
            .visible = true;
        //upgradeInternals.image1.setAnimation("upgrade_unknown");
        upgradeInternals.image1
            .depth = 999;
        //description
        textAlign(LEFT);
        textSize(12);
        text(upgradeInternals
            .upgrade1
            .description, camera
            .x - 197.5, camera
            .y + 60);
        textAlign(CENTER);
        //upgrade2
        textSize(14);
        //noStroke();
        fill("white");
        text(upgradeInternals
            .upgrade2.name,
            camera.x, camera.y -
            110);
        //img
        upgradeInternals.image2.x =
            camera.x;
        upgradeInternals.image2.y =
            camera.y - 23;
        upgradeInternals.image2
            .visible = true;
        //upgradeInternals.image2.setAnimation("upgrade_unknown");
        upgradeInternals.image2
            .depth = 999;
        //description
        textAlign(LEFT);
        textSize(12);
        text(upgradeInternals
            .upgrade2
            .description, camera
            .x - 64.5, camera
            .y + 60);
        textAlign(CENTER);
        //upgrade3
        textSize(14);
        //noStroke();
        fill("white");
        text(upgradeInternals
            .upgrade3.name,
            camera.x + 135,
            camera.y - 110);
        //img
        upgradeInternals.image3.x =
            camera.x + 133;
        upgradeInternals.image3.y =
            camera.y - 23;
        upgradeInternals.image3
            .visible = true;
        //upgradeInternals.image3.setAnimation("upgrade_unknown");
        upgradeInternals.image3
            .depth = 999;
        //description
        textSize(12);
        textAlign(LEFT);
        text(upgradeInternals
            .upgrade3
            .description, camera
            .x + 68.5, camera
            .y + 60);

        ["upgrade1", "upgrade2",
            "upgrade3"
        ].forEach(function(
        _upgrade) {
            if (inBounds[
                    _upgrade
                    ] &&
                mouseWentDown(
                    "leftButton"
                    )) {
                //top tier bugs digital deluxe
                upgradeInternals
                    .selectedUpgrade =
                    _upgrade;
                upgradeInternals
                    [
                        _upgrade]
                    .onUpgrade();
                //console.log("yo g");
                window.inUpgradeScreen
                    = false;
                [1, 2, 3]
                .forEach(
                    function(
                        imageId
                        ) {
                        upgradeInternals
                            ["image" +
                                imageId
                                ]
                            .visible =
                            false;
                        backgroundFill
                            .visible =
                            false;
                    });
            }
        });


    }

    function displayUpgrade(
        upgrade1id, upgrade2id,
        upgrade3id, callback) {
        // id-based because its randomly picked at runtime.
        upgradeInternals.callback = callback;
        [upgrade1id, upgrade2id,
            upgrade3id
        ].forEach(function(
            upgradeId, indx
            ) {
            //console.log(indx+1)
            var currUpgrade =
                upgrades[
                    upgradeId
                    ];
            var currInternals =
                upgradeInternals[
                    "upgrade" +
                    (indx +
                        1)];
            var currImage =
                upgradeInternals[
                    "image" +
                    (indx +
                        1)];
            upgradeInternals
                ["upgrade" +
                    (indx +
                        1)
                    ] = {
                    name: currUpgrade
                        .name,
                    description: currUpgrade
                        .description,
                    onUpgrade: currUpgrade
                        .onUpgrade,
                };
            /*currInternals.name = currUpgrade.name
            currInternals.description = currUpgrade.name;
            currInternals.onUpgrade = currUpgrade.onUpgrade;
            */ // do image rn
            currImage.addAnimation("icon", currUpgrade.icon)
            currImage
                .setAnimation("icon");
        });
        var upgChecker =
            setInterval(function() {
                if (!
                    window.inUpgradeScreen
                    ) {
                    clearInterval
                        (
                            upgChecker);
                    //upgradeInternals[upgradeInternals.selectedUpgrade].onUpgrade();
                    if (!
                        callback
                        )
                return;
                    callback(
                        upgradeInternals
                        .selectedUpgrade
                        );
                }
            }, 1000 / 60)
        //console.log(upgradeInternals);
        inUpgradeScreen=true;
        window.inUpgradeScreen =
            true;
    };

    window.inUpgradeScreen =
        inUpgradeScreen;
    window.upgradeScreenMain =
        upgradeScreenMain;
    window.displayUpgrade =
        displayUpgrade;
    window.upgrades = upgrades;

})();
//var inUpgradeScreen = false;
/*
function draw() {
    background("white");
    drawSprites();
    if (inUpgradeScreen) {
        upgradeScreenMain();
    } else {
        textAlign(CENTER);
        text("no content?\nintentional?\ni think not.",
            camera.x, camera.y);
        displayUpgrade(0, 1,
        2); // those who know arrays
    }
}
*/
/*
Event.recieve("sixSeven", function (d) {
  console.log(d);
});

Event.send("sixSeven", "sprite", "data", function () {
  console.log("callback");
});
*/
//showMobileControls(true,true,false);

var delta = 0;

//(function(RapidAnalytics,By,Ben3Coder,Software){})("");
if(!getUserId()=="CFtqozxh1aHQGiSjGRBBEgCGNa4"){
  throw new Error("bye")
}
World.frameRate=60;//target
var mLock = false;

camera.on();

// theme: break the rules
//var backgroundSprite = createSprite(0,0);
//backgroundSprite.setAnimation("background");

//var backgroundSprite = createSprite(0,0);
//backgroundSprite.setAnimation("background");

var cursor = createSprite(0,0);
cursor.addAnimation("cursor", assets.cursorImage);
cursor.setAnimation("cursor");

//var thing = createSprite(0,0);
//thing.setAnimation("thing");
//thing.scale = 0.175;


function cursorMain() {
  //cursor.x+=Math.round((camera.mouseX-cursor.x)/8);
  //cursor.y+=Math.round((camera.mouseY-cursor.y)/8);
  cursor.x=camera.mouseX;
  cursor.y=camera.mouseY;
}


textFont("monospace")
//textAlign(CENTER);

function mainHud() {
  textAlign(CENTER);
  fill("black");
  //textSize(18);
  //text("rapidRogue beta", camera.x,camera.y+150);
  //textSize(14);
  //text("v0.0.5 - the mvp++ update", camera.x,camera.y+170);
  //textSize(10);
  //text("This is a work in progress, things are subject to change.", camera.x,camera.y+185);
  
  //waves
  textFont("monospace");
  textSize(24);
  text("Waves: "+gameStats.wave+"/"+gameStats.maxWaves,camera.x,camera.y-175);
  textSize(18);
  text("Enemies remaining: "+(gameStats.currentWave.enemiesLeft), camera.x, camera.y-150);
  
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
  
  fill("red");
  rect(camera.x-185,camera.y+175,150,15);
  fill("green");
  if (playerStats.invincible) {
    fill("cyan");
  }
  rect(camera.x-185,camera.y+175,150*(playerStats.HP/playerStats.maxHP),15);

}

function thingMain() {
  player.pointTo(cursor.x,cursor.y);
  //thing.pointTo(cursor.x,cursor.y);
  //thing.x = player.x;d
  //thing.y = player.y-65;
}

//var projectiles = createGroup();

function projectile() {
  var c = {
    x: cursor.x,
    y: cursor.y,
  };
  //c.x+=c.x>player.x?200:-200;
  //c.y+=c.y>player.y?200:-200;
  var p = createSprite(player.x,player.y);
  p.addAnimation("cursor", assets.cursorImage);
  p.setAnimation("cursor");
  p.depth=999;
  projectiles.add(p);
  p.depth=1;
  //target = (cursor.x, cursor.y);
  //p (p.x, p.y);
  //(cursor.y-p.y)/(cursor.x-p.x);
  //var s=(cursor.y-p.y)/(cursor.x-p.x);
  //var pn = cursor.x>player.x ? 1 : -1;
  
  p.pointTo(c.x,c.y);
  /**/
  var angle = p.rotation * Math.PI / 180;
  //var deltaX = Math.cos(angle) * 10;
  //var deltaY = Math.sin(angle) * 10;
  //console.log(s);
  p.velocityX = Math.cos(angle) * 10;
  p.velocityY = Math.sin(angle) * 10;
  var _c = setInterval(function () {
    p.displace(projectiles);
    //p.x+=deltaX;
    //p.y+=deltaY;
    if (p.isTouching(enemies)) {
      clearInterval(_c);
      clearTimeout(_a);
      setTimeout(function () {
        p.destroy();
      },25);
    }
  }, 1000/60);
  var _a = setTimeout(function () {
    p.destroy();
    clearInterval(_c);
  }, 750);
}

/*
 angle = 30 * Math.PI / 180, // 30 degrees
      speed = 1,
      deltaX = Math.cos(angle) * speed,
      deltaY = Math.sin(angle) * speed;
      */

function projectileMain() {
  if (mouseDown("leftButton") && !mLock) {
    mLock = true;
    for (var i = 0; i < playerStats.immune; i++) {
      //playSound("laserShoot(1).wav",false);
      projectile();
    }
    setTimeout(function () {mLock = false}, 1000/(3+(playerStats.cooler*2)));
  }
}
var insideViewingRange = createGroup();// performance master2000
var outsideViewingRange = createGroup();

cursor.depth=100;
//thing.depth = 99;


function proHackerMode() {
  enemies.forEach(function (_enemy) {
    line(player.x, player.y, _enemy.x, _enemy.y);
  });
  //for (var i = 0; i < enemies.length; i++) {
  //  group
  //}
  
}

var backgrounds = [createSprite(0,0), createSprite(0,0), createSprite(0,0),
createSprite(0,0), createSprite(0,0), createSprite(0,0), 
createSprite(0,0), createSprite(0,0), createSprite(0,0)];

backgrounds.forEach(function (_background) {
  _background.addAnimation("background", loadImage(assets.backgroundImage));
  _background.setAnimation("background");
  _background.depth=-1;
  _background.visible=true;
});

/*

around player
---
-*- 3x3 *-current
---
*/

//camera.zoom=0.25;

function backgroundMain() {
  //precode seems easier & more performant
  // "never code again" - ben
  //0
  backgrounds[0].x = (Math.round((player.x-400)/400))*400;
  backgrounds[0].y = (Math.round((player.y-400)/400))*400;
  //1
  backgrounds[1].x = (Math.round(player.x/400))*400;
  backgrounds[1].y = (Math.round((player.y-400)/400))*400;
  //2
  backgrounds[2].x = (Math.round((player.x+400)/400))*400;
  backgrounds[2].y = (Math.round((player.y-400)/400))*400;
  //3
  backgrounds[3].x = (Math.round((player.x-400)/400))*400;
  backgrounds[3].y = (Math.round(player.y/400))*400;
  //4
  backgrounds[4].x = (Math.round(player.x/400))*400;
  backgrounds[4].y = (Math.round(player.y/400))*400;
  //5
  backgrounds[5].x = (Math.round((player.x+400)/400))*400;
  backgrounds[5].y = (Math.round(player.y/400))*400;
  //6
  backgrounds[6].x = (Math.round((player.x-400)/400))*400;
  backgrounds[6].y = (Math.round((player.y+400)/400))*400;
  //7
  backgrounds[7].x = (Math.round(player.x/400))*400;
  backgrounds[7].y = (Math.round((player.y+400)/400))*400;
  //8
  backgrounds[8].x = (Math.round((player.x+400)/400))*400;
  backgrounds[8].y = (Math.round((player.y+400)/400))*400;
  //var backgrounds = [];
  //var backgroundSprite = createSprite(0,0);
  //backgroundSprite.setAnimation("background");
}

var dead = false
var secondChance = true;
var deadBackground = createSprite(0,0);
deadBackground.visible = false;
deadBackground.addAnimation("background_fill", assets.backgroundFillImage);
deadBackground.setAnimation("background_fill");

//var enemySpawningInterval;

function statsMain() {
  if (playerStats.iframes > 0) {
    setPlayerStat("invincible", true)
    //playerStats.invincible = true;
    subPlayerStat("iframes", 1);
    //playerStats.iframes-=1;
  } else {
    setPlayerStat("invincible", false)
    //playerStats.invincible = false;
  }
  if (playerStats.HP<=0){
    clearInterval(enemySpawningInterval);
    deadBackground.visible = true;
    deadBackground.scale=5;
    deadBackground.depth=999;
    deadBackground.x=camera.x;
    deadBackground.y=camera.y;
    deadBackground.alpha=0.5;
    setGameStat("pause", true);
    //togglePause(true);
    //pause=true;
    dead=true;
    player.tint = "red";
    player.rotationSpeed=5;
    player.velocityX=0;//5;
    player.velocityY=0;//-5;
    //enemySprite.play();ss
    var _reduceSize = setInterval(function () {
      player.scale+=0.1;
      player.alpha-=0.01;
      if (player.alpha<=0) {
        clearInterval(_reduceSize);
        player.visible = false;
        if (!secondChance) {return;}
        secondChance=false;
        //giveQuestion(function () {
          // revive the player.
          //prompt();
          //enemySpawningInterval = setInterval(enemySpawning, 5000);
          setEnemySpawningInterval(setInterval(enemySpawning, 5000));
          deadBackground.visible = false;
          player.visible = true;
          //pause=false;
          setGameStat("pause",false)// = false;
          player.tint = "white";
          player.rotation=0;
          player.velocityX=0;//5;
          player.velocityY=0;
          player.scale=1;
          player.alpha=1;
          dead=false;
          //playerStats.HP=playerStats.maxHP;
          setPlayerStat("HP",playerStats.maxHP/2);
          setPlayerStat("iframes",300);
          //playerStats.iframes=300;
        //});
      }
    },1000/60);
    //setTimeout(function () {
    //  player.destroy();
    //}, 1000);
      
    //inQuestion=true;
  }
}

var outOfBounds = createGroup();
//var inBounds = createGroup();
function enemyHud() {
  //s1: categorize
  enemies.forEach(function (_enemy) {
    //match
    if ((player.x-400 <= _enemy.x && _enemy.x <= player.x+400) &&
      (player.y-400 <= _enemy.y && _enemy.y <= player.y+400)) {
        //render hud
        //hpbar
        //fill("red");
        //rect(_enemy.x-50,_enemy.y-75,100,10);
        //fill("green");
        //rect(_enemy.x-50,_enemy.y-75,100*(_enemy.HP/_enemy.maxHP),10);//TODO

      } else {
        if (_enemy.destructionImminent) {return;}
        //console.log("enemy went out of bounds.");
        _enemy.destructionImminent = true;
        _enemy.outofbounds = true;
        outOfBounds.add(_enemy);
        enemies.remove(_enemy);
        //var _checkInterval = setInterval(function () {
        //  if ((player.x-400 <= _enemy.x && _enemy.x <= player.x+400) &&
        //  (player.y-400 <= _enemy.y && _enemy.y <= player.y+400)) {
        //    //console.log("re-activated enemy!");
        //    clearInterval(_checkInterval);
        //    clearTimeout(_checkTimeout);
        //    enemies.add(_enemy);
        //    outOfBounds.remove(_enemy);
        //    _enemy.outofbounds = false;
        //    _enemy.destructionImminent = false;
        //  }
        //}, 1000/12);
        _enemy._checkTimeout = setTimeout(function () {
          if (!((player.x-400 <= _enemy.x && _enemy.x <= player.x+400) &&
            (player.y-400 <= _enemy.y && _enemy.y <= player.y+400))) {
            //console.log("destroyed inactive enemy!");
            //clearInterval(_checkInterval);
            clearTimeout(_enemy._checkTimeout);
            _enemy.destroy();
          }
        }, 5000);
      }
  });
  //s2: processor
}

setInterval(function () {
  outOfBounds.forEach(function (_enemy) {
    if ((player.x-400 <= _enemy.x && _enemy.x <= player.x+400) &&
      (player.y-400 <= _enemy.y && _enemy.y <= player.y+400)) {
      //sconsole.log("re-activated enemy!");
      //clearInterval(_checkInterval);
      clearTimeout(_enemy._checkTimeout);
      enemies.add(_enemy);
      outOfBounds.remove(_enemy);
      _enemy.outofbounds = false;
      _enemy.destructionImminent = false;
    }
  })
}, 1000/12);

//playSound("https://analytics.example.com/v1/audio.mp3?r=1",0)


//pause

var won = false;


function draw() {
  delta = 1000/World.frameRate;
  if (won) {
    background("white");
    drawSprites();
    textAlign(CENTER);
    //textSize(32);
    textFont("monospace");
    rect(camera.x-200,camera.y-44,400,100);
    fill("white");
    textSize(58);
    text("You won!!!",camera.x,camera.y+30);
    throw new Error("This is intentional.");
    return;
  }
  if (mainMenu) {
    //console.log(mainMenu)
    //playerStats.iframes=60;
    //playerStats.invincible=true;
    player.x=camera.x;
    player.y=camera.y;
    
    background("white");
    drawSprites();
    mainMenuMain();// unintellisense
    return;
  }
  //if (inQuestion) {
  //  displayQuestionMain();
  //  return;
  //};
  if (dead) {
      background("white");
      drawSprites();
      textAlign(CENTER);
      //textSize(32);
      textFont("monospace");
      rect(camera.x-200,camera.y-44,400,100);
      fill("white")
      if (secondChance) {
        textSize(16)
        text("Answer a question for a second chance!",camera.x,camera.y);
        textSize(14)
        text("This will only happen once.",camera.x,camera.y+25);
      } else {
        textSize(58);
        text("You died!",camera.x,camera.y+30);
      }
      return;
    }
    //drawSprites();
    if (inUpgradeScreen) {
      //background("white");
      drawSprites();
      upgradeScreenMain();
      return;
    }
    /*} else {
      textAlign(CENTER);
      text("no content?\nintentional?\ni think not.", camera.x, camera.y);
      displayUpgrade(0, 1, 2); // those who know arrays
    }*/
  if(keyWentDown("p") && (!dead)){
    setGameStat("pause",!gameStats.pause);
    //pause=!pause;
    //pause=!pause;
  }
  if (!gameStats.pause) {
    background("white");
    backgroundMain();
    movementMain();
    thingMain();
    cursorMain();
    projectileMain();
    drawSprites();
    mainHud();
    enemyHud();
    statsMain();
    //playerStats.HP=Math.abs(Math.sin(World.frameCount/60)*100);
    //proHackerMode();
  } else {
    //background(rgb(0,0,0,0.5));
    //background("white");
    player.velocityX=0;
    player.velocityY=0;
    textAlign(CENTER);
    textSize(48);
    //fill(rgb(0,0,0,0.5));
    noStroke();
    //rect(camera.x-200,camera.y-50,400,100);
    text("Game Paused",camera.x,camera.y);
    //textSize(18);
    //text("*-This doesn't do anything btw.", camera.x,camera.y+25);
    //textSize(14);
    //text("*-You might be ded.", camera.x,camera.y+50);
  }
}

//enemySpawning();
// lock em up
window.rapidRogueDraw = draw;
//export default {draw: draw};

//export const d = draw// draw;
