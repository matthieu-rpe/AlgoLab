<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'sorting-algorithms' }">
        Sorting Algorithms
      </RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
:root {
  --dark: #0d0d0d;
  --cyan: #55ead4;
  --torch-red: #c5003c;
  --dark-red: #c5003c44;
  --yellow: #f3e600;

  --bg-color: var(--dark);
  --text: var(--torch-red);
  --text__highlight: var(--yellow);
  --control: var(--cyan);
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  background-color: var(--bg-color);
  color: var(--text);
  font-family: 'Courier New', Courier, monospace;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background:
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
  background-size:
    100% 3px,
    3px 100%;
}

label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--cyan);
  font-weight: bold;
}

input[type='number'] {
  background: var(--bg-color);
  border: 1px solid var(--control);
  color: var(--control);
  font-weight: bold;
  width: 80px;
  outline: none;
  text-align: center;
}

input[type='number']:disabled {
  cursor: not-allowed;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

button {
  background: var(--control);
  font-weight: bold;
  text-transform: uppercase;
  padding: 8px 20px;
  width: 140px;
  cursor: pointer;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

button:disabled {
  cursor: not-allowed;
}
</style>
