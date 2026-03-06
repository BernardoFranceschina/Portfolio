---
locale: "en"
order: 3
title: "Psychology Clinic"
description: "Complete SaaS for practice management: smart scheduling, patient portal, automated finances, and PDF receipt generation."
category: "SaaS / HealthTech"
image: "/psico/psico_image.png"
second_image: "/psico/psico_dev.png"
architecture_image: "/psico/psico_architecture.png"
color: "bg-[#0B1B0C]"
tags: ["Laravel", "Vue.js", "Pinia", "Vuetify", "MySQL", "Docker", "JWT"]
year: "2026"
company: "Freelance"
role: "Full Stack Developer"
features:
  - "Dashboard with metrics, KPIs, revenue sparklines, and birthday reminders"
  - "Session calendar with multiple views and status controls"
  - "Patient portal with autonomous rescheduling and session history"
  - "Financial module with revenue tracking, pending amounts, and period totals"
  - "Professional fee receipt PDF generation with watermark and formal layout"
  - "Polling-based notification system for rescheduling requests"
  - "Institutional landing page with CSS animations and lead capture form"
  - "Mandatory password change on patient's first login"
highlights:
  - "Strict context segregation — patient portal fully isolated from clinical environment"
  - "JWT authentication with HttpOnly cookies and role-based guards (ADMIN/PATIENT)"
  - "UI-mapped enums (label, color, icon) — zero presentation logic in components"
  - "Repository Pattern with interfaces in Laravel backend"
  - "Docker Compose orchestrating Laravel + MySQL + phpMyAdmin in isolated network"
  - "Automatic API documentation with Scramble (OpenAPI)"
challenge_text: "The psychologist managed everything manually: scheduling via WhatsApp, finances in spreadsheets, records on paper. Every reschedule turned into a 10-message exchange. The challenge was building something simple enough not to burden the workflow, yet robust enough to automate the financial cycle and give patients autonomy."
development_text: "UX was the priority. The Vuetify 3 interface was designed so the psychologist can manage her entire day in a few clicks — drag-and-drop calendar, visual session statuses, dashboard with KPIs and revenue sparklines. At the core, I architected strict context segregation: the patient portal (rescheduling, history) is completely isolated from the clinical environment, ensuring absolute record privacy. A polling-based notification system every 5 minutes keeps the psychologist informed without push infrastructure overhead. Fee receipts are generated as PDFs with formal layout and watermark."
result_text: "The Patient Portal eliminated messaging back-and-forth for scheduling. The financial module automated receipt generation and cash flow tracking. The psychologist reclaimed hours per week previously spent on admin — now dedicated to what matters: patient care."
---