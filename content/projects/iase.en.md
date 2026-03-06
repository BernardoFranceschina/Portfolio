---
locale: "en"
order: 1
title: "Intelligent Acquisition and Analysis System for ECUs"
description: "Real-time Edge-to-Cloud automotive telemetry pipeline with MQTT, reactive dashboards, and automated CI/CD deployment."
category: "Automotive / R&D"
image: "/iase/iase_image.png"
second_image: "/iase/iase_dev.png"
architecture_image: "/iase/iase_architecture.png"
color: "bg-[#674E0B]"
tags: ["Docker", "Nginx", "Vue.js", "Django", "MQTT", "CI/CD", "Chart.js", "Leaflet"]
year: "2024 - 2026"
company: "UFSC / Renault / Horse"
role: "Frontend Lead & DevOps"
features:
  - "Reactive dashboards with Chart.js for real-time sensor data visualization"
  - "Interactive maps with Leaflet for GPS fleet vehicle tracking"
  - "MQTT pipeline for high-frequency ECU data capture over 5G"
  - "Remote embedded hardware configuration directly from the platform"
  - "Experiment management with reporting and telemetry analysis"
  - "Automotive calibration file management system"
highlights:
  - "Zero-downtime deployment with GitLab CI/CD and self-hosted runner"
  - "Multi-stage Docker build — final image without Node.js, drastically smaller"
  - "Nginx with automatic HTTPS via Certbot and reverse proxy for multiple services"
  - "Per-entity Pinia stores for performant global state management"
  - "Reusable composables organized by domain"
  - "Git submodules separating frontend and backend responsibilities"
challenge_text: "Renault needed a platform capable of capturing ECU data from moving vehicles over 5G, remotely configuring embedded hardware, and guaranteeing file integrity at high-frequency data generation — all with multiple interdependent services. The pipeline had to be robust enough that no critical data packet was lost between the board and the cloud."
development_text: "I built the control logic that synchronizes high-frequency MQTT packet reception with disk persistence, eliminating I/O bottlenecks. On the frontend, I architected a reactive state system with Pinia capable of rendering high-density Chart.js visualizations without frame drops, enabling fluid switching between live fleet monitoring via Leaflet and experiment report analysis. For infrastructure, I implemented GitLab CI/CD, zero-downtime deployment with multi-stage Docker builds, and Nginx with automatic HTTPS via Certbot."
result_text: "We turned the test vehicle into a connected lab. Teams now configure experiments and analyze critical telemetry in real time remotely, eliminating the physical barrier between the test track and the R&D laboratory."
---