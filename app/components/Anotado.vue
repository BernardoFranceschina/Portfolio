<script setup lang="ts">
// Anotações à caneta por cima de um papel. Marque no texto:
//   <span class="an" data-kind="circle|underline|bracket|cloud" data-note="linha 1 | linha 2">palavra</span>
// Em tela larga a nota vai para a margem direita (flecha, chave ou nuvem ligando); em tela estreita,
// ou com `inline`, ela entra logo abaixo do parágrafo. Cada anotação se desenha uma vez, quando chega na tela.
const props = withDefaults(defineProps<{ tag?: string, inline?: boolean }>(), { tag: 'div', inline: false })

const root = ref<HTMLElement>()
const NS = 'http://www.w3.org/2000/svg'
const WIDE = '(min-width: 1000px)'

// jitter estável: o traço não muda de forma a cada resize
const rng = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
const f = (n: number) => n.toFixed(1)

function circle(r: DOMRect, rand: () => number) {
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2
  const rx = r.width / 2 + 6, ry = r.height / 2 + 4
  const a0 = -2.5 - rand() * .4, sweep = Math.PI * 2 + .45, N = 44
  let d = ''
  for (let i = 0; i <= N; i++) {
    const t = i / N, a = a0 + sweep * t
    const grow = 1 + t * .07 + (rand() - .5) * .025 // não fecha no mesmo ponto, como à mão
    const x = cx + Math.cos(a) * rx * grow
    const y = cy + Math.sin(a) * ry * grow - (x - cx) * .05
    d += `${i ? 'L' : 'M'}${f(x)} ${f(y)}`
  }
  return d
}

function underline(r: DOMRect, rand: () => number) {
  const y = r.bottom - 1, x0 = r.left - 3, x1 = r.right + 6
  return `M${f(x0)} ${f(y + rand())}Q${f((x0 + x1) / 2)} ${f(y + 3.5)} ${f(x1)} ${f(y - 1.5)}`
}

function bracket(top: number, bottom: number, x: number) {
  const w = 9, m = (top + bottom) / 2
  return `M${f(x)} ${f(top)}Q${f(x + w)} ${f(top)} ${f(x + w)} ${f(top + 9)}L${f(x + w)} ${f(m - 7)}Q${f(x + w)} ${f(m)} ${f(x + w * 2)} ${f(m)}`
    + `Q${f(x + w)} ${f(m)} ${f(x + w)} ${f(m + 7)}L${f(x + w)} ${f(bottom - 9)}Q${f(x + w)} ${f(bottom)} ${f(x)} ${f(bottom)}`
}

// nuvem de pensamento: arcos para fora ao redor de uma elipse
function cloud(cx: number, cy: number, rx: number, ry: number, rand: () => number) {
  const n = Math.max(8, Math.round(Math.PI * (rx + ry) / 30)), a0 = rand() * 6.28
  const pts = Array.from({ length: n }, (_, k) => {
    const a = a0 + (k / n) * Math.PI * 2 + (rand() - .5) * .12
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry] as const
  })
  let d = `M${f(pts[0]![0])} ${f(pts[0]![1])}`
  for (let k = 1; k <= n; k++) {
    const [px, py] = pts[k - 1]!, [x, y] = pts[k % n]!
    const r = Math.hypot(x - px, y - py) * (.56 + rand() * .1)
    d += `A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y)}`
  }
  return d
}
const dot = (x: number, y: number, r: number) => `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`

// flecha que sai da nota e aponta para a linha do texto
function arrow(sx: number, sy: number, ex: number, ey: number) {
  const cx = (sx + ex) / 2, cy = Math.min(sy, ey) - 12 - Math.abs(sy - ey) * .15
  const tx = ex - cx, ty = ey - cy, L = Math.hypot(tx, ty) || 1
  const ux = tx / L, uy = ty / L, h = 8, s = .5
  const head = `M${f(ex - h * (ux * Math.cos(s) - uy * Math.sin(s)))} ${f(ey - h * (uy * Math.cos(s) + ux * Math.sin(s)))}L${f(ex)} ${f(ey)}`
    + `L${f(ex - h * (ux * Math.cos(-s) - uy * Math.sin(-s)))} ${f(ey - h * (uy * Math.cos(-s) + ux * Math.sin(-s)))}`
  return { body: `M${f(sx)} ${f(sy)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`, head }
}

let cleanup: (() => void) | undefined

