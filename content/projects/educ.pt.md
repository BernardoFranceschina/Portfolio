---
locale: "pt"
order: 2
title: "Ecossistema de Educação"
description: "Plataforma que unifica e-commerce, LMS, CRM e fluxo de caixa em um único sistema — substituindo 4 ferramentas SaaS isoladas."
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
  - "E-commerce completo com venda de cursos online e ingressos para eventos presenciais"
  - "Sistema de cupons de desconto (fixo e percentual) com parcelamento configurável"
  - "LMS com player de vídeo, módulos, lições e acompanhamento de progresso"
  - "Check-in de eventos via QR Code/OTP com validação em tempo real"
  - "Portal do cliente com histórico de compras, parcelas e acesso às aulas"
  - "Landing Page headless com Nuxt 3 + Sanity CMS, editável pelo marketing"
  - "Relatórios financeiros em PDF com filtro por período e links compartilháveis"
  - "Gestão de leads com status, abas e atalho para WhatsApp"
highlights:
  - "Integração real com gateway Asaas — parcelamento, webhooks e conciliação financeira"
  - "Autenticação JWT dual no mesmo sistema (admin e cliente com guards separadas)"
  - "Repository Pattern com Service Layer no backend para desacoplamento"
  - "Geração dinâmica de PDFs com DomPDF para relatórios financeiros"
  - "SSR com Nuxt 3 na landing page para SEO e performance"
  - "Helpers globais registrados como plugins Vue (formatadores, regras, API handler)"
challenge_text: "A empresa vendia produtos híbridos — cursos online e ingressos para eventos presenciais — usando planilhas, 3 plataformas diferentes e nenhuma visão unificada do cliente. O financeiro era um ponto cego: parcelas, cupons e webhooks de pagamento se perdiam entre sistemas. O desafio era criar um núcleo operacional único onde a integridade do fluxo de caixa fosse prioridade zero."
development_text: "Arquitetei o sistema ao redor do financeiro. Cada venda — seja curso ou ingresso — nasce primeiro como uma transação reconciliada com o gateway Asaas via webhooks, garantindo que nenhum centavo se perca. Sobre esse núcleo, construí módulos de entrega: player de vídeo para EAD com progresso por módulo, validador de check-in via QR Code/OTP para eventos, e uma Landing Page headless com Nuxt 3 + Sanity CMS, onde o marketing altera conteúdo sem depender de deploy. O backend segue Repository Pattern com Service Layer, e a autenticação JWT dual separa os contextos de admin e cliente."
result_text: "A plataforma substituiu 4 ferramentas SaaS distintas. Hoje gerencia o ciclo completo: captura na Landing Page, compra com parcelamento integrado ao Asaas, consumo do conteúdo ou check-in no evento, com todo o financeiro refletindo instantaneamente no painel — um único sistema para toda a operação."
---