import { Visualizer } from "./visualizer.js";

import { bubbleSort } from "./algorithms/bubble.js";
import { selectionSort } from "./algorithms/selection.js";

let timer = null;
let flaggedTime = null;
let accumulatedTime = 0;
let algos = [];

function displayTime(algo, ms) {
  const timerId = algo.visualizer.canvas.id.replace("-canvas", "-timer");
  const el = document.getElementById(timerId);
  if (el) {
    el.innerText = `[${(ms / 1000).toFixed(1)}s]`;
  }
}

function stop() {
  if (timer) {
    document.getElementById("play").innerText = "Start";
    accumulatedTime += performance.now() - flaggedTime;
    clearInterval(timer);
    timer = null;
  }
}

function init() {
  stop();

  flaggedTime = null;
  accumulatedTime = 0;

  const size = parseInt(document.getElementById("data").value);
  const randomData = Array.from(
    { length: size },
    () => Math.floor(Math.random() * 100) + 1
  );

  algos = [
    {
      engine: bubbleSort([...randomData]),
      visualizer: new Visualizer("bubble-canvas"),
      done: false,
    },
    {
      engine: selectionSort([...randomData]),
      visualizer: new Visualizer("selection-canvas"),
      done: false,
    },
  ];

  algos.forEach((a) => {
    displayTime(a, 0);
    a.visualizer.draw(randomData);
  });
}

function run() {
  if (!!timer) return;

  document.getElementById("play").innerText = "Stop";
  flaggedTime = performance.now();

  timer = setInterval(() => {
    const totalElapsed = accumulatedTime + (performance.now() - flaggedTime);

    let allDone = true;

    algos.forEach((a) => {
      if (a.done) return;
      displayTime(a, totalElapsed);

      allDone = false;

      const step = a.engine.next();

      if (step.done) {
        a.done = true;
      } else {
        a.visualizer.draw(
          step.value.data,
          step.value.comparing,
          step.value.moving,
          step.value.sorted
        );
      }
    });

    if (allDone) stop();
  }, parseInt(document.getElementById("speed").value));
}

document.getElementById("reset").onclick = init;
document.getElementById("play").onclick = () => (!!timer ? stop() : run());

init();
