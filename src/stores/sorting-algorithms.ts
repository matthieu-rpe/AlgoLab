import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Algorithm, SortingEngine } from '@/types/algorithm';

import { mergeSort } from '@/algorithms/sorting-engines/merge';
import { bubbleSort } from '@/algorithms/sorting-engines/bubble';
import { selectionSort } from '@/algorithms/sorting-engines/selection';
import { quickSort } from '@/algorithms/sorting-engines/quick';

const configs = [
  { id: 'bubble', sort: bubbleSort },
  { id: 'selection', sort: selectionSort },
  { id: 'merge', sort: mergeSort },
  { id: 'quick', sort: quickSort },
];

export const useSortingAlgorithmsStore = defineStore(
  'sorting-algorithms',
  () => {
    const size = ref(25);
    const speed = ref(100);

    const algorithms = ref<Algorithm<SortingEngine>[]>([]);
    const timer = ref<number | null>(null);
    let flaggedTime: number | null = null;

    const running = computed(() => !!timer.value);

    function updateTimer() {
      if (flaggedTime) {
        const currentTime = performance.now();
        const delta = currentTime - flaggedTime;
        flaggedTime = currentTime;

        algorithms.value.forEach((a) => {
          if (!a.done) {
            a.time += delta;
          }
        });
      }
    }

    function stop() {
      if (timer.value) {
        clearInterval(timer.value);
        updateTimer();
        timer.value = null;
      }
    }

    function init() {
      stop();

      flaggedTime = null;

      const randomData = Array.from(
        { length: size.value },
        () => Math.floor(Math.random() * 100) + 1,
      );

      algorithms.value = configs.map(({ id, sort }) => {
        const data = [...randomData];

        return {
          id,
          engine: sort(data),
          time: 0,
          state: {
            data,
            comparing: [],
            moving: [],
            sorted: [],
          },
          done: false,
        };
      });
    }

    function run() {
      if (!!timer.value) return;

      flaggedTime = performance.now();

      timer.value = setInterval(() => {
        updateTimer();

        let allDone = true;

        algorithms.value.forEach((a) => {
          if (a.done) return;
          allDone = false;

          const step = a.engine.next();

          if (step.done) {
            a.done = true;
          } else {
            a.state = step.value;
          }
        });

        if (allDone) stop();
      }, speed.value);
    }

    return {
      size,
      speed,
      algorithms,
      running,
      stop,
      init,
      run,
    };
  },
);
