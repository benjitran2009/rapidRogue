import { enemies, enemy } from "./enemies";
import { gameStats, setGameStat } from "./gameStats";
//let gameStats.waves
export default () => {
  if (gameStats.wave == 0 || gameStats.currentWave.enemiesLeft == 0) {
    if (gameStats.waves[gameStats.wave] == undefined) {
      //win condition
      //console.log("win!");
      won = true;
      return;
    }
    if (!gameStats.wave == 0) {
      pause = true;

      enemies.forEach(function (_enemy) {
        _enemy.HP = 0;
      });
      setGameStat("wave", gameStats.wave+1);
      //gameStats.wave++;
      // top tier naming system
      var keys = Object.keys(upgrades)
      var ___temp = [];
      keys.forEach(function (__key, _indx) {
        //var //___temp = [];
        ___temp.push(_indx);
      });
      keys = ___temp;
      var __temp = [0, 0, 0];
      var ___temp = [];
      __temp.forEach(function (_, _indx) {
        var rnd = Math.floor(Math.random() * keys.length);
        __temp[_indx] = keys[rnd];
        keys.splice(rnd, 1);
        //console.log(keys);
        console.log(rnd);
      });
      console.log(__temp);
      displayUpgrade(__temp[0], __temp[1], __temp[2], function () {
        console.log("cb");
        pause = false;

        var waveConfig = gameStats.waves[gameStats.wave - 1];
        setGameStat("currentWave", {
          enemyTarget: waveConfig.enemyTarget,
          enemiesKilled: 0,
          enemiesLeft: waveConfig.enemyTarget,
        });/*
        gameStats.currentWave = {
          enemyTarget: waveConfig.enemyTarget,
          enemiesKilled: 0,
          enemiesLeft: waveConfig.enemyTarget,
        };*/
        //pause=false;
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