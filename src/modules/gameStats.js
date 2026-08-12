//let gameStats = {};
//expo

export let gameStats = {
    won: false,
    pause: false,
    wave: 0,
    waves: [
        //enemy scaling done automatically
        { //wave 1
            enemyTarget: 15,
        },
        { //wave 2
            enemyTarget: 18,
        },
        { //wave 3
            enemyTarget: 21,
        },
        { //wave 4
            enemyTarget: 24,
        },
        { //wave 5
            enemyTarget: 27,
        },
        { //wave 6
            enemyTarget: 30,
        },
        { //wave 7
            enemyTarget: 33,
        },
        { //wave 8
            enemyTarget: 36,
        },
        { //wave 9
            enemyTarget: 39,
        },
        { //wave 10
            enemyTarget: 42,
        },

    ],
    get maxWaves() {
        return this.waves.length;
    },
    //maxWaves: se.length,
    currentWave: {
        enemyTarget: 0,
        enemiesKilled: 0,
        enemiesLeft: 0,
    },

};
export function setGameStat(stat, value) {
    console.log(stat)
    console.log(value);
    return new Promise((resolve, reject) => {
        try {
            gameStats[stat] = value;
            resolve(true);
        } catch (e) {
            reject(new Error(e));
        }
    })
    //gameStats[stat] = value;
}