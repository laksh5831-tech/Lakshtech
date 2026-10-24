export const brand = {
  name: "LakshTech Solutions",
  shortName: "LakshTech",
  tagline: "Building Digital Solutions for Tomorrow",
  email: "hello@lakshtech.example",
  projectsEmail: "projects@lakshtech.example",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  addressLines: ["2nd Floor, Anna Nagar Tower,", "Anna Nagar, Madurai 625020"],
  hours: ["Monday to Friday", "09:30 to 18:30 IST"],
  founded: 2021,
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", children: "services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export const services = [
  {
    slug: "website-development",
    title: "Website Development",
    group: "Build",
    summary:
      "Business websites, portals and content platforms built to load quickly, rank well and stay easy for your team to edit without a developer.",
    features: [
      "Responsive layouts tested from 320px upward",
      "CMS integration so editors publish on their own",
      "Core Web Vitals budgets agreed before build",
      "SEO-friendly structure, metadata and redirects",
    ],
  },
  {
    slug: "frontend-development",
    title: "Frontend Development",
    group: "Build",
    summary:
      "Component-based interfaces built on a shared design system, so new screens are assembled from parts instead of rewritten from scratch.",
    features: [
      "React, Vue or lightweight vanilla builds",
      "Component library with usage documentation",
      "WCAG 2.1 AA contrast and keyboard support",
      "Cross-browser and real device testing",
    ],
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    group: "Platform",
    summary:
      "APIs, data models and third-party integrations designed around security, observability and a running cost you can predict at scale.",
    features: [
      "REST or GraphQL APIs with a versioning policy",
      "Authentication, roles and audit trails",
      "Database modelling, indexing and migration plans",
      "Containerised builds with CI/CD pipelines",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    group: "Build",
    summary:
      "Android and iOS apps that hold up on slow networks, released through the stores with version management and crash monitoring handled.",
    features: [
      "Native and cross-platform delivery",
      "Offline-first data with background sync",
      "Push notifications and deep linking",
      "Store submission and release rollout",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    group: "Design",
    summary:
      "Research, wireframes and interface design that are validated with real users before engineering hours are spent on the wrong screen.",
    features: [
      "User interviews and competitor review",
      "Wireframes and clickable prototypes",
      "Design tokens and component specifications",
      "Accessibility and usability testing rounds",
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    group: "Platform",
    summary:
      "Storefronts and checkouts built for large catalogues and mobile shoppers, with the payment and tax flows of your target markets included.",
    features: [
      "Headless storefront and catalogue management",
      "Fast search, filtering and recommendations",
      "Payment, tax and shipping integrations",
      "Analytics and abandoned-cart recovery",
    ],
  },
];

export const serviceGroups = ["All", "Build", "Platform", "Design"];

export const capabilities = [
  {
    title: "Web Development",
    summary:
      "Modern, responsive websites and web apps built for performance, accessibility and growth.",
    to: "/services#website-development",
  },
  {
    title: "Mobile App Development",
    summary:
      "Native and cross-platform apps with clear UX and measured performance across devices.",
    to: "/services#mobile-app-development",
  },
  {
    title: "Backend & APIs",
    summary:
      "Secure, scalable APIs and cloud-ready backends designed to power your product reliably.",
    to: "/services#backend-development",
  },
];

export const capabilitiesDetailed = [
  {
    title: "Website Development",
    summary:
      "Marketing sites, portals and web applications built to load fast, rank well and stay easy to change.",
    to: "/services#website-development",
  },
  {
    title: "Frontend Development",
    summary:
      "Accessible, responsive interfaces with a component system, tested in real browsers and on real devices.",
    to: "/services#frontend-development",
  },
  {
    title: "Backend Development",
    summary:
      "APIs, databases and integrations designed around security, observability and a predictable cost to run.",
    to: "/services#backend-development",
  },
  {
    title: "Mobile App Development",
    summary:
      "Native and cross-platform apps with offline support, push notifications and store-ready release builds.",
    to: "/services#mobile-app-development",
  },
  {
    title: "UI/UX Design",
    summary:
      "Research, wireframes and interface design that reduce support tickets and lift conversion on the pages that matter.",
    to: "/services#ui-ux-design",
  },
  {
    title: "E-commerce Development",
    summary:
      "Storefronts, catalogues, payment and shipping integrations built for fast catalogues and clean checkouts.",
    to: "/services#ecommerce-development",
  },
];

export const categories = [
  { value: "all", label: "All projects" },
  { value: "web-development", label: "Web Development" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "iot-hardware", label: "IoT & Hardware" },
];

export const projects = [
  {
    slug: "aurora-analytics",
    title: "Aurora Analytics",
    category: "web-development",
    categoryLabel: "Web Development",
    year: 2025,
    summary:
      "A reporting platform for retail teams that turns raw store data into shareable dashboards, with role-based access and scheduled email summaries.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    image: "/assets/images/projects/aurora-analytics.svg",
    featured: true,
  },
  {
    slug: "medibook",
    title: "MediBook",
    category: "web-development",
    categoryLabel: "Web Development",
    year: 2024,
    summary:
      "An appointment platform that lets patients filter by speciality and confirm a consultation slot without calling the clinic.",
    stack: ["Next.js", "Django", "PostgreSQL", "Redis"],
    image: "/assets/images/projects/medibook.svg",
    featured: true,
  },
  {
    slug: "laksh-design-system",
    title: "Laksh Design System",
    category: "ui-ux-design",
    categoryLabel: "UI/UX Design",
    year: 2024,
    summary:
      "An internal design system with colour tokens, a type scale and documented components, adopted across every client product we build.",
    stack: ["Figma", "Design tokens", "WCAG 2.1 AA"],
    image: "/assets/images/projects/laksh-design-system.svg",
    featured: false,
  },
  {
    slug: "wellness-companion",
    title: "Wellness Companion",
    category: "mobile-apps",
    categoryLabel: "Mobile Apps",
    year: 2023,
    summary:
      "A habit-tracking app for Android and iOS with offline logging, streak reminders and a subscription tier built into the release pipeline.",
    stack: ["Flutter", "Firebase", "Offline-first"],
    image: "/assets/images/projects/wellness-app.svg",
    featured: false,
  },
  {
    slug: "aurora-living",
    title: "AURORA Living",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    year: 2025,
    summary:
      "A homeware storefront with a fast catalogue, saved baskets and a checkout tuned for mobile shoppers in three markets.",
    stack: ["Headless CMS", "React", "Stripe", "Search"],
    image: "/assets/images/projects/aurora-storefront.svg",
    featured: true,
  },
  {
    slug: "secure-checkout-flow",
    title: "Secure Checkout Flow",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    year: 2024,
    summary:
      "A checkout rebuild that removed one field, grouped the totals and cut the number of steps, with tokenised payments and address lookup.",
    stack: ["Checkout UX", "Tokenisation", "A/B testing"],
    image: "/assets/images/projects/checkout-flow.svg",
    featured: false,
  },
  {
    slug: "fleet-command",
    title: "Fleet Command",
    category: "web-development",
    categoryLabel: "Web Development",
    year: 2023,
    summary:
      "A logistics control panel for dispatchers that combines live shipment status, route density and fleet utilisation in a single screen.",
    stack: ["React", "GraphQL", "Docker", "Cloudflare"],
    image: "/assets/images/projects/fleet-command.svg",
    featured: false,
  },
  {
    slug: "sanjeevani-health",
    title: "Sanjeevani Health",
    category: "web-development",
    categoryLabel: "Web Development",
    year: 2025,
    summary:
      "A patient portal for a clinic network, joining appointment booking, medical records and vitals tracking under one login.",
    stack: ["Next.js", "Python", "HIPAA-minded", "PostgreSQL"],
    image: "/assets/images/projects/sanjeevani-health.svg",
    featured: false,
  },
];

export const stats = [
  { value: 120, suffix: "+", decimals: 0, label: "Projects delivered across web, mobile and cloud" },
  { value: 96, suffix: "%", decimals: 0, label: "Releases shipped within the committed sprint" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average client rating on completed engagements" },
  { value: 60, suffix: "+", decimals: 0, label: "Engineers, designers and QA specialists" },
];

export const testimonials = [
  {
    quote:
      "They shipped the reporting module in three sprints and the handover documentation meant our internal team could maintain it without any external support.",
    initials: "RK",
    name: "Ramesh Kulkarni",
    role: "Head of Product, Kaveri Retail",
  },
  {
    quote:
      "The booking flow they designed cut our call volume sharply. What mattered most was that they pushed back on our original scope instead of building the wrong thing.",
    initials: "SR",
    name: "Sneha Raghavan",
    role: "Founder, MediBook Health",
  },
  {
    quote:
      "Their team joined our stand-ups, respected our release train and still moved fast. The tracking dashboard is now used by our dispatchers every single morning.",
    initials: "IS",
    name: "Imran Sheikh",
    role: "CTO, FleetLine Logistics",
  },
];

export const team = [
  {
    name: "Lakshmanan Sundaram",
    role: "Founder & Lead Engineer",
    location: "Madurai",
    bio: "Writes the architecture for every engagement and reviews the code that ships.",
    image: "/assets/images/team/member-1.jpg",
  },
  {
    name: "Meera Krishnan",
    role: "Head of Product Design",
    location: "Coimbatore",
    bio: "Leads research, interface design and the accessibility pass on every product we ship.",
    image: "/assets/images/team/member-2.jpg",
  },
  {
    name: "Karthik Selvam",
    role: "Backend & Cloud Lead",
    location: "Tiruchirappalli",
    bio: "Designs APIs, data models and deployment pipelines that stay cheap to run as traffic grows.",
    image: "/assets/images/team/member-3.jpg",
  },
  {
    name: "Sneha Iyer",
    role: "Mobile Engineering Lead",
    location: "Chennai",
    bio: "Ships cross-platform apps for field teams and customers who are often offline.",
    image: "/assets/images/team/member-4.jpg",
  },
];

export const values = [
  {
    title: "Ownership",
    body: "We treat your product as our product until handover, including the bugs we did not introduce.",
  },
  {
    title: "Clarity",
    body: "Written scope, visible progress and honest estimates. No surprises at the final invoice.",
  },
  {
    title: "Craft",
    body: "Code review, automated tests and accessibility checks are part of the definition of done.",
  },
  {
    title: "Continuity",
    body: "We plan for the day we hand over: documented systems, runbooks and a team that can maintain it.",
  },
];

export const timeline = [
  {
    year: "2021",
    title: "Founded as a four-person studio",
    body: "The first engagement was a customer portal for a regional logistics operator, delivered on a fixed scope in eight weeks.",
  },
  {
    year: "2022",
    title: "First full platform build",
    body: "A multi-tenant analytics platform with role-based access, marking the start of our backend and cloud practice.",
  },
  {
    year: "2023",
    title: "Mobile practice launched",
    body: "Cross-platform app delivery for field teams, with offline-first data handling added to our standard process.",
  },
  {
    year: "2024",
    title: "Design system and accessibility standard",
    body: "Every project moved onto a shared component library and an automated WCAG contrast and keyboard-navigation check.",
  },
  {
    year: "2025",
    title: "Long-term support programme",
    body: "A retainer offering for clients who need small, continuous improvements rather than new project work.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    body: "Two weeks of questions about your users, your data and the one constraint that actually matters for this build.",
  },
  {
    step: "02",
    title: "Plan",
    body: "A written scope, an architecture sketch and a delivery plan you can read, challenge and sign off before we write code.",
  },
  {
    step: "03",
    title: "Build",
    body: "Two-week sprints, a working demo at the end of each one, and a visible backlog you can reprioritise at any time.",
  },
  {
    step: "04",
    title: "Support",
    body: "Launch, monitoring, fixes and small improvements, either as a retainer or as a one-off engagement.",
  },
];

export const engagementIncludes = [
  "A named squad with one point of contact",
  "Code review on every change before it merges",
  "Automated tests covering the critical paths",
  "WCAG 2.1 AA accessibility checks on each screen",
  "A CI/CD pipeline and a staging environment",
  "Technical documentation and a handover session",
  "An exit plan agreed at kickoff, not at the end",
];

export const serviceFaqs = [
  {
    q: "How long does a typical project take?",
    a: "A focused website takes six to ten weeks. A customer platform usually runs twelve to twenty weeks, and a mobile product is planned in two-week sprints so you can see progress from week three.",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Yes. We start with a short technical review to understand the architecture, the deployment setup and the parts that need attention first. That review is paid work, and its findings are yours to keep.",
  },
  {
    q: "How do you price a project?",
    a: "Fixed scope projects are quoted against a written specification. Ongoing work is billed per sprint with the squad size and rate agreed up front, so you always know the monthly cost before the sprint starts.",
  },
  {
    q: "What happens after launch?",
    a: "You get the repository, the infrastructure, the documentation and a recorded handover walkthrough. After that you can run the product entirely on your own, or keep us on a support retainer for monitoring, fixes and iteration.",
  },
  {
    q: "Do you sign an NDA before we share details?",
    a: "We are happy to sign your NDA, or to work under the confidentiality terms in your standard contract. We do not use client details or screenshots in marketing without written permission.",
  },
  {
    q: "How do we get started?",
    a: "Send a short brief through the contact form. We reply within one working day with a suggested team, an outline approach and any questions we still need answered.",
  },
];

export const contactFaqs = [
  {
    q: "Do you take on small projects?",
    a: "Yes, provided the scope is clear and the work fits inside a sprint. A two-week audit, a focused landing page or a single integration are all reasonable places to start.",
  },
  {
    q: "What information should I include?",
    a: "The outcome you need, who will use the product, the deadline that matters and the budget range you are working with. Everything else can be worked out together on a call.",
  },
  {
    q: "How quickly will you reply?",
    a: "Within one working day for briefs sent during business hours. Urgent requests should use the phone number so we can pick them up sooner.",
  },
  {
    q: "Is my information safe with you?",
    a: "We are happy to sign your NDA before you share anything, and we keep client details out of case studies and marketing unless you give written permission.",
  },
];

export const techLogos = [
  { slug: "react", label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "python", label: "Python" },
  { slug: "django", label: "Django" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "graphql", label: "GraphQL" },
  { slug: "tailwindcss", label: "Tailwind CSS" },
  { slug: "docker", label: "Docker" },
  { slug: "figma", label: "Figma" },
  { slug: "flutter", label: "Flutter" },
  { slug: "firebase", label: "Firebase" },
  { slug: "redis", label: "Redis" },
  { slug: "mongodb", label: "MongoDB" },
  { slug: "git", label: "Git" },
];

export const metaRow = [
  { label: "Engagement model", value: "Dedicated squads" },
  { label: "Delivery cadence", value: "Two-week sprints" },
  { label: "Support window", value: "24/7 handover" },
];

export const socials = [];

export const careersOpenings = [
  {
    id: "lead-frontend-engineer",
    title: "Lead Frontend Systems Engineer",
    department: "Frontend Atelier",
    location: "Madurai / Hybrid",
    type: "Full-Time",
    experience: "4+ years",
    compensation: "₹14L – ₹22L / year",
    summary:
      "Architect resilient web interfaces, design systems, and high-performance client applications using React 19, TypeScript, and modern CSS/motion tokens.",
    requirements: [
      "Deep fluency in React 19, TypeScript, and Tailwind CSS v4",
      "Experience building accessible UI components conforming to WCAG 2.1 AA",
      "Understanding of Core Web Vitals optimization and browser rendering lifecycles",
      "Ability to translate complex Figma prototypes into silky, micro-interaction rich code",
    ],
    deliverables: [
      "Maintain our shared design tokens and component libraries across client projects",
      "Conduct thorough architectural code reviews for junior and mid-level makers",
      "Participate directly in client technical scoping and two-week sprint demos",
    ],
  },
  {
    id: "senior-backend-architect",
    title: "Senior Backend & Platform Architect",
    department: "Cloud & Systems",
    location: "Madurai / Remote (India)",
    type: "Full-Time",
    experience: "5+ years",
    compensation: "₹16L – ₹26L / year",
    summary:
      "Engineer scalable APIs, robust data models, and automated deployment infrastructure designed for high availability and low latency (<50ms).",
    requirements: [
      "Extensive experience with Node.js, Python, or Go in production environments",
      "PostgreSQL schema design, indexing, and migration strategies at scale",
      "Containerization with Docker, CI/CD pipelines, and cloud telemetry",
      "Experience designing RESTful and GraphQL APIs with strict versioning policies",
    ],
    deliverables: [
      "Design backend architecture and security runbooks for client platforms",
      "Enforce database integrity, backup redundancy, and audit logging",
      "Provide clear technical handover documentation that client teams can operate independently",
    ],
  },
  {
    id: "ui-ux-product-designer",
    title: "UI/UX & Design Systems Specialist",
    department: "Product Design",
    location: "Madurai / Hybrid",
    type: "Full-Time",
    experience: "3+ years",
    compensation: "₹10L – ₹18L / year",
    summary:
      "Lead client product discovery, craft cohesive design systems in Figma, and design intentional user journeys that balance luxury aesthetics with usability.",
    requirements: [
      "Mastery of Figma (auto-layout, components, variables, tokens)",
      "Proven portfolio demonstrating typography hierarchy, spacing discipline, and restrained aesthetics",
      "Familiarity with modern web capabilities (Tailwind CSS, SVG, CSS keyframes)",
      "Experience running user testing sessions and validating wireframes before engineering begins",
    ],
    deliverables: [
      "Deliver production-ready Figma design libraries and clickable prototypes",
      "Collaborate daily with frontend engineers to ensure design fidelity in code",
      "Create documentation for clients explaining component usage and branding guidelines",
    ],
  },
];

export const careerPerks = [
  {
    number: "01",
    title: "14-Day Sprint Rhythms",
    description:
      "No crunch, no 70-hour weeks. We plan scopes realistically in two-week blocks with clear working demo closures and respect for evenings and weekends.",
  },
  {
    number: "02",
    title: "Craft-First Engineering",
    description:
      "Every change is code-reviewed, tested, and polished. You will never be told to rush broken code out the door to meet an arbitrary marketing deadline.",
  },
  {
    number: "03",
    title: "High-Spec Atelier Gear",
    description:
      "Top-tier hardware of your choice (Apple Silicon or high-spec Linux/Windows workstations), 4K displays, and full tool & software subscriptions.",
  },
  {
    number: "04",
    title: "Paid Learning & Books",
    description:
      "Annual learning stipend for courses, technical books, and conference tickets. We invest in people who want to master their craft.",
  },
];

export const careerHiringProcess = [
  {
    step: "01",
    title: "Architectural Intro",
    duration: "30 mins",
    description:
      "A casual conversation with an engineering lead about your past projects, how you like to work, and what we are building together.",
  },
  {
    step: "02",
    title: "Code Walkthrough",
    duration: "45 mins",
    description:
      "No leetcode puzzle riddles. Bring a real repository or project you are proud of, and we talk through architecture, trade-offs, and decisions.",
  },
  {
    step: "03",
    title: "Paid Mini-Trial",
    duration: "1-2 days",
    description:
      "A small, real-world task paid at our standard senior contractor rate. You evaluate how our squad works, and we evaluate your craftsmanship.",
  },
  {
    step: "04",
    title: "Transparent Offer",
    duration: "Within 48 hours",
    description:
      "A formal offer with clear compensation, benefits breakdown, equipment choice, and your confirmed start date in the atelier.",
  },
];
