/** Rough bandwidth budget from the Network Information API (Chromium). */
export function isSlowNet() {
  const c = navigator.connection
  if (!c) return false
  if (c.saveData) return true
  if (c.effectiveType === 'slow-2g' || c.effectiveType === '2g') return true
  if (c.effectiveType === '3g') return true
  if (typeof c.downlink === 'number' && c.downlink > 0 && c.downlink < 1.5) return true
  return false
}

/** Highest desk-* step worth fetching for the current viewport + connection. */
export function sceneCap() {
  const steps = [64, 640, 1280, 1920, 2880]
  const c = navigator.connection
  let maxW = 2880
  if (c?.saveData || c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g') maxW = 640
  else if (c?.effectiveType === '3g' || (typeof c?.downlink === 'number' && c.downlink > 0 && c.downlink < 1.5)) {
    maxW = 1280
  } else {
    const need = Math.ceil((window.innerWidth || 1280) * Math.min(window.devicePixelRatio || 1, 2))
    maxW = need <= 640 ? 640 : need <= 1280 ? 1280 : need <= 1920 ? 1920 : 2880
  }
  let cap = 0
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] <= maxW) cap = i
  }
  return cap
}
