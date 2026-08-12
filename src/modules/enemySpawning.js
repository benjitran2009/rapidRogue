import {mainMenu} from "./mainMenu";
import {gameStats} from "./gameStats";
import waveHandler from "./waveHandler";

export default () => {
  if (inUpgradeScreen || gameStats.pause || mainMenu) return;
  waveHandler();/*todo: use wavehandler and remove enemyspawning  */
  //enemy();
  //enemy();
  //enemy();
  //enemy();
  //enemy();
  //enemies.bounceOff(enemies);
}