onMounted(() => {
  const el = root.value!
  const marks = [...el.querySelectorAll<HTMLElement>('.an')]
  if (!marks.length) return
  const mq = matchMedia(WIDE)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const shown = new Set<number>()

  // texto da nota também para leitores de tela
  marks.forEach((m) => {
    const sr = document.createElement('span')
    sr.className = 'sr-only'
    sr.textContent = ` (${m.dataset.note!.split('|').map(s => s.trim()).join(', ')})`
    m.append(sr)
  })

  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('class', 'an-ink')
  svg.setAttribute('aria-hidden', 'true')
  const layer = document.createElement('div')
  layer.className = 'an-layer'
  layer.setAttribute('aria-hidden', 'true')
  el.append(svg, layer)
  let inline: HTMLElement[] = []
  const groups: { g: SVGGElement, note: HTMLElement }[] = []

  const path = (g: SVGGElement, d: string, cls: string) => {
    const p = document.createElementNS(NS, 'path')
    p.setAttribute('d', d)
    p.setAttribute('pathLength', '1')
    p.setAttribute('class', cls)
    g.append(p)
  }
  const noteEl = (text: string, i: number) => {
    const n = document.createElement('span')
    n.className = 'an-note'
    n.style.setProperty('--tilt', `${[-2.5, -1, -3, -.5][i % 4]}deg`)
    text.split('|').forEach((line) => {
      const s = document.createElement('span')
      s.textContent = line.trim()
      n.append(s)
    })
    return n
  }

  // mede como se o papel não estivesse girado (a anotação gira junto com ele depois)
  function flatten() {
    const saved: [HTMLElement, string][] = []
    for (let a: HTMLElement | null = el; a && a !== document.body; a = a.parentElement) {
      if (getComputedStyle(a).transform !== 'none') { saved.push([a, a.style.transform]); a.style.transform = 'none' }
    }
    return () => saved.forEach(([a, t]) => { a.style.transform = t })
  }

  function layout() {
    const restore = flatten()
    svg.replaceChildren()
    layer.replaceChildren()
    inline.forEach(n => n.remove())
    inline = []
    groups.length = 0
    const box = el.getBoundingClientRect()
    svg.setAttribute('width', String(box.width))
    svg.setAttribute('height', String(box.height))
    const rel = (r: DOMRect) => new DOMRect(r.left - box.left, r.top - box.top, r.width, r.height)
    const wide = mq.matches && !props.inline
    let floor = -Infinity // notas da margem nunca se sobrepõem

    marks.forEach((m, i) => {
      const rand = rng(i * 7919 + 17)
      const kind = m.dataset.kind || 'circle'
      const p = m.closest('p') || m.parentElement!
      const col = rel(p.getBoundingClientRect())
      const rects = [...m.getClientRects()].map(rel)
      const first = rects[0]!, last = rects[rects.length - 1]!
      const g = document.createElementNS(NS, 'g')
      svg.append(g)
      const note = noteEl(m.dataset.note!, i)

      if (kind === 'circle' || (kind === 'cloud' && !wide)) path(g, circle(first, rand), 'an-mark')
      if (kind === 'underline') rects.forEach(r => path(g, underline(r, rand), 'an-mark'))

      if (wide && kind === 'cloud') {
        // a palavra circulada "pensa" a nota: bolinhas até uma nuvem na margem
        const x = col.right + 84
        note.classList.add('cloud')
        layer.append(note)
        note.style.left = `${x}px`
        note.style.maxWidth = `${box.width - x - 46}px`
        const h = note.offsetHeight, w = note.offsetWidth
        const top = Math.max((first.top + first.bottom) / 2 - h / 2 - 8, floor + 16) // centrada na linha da palavra
        note.style.top = `${top}px`
        floor = top + h + 22
        const cx = x + w / 2, cy = top + h / 2, rx = w / 2 + 22, ry = h / 2 + 15
        path(g, circle(first, rand), 'an-mark')
        const sx = col.right + 14, sy = (first.top + first.bottom) / 2
        ;[2.5, 3.8, 5.2].forEach((rr, k) => {
          const t = (k + 1) / 4
          path(g, dot(sx + (cx - rx - sx + 4) * t, sy + (cy + ry * .35 - sy) * t, rr), 'an-dot')
        })
        path(g, cloud(cx, cy, rx, ry, rand), 'an-cloud')
      }
      else if (wide) {
        const x = col.right + (kind === 'bracket' ? 40 : 52)
        layer.append(note)
        note.style.left = `${x}px`
        note.style.width = `${box.width - x - 24}px`
        const want = kind === 'bracket' ? (first.top + last.bottom) / 2 - 18 : first.top - 3
        const top = Math.max(want, floor)
        note.style.top = `${top}px`
        floor = top + note.offsetHeight + 10
        if (kind === 'bracket') {
          path(g, bracket(first.top + 2, last.bottom - 2, col.right + 14), 'an-mark')
        }
        else {
          const a = arrow(x - 8, top + 17, col.right + 10, (first.top + first.bottom) / 2)
          path(g, a.body, 'an-arrow')
          path(g, a.head, 'an-head')
        }
      }
      else {
        // abaixo do parágrafo, ocupando a linha pautada que sobra entre ele e o próximo
        let box2 = p.nextElementSibling as HTMLElement | null
        if (!box2?.classList.contains('an-inline')) {
          box2 = document.createElement('div')
          box2.className = 'an-inline'
          box2.setAttribute('aria-hidden', 'true')
          p.after(box2)
          inline.push(box2)
        }
        note.classList.add('inline')
        note.insertAdjacentHTML('afterbegin', '<svg class="an-up" viewBox="0 0 22 22" width="22" height="22"><path pathLength="1" d="M18 20 Q 5 18 6 5 M2 9 L6 4 L10 9" /></svg>')
        box2.append(note)
      }
      groups.push({ g, note })
      if (shown.has(i) || reduce) { g.classList.add('on'); note.classList.add('on') }
    })
    restore()
  }

  let nextFree = 0
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const i = marks.indexOf(e.target as HTMLElement)
      io.unobserve(e.target)
      const now = performance.now(), wait = Math.max(0, nextFree - now)
      nextFree = now + wait + 550 // duas anotações juntas desenham uma depois da outra
      setTimeout(() => {
        shown.add(i)
        groups[i]?.g.classList.add('on')
        groups[i]?.note.classList.add('on')
      }, wait)
    }
  }, { rootMargin: '0px 0px -15% 0px' })

  layout()
  document.fonts?.ready.then(layout)
  let w = el.offsetWidth
  const ro = new ResizeObserver(() => { if (el.offsetWidth !== w) { w = el.offsetWidth; layout() } })
  ro.observe(el)
  mq.addEventListener('change', layout)
  if (!reduce) marks.forEach(m => io.observe(m))

  cleanup = () => {
    io.disconnect(); ro.disconnect(); mq.removeEventListener('change', layout)
    svg.remove(); layer.remove(); inline.forEach(n => n.remove())
    el.querySelectorAll('.an .sr-only').forEach(n => n.remove())
  }
})
onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <component :is="tag" ref="root" class="anotado">
    <slot />
  </component>
