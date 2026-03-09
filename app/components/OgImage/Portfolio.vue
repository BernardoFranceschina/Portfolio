<script setup lang="ts">
const {
  title = 'Bernardo Franceschina',
  description = 'Desenvolvedor full stack a mais de 5 anos entregando plataformas completas.',
  label = 'Portfolio',
  cta = 'Ver projetos',
  domain = 'franceschina.dev',
  photo = 'https://franceschina.dev/bernardo.png',
} = defineProps<{
  title?: string
  description?: string
  label?: string
  cta?: string
  domain?: string
  photo?: string
}>()
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      width: 1200px;
      height: 630px;
      position: relative;
      background-color: #0a0a0c;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    "
  >
    <div
      style="
        display: flex;
        flex: 1;
        position: relative;
        overflow: hidden;
      "
    >
      <div
        style="
          position: absolute;
          top: -100px;
          left: -60px;
          width: 420px;
          height: 420px;
          border-radius: 9999px;
          background-color: rgba(234, 179, 8, 0.05);
        "
      />

      <div
        style="
          position: absolute;
          bottom: -140px;
          left: 180px;
          width: 380px;
          height: 380px;
          border-radius: 9999px;
          background-color: rgba(99, 102, 241, 0.04);
        "
      />

      <div
        style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(234, 179, 8, 0.02), transparent, rgba(99, 102, 241, 0.015));
        "
      />

      <div
        style="
          position: absolute;
          top: 40px;
          left: 0;
          width: 3px;
          height: 120px;
          background: linear-gradient(to bottom, rgba(234, 179, 8, 0.5), transparent);
        "
      />

      <div style="position: absolute; top: 44px; left: 480px; width: 4px; height: 4px; border-radius: 9999px; background-color: rgba(255, 255, 255, 0.06);" />
      <div style="position: absolute; top: 44px; left: 496px; width: 4px; height: 4px; border-radius: 9999px; background-color: rgba(255, 255, 255, 0.04);" />
      <div style="position: absolute; top: 44px; left: 512px; width: 4px; height: 4px; border-radius: 9999px; background-color: rgba(255, 255, 255, 0.02);" />
      <div style="position: absolute; top: 60px; left: 480px; width: 4px; height: 4px; border-radius: 9999px; background-color: rgba(255, 255, 255, 0.04);" />
      <div style="position: absolute; top: 60px; left: 496px; width: 4px; height: 4px; border-radius: 9999px; background-color: rgba(255, 255, 255, 0.03);" />

      <img
        :src="photo"
        alt="Bernardo Franceschina"
        width="624"
        height="625"
        style="
          position: absolute;
          right: 0;
          top: 0;
          width: 52%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        "
      />

      <div
        style="
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 52%;
          background: linear-gradient(to right, #0a0a0c, rgba(10, 10, 12, 0.75) 20%, rgba(10, 10, 12, 0.3) 40%, transparent 60%);
        "
      />

      <div
        style="
          position: absolute;
          right: 0;
          bottom: 0;
          width: 52%;
          height: 180px;
          background: linear-gradient(to top, #0a0a0c, rgba(10, 10, 12, 0.5) 40%, transparent);
        "
      />

      <div
        style="
          position: absolute;
          right: 0;
          top: 0;
          width: 52%;
          height: 100px;
          background: linear-gradient(to bottom, rgba(10, 10, 12, 0.35), transparent);
        "
      />

      <div
        style="
          display: flex;
          flex-direction: column;
          position: relative;
          width: 56%;
          padding: 44px 40px 20px 52px;
        "
      >
        <!-- Pill -->
        <div style="display: flex; align-items: center;">
         
            <div style="font-size: 24px; font-weight: 800; color: #eab308;">&lt;/&gt;</div>
            <div
              style="
                font-size: 24px;
                font-style: italic;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.7);
                letter-spacing: 0.02em;
              "
            >
              {{ label }}
            </div>
        </div>

        <!-- Name -->
        <div
          style="
            font-size: 64px;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.05;
            letter-spacing: -0.03em;
            margin-top: 40px;
          "
        >
          {{ title }}
        </div>

        <!-- Description -->
        <div
          style="
            font-size: 32px;
            color: rgba(255, 255, 255, 0.42);
            line-height: 1.5;
            font-weight: 400;
            margin-top: 24px;
            max-width: 460px;
          "
        >
          {{ description }}
        </div>

        <!-- Spacer -->
        <div style="flex: 1;margin-bottom: 20px;"></div>

        <!-- URL -->
        <div
          style="
            font-size: 28px;
            color: rgba(255, 255, 255, 0.3);
            font-weight: 500;
            letter-spacing: 0.03em;
            margin-bottom: 12px;
          "
        >
          {{ domain }}
        </div>

        <!-- CTA -->
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #eab308;
            border-radius: 12px;
            padding: 16px 44px;
            align-self: flex-start;
          "
        >
          <div
            style="
              font-size: 30px;
              font-weight: 700;
              color: #000000;
              letter-spacing: 0.01em;
            "
          >
            {{ cta }}
          </div>
        </div>
      </div>
    </div>

    <div
      style="
        width: 100%;
        height: 5px;
        background-color: #eab308;
        flex-shrink: 0;
      "
    />
  </div>
</template>