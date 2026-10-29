import {
    camera,
    CENTER,
    createSprite,
    fill,
    LEFT,
    mouseWentDown,
    noStroke,
    rect,
    rgb,
    Sprite,
    stroke,
    strokeWeight,
    text,
    textAlign,
    textFont,
    textSize,
    World,
} from "../env";
import assets from "../util/assets";
import { playerStats } from "./playerStats";

var backgroundFill = createSprite(0, 0);
backgroundFill.addAnimation(
    "background_fill",
    assets.backgroundFillImage as string,
);
/*
window.inUpgradeScreen = inUpgradeScreen;
  window.upgradeScreenMain = upgradeScreenMain;
  window.displayUpgrade = displayUpgrade;
  window.upgrades = upgrades;
   */
backgroundFill.setAnimation("background_fill");
backgroundFill.scale = 1;
backgroundFill.visible = false;
/*
cells: 1,
  immune: 1,
  size: 1,
  cooler: 1,
};
*/
export let upgrades = [
    /*{
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
        description:
            "More white blood\ncells combine and\nyou get more\ndamage.",
        onUpgrade: function () {
            playerStats.cells++;
        },
    },
    {
        name: "Immune+",
        icon: assets.upgradeImmune,
        description:
            "Better immune\nsystem which\nresults in more\nprojectiles.",
        onUpgrade: function () {
            playerStats.immune++;
        },
    },
    {
        name: "Size+",
        icon: assets.upgradeSize,
        description: "Bigger cell\ngiving more\nmore health.",
        onUpgrade: function () {
            playerStats.size++;
            playerStats.maxHP = 50 + playerStats.size * 50;
        },
    },
    {
        name: "Cooler+",
        icon: assets.upgradeCooler,
        description: "Cooling the\ncell allowing\nfor faster\ncooldown.",
        onUpgrade: function () {
            playerStats.cooler++;
        },
    },
    {
        name: "Friction-",
        icon: assets.upgradeFriction,
        description: "Less friction\nallowing for\nmore speed.",
        onUpgrade: function () {
            playerStats.friction++; //?????????????
        },
    },
    {
        name: "Stability+",
        icon: assets.upgradeMedkit,
        description: "More stable\ngiving more\nregeneration.",
        onUpgrade: function () {
            playerStats.regen++; //?????????????
        },
    },
];

type upgradeBase = {
    name: string;
    description: string;
    onUpgrade: (...args: any[]) => any;
    icon: string,
};

var upgradeInternals: {
    image1: Sprite;
    image2: Sprite;
    image3: Sprite;
    upgrade1: upgradeBase;
    upgrade2: upgradeBase;
    upgrade3: upgradeBase;
    callback?: (...args: any[]) => any;
    selectedUpgrade: string;
    [name: string]: any,
} = {
    image1: createSprite(0, 0),
    image2: createSprite(0, 0),
    image3: createSprite(0, 0),
    upgrade1: {
        name: "Placeholder",
        description: "Placeholder",
        onUpgrade: () => void 0,
        icon: "placeholder",
    }, // !!! TYPO upgade1 --> upgrade1
    upgrade2: {
        name: "Placeholder",
        description: "Placeholder",
        onUpgrade: () => void 0,
        icon: "placeholder",
    },
    upgrade3: {
        name: "Placeholder",
        description: "Placeholder",
        onUpgrade: () => void 0,
        icon: "placeholder",
    },
    selectedUpgrade: "Placeholder",
};

upgradeInternals.image1.visible = false;
upgradeInternals.image2.visible = false;
upgradeInternals.image3.visible = false;

export function upgradeScreenMain() {
    backgroundFill.visible = true;
    backgroundFill.x = camera.x;
    backgroundFill.y = camera.y;
    backgroundFill.depth = 1024;
    backgroundFill.alpha = 0.25;
    //this is my ui of the century -ben
    textAlign(CENTER);
    textFont("monospace"); // 99th time btw
    //texttop
    textSize(24);
    fill("white");
    text("Choose a upgrade:", camera.x, camera.y - 160);

    //upgrades
    //noStroke(); //incidnet // those who know the stroke none incident
    strokeWeight(2);
    stroke("black");
    // the 133.33... incident
    var inBounds: {[name: string]: boolean} = {
        upgrade1:
            0 <= World.mouseX &&
            World.mouseX <= 133.33 &&
            60 <= World.mouseY &&
            World.mouseY <= 400,
        upgrade2:
            133.33 <= World.mouseX &&
            World.mouseX <= 266.66 &&
            60 <= World.mouseY &&
            World.mouseY <= 400,
        upgrade3:
            266.66 <= World.mouseX &&
            World.mouseX <= 399.99 &&
            60 <= World.mouseY &&
            World.mouseY <= 400,
        refresh:
            10 <= World.mouseX &&
            World.mouseX <= 50 &&
            10 <= World.mouseY &&
            World.mouseY <= 50,
    };

    //refresh
    fill(inBounds.refresh ? rgb(255, 255, 255, 0.9) : rgb(255, 255, 255, 0.5));
    rect(camera.x - 190, camera.y - 190, 40, 40);
    fill("white");
    //textAlign();
    text("🔄", camera.x - 170, camera.y - 162); // anything BUT microspritesaaaaaaaaaaaa

    if (inBounds.refresh && mouseWentDown("leftButton")) {
        //IMPLEMENT ON RR-PROD
        //console.log("refresh!");
        //giveQuestion(function () {
        // top tier naming system
        var keys: string[] | number[] = Object.keys(upgrades);
        var ___temp: number[] = [];
        keys.forEach(function (__key, _indx) {
            //var //___temp = [];
            ___temp.push(_indx);
        });
        keys = ___temp;
        var __temp = [0, 0, 0];
        ___temp = []; // see INDEX:301
        __temp.forEach(function (_, _indx) {
            var rnd = Math.floor(Math.random() * keys.length);
            __temp[_indx] = keys[rnd] as number;
            keys.splice(rnd, 1);
            //console.log(keys);
            console.log(rnd);
        });
        console.log(__temp);
        displayUpgrade(
            __temp[0] as number,
            __temp[1] as number,
            __temp[2] as number,
            upgradeInternals.callback as upgradeBase["onUpgrade"],
        );
        //});
    }

    //upgrade1
    //camera.zoom=0.5
    fill(inBounds.upgrade1 ? rgb(255, 0, 0, 0.9) : rgb(255, 0, 0, 0.75)); //silver?
    rect(camera.x - 200, camera.y - 140, 133.33, 340);
    //upgradetitlespace
    fill(rgb(0, 0, 0, 0.5));
    rect(camera.x - 200, camera.y - 140, 133, 50);

    //upgradeimagespace
    fill(rgb(255, 255, 255, 0.5));
    rect(camera.x - 200, camera.y - 90, 133, 133);

    //upgradedescriptionspace
    fill(rgb(255, 255, 255, 0.5));
    rect(camera.x - 200, camera.y + 44, 133, 157);

    //upgrade2
    fill(inBounds.upgrade2 ? rgb(0, 255, 0, 0.9) : rgb(0, 255, 0, 0.75)); //gold?
    rect(camera.x - 66.67, camera.y - 140, 133.33, 340);

    //upgradetitlespace
    fill(rgb(0, 0, 0, 0.5));
    rect(camera.x - 66.67, camera.y - 140, 133, 50);

    //upgradeimagespace
    fill(rgb(255, 255, 255, 0.5));
    rect(camera.x - 66.67, camera.y - 90, 133, 133);

    //upgradedescriptionspace
    fill(rgb(255, 255, 255, 0.5));
    rect(camera.x - 66.67, camera.y + 44, 133, 157);

    //upgrade3
    fill(inBounds.upgrade3 ? rgb(0, 0, 255, 0.9) : rgb(0, 0, 255, 0.75)); //bronze
    rect(camera.x + 66.66, camera.y - 140, 133.33, 340);

    //upgradetitlespace
    fill(rgb(0, 0, 0, 0.5));
    rect(camera.x + 66.66, camera.y - 140, 133, 50);

    //upgradedescriptionspace
    fill(rgb(255, 255, 255, 0.5));
    rect(camera.x + 66.66, camera.y + 44, 133, 157);

    //upgrade1
    textSize(14);
    noStroke();
    fill("white");
    //console.log(upgradeInternals);
    text(upgradeInternals.upgrade1.name, camera.x - 135, camera.y - 110);
    //img
    upgradeInternals.image1.x = camera.x - 133;
    upgradeInternals.image1.y = camera.y - 23;
    upgradeInternals.image1.visible = true;
    //upgradeInternals.image1.setAnimation("upgrade_unknown");
    upgradeInternals.image1.depth = 999;
    //description
    textAlign(LEFT);
    textSize(12);
    text(
        upgradeInternals.upgrade1.description,
        camera.x - 197.5,
        camera.y + 60,
    );
    textAlign(CENTER);
    //upgrade2
    textSize(14);
    //noStroke();
    fill("white");
    text(upgradeInternals.upgrade2.name, camera.x, camera.y - 110);
    //img
    upgradeInternals.image2.x = camera.x;
    upgradeInternals.image2.y = camera.y - 23;
    upgradeInternals.image2.visible = true;
    //upgradeInternals.image2.setAnimation("upgrade_unknown");
    upgradeInternals.image2.depth = 999;
    //description
    textAlign(LEFT);
    textSize(12);
    text(upgradeInternals.upgrade2.description, camera.x - 64.5, camera.y + 60);
    textAlign(CENTER);
    //upgrade3
    textSize(14);
    //noStroke();
    fill("white");
    text(upgradeInternals.upgrade3.name, camera.x + 135, camera.y - 110);
    //img
    upgradeInternals.image3.x = camera.x + 133;
    upgradeInternals.image3.y = camera.y - 23;
    upgradeInternals.image3.visible = true;
    //upgradeInternals.image3.setAnimation("upgrade_unknown");
    upgradeInternals.image3.depth = 999;
    //description
    textSize(12);
    textAlign(LEFT);
    text(upgradeInternals.upgrade3.description, camera.x + 68.5, camera.y + 60);

    ["upgrade1", "upgrade2", "upgrade3"].forEach(function (_upgrade: string) {
        if (inBounds[_upgrade] as boolean && mouseWentDown("leftButton")) {
            //top tier bugs digital deluxe
            upgradeInternals.selectedUpgrade = _upgrade;
            (upgradeInternals[_upgrade] as upgradeBase).onUpgrade();
            //console.log("yo g");
            window.inUpgradeScreen = false;
            [1, 2, 3].forEach(function (imageId) {
                upgradeInternals["image" + imageId].visible = false;
                backgroundFill.visible = false;
            });
        }
    });
}

export function displayUpgrade(upgrade1id: number, upgrade2id: number, upgrade3id: number, callback: upgradeBase["onUpgrade"]) {
    // id-based because its randomly picked at runtime.
    upgradeInternals.callback = callback;
    [upgrade1id, upgrade2id, upgrade3id].forEach(function (upgradeId, indx) {
        //console.log(indx+1)
        var currUpgrade = upgrades[upgradeId] as upgradeBase;
        var currInternals = upgradeInternals["upgrade" + (indx + 1)];
        var currImage = upgradeInternals["image" + (indx + 1)];
        upgradeInternals["upgrade" + (indx + 1)] = {
            name: currUpgrade.name,
            description: currUpgrade.description,
            onUpgrade: currUpgrade.onUpgrade,
        };
        /*currInternals.name = currUpgrade.name
        currInternals.description = currUpgrade.name;
        currInternals.onUpgrade = currUpgrade.onUpgrade;
        */ // do image rn
        currImage.addAnimation("icon", currUpgrade.icon);
        currImage.setAnimation("icon");
    });
    var upgChecker = setInterval(function () {
        if (!window.inUpgradeScreen) {
            clearInterval(upgChecker);
            //upgradeInternals[upgradeInternals.selectedUpgrade].onUpgrade();
            if (!callback) return;
            callback(upgradeInternals.selectedUpgrade);
        }
    }, 1000 / 60);
    //console.log(upgradeInternals);
    inUpgradeScreen = true;
    window.inUpgradeScreen = true;
}

//export let inUpgradeScreen
export let inUpgradeScreen = false;
export default {upgradeScreenMain, displayUpgrade, upgrades};
