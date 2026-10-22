<script setup lang="ts">
const PHOTOS = ['0716', '0719', '0712', '0961', '1115']

const EMAIL = 'bernardofranceschina@gmail.com'

useHead({ titleTemplate: '%s' })
useSeoMeta({
  title: 'Bernardo Franceschina',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
defineOgImageComponent('Postal', { photo: '0716', title: 'oi, eu sou o Bernardo.' })
</script>

<template>
  <div>
    <SceneBackground :photos="PHOTOS" />

    <TopNav
      :home="{ to: '/', label: 'bernardo' }"
      :sections="[
        { to: '#sobre', label: 'de onde eu venho' },
        { to: '#trabalho', label: 'o que eu faço' },
        { to: '#varal', label: 'varal de fotos' },
        { to: '#caderno', label: 'algumas escritas' },
        { to: '#oi', label: 'diga oiii' },
      ]"
    />

    <main>
      <!-- hero: pedaço de papel rasgado, colado com fita -->
      <section class="stop" data-shot="0">
        <div class="drop hero-drop">
          <div class="scrap">
            <h1>oi, eu sou o Bernardo.</h1>
            <span class="mono">Engenheiro de software na Wiidoo Labs<br>Florianópolis, SC</span>
            <span class="hand">↓ role devagar, eu vai junto</span>
          </div>
          <span class="tape" />
        </div>
      </section>

      <section id="sobre" class="wrap" data-shot="1">
        <div class="drop">
          <Anotado tag="article" class="notebook">
            <h2>de onde eu venho</h2>
            <p>Comecei a programar profissionalmente em uma pequena empresa de <span class="an" data-kind="circle" data-note="desde 2020">Concórdia</span>, no oeste de Santa Catarina. Foi lá que aprendi que software bom é o que alguém usa de verdade.</p>
            <p><span class="an" data-kind="bracket" data-note="freelance de 2022–2026">Depois vieram alguns anos como freelancer, fazendo o ciclo completo dos produtos, para clientes que precisavam que aquilo funcionasse na segunda-feira.</span></p>
            <p>Hoje sou engenheiro full stack na <span class="an" data-kind="circle" data-note="tempo integral desde 2026">Wiidoo Labs</span>, fazendo software com impacto social e projetos com IA. Em paralelo, termino minha graduação em <span class="an" data-kind="underline" data-note="UFSC Florianópolis">Ciências da Computação</span> na UFSC.</p>
          </Anotado>
        </div>
      </section>
      <div class="gap" />

      <section id="trabalho" class="wrap" data-shot="2">
        <div class="card-wrap">
        <div class="drop card-drop">
          <Anotado tag="article" class="index-card">
            <h2>o que eu faço hoje</h2>
            <span class="card-info">
              <InfoNota title="curiosidade">
                <p>O projeto de IA foi um desafio proposto pelo CEO para melhorar os processos da empresa, a ideia em grupo agregou muito valor a empresa, reduzindo <b>drasticamente</b> o tempo de resposta entre setores.</p>
              </InfoNota>
            </span>
            <p><span class="an" data-kind="bracket" data-note="Laravel · Vue 3 · TypeScript | Postgres · Docker + + + +...">Trabalho na Wiidoo Labs, o laboratório de software da Bússola Social. Minha atuação principal é no software de gestão de impacto social, onde organizações planejam, acompanham e mostram o impacto do que fazem.</span></p>
            <p>Também desenvolvo alguns projetos de <span class="an" data-kind="cloud" data-note="RAG | BM25 + embeddings | avaliação de LLM | e muito mais coisas.">IA</span> da casa. O projeto mais ambicioso é um assistente de IA para consultar o conhecimento dos produtos da casa. Ele foi feito para ajudar o QA, suporte, produto e os devs a <span class="an" data-kind="underline" data-note="modelos não alucinam">encontrar as respostas corretas</span>, sem depender de outras fontes.</p>
          </Anotado>
        </div>
        <span class="tape t1" />
        </div>

        <!-- LISHA, projeto paralelo: um registrador de telemetria de quem está lendo -->
        <div class="rec-wrap">
          <div class="drop"><LishaRegistrador /></div>
          <span class="tape" />
        </div>

        <!-- outros projetos: só o nome e o destaque, sem detalhe -->
        <div class="extra-wrap">
          <div class="drop">
            <article class="extra">
              <h2 class="hand">ah, e tem mais</h2>
              <ul>
                <li>uma plataforma para clínicas, com agenda, pacientes, financeiro e muito mais...........</li>
                <li>um controle financeiro pessoal que eu uso toda semana<SeloVibe /></li>
                <li>e este site!!</li>
              </ul>
            </article>
          </div>
          <span class="pin" aria-hidden="true" />
        </div>
      </section>

      <HomeVaral />

      <HomeCaderno :email="EMAIL" />

      <div class="gap" />

      <section id="pensamento" class="wrap" data-shot="4">
        <div class="drop" style="width: max-content">
          <p class="postit">
            <span class="verso">isso de querer ser<br>exatamente aquilo<br>que a gente é<br>ainda vai<br>nos levar além</span>
            <span class="mono autor">— Paulo Leminski</span>
          </p>
        </div>
      </section>

      <!-- rodapé: a pedra onde o site assenta (o céu dela é transparente) -->
      <footer id="oi" class="rock">
        <div class="stone" aria-hidden="true" />
        <div class="drop pc-drop">
          <div class="postcard">
            <span class="pc-head mono" aria-hidden="true">cartão-postal - post card</span>
            <div class="msg">
              <p class="hand">funciona na minha máquina, e nesta pedra também.</p>
              <p class="hand small">nenhum bug à vista</p>
            </div>
            <div class="sep"><span class="mono" aria-hidden="true">na frente: a pedra lá de baixo - DSCN0281</span></div>
            <div class="addr">
              <!-- carimbo do correio: anel com FLORIPA / SC, 2026 no meio entre barras, ondas de cancelamento e tinta gasta -->
              <svg class="postmark" viewBox="0 0 220 110" aria-hidden="true">
                <defs>
                  <path id="pm-top" d="M130.5 55 A34.5 34.5 0 0 1 199.5 55" />
                  <path id="pm-bot" d="M127 55 A38 38 0 0 0 203 55" />
                  <filter id="pm-ink" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="grao" />
                    <feDisplacementMap in="SourceGraphic" in2="grao" scale="1.6" result="borrado" />
                    <feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="2" seed="3" result="manchas" />
                    <feColorMatrix in="manchas" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.4 0 0 0 2.05" result="falhas" />
                    <feComposite in="borrado" in2="falhas" operator="in" />
                  </filter>
                </defs>
                <g filter="url(#pm-ink)">
                  <path class="pm-wave" d="M6 31 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 M6 43 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 M6 55 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 M6 67 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0 M6 79 q9 -6 18 0 t18 0 t18 0 t18 0 t18 0 t18 0" />
                  <circle cx="165" cy="55" r="45" class="pm-o" />
                  <circle cx="165" cy="55" r="30.5" class="pm-i" />
                  <text class="pm-arc"><textPath href="#pm-top" startOffset="50%">FLORIPA</textPath></text>
                  <text class="pm-arc"><textPath href="#pm-bot" startOffset="50%">SC</textPath></text>
                  <text x="127.5" y="58.5" class="pm-star">★</text>
                  <text x="202.5" y="58.5" class="pm-star">★</text>
                  <path d="M141 44.5 H189 M141 66.5 H189" class="pm-bar" />
                  <text x="165" y="61.5" class="pm-year">2026</text>
                </g>
              </svg>
              <address class="from">
                <span class="mono k">de</span>
                <span class="hand">Bernardo Franceschina</span>
                <span class="hand">engenheiro de software · Wiidoo Labs</span>
              </address>
              <a :href="`mailto:${EMAIL}`">email ↗</a>
              <a href="https://github.com/bernardofranceschina" target="_blank" rel="noopener">github ↗</a>
              <a href="https://linkedin.com/in/bernardo-franceschina" target="_blank" rel="noopener">linkedin ↗</a>
            </div>
          </div>
        </div>
        <span class="caption rock-caption">COOLPIX L810 · DSCN0281</span>
      </footer>
    </main>

    <WalkerAvatar />
  </div>
</template>

<style>
.stop { position: relative; height: 115vh; }
.gap { height: 70vh; }
.wrap { position: relative; }

/* hero */
.hero-drop { position: absolute; right: 8vw; bottom: 18vh; }
.scrap { position: relative; width: min(420px, 86vw); padding: 34px 32px 40px; background: var(--noise), var(--paper); transform: rotate(1.4deg);
  clip-path: polygon(0 3%, 6% 0, 13% 2%, 22% 0, 31% 3%, 40% 1%, 52% 3%, 61% 0, 72% 2%, 83% 0, 92% 3%, 100% 1%, 100% 100%, 0 100%); }
.scrap h1 { font-family: "Caveat", cursive; font-weight: 600; font-size: 58px; line-height: .95; color: var(--pen); }
.scrap .mono { display: block; margin-top: 14px; color: var(--muted); }
.scrap .hand { display: block; margin-top: 10px; font-size: 22px; color: var(--pencil); }
.hero-drop .tape { left: 38%; top: -12px; transform: rotate(-4deg); }

#sobre { margin-left: 6vw; max-width: 660px; }
/* a margem direita da folha guarda as anotações */
@media (min-width: 1000px) {
  #sobre { max-width: 940px; }
  #sobre .notebook { max-width: 940px; padding-right: 310px; }
}

#trabalho { margin-left: auto; margin-right: 12vw; max-width: 600px; transform: rotate(-.8deg); }
#trabalho .tape.t1 { left: 40%; top: -14px; transform: rotate(3deg); }
.card-wrap { position: relative; z-index: 10; }
.card-info { position: absolute; right: 22px; top: 26px; z-index: 20; }
.card-info .info { z-index: 100; }
.card-info .info-note { z-index: 100; }
.rec-wrap { position: relative; z-index: 30; width: min(640px, 100%); margin: 56px 0 0 4%; transform: rotate(1.4deg); }
.rec-wrap .tape { left: 44%; top: -13px; transform: rotate(-3deg); }
/* quadradinho de papel quadriculado com os projetos extras */
.extra-wrap { position: relative; z-index: 1; width: 320px; margin: 48px 6% 0 auto; transform: rotate(-2.2deg); }
.extra { aspect-ratio: 1; padding: 26px 26px 22px; display: flex; flex-direction: column; color: var(--ink);
  background: var(--noise), linear-gradient(#dfe7ef 1px, transparent 1px) 0 0 / 16px 16px, linear-gradient(90deg, #dfe7ef 1px, transparent 1px) 0 0 / 16px 16px, #fbfcfd; }
.extra h2 { font-size: 32px; line-height: 1; font-weight: 600; color: var(--pen); margin-bottom: 14px; }
.extra ul { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.extra li { position: relative; padding-left: 22px; font-size: 17px; line-height: 1.4; }
.extra li::before { content: "→"; position: absolute; left: 0; top: -5px; font-family: "Caveat", cursive; font-size: 22px; color: var(--pen); }
/* "vibe-coded!!!" do item dois: na borda direita do papel, centrado na altura do item, sem cobrir o texto */
.extra li .pow { position: absolute; left: calc(100% - 22px); top: 50%; margin: 0; translate: 0 -50%; z-index: 1; }
.extra-wrap .pin { position: absolute; left: 50%; top: -7px; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; z-index: 4;
  background: radial-gradient(circle at 35% 30%, #f08a74, var(--red) 55%, #8e3523); box-shadow: 0 3px 4px -1px rgba(0,0,0,.45); }
@media (min-width: 1000px) {
  #trabalho { margin-right: 6vw; max-width: 940px; }
  #trabalho .index-card { max-width: 940px; padding-right: 330px; }
}
/* tela larga: o registrador do LISHA fica à esquerda, menor e mais abaixo; a Wiidoo continua sendo a peça principal */
@media (min-width: 1200px) {
  #trabalho { display: grid; grid-template-columns: minmax(320px, 400px) minmax(0, 880px); column-gap: 44px; align-items: start;
    max-width: none; margin-left: 4vw; margin-right: 4vw; justify-content: end; }
  #trabalho .card-wrap { grid-column: 2; grid-row: 1; }
  #trabalho .index-card { max-width: 880px; padding-right: 300px; }
  #trabalho .rec-wrap { grid-column: 1; grid-row: 1 / span 2; width: auto; margin: 230px 0 0; transform: rotate(1.6deg); }
  #trabalho .extra-wrap { grid-column: 2; grid-row: 2; margin: 36px 0 0 8%; }
}


#pensamento { margin-left: 58vw; }
#pensamento .verso { display: block; }
#pensamento .autor { display: block; margin-top: 16px; text-align: right; font-size: 12px; letter-spacing: .08em; color: #8a7a4a; }

/* rodapé: pedra recortada + cartão-postal */
/* content-visibility: a pedra (400 KB) só baixa quando o rodapé chega perto, sem disputar com a primeira foto */
.rock { position: relative; height: 82vh; margin-top: 18vh; content-visibility: auto; contain-intrinsic-size: auto 82vh; }
.rock .stone { position: absolute; inset: 0; background: url(/fotos/0281.jpg) center top / cover no-repeat;
  background-image: image-set(url(/fotos/0281.avif) type("image/avif"), url(/fotos/0281.jpg) type("image/jpeg"));
  -webkit-mask: url(/fotos/0281-mascara.png) center top / cover no-repeat; mask: url(/fotos/0281-mascara.png) center top / cover no-repeat; }
.rock .rock-caption { position: absolute; bottom: 34px; } /* logo acima da legenda fixa do fundo, sem sobrepor */
/* preso pela base: o cartão nunca passa do fim da pedra */
.pc-drop { position: absolute; left: 7vw; bottom: 9vh; }
.postcard { position: relative; width: min(580px, 92vw); display: grid; grid-template-columns: 1fr 1px 1.4fr; gap: 24px; padding: 34px 24px 20px; background: var(--noise), #fbf6ea; transform: rotate(-1.2deg); }
.postcard .pc-head { position: absolute; left: 0; right: 0; top: 11px; text-align: center; font-size: 10.5px; letter-spacing: .32em; text-transform: uppercase; color: var(--muted); }
.postcard .msg { display: flex; flex-direction: column; justify-content: center; }
.postcard .msg p { font-size: 30px; line-height: 1.1; color: var(--pen); }
.postcard .msg .small { font-size: 23px; line-height: 1.2; color: var(--pencil); margin-top: 12px; transform: rotate(-2deg); transform-origin: 0 50%; }
.postcard .sep { position: relative; background: #cfc5b3; }
.postcard .sep span { position: absolute; left: 6px; bottom: 0; writing-mode: vertical-rl; transform: rotate(180deg); font-size: 9px; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); white-space: nowrap; }
.postcard .addr { position: relative; padding-top: 96px; }
.postcard .from { display: flex; flex-direction: column; font-style: normal; margin-bottom: 8px; }
.postcard .from .hand { font-size: 21px; line-height: 28px; white-space: nowrap; color: var(--pen); border-bottom: 1px solid #ddd3c1; padding-left: 2px; }
.postcard .from .k { font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.postcard .addr a { display: block; font-family: "Courier Prime", monospace; font-size: 14px; border-bottom: 1px solid #cfc5b3; padding: 6px 2px 3px; text-decoration: none; }
.postcard .addr a:hover { background: #fff0a8; }
/* carimbo do correio, em tinta: o filtro do SVG dá o borrado e as falhas */
.postmark { position: absolute; right: -10px; top: -12px; width: 186px; height: 93px; overflow: visible; transform: rotate(-8deg); mix-blend-mode: multiply; pointer-events: none; color: #3a3550; opacity: .78; }
.postmark .pm-wave, .postmark .pm-o, .postmark .pm-i, .postmark .pm-bar { fill: none; stroke: currentColor; }
.postmark .pm-wave { stroke-width: 1.7; }
.postmark .pm-o { stroke-width: 2.2; }
.postmark .pm-i { stroke-width: 1.1; }
.postmark .pm-bar { stroke-width: 1.4; }
.postmark text { fill: currentColor; font-family: "Courier Prime", monospace; font-weight: 700; text-anchor: middle; }
.postmark .pm-arc { font-size: 10.5px; letter-spacing: .22em; }
.postmark .pm-star { font-size: 9px; }
.postmark .pm-year { font-size: 17px; letter-spacing: .08em; }

@media (max-width: 700px) {
  .hero-drop { right: 7vw; }
  .scrap .mono { text-wrap: balance; } /* sem o "Labs" sozinho na linha */
  /* a pedra cresce com o cartão: ele fica embaixo e o topo dela aparece acima */
  .rock { height: auto; min-height: 82vh; padding: 32vh 4vw 9vh; contain-intrinsic-size: auto 120vh; }
  .pc-drop { position: relative; left: auto; bottom: auto; }
  #sobre, #trabalho, #pensamento { margin-left: 12px; margin-right: 12px; max-width: none; transform: none; }
  .rec-wrap { margin: 40px 0 0; transform: none; }
  .extra-wrap { width: auto; max-width: 360px; margin: 40px auto 0; }
  .extra { aspect-ratio: auto; }
  .extra li .pow { position: static; translate: none; margin: -4px 0 -14px 6px; }
  .postcard { grid-template-columns: 1fr; }
  .postcard .sep { display: none; }
  .postcard .from .hand { white-space: normal; }
  #pensamento > .drop { margin: 0 auto; }
}
</style>
