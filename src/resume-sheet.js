import { GlobalWorkerOptions, TextLayer, getDocument } from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerSrc

// Draws the first page into `host` at its current width: a canvas, a selectable text layer, and real links.
export async function renderSheet(url, host) {
  const task = getDocument({ url })
  const doc = await task.promise
  try {
    const page = await doc.getPage(1)
    const scale = host.clientWidth / page.getViewport({ scale: 1 }).width
    const viewport = page.getViewport({ scale })
    const ratio = Math.min(window.devicePixelRatio || 1, 3)

    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(viewport.width * ratio)
    canvas.height = Math.floor(viewport.height * ratio)
    await page.render({
      canvas,
      viewport,
      transform: ratio === 1 ? null : [ratio, 0, 0, ratio, 0, 0],
    }).promise

    const text = document.createElement('div')
    text.className = 'textLayer'
    text.style.setProperty('--total-scale-factor', scale)
    await new TextLayer({ textContentSource: page.streamTextContent(), container: text, viewport }).render()

    const links = document.createElement('div')
    links.className = 'sheet-links'
    for (const note of await page.getAnnotations()) {
      if (note.subtype !== 'Link' || !note.url) continue
      const [x1, y1] = viewport.convertToViewportPoint(note.rect[0], note.rect[1])
      const [x2, y2] = viewport.convertToViewportPoint(note.rect[2], note.rect[3])
      const a = document.createElement('a')
      a.href = note.url
      a.target = '_blank'
      a.rel = 'noreferrer'
      a.setAttribute('aria-label', note.url.replace(/^mailto:/, ''))
      Object.assign(a.style, {
        left: `${Math.min(x1, x2)}px`,
        top: `${Math.min(y1, y2)}px`,
        width: `${Math.abs(x2 - x1)}px`,
        height: `${Math.abs(y2 - y1)}px`,
      })
      links.append(a)
    }

    host.replaceChildren(canvas, text, links)
  } finally {
    task.destroy()
  }
}
