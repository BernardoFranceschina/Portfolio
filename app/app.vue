<template>
  <div class="relative">
    <div class="grain-overlay" aria-hidden="true"></div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Analytics />
    <SpeedInsights/>
  </div>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (max-width: 768px) {
  .page-enter-from,
  .page-leave-to {
    filter: blur(2px);
  }
}

.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMFCA0RFhst1VwSAAAAX0lEQVQ4y2MYJoAJSjMxoNJMUJqZAZVmgdKsDKg0G5RmZ0ClOaA0JwMqzQWluRlQaR4ozQOl+RhQaX4oLcCASgtCaSEGVFoYSoswoNKiUFqMAZUWh9ISDKj0MAQA8F8HGf7KMVIAAAAASUVORK5CYII=");
  background-repeat: repeat;
  background-size: 50px 50px;
  will-change: transform;
}

@media (max-width: 768px) {
  .grain-overlay { opacity: 0.025; }
}

.reveal-target {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-target.revealed { opacity: 1; transform: translateY(0); }

.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-left.revealed { opacity: 1; transform: translateX(0); }

.reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-right.revealed { opacity: 1; transform: translateX(0); }

.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-scale.revealed { opacity: 1; transform: scale(1); }

@media (prefers-reduced-motion: reduce) {
  .reveal-target,
  .reveal-left,
  .reveal-right,
  .reveal-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
  .grain-overlay {
    display: none;
  }
}
</style>