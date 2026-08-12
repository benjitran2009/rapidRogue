import {playerStats, setPlayerStat} from "./playerStats";

export default () => {
  if (playerStats.HP+playerStats.regen>=playerStats.maxHP) {
    setPlayerStat("HP", playerStats.maxHP)
    //playerStats.HP=playerStats.maxHP;
    return;
  }
  setPlayerStat("HP", playerStats.HP+=playerStats.regen)
  //playerStats.HP+=playerStats.regen;
};