</template>

<style>
.anotado .an { white-space: nowrap; }
.anotado .an[data-kind="bracket"] { white-space: normal; }
.an-ink { position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none; z-index: 1; }
.an-ink path { fill: none; stroke: var(--pen); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; opacity: 0;
  stroke-dasharray: 1; stroke-dashoffset: 1; }
/* opacidade junto do traço: um caminho ainda não desenhado deixaria um pontinho da ponta redonda */
.an-ink .on path { stroke-dashoffset: 0; opacity: .85; }
.an-ink .on .an-mark { transition: stroke-dashoffset .45s cubic-bezier(.5,0,.3,1); }
.an-ink .on .an-arrow { transition: stroke-dashoffset .35s .4s cubic-bezier(.4,0,.4,1), opacity 0s .4s; }
.an-ink .on .an-head { transition: stroke-dashoffset .12s .75s linear, opacity 0s .75s; }
.an-ink .on .an-dot { transition: stroke-dashoffset .1s .45s linear, opacity 0s .45s; }
.an-ink .on .an-dot:nth-of-type(3) { transition-delay: .55s; }
.an-ink .on .an-dot:nth-of-type(4) { transition-delay: .65s; }
.an-ink .on .an-cloud { transition: stroke-dashoffset .6s .7s cubic-bezier(.4,0,.4,1), opacity 0s .7s; }
.an-layer { position: absolute; inset: 0; pointer-events: none; z-index: 1; }

.an-note { position: absolute; display: block; font-family: "Caveat", cursive; font-size: 25px; line-height: 32px; color: var(--pen);
  transform: rotate(var(--tilt)); transform-origin: 0 50%; clip-path: inset(-6px 100% -6px -6px); }
.an-note > span { display: block; }
.an-note.cloud { --tilt: 0deg; width: max-content; text-align: center; line-height: 28px; white-space: nowrap; }
.an-note.cloud.on { transition-delay: 1.1s; }
.an-note.on { clip-path: inset(-6px -6px -6px -6px); transition: clip-path .55s .5s cubic-bezier(.4,0,.6,1); }

.an-inline { margin: -32px 0 32px; text-align: right; line-height: 32px; }
.an-note.inline { position: static; display: inline-flex; gap: 4px; align-items: flex-start; margin-left: 18px; text-align: left; transition-delay: .3s; }
.an-note.inline > span { display: inline; }
.an-note.inline > span + span::before { content: " · "; }
.an-up { flex: none; margin-top: 2px; fill: none; stroke: var(--pen); stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }

.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (prefers-reduced-motion: reduce) {
  .an-ink path, .an-note { transition: none !important; }
}
</style>
