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
  { id: '1027', legenda: 'garça' },
  { id: '0294', legenda: 'pedra equilibrista', fala: 'como ela não cai?' },
  { id: '1009', legenda: 'barquinhos' },
  { id: '1045', legenda: 'arco-íris', fala: 'teve arco-íris!' },
  { id: '0667', legenda: 'praia cheia' },
  { id: '0870', legenda: 'nuvem carregada', fala: 'vai chover…' },
  { id: '1048', legenda: 'biguá', fala: 'secando as asas' },
  { id: '0984', legenda: 'sombra boa' },
  { id: '0476', legenda: 'fim de tarde' },
  { id: '0736', legenda: 'costão' },
  { id: '1103', legenda: 'duna' },
  { id: '0057', legenda: 'prédio vermelho' },
  { id: '0393', legenda: 'reflexo' },
  { id: '0427', legenda: 'pedras' },
  { id: '0037', legenda: 'placa-mãe', fala: 'por dentro do notebook' },
]

/** Falas genéricas, em rodízio, para as fotos sem `fala`. */
export const DICAS = ['clica pra ver grande', 'olha esse azul', 'essa é boa', 'arrasta pro lado']

/** Outras falas do bonequinho no varal. */
export const FALAS = {
  chegou: 'psiu, olha o varal ↑', // quando o varal aparece na tela pela primeira vez
  ampliou: 'bonita né?', // na primeira foto ampliada
}

/**
 * Easter egg: clicando na foto da câmera (no (i) "a câmera" do varal), o bonequinho tira esta foto e ela vira o fundo até a próxima rolagem.
 * Use uma foto que não apareça em nenhum outro lugar do site (original em public/fotos/<id>.jpg).
 */
export const FOTO_SECRETA = { id: '0761', fala: 'essa não tá no varal' }
