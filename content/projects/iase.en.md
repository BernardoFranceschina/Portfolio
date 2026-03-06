---
locale: "en"
order: 1
title: "Intelligent acquisition and analysis system for ECUs"
description: "Real-time automotive telemetry Edge-to-Cloud pipeline, with MQTT, reactive dashboards, and automated deployment via CI/CD."
category: "Automotive / R&D"
image: "/iase/iase_image.png"
second_image: "/iase/iase_dev.png"
color: "bg-[#674E0B]"
tags: ["Docker", "Nginx", "Vue.js", "Django", "MQTT", "CI/CD", "Chart.js", "Leaflet"]
year: "2024 - Present"
company: "UFSC / Renault / Horse"
role: "Frontend lead & DevOps"
features:
  - "Reactive dashboards with Chart.js for real-time sensor data visualization"
  - "Interactive maps with Leaflet for GPS tracking of vehicle fleets"
  - "MQTT pipeline for capturing high-frequency ECU data via 5G"
  - "Remote configuration of embedded hardware directly through the platform"
  - "Experiment management with reports and telemetry analysis"
  - "Automotive calibration file management system"
highlights:
  - "Zero-downtime deployment with GitLab CI/CD and self-hosted runner"
  - "Docker multi-stage build - final image without Node.js, drastically smaller"
  - "Nginx with automatic HTTPS via Certbot and reverse proxy for multiple services"
  - "Individual stores per entity with Pinia for performant global state"
  - "Reusable composables organized by domain"
  - "Git submodules separating responsibilities between frontend and backend"
challenge_text: "Renault needed a platform capable of capturing data from ECUs in moving vehicles via 5G, remotely configuring embedded hardware, and ensuring the integrity of files generated at high frequency - all of this with multiple interdependent services. The pipeline had to be robust enough so that no critical data packets were lost between the board and the cloud."
development_text: "I built the control logic that synchronizes the reception of high-frequency MQTT packets with disk persistence, eliminating I/O bottlenecks. On the frontend, I architected a reactive state system with Pinia capable of rendering high-density Chart.js charts without freezing, allowing fluid switching between live fleet monitoring via Leaflet and analysis of experiment reports. In the infrastructure, I implemented CI/CD with GitLab, zero-downtime deployment with Docker multi-stage, and Nginx with automatic HTTPS via Certbot."
result_text: "We transformed the test vehicle into a connected laboratory. Teams now configure experiments and analyze critical telemetry in real-time remotely, eliminating the physical barrier between the test track and the R&D lab."
---