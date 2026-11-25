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
