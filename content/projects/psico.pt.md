---
locale: "pt"
order: 3
title: "Clínica de psicologia"
description: "SaaS completo para gestão de consultório: agenda inteligente, portal do paciente, financeiro automatizado e geração de recibos em PDF."
category: "SaaS / HealthTech"
image: "/psico/psico_image.png"
second_image: "/psico/psico_dev.png"
color: "bg-[#0B1B0C]"
tags: ["Laravel", "Vue.js", "Pinia", "Vuetify", "MySQL", "Docker", "JWT"]
year: "2026"
company: "Aya Psique"
role: "Full Stack Developer"
live_url: "https://ayapsique.com.br"
work_context: "client"
features:
  - "Dashboard com métricas, KPIs, sparklines de faturamento e lista de aniversariantes"
  - "Calendário de sessões com múltiplas visualizações e controle de status"
  - "Portal do paciente com reagendamento autônomo e histórico de sessões"
  - "Módulo financeiro com controle de receitas, pendências e totais por período"
  - "Geração de recibos de honorários em PDF com marca d'água e layout formal"
  - "Sistema de notificações para solicitações de reagendamento"
  - "Landing page institucional com animações CSS e formulário de captação de leads"
  - "Troca obrigatória de senha no primeiro acesso do paciente"
highlights:
  - "Segregação rigorosa de contextos - portal do paciente isolado do ambiente clínico"
  - "Autenticação JWT com cookie HttpOnly e guards por role"
  - "Enums com mapeamento de UI - zero lógica de apresentação nos componentes"
  - "Repository Pattern com interfaces no backend Laravel"
  - "Documentação automática da API com Scramble (OpenAPI)"
challenge_text: "A psicóloga gerenciava tudo na mão: agendamentos pelo WhatsApp, financeiro em planilhas, prontuários em papel. Cada reagendamento virava uma troca de 10 mensagens. O desafio era criar algo simples o suficiente para não burocratizar o atendimento, mas robusto o bastante para automatizar o ciclo financeiro e dar autonomia ao paciente."
development_text: "Prioridade foi UX. A interface com Vuetify 3 foi desenhada para que a psicóloga consiga gerenciar o dia inteiro em poucos cliques - calendário com drag-and-drop, status visuais por sessão, dashboard com KPIs e sparklines de faturamento. No núcleo, arquitetei uma segregação rigorosa de contextos: o portal do paciente (reagendamento, histórico) é completamente isolado do ambiente clínico, garantindo privacidade absoluta dos prontuários. O sistema de notificações mantém a psicóloga informada sem depender de infraestrutura de push. Recibos de honorários são gerados em PDF com layout formal e marca d'água."
result_text: "O Portal do Paciente eliminou a troca de mensagens para agendamento. O módulo financeiro automatizou a emissão de recibos e o controle de fluxo de caixa. A psicóloga recuperou horas por semana que antes eram gastas com administração - agora dedicadas ao que importa: o atendimento."
---