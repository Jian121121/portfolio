export const profile = {
  name: 'Jian De Guzman',
  role: 'Full-stack Developer & Project Lead · BSIT @ NU Baliwag',
  location: 'Plaridel, Bulacan, Philippines',
  tagline:
    'I like turning plans into finished work — keeping people, timelines, and details moving in the same direction.',
  email: 'jiandeguzman689@gmail.com',
  phone: '+63 961 790 2888',
  github: 'https://github.com/Jian121121',
  linkedin: 'https://www.linkedin.com/in/jian-de-guzman-520abb396',
  // Shown as the first hero badge with a live dot, linking to Contact; set to null to hide
  availability: 'Open for commissions',
  commissions:
    'Accepting IT project commissions — websites, web & mobile apps, and capstone/thesis systems. Reach out via the contact section.',
  badges: ['COO · AWS Student Builder Group', 'ITS Certified', 'IRCITE 2026 Presenter'],
  stats: [
    { value: '5+', label: 'years in leadership roles' },
    { value: '2', label: 'certifications' },
    { value: '3', label: 'shipped projects' },
  ],
  // Path inside /public; set to null to hide the Download CV button
  resume: '/cv.pdf',
  languages: ['Filipino', 'English'],
  interests: [
    'Software Development',
    'Artificial Intelligence',
    'Cybersecurity',
    'Project Management',
    'Running',
    'Volleyball',
  ],
}

export const about = {
  // Drop your photo in /public and point this at it, e.g. '/me.jpg'
  image: '/me.jpg',
  tabs: [
    {
      id: 'who',
      label: 'Who I am',
      body: [
        "I'm Jian — a BSIT student at NU Baliwag, based in Plaridel, Bulacan.",
        'What I enjoy most about a project is everything around it — planning the work, keeping the team in sync, and making sure it actually gets finished.',
      ],
    },
    {
      id: 'what',
      label: 'What I do',
      body: [
        'I led our capstone team through E-NU Hire, a smart recruitment and screening platform, all the way to a successful defense.',
      ],
      items: [
        { text: 'Planning sprints, timelines, and keeping web and mobile work in sync.' },
        { text: 'Running demos and turning adviser feedback into clear, scoped tasks.' },
        { text: 'Handling operations for the AWS Student Builder Group — NU Baliwag.' },
        { text: profile.commissions },
      ],
    },
    {
      id: 'off',
      label: 'Off the clock',
      items: [
        { icon: 'run', text: 'Running — usually the first thing on the calendar.' },
        { icon: 'volleyball', text: 'Playing volleyball with friends.' },
        { icon: 'book', text: 'Reading about emerging tech and where it’s heading.' },      ],
    },
    {
      id: 'now',
      label: 'Right now',
      // Keep these current — they're what makes the section feel alive
      items: [
        { text: 'Serving as Chief Operating Officer of the AWS Student Builder Group — NU Baliwag.' },
        { text: 'Finishing my BSIT at NU Baliwag (class of 2027).' },
        { text: 'Presented research at an international IT education conference (IRCITE 2026).' },
      ],
      updated: 'Oct 2026',
    },
  ],
}

// The first category is the tab Skills opens on
export const skills = [
  {
    category: 'Programming',
    items: ['JavaScript', 'React', 'Python', 'Java', 'Dart', 'PHP', 'Kotlin', 'Shell Script'],
  },
  {
    category: 'Web & Frameworks',
    items: ['React Native', 'Node.js', 'Flutter', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Databases & Cloud',
    items: ['MySQL', 'PostgreSQL', 'Firebase', 'Supabase', 'Amazon Web Services (AWS)', 'Virtual Machines', 'Data Analysis'],
  },
  {
    category: 'Cybersecurity & Networking',
    items: [
      'Information Security',
      'Ethical Hacking',
      'Cyber Threat Intelligence (CTI)',
      'Cisco Networking',
      'LAN / WAN',
      'OSI Model',
      'Internet Protocol (IP)',
    ],
  },
  {
    category: 'Project Management',
    items: [
      'Agile & Waterfall',
      'Leadership & Team Management',
      'Strategic & Event Planning',
      'Operations Management',
      'Community Engagement',
      'Notion',
      'Trello',
      'Asana',
      'ClickUp',
      'Miro',
      'Obsidian',
    ],
  },
  {
    category: 'Dev & Design Tools',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Android Studio',
      'Vercel',
      'Figma',
      'Claude',
      'Gemini',
      'GitHub Copilot',
      'Vite',
      'npm',
      'XAMPP',
      'Sublime Text',
      'Stitch',
      'Graphify',
      'Discord',
    ],
  },
]

