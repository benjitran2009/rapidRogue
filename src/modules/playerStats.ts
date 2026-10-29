export let playerStats: {
  [stat: string]: any,
} = {
  maxHP: 100,
  HP: 100,
  invincible: false,
  iframes: 0,
  //upgrades should be at base level 1
  cells: 1,
  immune: 1,
  size: 1,
  cooler: 1,
  friction:1,
  regen:1,
};
export let setPlayerStat = (x: string, v: any) => playerStats[x] = v;
export let addPlayerStat = (x: string, v: any) => playerStats[x]+=v;
export let subPlayerStat = (x: string, v: any) => playerStats[x]-=v;