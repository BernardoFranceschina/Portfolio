/**
* Fotos do varal, na ordem em que aparecem (da esquerda para a direita).
 *
 * - id: número da foto (o DSCN do arquivo). A original fica em public/fotos/<id>.jpg; a miniatura e as
 *   versões AVIF são geradas com `npm run fotos`.
 * - legenda: o que vai escrito à mão embaixo da foto.
 * - fala: o que o bonequinho diz quando o mouse passa na foto. Sem fala, ele usa uma das DICAS.
 */
export type FotoVaral = { id: string, legenda: string, fala?: string }

export const FOTOS: FotoVaral[] = [
  { id: '1027', legenda: 'bixo bonito' },
  { id: '0294', legenda: 'pedra equilibrista', fala: 'como ela não cai?' },
  { id: '0736', legenda: 'costão' },
  { id: '0667', legenda: 'praia cheia?' },
  { id: '1009', legenda: 'bora pra costa' },
  { id: '0870', legenda: 'nuvem carregada', fala: 'vai chover…' },
  { id: '0427', legenda: 'pedras' },
  { id: '1048', legenda: 'secando as asas', fala: 'será que passou protetor solar?' },
  { id: '0037', legenda: 'placa-mãe', fala: 'por dentro dos chipss' },
  { id: '0984', legenda: 'sombra boa' },
  { id: '1103', legenda: 'beco da lua' },
  { id: '0476', legenda: 'fim de tarde' },
  { id: '0057', legenda: 'bares noturnos' },
  { id: '1045', legenda: 'arco-íris' },
  { id: '0393', legenda: 'natural city life' },
]

export const DICAS = ['clica pra ver grande', 'essa é boa', 'arrasta pro lado', 'eu que tirei essa']

export const FALAS = {
  chegou: 'eii, olha o varal ↑', // quando o varal aparece na tela pela primeira vez
  ampliou: 'bonita né?', // na primeira foto ampliada
}

/**
 * Easter egg: clicando na foto da câmera (no (i) "a câmera" do varal), o bonequinho tira esta foto e ela vira o fundo até a próxima rolagem.
 * Use uma foto que não apareça em nenhum outro lugar do site (original em public/fotos/<id>.jpg).
 */
export const FOTO_SECRETA = { id: '0761', fala: 'essa não tá no varal' }
