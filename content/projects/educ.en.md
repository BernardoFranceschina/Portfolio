---
locale: "en"
order: 2
title: "Education Ecosystem"
description: "Platform unifying e-commerce, LMS, CRM, and cash flow into a single system — replacing 4 separate SaaS tools."
category: "CRM / EdTech"
image: "/ndpz/ndpz_image.png"
second_image: "/ndpz/ndpz_dev.png"
architecture_image: "/ndpz/ndpz_architecture.png"
color: "bg-[#9F3623]"
tags: ["Laravel", "Vue.js", "Nuxt 3", "Sanity.io", "Asaas", "JWT", "AWS S3"]
year: "2022 - 2026"
company: "Freelance"
role: "Full Stack Developer"
features:
  - "Full e-commerce with online course and in-person event ticket sales"
  - "Discount coupon system (fixed and percentage) with configurable installments"
  - "LMS with video player, modules, lessons, and progress tracking"
  - "Event check-in via QR Code/OTP with real-time validation"
  - "Client portal with purchase history, installments, and course access"
  - "Headless Landing Page with Nuxt 3 + Sanity CMS, marketing-editable"
  - "Financial PDF reports with period filters and shareable links"
  - "Lead management with status tabs and WhatsApp shortcut"
highlights:
  - "Real Asaas gateway integration — installments, webhooks, and financial reconciliation"
  - "Dual JWT authentication in the same system (admin and client with separate guards)"
  - "Repository Pattern with Service Layer for backend decoupling"
  - "Dynamic PDF generation with DomPDF for financial reports"
  - "SSR with Nuxt 3 on landing page for SEO and performance"
  - "Global helpers registered as Vue plugins (formatters, validation rules, API handler)"
challenge_text: "The company sold hybrid products — online courses and in-person event tickets — using spreadsheets, 3 different platforms, and zero unified customer view. Finances were a blind spot: installments, coupons, and payment webhooks got lost between systems. The challenge was building a single operational core where cash flow integrity was priority zero."
development_text: "I architected the system around finance. Every sale — whether a course or a ticket — starts as a transaction reconciled with the Asaas payment gateway via webhooks, ensuring not a cent is lost. On top of that core, I built delivery modules: a video player for e-learning with per-module progress tracking, a QR Code/OTP check-in validator for events, and a headless Landing Page with Nuxt 3 + Sanity CMS where marketing updates content without deployments. The backend follows Repository Pattern with a Service Layer, and dual JWT authentication cleanly separates admin and client contexts."
result_text: "The platform replaced 4 separate SaaS tools. It now manages the full lifecycle: capture on the Landing Page, purchase with Asaas-integrated installments, content consumption or event check-in, with all financials reflecting instantly on the dashboard — one system for the entire operation."
---