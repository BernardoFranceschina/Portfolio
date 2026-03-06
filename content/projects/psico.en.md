---
locale: "en"
order: 3
title: "Psychology clinic"
description: "Complete SaaS for clinic management: smart schedule, patient portal, automated financials, and PDF receipt generation."
category: "SaaS / HealthTech"
image: "/psico/psico_image.png"
second_image: "/psico/psico_dev.png"
color: "bg-[#0B1B0C]"
tags: ["Laravel", "Vue.js", "Pinia", "Vuetify", "MySQL", "Docker", "JWT"]
year: "2026"
company: "Freelance"
role: "Full stack developer"
features:
  - "Dashboard with metrics, KPIs, revenue sparklines, and birthday list"
  - "Session calendar with multiple views and status control"
  - "Patient portal with autonomous rescheduling and session history"
  - "Financial module with revenue tracking, pending items, and totals by period"
  - "PDF fee receipt generation with watermark and formal layout"
  - "Notification system for rescheduling requests"
  - "Institutional landing page with CSS animations and lead capture form"
  - "Mandatory password change on first patient access"
highlights:
  - "Strict context segregation - patient portal isolated from clinical environment"
  - "JWT authentication with HttpOnly cookie and role-based guards"
  - "Enums with UI mapping - zero presentation logic in components"
  - "Repository pattern with interfaces in the Laravel backend"
  - "Automatic API documentation with Scramble (OpenAPI)"
challenge_text: "The psychologist managed everything manually: scheduling via WhatsApp, financials in spreadsheets, paper medical records. Every reschedule turned into a 10-message exchange. The challenge was to create something simple enough not to bureaucratize the service, but robust enough to automate the financial cycle and give the patient autonomy."
development_text: "The priority was UX. The interface with Vuetify 3 was designed so the psychologist can manage the entire day in a few clicks - drag-and-drop calendar, visual status per session, dashboard with KPIs and revenue sparklines. At the core, I architected a strict context segregation: the patient portal (rescheduling, history) is completely isolated from the clinical environment, ensuring absolute privacy of medical records. The notification system keeps the psychologist informed without depending on push infrastructure. Fee receipts are generated in PDF with a formal layout and watermark."
result_text: "The patient portal eliminated the exchange of messages for scheduling. The financial module automated the issuance of receipts and cash flow control. The psychologist recovered hours per week previously spent on administration - now dedicated to what matters: patient care."
---