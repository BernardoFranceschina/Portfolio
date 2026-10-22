// Gera as versões leves das fotos em public/fotos (rode `npm run fotos` depois de adicionar uma foto).
// As originais .jpg ficam intactas e servem de reserva para navegador sem AVIF.
//   <id>.avif        a foto inteira, no tamanho original
//   <id>-1280.avif   até 1280px de largura, para telas menores
//   varal/<id>.jpg   miniatura do varal (480px), para as fotos listadas em FOTOS (app/data/varal.ts)
//   varal/<id>.avif  a mesma miniatura em AVIF
//   app/data/fotos.json  a largura real de cada original (o <Foto> monta o srcset com ela)
// Só refaz o que falta ou o que ficou mais velho que a original.
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const dir = `${root}public/fotos`
// q50 no AVIF: testado no céu (sem faixas) e na água (sem perder textura); ~76% menor que o JPG
const AVIF = { quality: 50, effort: 6 }
const MINI = 480

const fresh = (out, src) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs
let made = 0
async function make(src, out, pipeline) {
  if (fresh(out, src)) return
  await pipeline(sharp(src).rotate()).toFile(out)
  made++
  console.log('criada:', out.slice(root.length))
}

// só o bloco FOTOS (a FOTO_SECRETA, no fim do arquivo, não vai para o varal)
const varalTs = readFileSync(`${root}app/data/varal.ts`, 'utf8')
const bloco = varalTs.slice(varalTs.indexOf('export const FOTOS'), varalTs.indexOf('\n]', varalTs.indexOf('export const FOTOS')))
const noVaral = [...bloco.matchAll(/id: '([^']+)'/g)].map(m => m[1])

mkdirSync(`${dir}/varal`, { recursive: true })
const larguras = {}
for (const f of readdirSync(dir).filter(f => f.endsWith('.jpg')).sort()) {
  const id = f.slice(0, -4), src = `${dir}/${f}`
  const { width, height, orientation } = await sharp(src).metadata()
  larguras[id] = (orientation ?? 1) >= 5 ? height : width // fotos de pé (EXIF 5–8) giram no .rotate()
  await make(src, `${dir}/${id}.avif`, s => s.avif(AVIF))
  await make(src, `${dir}/${id}-1280.avif`, s => s.resize({ width: 1280, withoutEnlargement: true }).avif(AVIF))
  if (noVaral.includes(id)) {
    await make(src, `${dir}/varal/${id}.jpg`, s => s.resize({ width: MINI }).jpeg({ quality: 78, mozjpeg: true }))
    await make(src, `${dir}/varal/${id}.avif`, s => s.resize({ width: MINI }).avif({ ...AVIF, quality: 55 }))
  }
}
writeFileSync(`${root}app/data/fotos.json`, `${JSON.stringify(larguras, null, 2)}\n`)
for (const id of noVaral) if (!existsSync(`${dir}/${id}.jpg`)) console.log(`falta a original: public/fotos/${id}.jpg`)
console.log(made ? `${made} arquivo(s) gerado(s).` : 'nada para gerar: tudo em dia.')
