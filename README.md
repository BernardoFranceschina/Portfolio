<div align="center">

# franceschina.dev

**Bernardo Franceschina** · engenheiro de software em Florianópolis

</div>

&nbsp;

Site pessoal. Não é um currículo: é um lugar para mostrar como eu penso, o que me interessa e o que eu fotografo.

- **Fotos minhas no fundo**, tiradas com uma Coolpix L810. A troca entre elas é uma íris que abre a partir da câmera de um bonequinho.
- **O bonequinho** caminha com o scroll, acena quando o cursor chega perto, cochila, lê junto nos textos e tira as fotos. Tem easter eggs (`app/data/bonequinho.ts`).
- **Cartões de papel**: folha de caderno, ficha pautada, papel quadriculado, post-it, cartão-postal.
- **Varal de fotos** que dá para arrastar e ampliar. Fotos, ordem e falas em `app/data/varal.ts`.
- **Caderno**: um blog pequeno em Markdown.
- O site termina apoiado numa pedra recortada da própria foto.

&nbsp;

## Stack

| Camada | Tecnologias |
|--------|-------------|
| **Core** | Nuxt 4, Vue 3, TypeScript, CSS puro |
| **Conteúdo** | Nuxt Content (coleção `caderno`, Markdown + componentes MDC) |
| **Fontes** | Newsreader, Caveat e Courier Prime via `@nuxt/fonts` |
| **SEO** | Nuxt SEO, OG Image (Satori), sitemap, Schema.org |
| **Deploy** | Vercel, com Analytics e Speed Insights |

&nbsp;

## Escrever no caderno

Cada texto é um arquivo em `content/caderno/` e ganha página em `/caderno/<arquivo>`. A home mostra os 5 mais recentes. Com `hide: true` ele some da home e a página dá 404.

```md
---
title: Título do texto
description: Uma frase sobre ele.
date: 2026-10-14
tag: ensaio
minutes: 6      # opcional
hide: false     # opcional
photo: '1034'   # opcional: foto de fundo (public/fotos/<id>.jpg)
---

Texto...

::nota-margem
anotação à mão na margem
::

> :marca[frase com marca-texto]
```

&nbsp;

## Fotos

As originais ficam em `public/fotos/<id>.jpg`. Depois de adicionar ou trocar uma foto, rode `npm run fotos`: ele gera as versões AVIF (inteira e até 1280px), as miniaturas do varal e a lista de larguras (`app/data/fotos.json`). O site serve AVIF e usa o JPG só como reserva.

&nbsp;

## Rodar localmente

```bash
npm install
npm run dev
```
