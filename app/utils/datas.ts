/** Data dos textos do caderno ("2026-10-20" → "20 out 2026"), igual na home e na página do texto. */
export const dataCurta = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ de /g, ' ').replace('.', '')
