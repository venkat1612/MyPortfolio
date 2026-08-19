/* ============================================================================
 *  PORTFOLIO DATA  —  this is the ONLY file you need to edit.
 *  Everything the site renders comes from here. No component changes required.
 * ========================================================================== */

/* ----------------------------------------------------------------------------
 * 1. IDENTITY
 * -------------------------------------------------------------------------- */
export const profile = {
  name: 'Venkata Sai Kandipati',
  firstName: 'Venkata',
  initials: 'VK',
  title: 'Java Backend Developer',
  // The hook: business value, not a tech-stack list.
  hook: 'I build payment and risk platforms that stay upright under load — turning manual, failure-prone financial workflows into resilient, event-driven systems.',
  location: 'Johannesburg, South Africa',
  timezone: 'UTC+2',
  availability: 'Open to roles in Johannesburg and fully remote positions · No relocation or sponsorship required',
  yearsExperience: '7+',

  email: 'venkat6827@gmail.com',
  phone: '+27 60 713 9095',
  github: 'https://github.com/venkat1612',
  linkedin: 'https://www.linkedin.com/in/venkat-k-07b890342',

  /* ⚠️ After your first Vercel deploy, paste your live URL here.
   * Used for the canonical tag, sitemap and social preview. */
  siteUrl: 'https://venkata-portfolio.vercel.app',

  /* Resume link — not hardcoded.
   * Default: the PDF in /public, served from your own domain (fastest, most
   *          reliable). To publish a new version, just overwrite that file —
   *          keep the filename identical and nothing here needs to change.
   * Override: set VITE_RESUME_URL (in .env locally, or in Vercel →
   *          Settings → Environment Variables) to point anywhere else —
   *          Google Drive, Dropbox, S3 — with no code edit at all. */
  resumeUrl: import.meta.env.VITE_RESUME_URL || '/Venkata_Sai_Resume.pdf',
}

/* What a recruiter scans for first. Shown as chips under the hero so they
 * never have to read a paragraph to find out whether you fit their req. */
export const workPreferences = [
  { label: 'Johannesburg — on-site or hybrid', icon: 'pin' },
  { label: 'Fully remote — anywhere',          icon: 'globe' },
  { label: 'Permanent, full-time',             icon: 'badge' },
]

/* Headline stats shown under the hero. Keep to 4 — more dilutes the signal. */
export const stats = [
  { value: '7+',  label: 'Years in production Java' },
  { value: '3',   label: 'Domains shipped in' },
  { value: '9',   label: 'AWS services in daily use' },
  { value: '100%',label: 'Remote-ready · Jo\'burg-based' },
]

/* ----------------------------------------------------------------------------
 * 2. PROJECTS  —  presented as engineering case studies.
 *    `categories` drive the filter tabs. `id` is referenced by the skills map.
 * -------------------------------------------------------------------------- */
export const categories = ['All', 'Cloud & Serverless', 'Backend & APIs', 'Integration & Data']

