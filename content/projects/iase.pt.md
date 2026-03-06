---
locale: "pt"
order: 1
title: "Sistema inteligente de aquisição e análise para ECUs"
description: "Pipeline Edge-to-Cloud de telemetria automotiva em tempo real, com MQTT, dashboards reativos e deploy automatizado via CI/CD."
category: "Automotivo / P&D"
image: "/iase/iase_image.png"
second_image: "/iase/iase_dev.png"
color: "bg-[#674E0B]"
tags: ["Docker", "Nginx", "Vue.js", "Django", "MQTT", "CI/CD", "Chart.js", "Leaflet"]
year: "2024 - Atual"
company: "UFSC / Renault / Horse"
role: "Frontend Lead & DevOps"
features:
  - "Dashboards reativos com Chart.js para visualização de dados de sensores em tempo real"
  - "Mapas interativos com Leaflet para rastreamento GPS de frotas de veículos"
  - "Pipeline MQTT para captura de dados de ECUs em alta frequência via 5G"
  - "Configuração remota de hardware embarcado diretamente pela plataforma"
  - "Gestão de experimentos com relatórios e análise de telemetria"
  - "Sistema de gerenciamento de arquivos de calibração automotiva"
highlights:
  - "Deploy zero-downtime com GitLab CI/CD e self-hosted runner"
  - "Docker multi-stage build - imagem final sem Node.js, drasticamente menor"
  - "Nginx com HTTPS automático via Certbot e proxy reverso para múltiplos serviços"
  - "Stores individuais por entidade com Pinia para estado global performático"
  - "Composables reutilizáveis organizados por domínio"
  - "Git submodules separando responsabilidades entre frontend e backend"
challenge_text: "A Renault precisava de uma plataforma capaz de capturar dados de ECUs em veículos em movimento via 5G, configurar remotamente hardware embarcado e garantir integridade de arquivos gerados em alta frequência - tudo isso com múltiplos serviços interdependentes. O pipeline tinha que ser robusto o suficiente para que nenhum pacote de dados críticos fosse perdido entre a placa e a nuvem."
development_text: "Construí a lógica de controle que sincroniza a recepção de pacotes MQTT de alta frequência com a persistência em disco, eliminando gargalos de I/O. No frontend, arquitetei um sistema de estado reativo com Pinia capaz de renderizar gráficos Chart.js de alta densidade sem travamentos, permitindo alternar fluidamente entre monitoramento ao vivo de frotas via Leaflet e análise de relatórios de experimentos. Na infraestrutura, implementei CI/CD com GitLab, deploy zero-downtime com Docker multi-stage e Nginx com HTTPS automático via Certbot."
result_text: "Transformamos o veículo de teste em um laboratório conectado. Equipes agora configuram experimentos e analisam telemetria crítica em tempo real remotamente, eliminando a barreira física entre a pista de testes e o laboratório de P&D."
---