<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import type { Algorithm, SortingEngine } from '@/types/algorithm';

const props = defineProps<{
  algorithm: Algorithm<SortingEngine>;
}>();

function getCssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

const canvasRef = ref<HTMLCanvasElement | null>(null);

function draw() {
  const canvas = canvasRef.value;
  if (!canvas || !props.algorithm.state) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { width, height } = canvas;
  const { data, comparing, moving, sorted } = props.algorithm.state;

  const barWidth = width / data.length;

  const accent = getCssVar('--accent');
  const neutral = getCssVar('--neutral');
  const primary = getCssVar('--primary');
  const defaultColor = `${primary}44`;

  ctx.clearRect(0, 0, width, height);
  data.forEach((val, i) => {
    ctx.fillStyle = defaultColor; // default color
    if (comparing.includes(i)) ctx.fillStyle = primary; // comparing
    if (moving.includes(i)) ctx.fillStyle = neutral; // moving
    if (sorted?.includes(i)) ctx.fillStyle = accent; // sorted

    const barHeight = (val / 100) * height;

    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight);
  });
}

watch(
  () => props.algorithm.state,
  () => {
    draw();
  },
  { deep: true },
);

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = canvasRef.value.clientWidth;
    canvasRef.value.height = canvasRef.value.clientHeight;
    draw();
  }
});
</script>

<template>
  <div class="visualizer">
    <div class="algorithm">
      <h2>{{ algorithm.id }} Sort</h2>
      <div>{{ (Math.floor(algorithm.time) / 1000).toFixed(1) }}s</div>
    </div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="css" scoped>
.visualizer {
  flex: 1 0 200px;

  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.algorithm {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xl);
}

h2 {
  text-transform: uppercase;
  font-size: var(--text-base);
  letter-spacing: var(--spacing-xs);
  margin: 0;
}

canvas {
  width: 100%;
  aspect-ratio: 2/1;
}
</style>
