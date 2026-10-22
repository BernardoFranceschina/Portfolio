/**
 * Easter eggs do bonequinho. Clicando nele várias vezes seguidas, acontece um destes, sorteado
 * (primeiro os que a pessoa ainda não viu). A foto secreta do fundo fica escondida em outro lugar:
 * na foto da câmera, dentro do (i) "a câmera" do varal (ver FOTO_SECRETA em varal.ts).
 */

/** Quantos cliques seguidos (menos de 1,5 s entre um e outro) até acontecer algo. */
export const CLIQUES = 7

/**
 * Selfie: a polaroid que cai depois do flash, com uma foto de verdade do meu rosto.
 * `foto` é o nome do arquivo em public/fotos sem o .jpg (ex.: 'eu' para public/fotos/eu.jpg; depois `npm run fotos`).
 * Sem `foto`, esse easter egg fica de fora do sorteio.
 */
export const SELFIE: { foto?: string, legenda: string, fala: string } = {
  // foto: 'eu',
  legenda: 'selfie',
  fala: 'saiu bem?',
}

/** Troca de suéter: cores que ele pode vestir (a primeira é a de sempre). */
export const SUETERES = [
  { nome: 'vinho', cor: '#8c2a30', claro: '#a23a40', escuro: '#74212a', costas: '#7e252b', costasEscuro: '#6a1d24' },
  { nome: 'verde', cor: '#4f6b3a', claro: '#62804a', escuro: '#3e5530', costas: '#47612f', costasEscuro: '#374b28' },
  { nome: 'azul', cor: '#2f4a6e', claro: '#3f5d85', escuro: '#243a57', costas: '#2a4263', costasEscuro: '#1f334c' },
  { nome: 'mostarda', cor: '#c9962a', claro: '#dcab45', escuro: '#a87b1f', costas: '#b88824', costasEscuro: '#926a1a' },
  { nome: 'cinza', cor: '#7d8186', claro: '#92969b', escuro: '#65696e', costas: '#73777c', costasEscuro: '#5a5e63' },
]

/** Ele cansa: senta de braços cruzados e só levanta quando a pessoa rola a página. */
export const CANSOU = { senta: 'cansei.', levanta: 'tá bom, tá bom' }

/** Aviso no penúltimo clique. */
export const QUASE = 'mais um e eu…'
