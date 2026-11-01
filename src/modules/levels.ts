export let level = 1; // level 0 = infinity bit hacking ultra manipulator math
export let xp = 0;
const calcLevel = () => Math.floor(xp/(50+Math.pow(xp,0.5)))
export let addXp = (amt: number) => {
    xp+=amt;
    calcLevel();
    return xp;
};


// >>(rapid)<<Rogue is meant to be fast but also accomodate for endgame so i will use the formula of level = floor(xp / (50 + pow(x,0.5)));
// Relatively balanced until endgame but by then you should be able to accomodate
// if you have any other ideas send a pull req
// https://www.desmos.com/calculator/to7hvqyduq
// base xp for regular enemy: 5 + 