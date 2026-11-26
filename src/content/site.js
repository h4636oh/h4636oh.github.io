/** Single source of truth for copy + SEO. Edit this file; rebuild updates the site, sitemap, and meta. */

export const site = {
  name: 'Deepanshu Choudhary',
  givenName: 'Deepanshu',
  familyName: 'Choudhary',
  domain: 'h4636oh.com',
  url: 'https://h4636oh.com',
  description:
    'Deepanshu Choudhary is CS student at IIIT Pune building systems, Flutter apps, FastAPI backends, and open-source tools.',
  keywords: [
    'Deepanshu Choudhary',
    'h4636oh',
    'IIIT Pune',
    'software engineer',
    'Flutter',
    'FastAPI',
    'Omarchy',
    'portfolio',
  ],
  ogImage: '/og.png',
  locale: 'en_IN',
  lang: 'en',
  email: 'the.pan.shu.4636@gmail.com',
  github: 'https://github.com/h4636oh',
  jobTitle: 'Software Engineer',
  location: 'India',
  resumePath: '/resume.pdf',
  resumeFile: 'Deepanshu_Choudhary_Resume.pdf',
  themeColor: { light: '#FCEDDA', dark: '#262223' },
}

export const home = {
  tag: "Hey, welcome to my desk. I'm",
  line: 'I build thingsss....',
  sub: "Right now I'm freelancing on a Flutter app and its FastAPI backend, contributing to Omarchy, and finishing my CS degree at IIIT Pune. Take a look around.",
  ctaPrimary: "See what I've built",
  ctaSecondary: 'Say hello',
}

/** Shown on the boot screen (picked at random). Edit freely. */
export const bootLines = [
  'Deepanshu is still renaming variables...',
  'Waiting for him to stop tweaking the padding.',
  'Loading his unfinished side projects. All 47 of them.',
  'Convincing the CSS to behave. Wish us luck.',
  'He is almost done deploying. Classic.',
  'Fetching confidence from a CDN. Timeout likely.',
  'Compiling excuses about the last hackathon demo.',
  'Please hold while Deepanshu ships one more refactor.',
  'Warming up the ego. This may take a second.',
  'His Wi-Fi is fine. His priorities are not.',
  'Buffering the portfolio he swore was production-ready.',
  'Negotiating with React. Deepanshu is losing.',
]

export const about =
  "I'm a B.Tech Computer Science student at IIIT Pune (2023-2027) with a strong foundation in systems and full-stack development. My academic journey is complemented by practical experience in building scalable backends, cross-platform mobile apps, and optimizing AI models."

export const hero = site.description

export const email = site.email
export const github = site.github
export const spotifyProfile = 'https://open.spotify.com/user/312woejjtlbmn255hengtmmoalna'

export const socials = [
  { id: 'github', label: 'GitHub', note: 'Code and repositories', url: github },
  { id: 'linkedin', label: 'LinkedIn', note: 'Work history', url: 'https://www.linkedin.com/in/h4636oh' },
  { id: 'leetcode', label: 'LeetCode', note: 'Problem solving', url: 'https://leetcode.com/u/h4636oh' },
  { id: 'mastodon', label: 'Mastodon', note: 'Posts on Fosstodon', url: 'https://fosstodon.org/@h4636oh' },
  { id: 'instagram', label: 'Instagram', note: 'the.pan.shu', url: 'https://instagram.com/the.pan.shu' },
  { id: 'spotify', label: 'Spotify', note: 'What I listen to', url: spotifyProfile },
]

