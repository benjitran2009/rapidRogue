// @ts-nocheck
// TypeScript does not properly do #alias/*.png correctly, so we gotta ignore this file.

import enemy1 from "#assets/enemy1.png";
import backgroundImage from "#assets/background.png";
import backgroundFillImage from "#assets/background_fill.png";
import cursorImage from "#assets/cursor.png";
import playerImage from "#assets/player.png";
import upgradeCells from "#assets/upgrade_cells.png";
import upgradeCooler from "#assets/upgrade_cooler.png";
import upgradeFriction from "#assets/upgrade_friction.png";
import upgradeImmune from "#assets/upgrade_immune.png";
import upgradeMedkit from "#assets/upgrade_medkit.png";
import upgradeSize from "#assets/upgrade_size.png";
//import assets from "./util/assets";

export default {
    enemy1: enemy1,
    backgroundImage: backgroundImage,
    backgroundFillImage: backgroundFillImage,
    cursorImage: cursorImage,
    playerImage: playerImage,
    upgradeCells: upgradeCells,
    upgradeCooler: upgradeCooler,
    upgradeFriction: upgradeFriction,
    upgradeImmune: upgradeImmune,
    upgradeMedkit: upgradeMedkit,
    upgradeSize: upgradeSize
} as {
    [fileName: string]: string,
}