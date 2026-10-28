
let keys = {};

//let keyDown, keyCode, keyWentDown, lock;

//let lock = false;

setInterval(function () {
    //if (!window.keyIsPressed) return;
    if (window.keyCode===0)return;
    if (!keys[window.keyCode]) {
        keys[window.keyCode] = {
            keyDown: false,
            lock: false,
        }
    }

    /*Object.keys(keys).forEach(function (_key) {
        //if (_key !== window.keyCode) return;
        let key = keys[_key];
        if (window.keyIsPressed && !key.keyDown && !key.lock) {
            key.keyCode = window.keyCode;
            key.keyDown = true;
            console.log("down")
        } else if (!window.keyIsPressed) {
            key.lock = false;
            key.keyDown = false;
            console.log("up")
        }
    })*/

    //let currTableKey = keys[window.keyCode]
    //console.log(keys[38] ? keys[38].lock : undefined);
    if (window.keyIsPressed && !keys[window.keyCode].keyDown && !keys[window.keyCode].lock) {
        keys[window.keyCode].keyDown = true;
        //currTableKey.lock = true;
        //console.log(`Key ${window.keyCode} went down.`);
    } else if (!window.keyIsPressed/* && keys[window.keyCode].keyDown*/) {
        keys[window.keyCode].keyDown = false;
        keys[window.keyCode].lock = false;
        //console.log(`Key ${window.keyCode} went up.`);
    }

    /*if (window.keyIsPressed && !keyDown && !lock) {
        keyCode = window.keyCode;
        keyDown = true;
        keyWentDown = true;
        console.log(`Key ${keyCode} went down.`);
    } else if (!window.keyIsPressed && keyDown) {
        lock = false;
        keyWentDown = false;
        keyDown = false;
        console.log(`Key ${keyCode} went up.`);
    }*/
},1000/60)
//setInterval(() => console.log(keys[38] ? keys[38].lock : undefined), 100);
export default (key) => {
    //i//f ()
    if (!keys[key]) return;
    if (keys[key] && keys[key].keyDown) {
        keys[key].keyDown = false;
        keys[key].lock = true;
        //console.log(`Key ${window.keyCode} went up.`);
        return true;
    } else {
        return false
    }
    /*if (keyWentDown && keyCode === key) {
        keyWentDown = false;
        lock = true;
        return true
    } else {
        return false
    }*/
}