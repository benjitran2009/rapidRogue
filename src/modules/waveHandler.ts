import { setPause, setWon } from "../env";
import { enemies, enemy } from "./enemies";
import { gameStats, setGameStat } from "./gameStats";
import upgrades, { displayUpgrade } from "./upgrades";
//let gameStats.waves
export default () => {
  if (gameStats.wave == 0 || gameStats.currentWave.enemiesLeft == 0) {
    if (gameStats.waves[gameStats.wave] == undefined) {
      //win condition
      //console.log("win!");
      setWon(true);
      //won = true;
      return;
    }
    if (!(gameStats.wave == 0)) {
      //pause = true;
      setPause(false);
      enemies.forEach(function (_enemy) {
        _enemy.HP = 0;
      });
      //gameStats.wave++;
      // top tier naming system

      // ? this is to display upgrade
      var upgradesKey: any[] = Object.keys(upgrades)
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
      displayUpgrade(upgradesToDisplay[0] as number, upgradesToDisplay[1] as number, upgradesToDisplay[2] as number, function () {
        setPause(false);
      });
      return;
    }
    //init
    enemies.forEach(function (_enemy) {
      _enemy.HP = 0;
    });
    //console.log(gameStats.wave++);
    setGameStat("wave", gameStats.wave+1).then((response) => {
      if (!response) throw new Error("Failed gS Set");
      var waveConfig = gameStats.waves[gameStats.wave - 1];
      setGameStat("currentWave", {
        enemyTarget: waveConfig.enemyTarget,
        enemiesKilled: 0,
        enemiesLeft: waveConfig.enemyTarget,
      });
    })
    /*var waveConfig = gameStats.waves[gameStats.wave-1];
    setGameStat("currentWave", {
      enemyTarget: waveConfig.enemyTarget,
      enemiesKilled: 0,
      enemiesLeft: waveConfig.enemyTarget,
    });*/
  }
  enemy();
  enemy();
  enemy();
  enemy();
  enemy();
}