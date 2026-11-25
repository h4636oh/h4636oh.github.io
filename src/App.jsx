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
import { about, email, facts, skills, socials, span } from './content/facts'
import { achievements, career, projectImages, projectOrder, projectSentences } from './content/copy'
import { blogs } from './content/blogs'
import { Brand, Tech } from './icons'
import { ORDER, hrefFor, parsePath, sameRoute, sectionOf } from './route'

const NAV = [
  ['home', 'Home', House],
  ['about', 'About me', User],
  ['skills', 'What I use', Wrench],
  ['career', 'Where I’ve worked', Briefcase],
  ['projects', 'What I’ve built', FolderGit2],
  ['achievements', 'What I’ve won', Trophy],
  ['blogs', 'What I write', PenLine],
  ['contact', 'Say hello', Mail],
]

const TITLES = {
  home: 'Deepanshu Choudhary',
  about: 'About',
  skills: 'Skills',
  career: 'Career',
  projects: 'Projects',
  achievements: 'Achievements',
  blogs: 'Blogs',
  blog: 'Blog',
  contact: 'Contact',
  missing: 'Not found',
}

const EXIT_MS = 260

const STARS = [
  [33, 10, 0], [38, 16, 1.2], [44, 9, 0.6], [55, 12, 2], [60, 9, 0.3], [64, 17, 1.6], [69, 11, 2.4], [52, 8, 0.9],
]

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
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0b1121' : '#f3eee4')
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
    const title = TITLES[shown.page]
    document.title = shown.page === 'home' ? title : `${title} · Deepanshu Choudhary`
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
      <header className="nav">
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
        <span className="nav-current">{sheet ? 'Menu' : shown.page === 'home' ? 'Home' : TITLES[shown.page]}</span>
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

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const root = document.documentElement
    const dot = dotRef.current
    const ring = ringRef.current
    const at = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let frame = 0
    root.classList.add('has-cursor')

    function loop() {
      const ease = reduceMotion() ? 1 : 0.2
      lag.x += (at.x - lag.x) * ease
      lag.y += (at.y - lag.y) * ease
      ring.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`
      frame = Math.abs(at.x - lag.x) + Math.abs(at.y - lag.y) > 0.1 ? requestAnimationFrame(loop) : 0
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
      if (!frame) frame = requestAnimationFrame(loop)
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')
    function onLeave() {
      ring.classList.remove('is-on')
      dot.classList.remove('is-on')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
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

function Home({ link }) {
  const name = ['Deepanshu', 'Choudhary']
  let letter = 0

  return (
    <div className="home">
      <div className="scene" aria-hidden="true">
        <img className="scene-day" src="/desk-day-1920.webp" srcSet="/desk-day-1280.webp 1280w, /desk-day-1920.webp 1920w, /desk-day-2880.webp 2880w" sizes="(max-width: 860px) 100vw, 160svh" alt="" />
        <img className="scene-night" src="/desk-night-1920.webp" srcSet="/desk-night-1280.webp 1280w, /desk-night-1920.webp 1920w, /desk-night-2880.webp 2880w" sizes="(max-width: 860px) 100vw, 160svh" alt="" />
        <span className="sunbeam" />
        <span className="screen-glow" />
        <span className="lamp-glow" />
        <span className="lamp-pool" />
        <span className="stars">
          {STARS.map(([x, y, delay]) => (
            <i key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }} />
          ))}
        </span>
      </div>
      <section className="hero">
        <p className="hero-tag rise" style={{ '--d': 0 }}>
          Hey, welcome to my desk. I&rsquo;m
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
          I build systems and apps
        </p>
        <p className="hero-sub rise" style={{ '--d': 6 }}>
          Right now I&rsquo;m freelancing on a Flutter app and its FastAPI backend, contributing to Omarchy, and
          finishing my CS degree at IIIT Pune. Take a look around.
        </p>
        <div className="cta rise" style={{ '--d': 7 }}>
          <a className="button primary" href="/projects" onClick={link('/projects')}>
            See what I&rsquo;ve built
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href="/contact" onClick={link('/contact')}>
            <Mail size={18} aria-hidden="true" />
            Say hello
          </a>
        </div>
      </section>
    </div>
  )
}

function About({ headingRef, link }) {
  const school = facts.school
  return (
    <article className="page">
      <Title headingRef={headingRef}>Let me introduce myself.</Title>
      <div className="about-grid">
        <div>
          <p className="prose pull">
            <span className="mark">{about}</span>
          </p>
          <div className="school">
            <p className="eyebrow">Where I study</p>
            <p className="school-name">{school.title}</p>
            <p className="meta">
              {school.place} · {school.detail} · {span(school)}
            </p>
          </div>
          <p className="about-next">
            <a className="text-link" href="/skills" onClick={link('/skills')}>
              See what I work with
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </p>
        </div>
        <Resume />
      </div>
    </article>
  )
}

const RESUME = '/resume.pdf'
const RESUME_NAME = 'Deepanshu_Choudhary_Resume.pdf'

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

const TONES = ['indigo', 'copper', 'leaf']

function Projects({ headingRef, id, onSlide }) {
  const found = projectOrder.indexOf(id)
  const index = found >= 0 ? found : 0
  const total = projectOrder.length
  const [moving, setMoving] = useState(false)
  const touch = useRef(null)
  const moveTimer = useRef(0)

  function show(next) {
    const target = (next + total) % total
    if (target === index) return
    window.clearTimeout(moveTimer.current)
    setMoving(true)
    moveTimer.current = window.setTimeout(() => setMoving(false), 420)
    onSlide(hrefFor({ page: 'projects', id: projectOrder[target] }))
  }

  const showRef = useRef(show)
  useEffect(() => {
    showRef.current = show
  })

  useEffect(() => {
    function onKey(event) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (event.key === 'ArrowRight') showRef.current(index + 1)
      if (event.key === 'ArrowLeft') showRef.current(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [index])

  useEffect(() => () => window.clearTimeout(moveTimer.current), [])

  function onTouchStart(event) {
    touch.current = event.touches[0].clientX
  }

  function onTouchEnd(event) {
    if (touch.current === null) return
    const dx = event.changedTouches[0].clientX - touch.current
    touch.current = null
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1))
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
          <button type="button" className="icon-button" aria-label="Previous project" onClick={() => show(index - 1)}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" className="icon-button" aria-label="Next project" onClick={() => show(index + 1)}>
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
        <ol className="track" style={{ '--i': index }}>
          {projectOrder.map((key, slide) => {
            const fact = facts[key]
            const image = projectImages[key]
            const active = slide === index
            return (
              <li
                key={key}
                className={`card tone-${TONES[slide % TONES.length]}${active ? ' is-active' : ''}`}
                aria-roledescription="slide"
                aria-label={`${slide + 1} of ${total}: ${fact.title}`}
                aria-hidden={active ? undefined : 'true'}
                onPointerMove={active ? track : undefined}
                onPointerLeave={active ? untrack : undefined}
                inert={active ? undefined : true}
                onClick={active ? undefined : () => show(slide)}
              >
                <div className="frame">
                  {image ? (
                    <img src={image} alt={`${fact.title} screenshot`} loading="lazy" />
                  ) : (
                    <div className="placeholder">
                      <span className="mono">{fact.title.slice(0, 2)}</span>
                      <small>Screenshot coming soon</small>
                    </div>
                  )}
                </div>
                <div className="card-copy">
                  <p className="place">
                    {fact.place} · {fact.detail}
                  </p>
                  <h2>{fact.title}</h2>
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

