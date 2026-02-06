---
locale: "en"
order: 1

title: "Intelligent Acquisition and Analysis System for ECUs"
description: "Advanced telemetry and experiment management system for automotive engineering, in partnership with Renault and Horse."
category: "Automotive / R&D"
image: "/iase/iase_image.png"
second_image: "/iase/iase_dev.png"
architecture_image: "/iase/iase_architecture.png"
color: "bg-[#674E0B]" # Must configure on tailwind.config.js
tags: ["Docker", "Nginx", "Vue.js", "Django", "MQTT", "CI/CD"]
year: "2024 - 2026"
company: "UFSC / Renault / Horse"
challenge_text: "The challenge was creating an Edge-to-Cloud data pipeline robust enough to support critical data acquisition from moving vehicles via 5G. It was necessary to orchestrate remote embedded hardware configuration and ensure high-frequency file integrity, all while managing a complex infrastructure with multiple interdependent services."
development_text: "The solution required precise orchestration between services to ensure data integrity coming from the board. I developed control logic to synchronize high-frequency packet reception with disk persistence, avoiding I/O bottlenecks. On the frontend, the challenge was building a reactive state architecture capable of rendering high-density charts without freezing, allowing users to fluidly switch between live fleet monitoring and analyzing experiment reports."
result_text: "We transformed the test vehicle into a connected lab. The solution eliminated the physical barrier of field testing, allowing teams to configure experiments and analyze critical telemetry in real-time, drastically reducing the feedback loop between the test track and the R&D lab."
---