export const skills = [
  {
    id: 'languages',
    label: 'Languages',
    mark: 'copper',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Dart', icon: 'dart' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Bash', icon: 'gnubash' },
      { name: 'C/C++', icon: 'cplusplus' },
      { name: 'Java', icon: 'openjdk' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & tools',
    mark: 'copper',
    items: [
      { name: 'Flutter', icon: 'flutter' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React', icon: 'react' },
      { name: 'Vite', icon: 'vite' },
      { name: 'PySide6', icon: 'qt' },
      { name: 'Qt Designer', icon: 'qt' },
      { name: 'Figma', icon: 'figma' },
    ],
  },
  {
    id: 'infra',
    label: 'Data & infrastructure',
    mark: 'copper',
    items: [
      { name: 'AWS', icon: 'aws' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'SQLite', icon: 'sqlite' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Ray', icon: 'ray' },
      { name: 'Git', icon: 'git' },
      { name: 'Linux', icon: 'linux' },
      { name: 'FreeBSD', icon: 'freebsd' },
    ],
  },
]

export const facts = {
  school: {
    id: 'school',
    kind: 'school',
    title: 'Indian Institute of Information Technology, Pune',
    place: 'B.Tech, Computer Science and Engineering',
    detail: 'CGPA 7.99',
    start: '2023',
    end: '2027',
    tech: [],
    url: null,
  },
  freelance: {
    id: 'freelance',
    kind: 'role',
    title: 'Freelance Software Engineer',
    place: 'Confidential client',
    detail: 'Remote',
    start: 'Sep 2025',
    end: 'Present',
    tech: ['Flutter', 'Kotlin', 'FastAPI', 'MongoDB', 'AWS'],
    url: null,
  },
  arealis: {
    id: 'arealis',
    kind: 'role',
    title: 'Software Engineer Intern',
    place: 'Arealis.io',
    detail: 'Hybrid',
    start: 'Jun 2025',
    end: 'Aug 2025',
    tech: ['AWS Lambda', 'S3', 'Python', 'Next.js', 'TypeScript'],
    url: null,
  },
  omarchy: {
    id: 'omarchy',
    kind: 'project',
    title: 'Omarchy',
    place: 'Hyprland',
    detail: 'Bash, Hyprland IPC',
    start: 'Nov 2025',
    end: 'Present',
    tech: ['Bash', 'Hyprland'],
    url: 'https://github.com/omacom/omarchy/pull/3075',
  },
  lth: {
    id: 'lth',
    kind: 'project',
    title: 'LTH on FSL',
    place: 'Research reproduction',
    detail: 'Sparse networks',
    start: null,
    end: null,
    tech: [],
    url: 'https://github.com/h4636oh/LTH-on-FSL',
  },
  shogun: {
    id: 'shogun',
    kind: 'project',
    title: 'ShogunScripts',
    place: 'Desktop',
    detail: 'Scripts and PDF reports',
    start: null,
    end: null,
    tech: ['Python', 'PySide6'],
    url: 'https://github.com/h4636oh/shogun_scripts',
  },
  athena: {
    id: 'athena',
    kind: 'project',
    title: 'Athena',
    place: 'Booking assistant',
    detail: 'Flutter',
    start: null,
    end: null,
    tech: ['Flutter', 'Dart'],
    url: 'https://github.com/h4636oh/athena-the-assistant',
  },
  knowmycollege: {
    id: 'knowmycollege',
    kind: 'project',
    title: 'KnowMyCollege',
    place: 'IIIT Pune, batch 2027',
    detail: 'Four students',
    start: null,
    end: null,
    tech: ['Python', 'Flask'],
    url: 'https://github.com/h4636oh/KnowMyCollege',
  },
  easyaudit: {
    id: 'easyaudit',
    kind: 'project',
    title: 'EasyAudit',
    place: 'Desktop',
    detail: 'CIS benchmarks',
    start: null,
    end: null,
    tech: ['Python', 'PySide6'],
    url: 'https://github.com/h4636oh/EasyAudit_QT',
  },
  sih: {
    id: 'sih',
    kind: 'win',
    title: 'Smart India Hackathon',
    place: 'IIT Kharagpur',
    detail: 'Winner',
    start: 'Dec 2024',
    end: null,
    tech: [],
    url: null,
  },
  techx: {
    id: 'techx',
    kind: 'win',
    title: 'TechXcelerate',
    place: 'BITS Goa',
    detail: 'Winner',
    start: 'Feb 2025',
    end: null,
    tech: [],
    url: null,
  },
  hackin: {
    id: 'hackin',
    kind: 'win',
    title: 'HackIN',
    place: 'IIIT Pune',
    detail: 'Winner',
    start: 'Mar 2024',
    end: null,
    tech: [],
    url: null,
  },
}

export function span(fact) {
  if (!fact?.start) return ''
  if (!fact.end) return fact.start
  return `${fact.start} – ${fact.end}`
}

export const career = [
  {
    id: 'omarchy',
    label: 'Open source',
    sentence:
      'I wrote a Bash touchpad utility that talks to the Hyprland IPC. The maintainers, including David Heinemeier Hansson, reviewed my PR #3075.',
  },
  {
    id: 'freelance',
    label: null,
    sentence:
      'I’m building a Flutter and Kotlin app for a client, plus its FastAPI and MongoDB backend with auth, deployed on AWS (EC2, SES).',
  },
  {
    id: 'arealis',
    label: null,
    sentence:
      'I spent the summer on a serverless pipeline (Lambda, S3), a fraud-detection module in Python, and full-stack features in Next.js.',
  },
]

export const projectOrder = ['omarchy', 'lth', 'shogun', 'athena', 'knowmycollege', 'easyaudit']

// Drop a file in public/projects and set the path here, for example '/projects/omarchy.jpg'.
export const projectImages = {
  omarchy: null,
  lth: null,
  shogun: null,
  athena: null,
  knowmycollege: null,
  easyaudit: null,
}

export const projectSentences = {
  omarchy: 'I wrote a Bash utility that toggles your touchpad through the Hyprland IPC, and opened it on Omarchy as PR #3075.',
  lth: 'I reproduced lottery-ticket pruning for few-shot learning and kept the performance after cutting up to about 90% of the parameters.',
  shogun: 'I built a PySide6 desktop app that runs your custom scripts and writes PDF reports, so you never need the command line.',
  athena: 'I built the Flutter front end that lets you book cabs, hotels, and movies from a single interface.',
  knowmycollege: 'Three classmates and I built a Flask site that ranks colleges from a short form, with a chatbot to help you choose.',
  easyaudit: 'I built a PySide6 tool that runs CIS benchmark scripts on Ubuntu, Windows, and RHEL for you.',
}

export const achievements = ['sih', 'techx', 'hackin']

export const blogs = [
  {
    slug: 'pruning',
    factId: 'lth',
    tone: 'copper',
    title: 'Pruning a few-shot network',
    summary: 'Lottery tickets survive transfer from Mini-ImageNet to CUB.',
    source: 'https://github.com/h4636oh/LTH-on-FSL',
    body: [
      'I reproduced the lottery-ticket setup for few-shot learning: pretraining, ProtoNet, and global pruning.',
      'The check was transfer from Mini-ImageNet to CUB after the network had been pruned.',
      'Performance held with up to about 90% of the parameters removed.',
      'This post stays inside that result.',
    ],
  },
  {
    slug: 'touchpad',
    factId: 'omarchy',
    tone: 'copper',
    title: 'A touchpad toggle for Hyprland',
    summary: 'A Bash utility for Omarchy, reviewed by its maintainers.',
    source: 'https://github.com/omacom/omarchy/pull/3075',
    body: [
      'I opened PR #3075 on Omarchy: a Bash utility that talks to the Hyprland IPC and toggles the touchpad.',
      'The first version was hardcoded to one laptop. The pull request generalizes that lookup.',
      'Maintainers, including David Heinemeier Hansson, reviewed the change.',
      'The pull request is the public record of that utility.',
    ],
  },
  {
    slug: 'booking',
    factId: 'athena',
    tone: 'copper',
    title: 'One screen for three bookings',
    summary: 'Cabs, hotels, and movies behind one Flutter interface.',
    source: 'https://github.com/h4636oh/athena-the-assistant',
    body: [
      'Athena is a Flutter front end for booking cabs, hotels, and movies.',
      'Each service stays behind its own API.',
      'The screen I built is where those calls meet.',
      'The public repository is the source for this post.',
    ],
  },
]

/** Page titles + default descriptions. Blog/project pages derive from their entries. */
export const pages = {
  home: { title: site.name, description: site.description },
  about: {
    title: 'About Me',
    description: `About ${site.name}: CS student at IIIT Pune building systems, apps, and open source.`,
  },
  skills: {
    title: 'Skills',
    description: `${site.name}'s stack: Python, Flutter, FastAPI, React, AWS, and more.`,
  },
  career: {
    title: 'Career',
    description: `Work and open-source experience for ${site.name}.`,
  },
  projects: {
    title: 'Projects',
    description: `Projects by ${site.name}: Omarchy, LTH on FSL, Athena, ShogunScripts, and more.`,
  },
  achievements: {
    title: 'Achievements',
    description: `${site.name} — winner at Smart India Hackathon, TechXcelerate, and HackIN.`,
  },
  blogs: {
    title: 'Blogs',
    description: `Writing by ${site.name} about systems, research, and the apps I build.`,
  },
  blog: { title: 'Blog', description: site.description },
  contact: {
    title: 'Contact Me',
    description: `Contact ${site.name} — email, GitHub, LinkedIn, and more.`,
  },
  missing: { title: 'Not found', description: 'That page is not on this site.' },
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${site.url}/`
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function sameAs() {
  return socials.map((item) => item.url).filter(Boolean)
}

/** Every public path for the sitemap (auto-grows with projects + blogs). */
export function sitemapPaths() {
  const paths = ['/', '/about', '/skills', '/career', '/projects', '/achievements', '/blogs', '/contact']
  for (const id of projectOrder) paths.push(`/projects/${id}`)
  for (const post of blogs) paths.push(`/blogs/${post.slug}`)
  return paths
}

export function seoFor(route) {
  if (route.page === 'blog' && route.id) {
    const post = blogs.find((item) => item.slug === route.id)
    if (post) {
      return {
        title: `${post.title} · ${site.name}`,
        description: post.summary,
        url: absoluteUrl(`/blogs/${post.slug}`),
        type: 'article',
      }
    }
  }
  if (route.page === 'projects' && route.id) {
    const fact = facts[route.id]
    const sentence = projectSentences[route.id]
    if (fact) {
      return {
        title: `${fact.title} · ${site.name}`,
        description: sentence || `${fact.title} — a project by ${site.name}.`,
        url: absoluteUrl(`/projects/${route.id}`),
        type: 'website',
      }
    }
  }
  const page = pages[route.page] || pages.missing
  const path =
    route.page === 'home' || route.page === 'missing'
      ? '/'
      : route.page === 'blog'
        ? '/blogs'
        : `/${route.page}`
  return {
    title: route.page === 'home' ? page.title : `${page.title} · ${site.name}`,
    description: page.description,
    url: absoluteUrl(path),
    type: 'website',
  }
}

export function jsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: absoluteUrl('/'),
      description: site.description,
      inLanguage: site.lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      givenName: site.givenName,
      familyName: site.familyName,
      url: absoluteUrl('/'),
      email: site.email,
      jobTitle: site.jobTitle,
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: facts.school.title,
      },
      sameAs: sameAs(),
      knowsAbout: skills.flatMap((group) => group.items.map((item) => item.name)),
    },
  ]
}

export function robotsTxt() {
  return [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ``].join('\n')
}

export function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = sitemapPaths()
    .map(
      (path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function crawlerHtml() {
  const projectList = projectOrder
    .map((id) => {
      const fact = facts[id]
      return `<li><a href="${absoluteUrl(`/projects/${id}`)}">${fact.title}</a> — ${projectSentences[id]}</li>`
    })
    .join('')
  const blogList = blogs
    .map((post) => `<li><a href="${absoluteUrl(`/blogs/${post.slug}`)}">${post.title}</a> — ${post.summary}</li>`)
    .join('')
  const socialList = socials.map((item) => `<li><a href="${item.url}">${item.label}</a></li>`).join('')
  return `<main>
  <h1>${site.name}</h1>
  <p>${site.description}</p>
  <p>${home.sub}</p>
  <h2>About</h2>
  <p>${about}</p>
  <h2>Projects</h2>
  <ul>${projectList}</ul>
  <h2>Writing</h2>
  <ul>${blogList}</ul>
  <h2>Contact</h2>
  <ul>
    <li><a href="mailto:${site.email}">${site.email}</a></li>
    ${socialList}
  </ul>
</main>`
}
