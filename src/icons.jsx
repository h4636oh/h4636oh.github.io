import { Cloud } from 'lucide-react'
import {
  siCplusplus,
  siDart,
  siDocker,
  siFastapi,
  siFigma,
  siFlutter,
  siFreebsd,
  siGit,
  siGithub,
  siGnubash,
  siInstagram,
  siJavascript,
  siKotlin,
  siLeetcode,
  siLinux,
  siMastodon,
  siMongodb,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siQt,
  siRay,
  siReact,
  siSpotify,
  siSqlite,
  siVite,
} from 'simple-icons'

// LinkedIn is not in simple-icons (trademark); keep the official mark path.
const BRANDS = {
  github: siGithub.path,
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  leetcode: siLeetcode.path,
  mastodon: siMastodon.path,
  instagram: siInstagram.path,
  spotify: siSpotify.path,
}

export function Brand({ id, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d={BRANDS[id]} />
    </svg>
  )
}

const TECH = Object.fromEntries(
  [
    siCplusplus, siDart, siDocker, siFastapi, siFigma, siFlutter, siFreebsd, siGit, siGnubash, siJavascript, siKotlin,
    siLinux, siMongodb, siMysql, siNextdotjs, siOpenjdk, siPostgresql, siPython, siQt, siRay, siReact, siSqlite, siVite,
  ].map((icon) => [icon.slug, icon]),
)

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((at) => parseInt(hex.slice(at, at + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Brand colours that are near-black or near-white vanish on one of the themes, so those fall back to the column tone.
function techColor(id) {
  const hex = TECH[id]?.hex
  if (!hex) return undefined
  const light = luminance(hex)
  return light > 0.12 && light < 0.62 ? `#${hex}` : undefined
}

export function Tech({ id, size = 18 }) {
  if (!TECH[id]) return <Cloud size={size} strokeWidth={1.75} aria-hidden="true" />
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor" style={{ '--brand': techColor(id) }}>
      <path d={TECH[id].path} />
    </svg>
  )
}
