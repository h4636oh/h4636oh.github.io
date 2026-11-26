import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Briefcase,
  Check,
  Copy,
  Download,
  FolderGit2,
  House,
  Layers,
  Mail,
  Menu,
  PenLine,
  Server,
  Trophy,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { Mark } from './Mark.jsx'
import {
  about,
  achievements,
  blogs,
  career,
  email,
  facts,
  home as homeCopy,
  pages,
  projectImages,
  projectOrder,
  projectSentences,
  site,
  skills,
  socials,
  span,
  spotifyProfile,
} from './content/site'
import { Brand, Tech } from './icons'
import { isSlowNet, sceneCap } from './net'
import { ORDER, hrefFor, parsePath, sameRoute, sectionOf } from './route'
import { applySeo } from './seo'

const NAV = [
  ['home', 'Home', House],
  ['about', 'About Me', User],
  ['skills', 'Skills', Wrench],
  ['career', 'Career', Briefcase],
  ['projects', 'Projects', FolderGit2],
  ['achievements', 'Achievements', Trophy],
  ['blogs', 'Blogs', PenLine],
  ['contact', 'Contact Me', Mail],
]

const EXIT_MS = 260

const SCENE_STEPS = [64, 640, 1280, 1920, 2880]

function SceneImg({ kind, className, active = true }) {
  const [step, setStep] = useState(0)
  const cap = sceneCap()
  const src = `/desk-${kind}-${SCENE_STEPS[Math.min(step, cap)]}.webp`

  useEffect(() => {
    if (!active || step >= cap) return
    let alive = true
    const next = new Image()
    next.src = `/desk-${kind}-${SCENE_STEPS[step + 1]}.webp`
    next.onload = () => {
      if (alive) setStep((n) => n + 1)
    }
    return () => {
      alive = false
      next.onload = null
    }
  }, [kind, step, cap, active])

  return (
    <img
      className={`${className}${step === 0 ? ' is-soft' : ''}`}
      src={src}
      alt=""
      decoding="async"
      fetchPriority={kind === 'day' && active ? 'high' : 'low'}
      loading={kind === 'day' ? 'eager' : 'lazy'}
    />
  )
}

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function directionFor(from, to) {
  const delta = ORDER.indexOf(sectionOf(to)) - ORDER.indexOf(sectionOf(from))
  if (delta) return Math.sign(delta)
  return to.page === 'blog' ? 1 : -1
}

