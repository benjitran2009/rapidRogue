// @ts-nocheck
// TypeScript does not properly do #alias/*.png correctly, so we gotta ignore this file.

import enemy1 from "#assets/enemy1.png";
import backgroundImage from "#assets/background.png";
import backgroundFillImage from "#assets/background_fill.png";
import cursorImage from "#assets/cursor.png";
import playerImage from "#assets/player.png";
import upgradeDamage from "#assets/upgradeDamage.png";
import upgradeCooldown from "#assets/upgradeCooldown.png";
import upgradeSpeed from "#assets/upgradeSpeed.png";
import upgradeStrength from "#assets/upgradeStrength.png";
import upgradeRegen from "#assets/upgradeRegen.png";
import upgradeHealth from "#assets/upgradeHealth.png";
import upgradeProjectiles from "#assets/upgradeProjectiles.png"
import logo from "#assets/logo.png"
//import assets from "./util/assets";

export default {
    enemy1: enemy1,
    backgroundImage: backgroundImage,
    backgroundFillImage: backgroundFillImage,
    cursorImage: cursorImage,
    playerImage: playerImage,
    upgradeDamage: upgradeDamage,
    upgradeCooldown: upgradeCooldown,
    upgradeSpeed: upgradeSpeed,
    upgradeStrength: upgradeStrength,
    upgradeRegen: upgradeRegen,
    upgradeHealth: upgradeHealth,
    upgradeProjectiles: upgradeProjectiles,
    logo: logo,
} as {
    enemy1: string,
    backgroundImage: string,
    backgroundFillImage: string,
    cursorImage: string,
    playerImage: string,
    upgradeDamage: string,
    upgradeCooldown: string,
    upgradeSpeed: string,
    upgradeStrength: string,
    upgradeRegen: string,
    upgradeHealth: string
    upgradeProjectiles: string,
    logo: string,
    [fileName: string]: string,
}