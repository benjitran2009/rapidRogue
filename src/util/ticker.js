const target = 1000 / 60; // ~16.67ms
window.frameo = 0;

export default (draw) => {
  let lastTime = Date.now();

  function tick() {
    const now = Date.now();
    const dt = now - lastTime;
    lastTime = now;

    draw(dt);
    window.frameo++;

    // Calculate delay needed to hit the next frame target
    const executionTime = Date.now() - now;
    const delay = Math.max(0, target - executionTime);

    // Always schedule via setTimeout to avoid call stack accumulation
    setTimeout(tick, delay);
  }

  tick();
};


/*const target = 1000 / 60;
window.frameo = 0 ;
export default (draw) => setTimeout(() => {
    function interval(dt) {
        var curr = Date.now();
        draw()//(dt || undefined);
        window.frameo++;
        var next = Date.now();
        var nC = next - curr;
        if (nC > target) {
            interval(nC);
        } else {
            setTimeout(() => interval(target), target-nC);
        }
    }
    interval();
}, 0);*/