export default function App() {
  const [shown, setShown] = useState(() => parsePath())
  const [phase, setPhase] = useState('enter')
  const [dir, setDir] = useState(1)
  const [sheet, setSheet] = useState(false)
  const timer = useRef(0)
  const heading = useRef(null)
  const shownRef = useRef(shown)
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const mainRef = useRef(null)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  function toggleTheme(origin) {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        next === 'dark' ? site.themeColor.dark : site.themeColor.light,
      )
      localStorage.setItem('theme', next)
      setTheme(next)
    }
    if (!document.startViewTransition || reduceMotion()) return apply()
    const box = origin.getBoundingClientRect()
    const x = box.left + box.width / 2
    const y = box.top + box.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  function go(next, push) {
    const from = shownRef.current
    if (sameRoute(from, next)) return
    const commit = () => {
      push?.()
      shownRef.current = next
      setShown(next)
      setPhase('enter')
      if (mainRef.current) mainRef.current.scrollTop = 0
    }
    window.clearTimeout(timer.current)
    setDir(directionFor(from, next))
    if (reduceMotion()) return commit()
    setPhase('exit')
    timer.current = window.setTimeout(commit, EXIT_MS)
  }

  function navigate(href, { replace = false, motion = true } = {}) {
    setSheet(false)
    const next = parsePath(new URL(href, window.location.origin).pathname)
    if (sameRoute(shownRef.current, next)) return
    const push = () => window.history[replace ? 'replaceState' : 'pushState']({}, '', href)
    if (!motion) {
      push()
      shownRef.current = next
      setShown(next)
      return
    }
    go(next, push)
  }

  useEffect(() => {
    const onPop = () => go(parsePath())
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    applySeo(shown)
    if (phase === 'enter' && shown.page !== 'home') heading.current?.focus({ preventScroll: true })
  }, [shown, phase])

  useEffect(() => {
    if (!sheet) return
    const onKey = (event) => event.key === 'Escape' && setSheet(false)
    const onResize = () => window.innerWidth > 1100 && setSheet(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [sheet])

  const section = sectionOf(shown)

  useLayoutEffect(() => {
    function place() {
      const pill = pillRef.current
      const active = navRef.current?.querySelector(`[data-id="${section}"]`)
      if (!pill) return
      if (!active || window.innerWidth <= 1100) {
        pill.style.opacity = '0'
        return
      }
      pill.style.opacity = '1'
      pill.style.width = `${active.offsetWidth}px`
      pill.style.transform = `translateX(${active.offsetLeft}px)`
    }
    place()
    document.fonts?.ready.then(place)
    const observer = new ResizeObserver(place)
    if (navRef.current) observer.observe(navRef.current)
    window.addEventListener('resize', place)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', place)
    }
  }, [section])

  const link = (href) => (event) => clickLink(event, () => navigate(href))

  return (
    <div className="shell">
      <header className={`nav${shown.page === 'home' ? ' is-home' : ''}`}>
        <Mark className="nav-mark" />
        <button
          type="button"
          className="menu"
          aria-expanded={sheet}
          aria-controls="site-nav"
          aria-label={sheet ? 'Close menu' : 'Open menu'}
          onClick={() => setSheet((open) => !open)}
        >
          {sheet ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span className="nav-current">
          {sheet ? 'Menu' : shown.page === 'home' ? 'Home' : pages[shown.page]?.title || 'Menu'}
        </span>
        <div className="nav-tools">
          <LightSwitch dark={theme === 'dark'} onToggle={toggleTheme} />
        </div>
        <nav id="site-nav" ref={navRef} className={sheet ? 'links is-open' : 'links'} aria-label="Pages">
          <span ref={pillRef} className="pill" aria-hidden="true" />
          {NAV.map(([id, label, Icon]) => (
            <a
              key={id}
              data-id={id}
              href={id === 'home' ? '/' : `/${id}`}
              aria-current={section === id ? 'page' : undefined}
              onClick={link(id === 'home' ? '/' : `/${id}`)}
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main
        ref={mainRef}
        inert={sheet}
        className={`stage${shown.page === 'home' ? ' is-home' : ''} is-${phase}${sheet ? ' is-held' : ''}`}
        style={{ '--dir': dir }}
      >
        <Page shown={shown} navigate={navigate} headingRef={heading} link={link} />
      </main>

      <Cursor />
    </div>
  )
}

const CURSOR_STATES = [
  ['grab', '.switch'],
  ['pointer', '.resume a[target="_blank"]'],
  ['external', 'a[target="_blank"]'],
  ['pointer', 'a, button, [role="button"], .card:not(.is-active)'],
  ['text', 'p, h1, h2, h3, li, input, textarea, .textLayer span'],
]

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const root = document.documentElement
    const dot = dotRef.current
    const ring = ringRef.current
    const canvas = trailRef.current
    const ctx = canvas.getContext('2d')
    const at = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    const points = []
    let frame = 0
    root.classList.add('has-cursor')

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    function marker() {
      return getComputedStyle(root).getPropertyValue('--ink').trim() || '#262223'
    }

    function loop(now) {
      const ease = reduceMotion() ? 1 : 0.2
      lag.x += (at.x - lag.x) * ease
      lag.y += (at.y - lag.y) * ease
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!reduceMotion()) {
        while (points.length && now - points[0].t > 420) points.shift()
        if (points.length > 1) {
          ctx.globalAlpha = 1
          ctx.strokeStyle = marker()
          ctx.lineWidth = 10
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.beginPath()
          ctx.moveTo(points[0].x, points[0].y)
          for (let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2
            const midY = (points[i].y + points[i + 1].y) / 2
            ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY)
          }
          const last = points[points.length - 1]
          ctx.lineTo(last.x, last.y)
          ctx.stroke()
        }
      }

      const moving = Math.abs(at.x - lag.x) + Math.abs(at.y - lag.y) > 0.1 || points.length > 1
      frame = moving ? requestAnimationFrame(loop) : 0
    }

    function onMove(event) {
      if (event.pointerType !== 'mouse') return
      at.x = event.clientX
      at.y = event.clientY
      dot.style.transform = `translate3d(${at.x}px, ${at.y}px, 0)`
      const state = CURSOR_STATES.find(([, selector]) => event.target.closest?.(selector))?.[0] ?? 'default'
      ring.dataset.state = state
      dot.dataset.state = state
      ring.classList.add('is-on')
      dot.classList.add('is-on')

      if (!reduceMotion()) {
        const prev = points[points.length - 1]
        if (!prev || Math.hypot(at.x - prev.x, at.y - prev.y) > 1.5) {
          points.push({ x: at.x, y: at.y, t: performance.now() })
          if (points.length > 64) points.shift()
        }
      }

      if (!frame) frame = requestAnimationFrame(loop)
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')
    function onLeave() {
      ring.classList.remove('is-on')
      dot.classList.remove('is-on')
      points.length = 0
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('resize', size)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', size)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <canvas ref={trailRef} className="cursor-trail" aria-hidden="true" />
      <span ref={ringRef} className="cursor-ring" aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={2} />
      </span>
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

// The rocker angle runs from -1 (down, off) to 1 (up, on) and bounces off the end stops.
function LightSwitch({ dark, onToggle }) {
  const ref = useRef(null)
  const sim = useRef({ a: dark ? -1 : 1, v: 0, target: dark ? -1 : 1, drag: null, raf: 0, last: 0 })
  const toggleRef = useRef(onToggle)

  useEffect(() => {
    toggleRef.current = onToggle
  })

  function draw() {
    ref.current.style.setProperty('--a', sim.current.a.toFixed(3))
  }

  function clack(speed) {
    if (speed < 1.5) return
    const kick = Math.min(speed / 6, 1.6) * sim.current.target
    ref.current.animate(
      [{ transform: 'translateY(0)' }, { transform: `translateY(${-kick}px)` }, { transform: 'translateY(0)' }],
      { duration: 160, easing: 'ease-out' },
    )
  }

  function frame(now) {
    const s = sim.current
    const dt = Math.min((now - s.last) / 1000, 1 / 30)
    s.last = now
    if (!s.drag) {
      s.v += (-420 * (s.a - s.target) - 7 * s.v) * dt
      s.a += s.v * dt
      if (Math.abs(s.a) > 1) {
        clack(Math.abs(s.v))
        s.a = Math.sign(s.a)
        s.v *= -0.32
      }
    }
    draw()
    if (!s.drag && Math.abs(s.a - s.target) < 0.002 && Math.abs(s.v) < 0.05) {
      Object.assign(s, { a: s.target, v: 0, raf: 0 })
      draw()
      return
    }
    s.raf = requestAnimationFrame(frame)
  }

  function run() {
    const s = sim.current
    if (s.raf) return
    s.last = performance.now()
    s.raf = requestAnimationFrame(frame)
  }

  function flip() {
    const s = sim.current
    s.target = -s.target
    s.drag = null
    if (reduceMotion()) {
      s.a = s.target
      draw()
    } else {
      s.v += s.target * 6
      run()
    }
    toggleRef.current(ref.current)
  }

  useEffect(() => {
    const s = sim.current
    draw()
    return () => {
      cancelAnimationFrame(s.raf)
      s.raf = 0
    }
  }, [])

  function onPointerDown(event) {
    if (event.button !== 0 || reduceMotion()) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const s = sim.current
    s.drag = { py: event.clientY, a: s.a, moved: 0 }
    s.v = 0
    run()
  }

  function onPointerMove(event) {
    const s = sim.current
    const d = s.drag
    if (!d) return
    const dy = event.clientY - d.py
    d.moved = Math.max(d.moved, Math.abs(dy))
    s.a = Math.max(-1, Math.min(1, d.a - dy / 12))
    if (Math.sign(s.a) === -s.target && Math.abs(s.a) > 0.08) flip()
  }

  function onPointerUp() {
    const s = sim.current
    const d = s.drag
    if (!d) return
    s.drag = null
    if (d.moved < 4) flip()
    else run()
  }

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      className="switch"
      aria-checked={!dark}
      aria-label="Lights"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(event) => {
        if (event.detail === 0) flip()
      }}
    >
      <span className="switch-rocker" aria-hidden="true">
        <i className="switch-i" />
        <i className="switch-o" />
      </span>
    </button>
  )
}

function clickLink(event, run) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  run()
}

function track(event) {
  const el = event.currentTarget
  const box = el.getBoundingClientRect()
  const x = event.clientX - box.left
  const y = event.clientY - box.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  el.style.setProperty('--rx', (x / box.width - 0.5).toFixed(3))
  el.style.setProperty('--ry', (y / box.height - 0.5).toFixed(3))
}

function untrack(event) {
  event.currentTarget.style.setProperty('--rx', 0)
  event.currentTarget.style.setProperty('--ry', 0)
}

function Page({ shown, navigate, headingRef, link }) {
  const props = { headingRef, link }
  switch (shown.page) {
    case 'home':
      return <Home link={link} />
    case 'about':
      return <About {...props} />
    case 'skills':
      return <Skills {...props} />
    case 'career':
      return <Career {...props} />
    case 'projects':
      return <Projects {...props} id={shown.id} onSlide={(href) => navigate(href, { replace: true, motion: false })} />
    case 'achievements':
      return <Achievements {...props} />
    case 'blogs':
      return <Blogs {...props} />
    case 'blog':
      return <Blog {...props} id={shown.id} />
    case 'contact':
      return <Contact {...props} />
    default:
      return <Missing {...props} />
  }
}

function Title({ headingRef, children }) {
  return (
    <h1 ref={headingRef} tabIndex={-1}>
      {children}
    </h1>
  )
}

// shortcut: playlists come through jina.ai reader (CORS), swap if Spotify blocks it
async function fetchSpotifyPlaylists(profileUrl) {
  const key = `spotify-pls:${profileUrl}`
  try {
    const hit = sessionStorage.getItem(key)
    if (hit) return JSON.parse(hit)
  } catch { /* ignore */ }

  const res = await fetch(`https://r.jina.ai/${profileUrl}`)
  if (!res.ok) throw new Error('spotify profile fetch failed')
  const text = await res.text()
  const seen = new Set()
  const list = []
  const re =
    /!\[[^\]]*\]\((https:\/\/[^)]+)\)\s*\n+\[([^\]]+)\]\((https:\/\/open\.spotify\.com\/playlist\/[A-Za-z0-9]+)\)/g
  for (const match of text.matchAll(re)) {
    const url = match[3]
    if (seen.has(url)) continue
    seen.add(url)
    list.push({ cover: match[1], title: match[2].trim(), url })
  }
  if (!list.length) throw new Error('no playlists parsed')
  try {
    sessionStorage.setItem(key, JSON.stringify(list))
  } catch { /* ignore */ }
  return list
}

