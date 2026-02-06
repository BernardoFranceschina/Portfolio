---
locale: "pt"
order: 1

title: "Sistema Inteligente de Aquisição e Análise para ECUs"
description: "Sistema de telemetria avançada e gestão de experimentos para engenharia automotiva, em parceria com Renault e Horse."
category: "Automotivo / P&D"
image: "/iase/iase_image.png"
second_image: "/iase/iase_dev.png"
architecture_image: "/iase/iase_architecture.png"
color: "bg-[#674E0B]" # Must configure on tailwind.config.js
tags: ["Docker", "Nginx", "Vue.js", "Django", "MQTT", "CI/CD"]
year: "2024 - 2026"
company: "UFSC / Renault / Horse"
challenge_text: "O desafio era criar um pipeline de dados Edge-to-Cloud robusto o suficiente para suportar a aquisição de dados críticos de veículos em movimento via 5G. Era necessário orquestrar a configuração remota de hardware embarcado e garantir a integridade dos arquivos gerados em alta frequência, tudo isso enquanto se gerenciava uma infraestrutura complexa com múltiplos serviços interdependentes."
development_text: "A solução exigiu uma orquestração precisa entre os serviços para garantir a integridade dos dados vindos da placa. Desenvolvi a lógica de controle que sincroniza a recepção de pacotes de alta frequência com a persistência em disco, evitando gargalos de I/O. No front-end, o desafio foi construir uma arquitetura de estado reativa, capaz de renderizar gráficos de alta densidade sem travamentos, permitindo ao usuário alternar fluidamente entre o monitoramento ao vivo de frotas e a análise de relatórios dos experimentos executados."
result_text: "Transformamos o veículo de teste em um laboratório conectado. A solução eliminou a barreira física dos testes de campo, permitindo que equipes configurem experimentos e analisem telemetria crítica em tempo real, reduzindo drasticamente o ciclo de feedback entre a pista de testes e o laboratório de P&D."
---