export const projects = [
  {
    id: 'txn-orchestrator',
    title: 'Transaction Workflow Orchestrator',
    org: 'TechValley',
    period: '2024 — Present',
    categories: ['Cloud & Serverless', 'Backend & APIs'],
    // One line. Impact, not description.
    impact: 'Replaced manual multi-step payment processing with a resilient, event-driven AWS pipeline',
    summary:
      'A cloud-native serverless platform handling payment processing, transaction routing, receipting, reconciliation and cash-flow management for enterprise financial clients.',
    highlights: [
      'Architected Spring Boot microservices for payment routing, reconciliation and receipting, keeping transaction records consistent and auditable on PostgreSQL.',
      'Orchestrated multi-step workflows with AWS Step Functions and Lambda, removing manual handoffs from the payment path.',
      'Engineered Retry, Circuit Breaker and Rate Limiter patterns to absorb downstream payment-provider failures without cascading.',
      'Owned secure integration of payment gateways, DebiCheck and AVS verification through authenticated REST APIs.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'PostgreSQL', 'AWS Lambda', 'Step Functions', 'Secrets Manager', 'CloudWatch', 'Docker', 'GitHub Actions', 'Swagger'],
    metrics: [
      { k: 'Workflow', v: 'Event-driven' },
      { k: 'Resilience', v: '3 patterns' },
      { k: 'Data layer', v: 'PostgreSQL' },
    ],
    accent: 'indigo',
  },
  {
    id: 'risk-manager',
    title: 'Risk Manager',
    org: 'Genpact',
    period: '2022 — 2024',
    categories: ['Backend & APIs'],
    impact: 'Locked down vulnerability and compliance data behind Spring Security + JWT role-based access',
    summary:
      'An enterprise risk-analysis platform used by global development teams to surface application vulnerabilities through static and dynamic code analysis, automating risk assessment, remediation tracking and compliance reporting.',
    highlights: [
      'Built the backend risk-assessment services in Java, Spring Boot and Spring Data JPA against a MySQL data layer.',
      'Implemented authentication and authorization with Spring Security and JWT, applying RBAC to protect sensitive compliance data.',
      'Designed reusable business services following SOLID principles, cutting duplication across related feature work.',
      'Held the quality line with JUnit and Mockito unit and integration tests, catching regressions before QA.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring Data JPA', 'Hibernate', 'MySQL', 'JUnit', 'Mockito', 'Postman', 'Maven', 'Jenkins'],
    metrics: [
      { k: 'Access model', v: 'JWT + RBAC' },
      { k: 'Test tooling', v: 'JUnit/Mockito' },
      { k: 'Delivery', v: 'Jenkins CI' },
    ],
    accent: 'cyan',
  },
  {
    id: 'opshub',
    title: 'OpsHub — Industrial Telemetry',
    org: 'Genpact',
    period: '2019 — 2022',
    categories: ['Integration & Data', 'Backend & APIs'],
    impact: 'Streamed real-time GE Historian & iFIX plant data into live manufacturing dashboards',
    summary:
      'A centralized operations platform integrating GE Digital Historian and iFIX to collect, process and visualize industrial data, giving manufacturing teams real-time operational insight.',
    highlights: [
      'Built backend features in Java, Spring Boot, JPA and Hibernate for industrial data processing and reporting on Apache Tomcat.',
      'Integrated GE Historian and iFIX systems for real-time collection, working through the underlying industrial data models.',
      'Wrote and tuned the MySQL queries feeding the monitoring dashboards used on the manufacturing floor.',
      'Supported deployment, environment validation and defect resolution to keep the platform stable day to day.',
    ],
    stack: ['Java', 'Spring Boot', 'JPA', 'Hibernate', 'MySQL', 'Apache Tomcat', 'REST APIs', 'Maven', 'Git', 'Postman'],
    metrics: [
      { k: 'Data', v: 'Real-time' },
      { k: 'Sources', v: 'Historian/iFIX' },
      { k: 'Runtime', v: 'Tomcat' },
    ],
    accent: 'indigo',
  },
]

/* ----------------------------------------------------------------------------
 * 3. SKILLS  —  grouped by architectural layer, not by percentage bars.
 *    `projects` maps each technology to the case studies that used it.
 * -------------------------------------------------------------------------- */
export const skillLayers = [
  {
    layer: 'Languages & Core',
    blurb: 'The foundation everything else sits on',
    items: [
      { name: 'Java',     projects: ['txn-orchestrator', 'risk-manager', 'opshub'] },
      { name: 'SQL',      projects: ['txn-orchestrator', 'risk-manager', 'opshub'] },
      { name: 'Java EE',  projects: ['opshub'] },
      { name: 'Servlets', projects: ['opshub'] },
      { name: 'JDBC',     projects: ['opshub'] },
    ],
  },
  {
    layer: 'Frameworks',
    blurb: 'Where the business logic actually lives',
    items: [
      { name: 'Spring Boot',      projects: ['txn-orchestrator', 'risk-manager', 'opshub'] },
      { name: 'Spring Data JPA',  projects: ['txn-orchestrator', 'risk-manager', 'opshub'] },
      { name: 'Spring Security',  projects: ['risk-manager'] },
      { name: 'Hibernate',        projects: ['txn-orchestrator', 'risk-manager', 'opshub'] },
      { name: 'JWT',              projects: ['risk-manager'] },
      { name: 'REST APIs',        projects: ['txn-orchestrator', 'risk-manager', 'opshub'] },
    ],
  },
  {
    layer: 'Cloud & Serverless',
    blurb: 'AWS-native, event-driven by default',
    items: [
      { name: 'AWS Lambda',      projects: ['txn-orchestrator'] },
      { name: 'Step Functions',  projects: ['txn-orchestrator'] },
      { name: 'Amazon SQS',      projects: ['txn-orchestrator'] },
      { name: 'Amazon SNS',      projects: ['txn-orchestrator'] },
      { name: 'Secrets Manager', projects: ['txn-orchestrator'] },
      { name: 'CloudWatch',      projects: ['txn-orchestrator'] },
      { name: 'Amazon EC2',      projects: ['txn-orchestrator'] },
    ],
  },
  {
    layer: 'Data',
    blurb: 'Schema design and query tuning at volume',
    items: [
      { name: 'PostgreSQL', projects: ['txn-orchestrator'] },
      { name: 'MySQL',      projects: ['risk-manager', 'opshub'] },
      { name: 'Oracle',     projects: [] },
      { name: 'Apache Kafka', projects: [] },
      { name: 'RabbitMQ',   projects: [] },
    ],
  },
  {
    layer: 'DevOps & Quality',
    blurb: 'Shipping repeatably, and proving it works',
    items: [
      { name: 'Docker',         projects: ['txn-orchestrator'] },
      { name: 'Kubernetes',     projects: [] },
      { name: 'GitHub Actions', projects: ['txn-orchestrator'] },
      { name: 'Jenkins',        projects: ['risk-manager'] },
      { name: 'Maven',          projects: ['risk-manager', 'opshub'] },
      { name: 'JUnit',          projects: ['txn-orchestrator', 'risk-manager'] },
      { name: 'Mockito',        projects: ['txn-orchestrator', 'risk-manager'] },
      { name: 'Swagger/OpenAPI',projects: ['txn-orchestrator'] },
    ],
  },
]

/* ----------------------------------------------------------------------------
 * 4. LIVE FEED  —  "what I'm doing right now".
 *    ⚠️ Update these every couple of weeks. A stale feed is worse than none:
 *    recruiters read freshness as a proxy for momentum.
 *    type: 'shipping' | 'learning' | 'reading' | 'writing'
 * -------------------------------------------------------------------------- */
export const liveFeed = [
  {
    type: 'shipping',
    title: 'Reconciliation service hardening',
    detail: 'Tightening idempotency keys on the settlement path so retried webhooks can’t double-post a transaction.',
    tag: 'Spring Boot',
    time: 'Today',
  },
  {
    type: 'learning',
    title: 'Kubernetes operators',
    detail: 'Working through the operator pattern to manage stateful Spring services rather than hand-rolling deployment scripts.',
    tag: 'Kubernetes',
    time: '2 days ago',
  },
  {
    type: 'reading',
    title: 'Designing Data-Intensive Applications',
    detail: 'Chapter 9 — consensus and linearizability. Reframing how I think about the reconciliation ledger.',
    tag: 'Distributed Systems',
    time: 'This week',
  },
  {
    type: 'shipping',
    title: 'Step Functions retry tuning',
    detail: 'Replaced fixed-interval retries with exponential backoff + jitter after a provider outage caused a thundering herd.',
    tag: 'AWS',
    time: 'Last week',
  },
  {
    type: 'learning',
    title: 'Virtual threads (Project Loom)',
    detail: 'Benchmarking Java 21 virtual threads against the existing thread-pool model on I/O-bound payment calls.',
    tag: 'Java 21',
    time: 'Last week',
  },
]

/* ----------------------------------------------------------------------------
 * 5. EXPERIENCE TIMELINE
 * -------------------------------------------------------------------------- */
export const experience = [
  {
    role: 'Software Developer',
    company: 'TechValley PTY LTD',
    location: 'Johannesburg, South Africa',
    period: 'Jun 2024 — Present',
    current: true,
    summary: 'Own backend services on an AWS serverless payments platform — routing, reconciliation, receipting and cash-flow management for enterprise financial clients.',
  },
  {
    role: 'Software Developer',
    company: 'Genpact PTY LTD',
    location: 'Hyderabad, India',
    period: 'Apr 2022 — May 2024',
    current: false,
    summary: 'Built secured backend services for an enterprise risk-analysis platform used by global development teams for vulnerability and compliance reporting.',
  },
  {
    role: 'Junior Software Developer',
    company: 'Genpact PTY LTD',
    location: 'Hyderabad, India',
    period: 'Mar 2019 — Mar 2022',
    current: false,
    summary: 'Delivered backend features for an industrial operations platform integrating GE Historian and iFIX telemetry into real-time monitoring dashboards.',
  },
]

/* ----------------------------------------------------------------------------
 * 6. HERO TERMINAL  —  the typed boot sequence.
 * -------------------------------------------------------------------------- */
export const terminalLines = [
  { prompt: true,  text: 'whoami' },
  { prompt: false, text: 'venkata-sai — java backend developer' },
  { prompt: true,  text: 'cat ./focus.txt' },
  { prompt: false, text: 'spring boot · microservices · aws serverless' },
  { prompt: true,  text: './status --availability' },
  { prompt: false, text: 'johannesburg or remote · utc+2 · no sponsorship needed', ok: true },
]

/* ----------------------------------------------------------------------------
 * 7. CONTACT
 *    Get a free key at https://web3forms.com (takes ~30 seconds, no account).
 *    Paste it below and the form emails you directly — no backend needed.
 * -------------------------------------------------------------------------- */
export const WEB3FORMS_KEY = '496fd17c-d49c-43ec-ad99-ccaf9534aa7c'

export const navLinks = [
  { id: 'work',     label: 'Work' },
  { id: 'stack',    label: 'Stack' },
  { id: 'activity', label: 'Activity' },
  { id: 'path',     label: 'Path' },
  { id: 'contact',  label: 'Contact' },
]