function pickPlaylist(list, avoid) {
  if (list.length === 1) return list[0]
  let next = list[Math.floor(Math.random() * list.length)]
  while (avoid && next.url === avoid.url) next = list[Math.floor(Math.random() * list.length)]
  return next
}

function Home({ link }) {
  const name = [site.givenName, site.familyName]
  let letter = 0
  const [playlist, setPlaylist] = useState(null)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme || 'light')
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (isSlowNet()) return
    let alive = true
    let timer = 0
    let pool = []

    fetchSpotifyPlaylists(spotifyProfile)
      .then((list) => {
        if (!alive || !list.length) return
        pool = list
        setPlaylist(pickPlaylist(list))
        timer = window.setInterval(() => {
          setPlaylist((current) => pickPlaylist(pool, current))
        }, 14000)
      })
      .catch(() => {})

    return () => {
      alive = false
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="home">
      <div className="scene" aria-hidden="true">
        <SceneImg kind="day" className="scene-day" active={theme !== 'dark'} />
        <SceneImg kind="night" className="scene-night" active={theme === 'dark'} />
      </div>
      <section className="hero">
        <p className="hero-tag rise" style={{ '--d': 0 }}>
          {homeCopy.tag}
        </p>
        <h1 className="hero-name" aria-label={name.join(' ')}>
          {name.map((word) => (
            <span className="word" key={word} aria-hidden="true">
              {[...word].map((char) => (
                <span className="char" key={letter} style={{ '--i': letter++ }}>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-line rise" style={{ '--d': 5 }}>
          {homeCopy.line}
        </p>
        <p className="hero-sub rise" style={{ '--d': 6 }}>
          {homeCopy.sub}
        </p>
        <div className="cta rise" style={{ '--d': 7 }}>
          <a className="button primary" href="/projects" onClick={link('/projects')}>
            {homeCopy.ctaPrimary}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href="/contact" onClick={link('/contact')}>
            <Mail size={18} aria-hidden="true" />
            {homeCopy.ctaSecondary}
          </a>
        </div>
      </section>
      {playlist && (
        <a
          className="spotify-art rise"
          style={{ '--d': 8 }}
          href={playlist.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Listen to ${playlist.title} on Spotify`}
        >
          <img key={playlist.url} src={playlist.cover} alt="" width={640} height={640} decoding="async" />
          <span className="spotify-art-meta">
            <Brand id="spotify" size={16} />
            {playlist.title}
          </span>
        </a>
      )}
    </div>
  )
}

function About({ headingRef }) {
  const school = facts.school
  return (
    <article className="page">
      <div className="about-grid">
        <div className="about-copy">
          <Title headingRef={headingRef}>Let me introduce myself.</Title>
          <p className="prose pull">
            <span className="mark">{about}</span>
          </p>
          <section className="school">
            <h3>My studies</h3>
            <p className="school-name">{school.title}</p>
            <p className="meta">
              {school.place} · {school.detail} · {span(school)}
            </p>
          </section>
        </div>
        <div className="resume-col">
          <h2>Here is my resume</h2>
          <Resume />
        </div>
      </div>
    </article>
  )
}

const RESUME = site.resumePath
const RESUME_NAME = site.resumeFile

function Resume() {
  const [open, setOpen] = useState(false)

  const read = (event) => {
    event.preventDefault()
    setOpen(true)
  }

  return (
    <div className="resume">
      <a className="resume-paper" href={RESUME} target="_blank" rel="noreferrer" onClick={read}>
        <img src="/resume-preview.webp" alt="First page of my resume" width="640" height="905" />
        <span className="resume-hint">
          <BookOpen size={16} aria-hidden="true" />
          Read it here
        </span>
      </a>
      <div className="resume-actions">
        <a className="button" href={RESUME} target="_blank" rel="noreferrer" onClick={read}>
          <BookOpen size={16} aria-hidden="true" />
          Read
        </a>
        <a className="button primary" href={RESUME} download={RESUME_NAME}>
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
      </div>
      {open && <Reader setOpen={setOpen} />}
    </div>
  )
}

function Reader({ setOpen }) {
  const sheetRef = useRef(null)
  const closeRef = useRef(null)
  const [state, setState] = useState('loading')
  const close = () => setOpen(false)
  const outside = (event) => event.target === event.currentTarget && close()

  useEffect(() => {
    const root = document.getElementById('root')
    const back = document.activeElement
    root.inert = true
    document.documentElement.classList.add('is-reading')
    closeRef.current.focus()
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    let live = true
    import('./resume-sheet')
      .then(({ renderSheet }) => live && renderSheet(RESUME, sheetRef.current))
      .then(() => live && setState('ready'))
      .catch(() => live && setState('failed'))
    return () => {
      live = false
      root.inert = false
      document.documentElement.classList.remove('is-reading')
      window.removeEventListener('keydown', onKey)
      back?.focus()
    }
  }, [setOpen])

  return createPortal(
    <div className="reader" role="dialog" aria-modal="true" aria-label="My resume" onClick={outside}>
      <div className="reader-bar">
        <p className="reader-title">My resume</p>
        <a className="button primary" href={RESUME} download={RESUME_NAME}>
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
        <button ref={closeRef} className="icon-button" type="button" aria-label="Close" onClick={close}>
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="reader-scroll" onClick={outside}>
        <div ref={sheetRef} className={`sheet is-${state}`}>
          <img src="/resume-preview.webp" alt="" />
        </div>
        {state === 'failed' && (
          <p className="reader-note">
            The reader couldn’t load.{' '}
            <a className="text-link" href={RESUME} target="_blank" rel="noreferrer">
              Open the PDF instead
            </a>
          </p>
        )}
      </div>
    </div>,
    document.body,
  )
}

const SKILL_ICONS = { languages: Braces, frameworks: Layers, infra: Server }

function Skills({ headingRef }) {
  return (
    <article className="page">
      <Title headingRef={headingRef}>Here&rsquo;s what I work with.</Title>
      <div className="stacks">
        {skills.map((group, column) => {
          const Icon = SKILL_ICONS[group.id]
          return (
            <section key={group.id} className={`stack tone-${group.mark} rise`} style={{ '--d': column + 2 }}>
              <header className="stack-head">
                <span className="stack-icon">
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <h2>{group.label}</h2>
              </header>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="tech-icon">
                      <Tech id={item.icon} size={17} />
                    </span>
                    <span className="tech-name">{item.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </article>
  )
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function monthIndex(label) {
  if (label === 'Present') {
    const now = new Date()
    return now.getFullYear() * 12 + now.getMonth()
  }
  const [month, year] = label.split(' ')
  return Number(year) * 12 + MONTHS.indexOf(month)
}

function duration(fact) {
  const months = monthIndex(fact.end) - monthIndex(fact.start) + 1
  if (months < 12) return `${months} mo`
  const years = Math.floor(months / 12)
  const rest = months % 12
  return rest ? `${years} yr ${rest} mo` : `${years} yr`
}

function Career({ headingRef }) {
  return (
    <article className="page">
      <Title headingRef={headingRef}>Here&rsquo;s where I&rsquo;ve worked.</Title>
      <ol className="timeline">
        {career.map((entry, index) => {
          const fact = facts[entry.id]
          const live = fact.end === 'Present'
          return (
            <li key={entry.id} className={live ? 'stop is-live rise' : 'stop rise'} style={{ '--d': index + 1 }}>
              <span className="node" aria-hidden="true" />
              <div className="entry" onPointerMove={track}>
                <div className="entry-head">
                  <div>
                    <h2>{fact.title}</h2>
                    <p className="company">
                      {fact.place}
                      <span>{fact.detail}</span>
                    </p>
                  </div>
                  <div className="entry-when">
                    <p className="when">{span(fact)}</p>
                    <p className="length">
                      {live ? <span className="live-dot" aria-hidden="true" /> : null}
                      {live ? `Now · ${duration(fact)}` : duration(fact)}
                    </p>
                  </div>
                </div>
                {entry.label ? <p className="badge">{entry.label}</p> : null}
                <p className="body">{entry.sentence}</p>
                {fact.tech.length ? (
                  <ul className="tags">
                    {fact.tech.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

const TONES = ['copper']

function Projects({ headingRef, id, onSlide }) {
  const found = projectOrder.indexOf(id)
  const index = found >= 0 ? found : 0
  const total = projectOrder.length
  const loop = total > 1
  const copies = 7
  const origin = loop ? Math.floor(copies / 2) * total : 0
  const [pos, setPos] = useState(origin + index)
  const posRef = useRef(pos)
  const goalRef = useRef(index)
  const pending = useRef(0)
  const animating = useRef(false)
  const trackRef = useRef(null)
  const [moving, setMoving] = useState(false)
  const touch = useRef(null)
  const moveTimer = useRef(0)

  function place(next, animate) {
    posRef.current = next
    const track = trackRef.current
    if (track && !animate) {
      track.style.transition = 'none'
      track.style.setProperty('--i', String(next))
      void track.offsetWidth
      track.style.transition = ''
    }
    setPos(next)
  }

  function pump() {
    if (!loop || animating.current || pending.current === 0) return
    const direction = pending.current > 0 ? 1 : -1
    pending.current -= direction
    const logical = (goalRef.current + direction + total) % total
    goalRef.current = logical
    onSlide(hrefFor({ page: 'projects', id: projectOrder[logical] }))
    let next = posRef.current + direction
    if (next < total || next >= copies * total - total) {
      const shifted = posRef.current - direction * total
      place(shifted, false)
      next = shifted + direction
    }
    animating.current = true
    place(next, true)
    window.clearTimeout(moveTimer.current)
    setMoving(true)
    moveTimer.current = window.setTimeout(() => setMoving(false), 420)
  }

  function step(direction) {
    pending.current += direction
    pump()
  }

  function goTo(target) {
    const delta = ((target % total) + total - goalRef.current) % total
    if (delta === 0) return
    const direction = delta <= total / 2 ? 1 : -1
    pending.current += direction * (direction === 1 ? delta : total - delta)
    pump()
  }

  useEffect(() => {
    if (index === goalRef.current) return
    goalRef.current = index
    pending.current = 0
    animating.current = false
    place(origin + index, false)
  }, [index, origin])

  const stepRef = useRef(step)
  useEffect(() => {
    stepRef.current = step
  })

  useEffect(() => {
    function onKey(event) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (event.key === 'ArrowRight') stepRef.current(1)
      if (event.key === 'ArrowLeft') stepRef.current(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => () => window.clearTimeout(moveTimer.current), [])

  function onTouchStart(event) {
    touch.current = event.touches[0].clientX
  }

  function onTouchEnd(event) {
    if (touch.current === null) return
    const dx = event.changedTouches[0].clientX - touch.current
    touch.current = null
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
  }

  return (
    <article className="page">
      <div className="page-head">
        <div>
          <Title headingRef={headingRef}>Here&rsquo;s what I&rsquo;ve built.</Title>
        </div>
        <div className="carousel-controls">
          <p className="counter" aria-live="polite">
            <strong>{String(index + 1).padStart(2, '0')}</strong> / {String(total).padStart(2, '0')}
          </p>
          <button type="button" className="icon-button" aria-label="Previous project" onClick={() => step(-1)}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" className="icon-button" aria-label="Next project" onClick={() => step(1)}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        className={moving ? 'carousel is-moving' : 'carousel'}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
      >
        <ol
          ref={trackRef}
          className="track"
          style={{ '--i': pos }}
          onTransitionEnd={(event) => {
            if (!loop || event.propertyName !== 'transform' || event.target !== event.currentTarget) return
            if (!animating.current) return
            animating.current = false
            const landed = posRef.current
            const normalized = origin + ((landed % total) + total) % total
            if (normalized !== landed) place(normalized, false)
            pump()
          }}
        >
          {(loop ? Array.from({ length: copies }, () => projectOrder).flat() : projectOrder).map((key, slot) => {
            const slide = loop ? slot % total : slot
            const fact = facts[key]
            const image = projectImages[key]
            const active = slot === pos
            return (
              <li
                key={`${key}-${slot}`}
                className={`card tone-${TONES[slide % TONES.length]}${active ? ' is-active' : ''}`}
                aria-roledescription="slide"
                aria-label={`${slide + 1} of ${total}: ${fact.title}`}
                aria-hidden={active ? undefined : 'true'}
                onPointerMove={active ? track : undefined}
                onPointerLeave={active ? untrack : undefined}
                inert={active ? undefined : true}
                onClick={active ? undefined : () => goTo(slide)}
              >
                <div className="frame">
                  {image ? (
                    <img src={image} alt={`${fact.title} screenshot`} loading="lazy" />
                  ) : (
                    <div className="placeholder">
                      <h2 className="mono">{fact.title}</h2>
                    </div>
                  )}
                </div>
                <div className="card-copy">
                  <p className="place">
                    {fact.place} · {fact.detail}
                  </p>
                  {image ? <h2>{fact.title}</h2> : null}
                  <p className="body">{projectSentences[key]}</p>
                  {fact.tech.length ? (
                    <ul className="tags">
                      {fact.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {fact.url ? (
                    <a className="button ghost card-link" href={fact.url} target="_blank" rel="noreferrer">
                      See the code
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

    </article>
  )
}

function Achievements({ headingRef }) {
  return (
    <article className="page">
      <Title headingRef={headingRef}>I&rsquo;ve won three hackathons.</Title>
      <ol className="awards">
        {achievements.map((id, index) => {
          const fact = facts[id]
          return (
            <li key={id} className="award rise" style={{ '--d': index + 1 }}>
              <div className="award-top">
                <span className="award-icon">
                  <Trophy size={24} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className="award-date">{fact.start}</p>
              </div>
              <div>
                <p className="badge">{fact.detail}</p>
                <h2>{fact.title}</h2>
                <p className="place">{fact.place}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

function Blogs({ headingRef, link }) {
  return (
    <article className="page">
      <Title headingRef={headingRef}>I write about what I build.</Title>
      <ul className="posts">
        {blogs.map((post, index) => (
          <li key={post.slug} className="rise" style={{ '--d': index + 1 }}>
            <a className={`post tone-${post.tone}`} href={`/blogs/${post.slug}`} onClick={link(`/blogs/${post.slug}`)}>
              <span className="post-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="post-text">
                <strong>{post.title}</strong>
                <span>{post.summary}</span>
              </span>
              <ArrowRight className="post-arrow" size={20} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Blog({ headingRef, id, link }) {
  const post = blogs.find((item) => item.slug === id)
  return (
    <article className="page narrow">
      <a className="back" href="/blogs" onClick={link('/blogs')}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to my blogs
      </a>
      {post ? (
        <>
          <Title headingRef={headingRef}>{post.title}</Title>
          <p className="lead-sm">{post.summary}</p>
          <div className="post-body">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="prose">
                {paragraph}
              </p>
            ))}
          </div>
          <a className="text-link" href={post.source} target="_blank" rel="noreferrer">
            Source
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </>
      ) : (
        <Title headingRef={headingRef}>I haven&rsquo;t written that one yet.</Title>
      )}
    </article>
  )
}

function Contact({ headingRef }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <article className="page">
      <Title headingRef={headingRef}>Let&rsquo;s talk.</Title>
      <p className="lead-sm">Got a project, a role, or just a question? Email is the quickest way to reach me, or find me on any of these.</p>
      <div className="mail-card rise" style={{ '--d': 1 }}>
        <a className="mail-link" href={`mailto:${email}`}>
          {email}
        </a>
        <button type="button" className="icon-button" onClick={copy} aria-label={copied ? 'Copied' : 'Copy email address'}>
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
      <ul className="social-grid">
        {socials.map((item, index) => (
          <li key={item.id} className="rise" style={{ '--d': index + 2 }}>
            <a
              className={`social social-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noreferrer me"
              onPointerMove={track}
              onPointerLeave={untrack}
            >
              <Brand id={item.id} size={22} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.note}</small>
              </span>
              <ArrowUpRight className="social-arrow" size={18} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}

function Missing({ headingRef, link }) {
  return (
    <article className="page">
      <Title headingRef={headingRef}>Hmm, I don&rsquo;t have a page here.</Title>
      <p>
        <a className="text-link" href="/" onClick={link('/')}>
          <ArrowLeft size={16} aria-hidden="true" />
          Take me home
        </a>
      </p>
    </article>
  )
}