export const projects = [
  {
    name: 'E-NU Hire',
    year: '2025 — 2026',
    description:
      "An AI-assisted faculty recruitment platform for NU Baliwag. It scores and ranks applicants against HR's weighted criteria, moves manpower requests through multi-level approvals, and generates printable hiring documents. Applicants and HR use the web app, while academic officials use the Flutter app.",
    tech: ['Flutter', 'HTML / CSS / JavaScript', 'Firebase', 'Cloud Functions', 'Groq (gpt-oss-120b)'],
    // Drop a screenshot in /public and point this at it, e.g. '/projects/ehire-landing.webp'
    image: '/projects/ehire-landing.webp',
    gallery: ['/projects/ehire-jobs.webp'],
    imageFit: 'contain',
    imageBg: '#EEF1FA',
    // Optional: shown on the card on a logoBg tile; the screenshots then live in the details view
    logo: '/projects/ehire-logo.webp',
    logoBg: '#EEF1FA',
    link: 'https://smartrecruitment.web.app/splash.html',
    role: 'Project Manager',
    status: 'Completed & defended',
    platform: 'Web, Android & iOS',
    // Shown in the project's details view; add extra screenshots with gallery: ['/projects/…', …]
    features: [
      'AI candidate matching and ranking by weighted suitability score',
      'Digital manpower requests with multi-level approvals',
      'Automated faculty manpower projection from teaching loads',
      'ID verification, document parsing, and printable hiring forms',
    ],
    // Optional Problem → Built → Result steps in the details view
    story: {
      problem: 'NU Baliwag HR screened faculty applicants by hand, using paper forms, calls, and email.',
      built: 'A web and mobile platform covering manpower requests, AI-assisted screening and ranking, interviews, and hiring documents.',
      result: 'Defended capstone. Rated 4.23 / 5 (Strongly Agree) by 106 evaluators on ISO/IEC 25010.',
    },
  },
  {
    name: 'Mighty Sports Center',
    year: '2026',
    description:
      'Online court booking for an indoor sports center in AcroCity, Guiguinto, Bulacan. Players reserve pickleball, badminton, basketball, and volleyball courts, track their bookings, and find rules, FAQs, reviews, and lost & found in one place.',
    image: '/projects/mighty-hero.webp',
    gallery: [
      '/projects/mighty-dashboard.webp',
      '/projects/mighty-pay.webp',
    ],
    imageFit: 'contain',
    imageBg: '#0A0A0A',
    logo: '/projects/mighty-sports-logo.webp',
    logoBg: '#000000',
    link: 'https://mightysportcenter2.vercel.app/',
    role: 'Full-stack Developer',
    status: 'Live',
    platform: 'Web',
    // Optional: who it was built with/for — shown as a linked "Client" field
    client: { name: 'Mighty Sports Center Bulacan', link: 'https://www.facebook.com/profile.php?id=61581447100234' },
    features: [
      'Court booking for pickleball, badminton, basketball, and volleyball',
      'Gear rentals and GCash payment in one checkout',
      'Player dashboard with booking suggestions and history',
      'Coaching session booking',
    ],
    story: {
      problem: 'Court bookings were handled by chat and phone.',
      built: 'Online court booking with player accounts, booking tracking, and help pages.',
      result: 'Live.',
    },
  },
  {
    name: 'BadyetKarga',
    year: '2026',
    description:
      'An Android app that helps Filipino families plan weekly meals and stay within their grocery budget. It turns the meal plan into a priced grocery list, and when the total goes over budget, it suggests which items to remove, reduce, or swap. Meal planning and shopping work offline after login.',
    image: '/projects/badyetkarga-screens-1.webp',
    gallery: ['/projects/badyetkarga-screens-2.webp'],
    logo: '/projects/badyetkarga-logo.webp',
    logoBg: '#E6F0DC',
    // Show the whole image (no crop) on a matching background — for app mockups that shouldn't be cut off
    imageFit: 'contain',
    imageBg: '#E6F0DC',
    link: 'https://badyetkarga.vercel.app/',
    role: 'Solo Developer',
    status: 'Live',
    platform: 'Android',
    tech: ['React Native (Expo)', 'TypeScript', 'SQLite', 'Firebase Auth', 'Zustand'],
    features: [
      'Weekly meal planner with a Filipino dish library and custom dishes',
      'Household profiles with allergies, diets, and schedules',
      'Auto-generated grocery list with budget tracking and Shopping Mode',
      'Over-budget suggestions powered by a 0/1 knapsack optimizer',
    ],
    story: {
      problem: 'Rising food prices lead Filipino families to overspend and waste food when they shop without a meal plan.',
      built: 'An offline-first Android app that turns a weekly meal plan into a priced grocery list and suggests cuts when it goes over budget.',
      result: 'Live. Supports SDG 1 (No Poverty) and SDG 12 (Responsible Consumption).',
    },
  },
]

export const services = [
  {
    title: 'Websites & landing pages',
    body: 'Fast, mobile-friendly sites for businesses and organizations — designed, built, and deployed.',
  },
  {
    title: 'Web & mobile apps',
    body: 'Booking systems, dashboards, and apps with accounts and data.',
  },
  {
    title: 'Capstone & thesis systems',
    body: 'Planned, built, and documented end to end, with demo-ready deliverables.',
  },
]

export const workflow = [
  { title: 'Discuss', body: 'Goals, scope, budget, and timeline.' },
  { title: 'Design', body: 'Layout and flow you can review early.' },
  { title: 'Build', body: 'Regular updates as features come together.' },
  { title: 'Launch', body: 'Deployed, handed over, and supported.' },
]

