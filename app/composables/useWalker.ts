/**
 * Estado compartilhado do bonequinho: qualquer parte da página pode pedir
 * para ele falar, e o fundo avisa quando ele está "fotografando" (íris).
 */
export function useWalker() {
  const speech = useState('walker-speech', () => ({ text: '', ms: 1800, id: 0 }))
  const shooting = useState('walker-shooting', () => false)
  const flashes = useState('walker-flashes', () => 0)
  const secrets = useState('walker-secrets', () => 0)

  const say = (text: string, ms = 1800) => {
    speech.value = { text, ms, id: speech.value.id + 1 }
  }
  const flash = () => {
    flashes.value++
  }

  /** easter egg: pede ao fundo a foto secreta (clique na câmera do varal) */
  const secret = () => {
    secrets.value++
  }

  return { speech, shooting, flashes, secrets, say, flash, secret }
}
