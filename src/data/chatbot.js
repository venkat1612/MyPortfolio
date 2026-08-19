/* ============================================================================
 *  CHATBOT KNOWLEDGE BASE
 *
 *  Fully scripted — no AI, no API key, no running cost, nothing to break.
 *  Matching is keyword-based: the user's question is scored against each
 *  topic's `keywords`, and the best scorer above the threshold wins.
 *
 *  To add a topic: copy a block, give it keywords a recruiter would actually
 *  type, and write the answer in your own voice. Order doesn't matter.
 * ========================================================================== */

export const chatbotIntro = {
  greeting:
    "Hi — I'm Venkata's assistant. Ask me about his experience, stack, availability or projects.",
  note: 'Scripted answers, not AI — so everything here is accurate.',
}

/* Shown as clickable chips when the panel opens. Keep to 5 — these are the
 * questions recruiters open with. */
export const starterQuestions = [
  'How many years of experience?',
  'What is your tech stack?',
  'Are you available for work?',
  'Tell me about your projects',
  'Can I see your CV?',
]

export const knowledgeBase = [
  {
    id: 'experience',
    keywords: ['experience', 'years', 'how long', 'seniority', 'senior', 'background', 'career'],
    answer:
      "7+ years building production Java systems, across three domains: cloud-native payment processing at TechValley (2024–present), an enterprise risk-analysis platform at Genpact (2022–2024), and industrial data integration at Genpact (2019–2022).",
  },
  {
    id: 'stack',
    keywords: ['stack', 'tech', 'technolog', 'skills', 'language', 'framework', 'what do you use', 'tools'],
    answer:
      "Core stack is Java with Spring Boot, Spring Framework, Spring Data JPA and Hibernate, building microservices and REST APIs. On the data side PostgreSQL, MySQL and Oracle. Cloud is AWS — Lambda, Step Functions, SQS, SNS, Secrets Manager and CloudWatch. Plus Docker, Kubernetes, Kafka, RabbitMQ, JUnit, Mockito, Maven and CI/CD through GitHub Actions and Jenkins.",
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'notice', 'start', 'when can you', 'looking', 'open to'],
    answer:
      "Yes — actively open to new roles. Permanent, full-time positions: on-site or hybrid in Johannesburg, or fully remote anywhere. No relocation or visa sponsorship needed. For exact notice period, drop a message through the contact form below.",
  },
  {
    id: 'location',
    keywords: ['where', 'based', 'located', 'location', 'city', 'country', 'timezone', 'time zone', 'south africa', 'johannesburg'],
    answer:
      "Johannesburg, South Africa — UTC+2. That gives a full working-day overlap with UK, EU and Gulf teams, which is why remote work across those regions is straightforward.",
  },
  {
    id: 'remote',
    keywords: ['remote', 'onsite', 'on-site', 'hybrid', 'work from home', 'office', 'relocat'],
    answer:
      "Both work. Happy to be on-site or hybrid in the Johannesburg area, and equally set up for fully remote roles anywhere. No relocation required and no visa sponsorship needed.",
  },
  {
    id: 'visa',
    keywords: ['visa', 'sponsor', 'work permit', 'authorisation', 'authorization', 'right to work', 'citizen'],
    answer:
      "No sponsorship required — able to work without a company sponsoring a visa or permit.",
  },
  {
    id: 'projects',
    keywords: ['project', 'built', 'work on', 'portfolio', 'case study', 'what have you', 'shipped'],
    answer:
      "Three production systems. Transaction Workflow Orchestrator — an AWS serverless payments platform handling routing, reconciliation and receipting for enterprise financial clients. Risk Manager — an enterprise platform surfacing application vulnerabilities through static and dynamic code analysis. OpsHub — industrial telemetry pulling real-time GE Historian and iFIX data into manufacturing dashboards. Full write-ups are in the Work section above.",
  },
  {
    id: 'payments',
    keywords: ['payment', 'fintech', 'banking', 'financial', 'transaction', 'debicheck', 'gateway', 'reconcil'],
    answer:
      "Payments is the current domain. At TechValley he builds Spring Boot microservices for payment processing, transaction routing, reconciliation and receipting, and owns integration with payment gateways, DebiCheck and AVS verification. Retry, Circuit Breaker and Rate Limiter patterns keep it stable when providers fail.",
  },
  {
    id: 'cloud',
    keywords: ['aws', 'cloud', 'serverless', 'lambda', 'azure', 'gcp', 'infrastructure'],
    answer:
      "AWS, hands-on daily: Lambda, EC2, Step Functions, SQS, SNS, Secrets Manager and CloudWatch, plus Docker and Kubernetes for containerised workloads. The current platform is serverless and event-driven end-to-end. Azure isn't part of his production experience yet.",
  },
  {
    id: 'microservices',
    keywords: ['microservice', 'architecture', 'distributed', 'soa', 'design', 'scale', 'api'],
    answer:
      "Microservices and REST API design are central to the work — service boundaries, versioned contracts documented with Swagger/OpenAPI, event-driven orchestration through AWS Step Functions, and resilience patterns so one failing dependency doesn't take the system down.",
  },
  {
    id: 'database',
    keywords: ['database', 'sql', 'postgres', 'mysql', 'oracle', 'nosql', 'mongo', 'data'],
    answer:
      "PostgreSQL on the current payments platform, MySQL across both Genpact projects, plus Oracle. Day-to-day that means schema design, query optimisation and transaction handling — including tuning SQL to hold performance as transaction volumes grew.",
  },
  {
    id: 'testing',
    keywords: ['test', 'testing', 'junit', 'mockito', 'quality', 'tdd', 'coverage', 'qa'],
    answer:
      "JUnit and Mockito for unit and integration tests, Postman for API validation, and peer code review as standard. Tests are written alongside the feature, not bolted on before release.",
  },
  {
    id: 'devops',
    keywords: ['devops', 'ci', 'cd', 'pipeline', 'jenkins', 'deploy', 'docker', 'kubernetes', 'container'],
    answer:
      "CI/CD with GitHub Actions on the current platform and Jenkins at Genpact, with Maven builds and Git throughout. Services are containerised with Docker, and Kubernetes is part of the toolkit for orchestration.",
  },
  {
    id: 'support',
    keywords: ['support', 'production', 'incident', 'debug', 'troubleshoot', 'maintenance', 'on call', 'standby'],
    answer:
      "Production support is a real part of the job, not an afterthought — leading root-cause investigation through CloudWatch log analysis and driving durable fixes rather than patching symptoms. Comfortable with stand-by and maintenance responsibilities.",
  },
  {
    id: 'agile',
    keywords: ['agile', 'scrum', 'kanban', 'sprint', 'team', 'collaborat', 'process', 'methodology'],
    answer:
      "Agile delivery throughout — sprint planning, backlog refinement, code reviews and demos, working directly with Business Analysts, QA and Scrum Masters. Used to owning a deliverable end-to-end and reporting progress against it.",
  },
  {
    id: 'cv',
    keywords: ['cv', 'resume', 'download', 'pdf', 'document'],
    answer:
      "The Download Resume button at the top of the page gets you the full CV as a PDF — experience, complete tech stack and project detail.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'get in touch', 'call', 'phone', 'linkedin', 'github', 'hire', 'interview'],
    answer:
      "The contact form at the bottom of this page goes straight to his inbox, and every genuine message gets a reply within 24 hours. LinkedIn and GitHub are linked in the footer.",
  },
  {
    id: 'salary',
    keywords: ['salary', 'rate', 'package', 'compensation', 'pay', 'cost', 'expectation', 'ctc'],
    answer:
      "Best discussed directly, since it depends on the role, scope and whether it's permanent or contract. Send the details through the contact form and he'll come back to you.",
  },
]

/* Anything scoring below this is treated as unmatched and routed to contact. */
export const MATCH_THRESHOLD = 1

export const fallbackAnswer =
  "That's one for Venkata directly — I only cover the basics. Use the contact form at the bottom of the page and he'll get back to you within 24 hours."