export const experience = [
  {
    title: 'Capstone Project Manager',
    org: 'E-NU Hire — NU Baliwag',
    logo: '/projects/ehire-logo.webp',
    logoBg: '#EEF1FA',
    // 'project' entries are listed under Project experience instead of Work
    type: 'project',
    period: 'Aug 2025 — Oct 2026',
    bullets: [
      'Led a 4-member team building a Flutter/Firebase web and mobile faculty recruitment platform with AI screening.',
      'Conducted HR and stakeholder interviews for requirements; planned and tracked the project in Notion.',
      'Scores applicants with gpt-oss-120b (Groq API) using HR-defined weighted criteria such as education and experience.',
      'Evaluated by 106 respondents under ISO/IEC 25010, earning an overall mean rating of 4.23/5 (Strongly Agree).',
    ],
  },
]

export const extracurriculars = [
  {
    title: 'Chief Operating Officer',
    org: 'AWS Student Builder Group — NU Baliwag',
    logo: '/orgs/aws-sbg.png',
    period: 'Aug 2026 — Present',
    bullets: [
      'Helped run First Flight, the group’s first event, introducing 50+ students to cloud computing.',
      'Coordinates members across campus activities.',
    ],
  },
  {
    title: 'Class Delegate',
    org: 'NU Literates (Student Organization)',
    logo: '/orgs/nu-literates.png',
    period: 'Jun 2025 — Feb 2026',
    bullets: [
      'Managed administrative tasks.',
      'Drove member engagement.',
      'Coordinated events.',
    ],
  },
  {
    title: 'ICT Representative',
    org: 'Student Government, Richwell Colleges, Incorporated',
    logo: '/schools/richwell.png',
    period: '2021 — 2022',
    bullets: [
      'Represented the ICT department in the Student Government.',
      'Coordinated ICT department communications.',
      'Organized student activities.',
    ],
  },
]

export const education = [
  {
    school: 'NU Baliwag',
    logo: '/schools/nu-baliwag.png',
    detail: 'BSIT · Capstone Project (defended) — E-NU Hire: NU Baliwag Smart Recruitment and Candidate Screening Platform (Web & Mobile Application)',
    period: '2023 — 2027',
  },
  {
    school: 'Richwell Colleges, Incorporated (Senior High School)',
    logo: '/schools/richwell.png',
    detail: 'Grade 11 — With High Honors (Avg. 95) · Grade 12 — With Honors (Avg. 92)',
    period: '2021 — 2023',
  },
  {
    school: 'PBC Sunbeam School, Inc. (Junior High School)',
    logo: '/schools/pbc-sunbeam.png',
    detail: 'Grade 9 — With Honors · Grade 10 — With High Honors',
    period: '2017 — 2021',
  },
]

// verify: 'https://…' for a direct link (e.g. Credly), or { url, code } when the site needs a code typed in (Certiport)
const CERTIPORT_VERIFY = 'https://verify.certiport.com'

export const certifications = [
  {
    name: 'Information Technology Specialist (ITS): Cybersecurity',
    org: 'Certiport',
    date: 'June 4, 2026',
    image: '/certs/its-cybersecurity.webp',
    verify: { url: CERTIPORT_VERIFY, code: 'w9nNK-FarL' },
  },
  {
    name: 'Information Technology Specialist (ITS): Networking',
    org: 'Certiport',
    date: 'April 30, 2026',
    image: '/certs/its-networking.webp',
    verify: { url: CERTIPORT_VERIFY, code: 'w6scz-485p' },
  },
]

export const awards = [
  {
    name: 'AWS Student Builder Group Certificate of Achievement',
    org: 'AWS Student Builder Group — NU Baliwag',
    date: 'October 2026',
    image: '/certs/aws-sbg-achievement.webp',
  },
]

export const workshops = [
  {
    name: 'Notion in Action: Project Management with Notion',
    org: 'Google Developer Groups on Campus — National University Baliwag',
    date: 'September 24, 2025',
    image: '/certs/notion-in-action.webp',
  },
  {
    name: 'AWS Student Community Day Participant',
    org: 'AWS Community',
    date: 'December 2025',
    image: '/certs/aws-community-day.webp',
  },
]

export const research = [
  {
    title: 'JuanVenture: The Lost Artifact of the Archipelago',
    role: 'Character Designer, Animator & Research Presenter',
    venue: 'International Research Conference on Information Technology Education (IRCITE 2026)',
    date: 'March 19, 2026',
    image: '/certs/ircite-cert.webp',
    verify: 'https://www.facebook.com/photo.php?fbid=1675276061272892&set=a.471113081689202&type=3',
    bullets: [
      'Designed characters and animated short videos for a 2D educational game on Philippine artifacts and folklore.',
      'Co-authored the study (rated 4.49/5 by 62 respondents) and presented it at IRCITE 2026, Bulacan State University.',
    ],
  },
]

// The section stays hidden until this has entries. Example:
// { quote: 'Jian kept our team on track…', name: 'Prof. Juan Dela Cruz', title: 'Capstone Adviser, NU Baliwag' }
export const recommendations = []