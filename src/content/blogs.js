export const blogs = [
  {
    slug: 'pruning',
    factId: 'lth',
    tone: 'leaf',
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
    tone: 'indigo',
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
