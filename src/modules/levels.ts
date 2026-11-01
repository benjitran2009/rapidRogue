import { setPause } from "../env";
import { enemies } from "./enemies";
import upgrades, { displayUpgrade } from "./upgrades";

export let level = 1; // level 0 = infinity bit hacking ultra manipulator math
export let xp = 0;
export let xpToNextLevel = 50;

function levelUp() {
    // ? this is to display upgrade
    var upgradesKey: any[] = Object.keys(upgrades);
    var upgradesIndex: any[] = [];
    upgradesKey.forEach(function (__key, _indx) {
        //var //___temp = [];
        upgradesIndex.push(_indx);
    });
    upgradesKey = upgradesIndex;
    var upgradesToDisplay = [0, 0, 0];
    upgradesIndex = []; // !!! REDEF
    upgradesToDisplay.forEach(function (_, _indx) {
        var rnd = Math.floor(Math.random() * upgradesKey.length);
        upgradesToDisplay[_indx] = upgradesKey[rnd];
        upgradesKey.splice(rnd, 1);
        //console.log(keys);
        console.log(rnd);
    });
    console.log(upgradesToDisplay);
    displayUpgrade(
        upgradesToDisplay[0] as number,
        upgradesToDisplay[1] as number,
        upgradesToDisplay[2] as number,
        function () {
            setPause(false);
        },
    );
    //return;
}

//export let
//const calcLevel = () => Math.floor(xp/(50+Math.pow(xp,0.5)))
export let addXp = (amt: number) => {
    if ((xp += amt) >= xpToNextLevel) {
        xp = 0;
        level++;
        xpToNextLevel = Math.floor(
            xpToNextLevel + Math.pow(xpToNextLevel, 0.5),
        ); // TODO: to be balanced - send pull req or raise issue if u have ideas
        levelUp();
    }
    return xp;
};

// >>(rapid)<<Rogue is meant to be fast but also accomodate for endgame so i will use that formula above thingy
// Relatively balanced until endgame but by then you should be able to accomodate
// base xp for regular enemy: 5 + something
