import { PortfolioContext } from './types';

const portfolio: PortfolioContext = {
  name: "Shivang Dwivedi",
  headline: "Founding Engineer @ Beat22",
  location: "Chandigarh, India",

  about: `Founding Engineer with hands-on experience building and scaling production-grade platforms from zero to one. I own architecture, backend systems, infrastructure, and product delivery end to end. I obsessively architect elastic, fault-tolerant distributed backend systems that solve real-world challenges.

I blend deep expertise in cloud-native architectures — serverless, containerization, Infrastructure-as-Code — with strong business acumen to bridge the gap between engineering teams and stakeholders. I deliver robust, scalable solutions that drive growth.

Passionate about automation, observability, and DevSecOps best practices, I continuously optimize performance and reliability. I translate complex technical concepts into actionable insights for both technical and non-technical audiences, ensuring alignment and accelerating innovation.

At Beat22, I joined as a founding engineer and led the development of India's first digital sound marketplace. I built and scaled core platform systems including a secure, encrypted HLS-based audio streaming pipeline, a distributed upload system handling 3,000+ uploads with zero breakage, recommendation engines, a credits and wallet system, and KYC-based authentication integrating Aadhaar and passport verification.

I think in distributed systems but care about the end user experience. I optimize for reliability over hype, clarity over complexity, and ownership over delegation.`,

  skills: {
    "Languages": ["TypeScript", "JavaScript", "Python", "Go", "C", "C++", "SQL", "Bash Scripting"],
    "Frontend": ["React", "Next.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion"],
    "Backend & Systems": ["Node.js", "Express", "NestJS", "FastAPI", "GraphQL", "REST APIs"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra"],
    "DevOps & Infrastructure": ["Docker", "Kubernetes", "Helm Charts", "Jenkins", "Nginx", "AWS SAM", "CloudFormation", "CI/CD Pipelines"],
    "Observability": ["Grafana", "Prometheus", "OpenTelemetry", "Loki", "Jaeger", "SonarQube"],
    "AI & Machine Learning": ["Keras", "TensorFlow", "scikit-learn", "PyTorch", "ANN", "CNN", "Transformers"],
    "Platforms & Tools": ["AWS (Lambda, S3, EC2, CloudWatch)", "Apache Kafka", "RabbitMQ", "Supabase", "Prisma", "Nx Monorepo", "Vercel", "Jest"],
  },

  experience: [
    {
      role: "Founding Engineer",
      company: "Beat22",
      period: "July 2025 — Present",
      description: "Owned 0-to-1 engineering across multiple products at India's first digital sound marketplace — a SaaS-enabled B2B marketplace for Asian musicians. Taking ideas from rough brief to architecture, implementation, and launch. Built and scaled core platform systems end to end.",
      achievements: [
        "Built a secure, encrypted HLS-based audio streaming pipeline that allows streaming without exposing MP3 or source files — handled 3,000+ uploads in production with zero breakage",
        "Designed and shipped scalable backend systems (microservices, queues, caching, background jobs) on AWS, improving reliability and cutting API latency and infra costs",
        "Built recommendation algorithms for ranking and personalization with tracking and monitoring",
        "Implemented a credits and wallet system for the marketplace",
        "Shipped a secure KYC-based authentication flow integrating Aadhaar and passport verification for compliant asset selling",
        "Set up CI/CD, monitoring, logging, and performance optimizations ensuring reliability and fast iteration",
        "Drove frontend performance by refactoring components, reducing bundle size, wiring CI/CD pipelines, and adding performance monitoring — resulting in faster releases and quicker page loads",
      ],
      tools: ["Node.js", "AWS", "HLS Streaming", "Microservices", "Kafka", "Redis", "Next.js", "CI/CD"],
    },
    {
      role: "Cloud Infra & DevOps Intern",
      company: "IndiaP2P (Fintech)",
      period: "Jan 2025 — June 2025",
      description: "Managed cloud infrastructure and DevOps at a fintech startup. Built serverless systems using AWS SAM and CloudFormation, automated deployments, and achieved significant cost and speed improvements.",
      achievements: [
        "Built and deployed serverless applications with AWS SAM, integrating MongoDB with advanced data aggregation pipelines to eliminate redundancy and optimize performance",
        "Instrumented services with OpenTelemetry, centralized logs in Loki and Grafana, and streamlined build workflows for rapid reliable releases",
        "Architected and deployed highly secure automated CI/CD pipelines via Jenkins, enforcing strict quality checks",
        "Designed a comprehensive Jest-driven development strategy with extensive unit and integration tests",
        "Introduced a multi-stack CloudFormation workflow to overcome framework limitations",
        "Achieved approximately 20% cost reduction and 30% faster CI/CD pipelines through build, deployment, and infrastructure optimizations",
      ],
      tools: ["AWS SAM", "CloudFormation", "Jenkins", "OpenTelemetry", "Grafana", "Loki", "Jest", "MongoDB"],
    },
    {
      role: "Web Developer Intern",
      company: "Onfinance (Fintech)",
      period: "March 2023 — Nov 2023",
      description: "Focused on frontend engineering at a fintech product company — building scalable user interfaces, improving SEO, and optimizing web performance.",
      achievements: [
        "Built and deployed dynamic websites and applications with high user engagement",
        "Implemented innovative SEO strategies to enhance web content across platforms",
        "Optimized site performance and user experience through testing and updates",
      ],
      tools: ["React", "JavaScript", "SEO", "Performance Optimization"],
    },
  ],

  education: [
    {
      degree: "Bachelor of Technology in Electronics and Communication",
      institution: "Chandigarh College of Engineering & Technology (Degree Wing), Panjab University",
      period: "2021 — 2025",
      description: "Studied at Panjab University in Chandigarh. Focused on core engineering fundamentals while self-directing deep into software engineering, distributed systems, and cloud infrastructure. Built multiple full-stack projects during this period.",
      highlights: ["Data Structures & Algorithms", "Operating Systems", "OOPs", "DBMS", "Machine Learning"],
    },
  ],

  projects: [
    {
      title: "Distributed Multivendor SaaS Platform",
      tagline: "Full-stack marketplace with microservices, observability, and real-time features.",
      description: "Architected an end-to-end multivendor SaaS platform with 3 roles (user/seller/admin), 10+ core feature modules (auth with OTP reset, seller onboarding, products, discounts, cart/wishlist, orders, coupons, notifications, chat, recommendations) and 30+ secured API endpoints. Implemented Kafka-based user activity tracking, Stripe onboarding for sellers, and full observability with Prometheus, Grafana, OpenTelemetry, Loki, and Jaeger across all microservices. Managed in a single Nx monorepo with 2 frontends (user/seller) plus an admin dashboard.",
      tech: ["Nx Monorepo", "Kafka", "Node.js", "GraphQL", "Next.js", "Grafana", "Prometheus"],
      year: "2025",
    },
    {
      title: "Firecracker-Powered AI Coding Agent Platform",
      tagline: "Sandboxed AI coding environment with VM-level isolation.",
      description: "Built a sandboxed coding agent with 4 tools (Shell, Code Exec, xdot, FS) in a hardened Docker image with display server, noVNC, and Jupyter. Designed a context engine handling 1M+ tokens using file-based state, pruning, and structured metadata for fast recall. Implemented an orchestration API with 2 REST endpoints that spin up 1 Firecracker VM per job and return a downloadable project bundle.",
      tech: ["Python", "REST APIs", "Firecracker", "noVNC", "Docker"],
      year: "2025",
    },
    {
      title: "Conversational Portfolio",
      tagline: "This very experience you're interacting with right now.",
      description: "A portfolio reimagined as a dialogue. Instead of scrolling through static sections, visitors explore the story through conversation powered by a personal AI assistant with strict context boundaries. Built with Next.js, Framer Motion, and OpenAI API.",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "OpenAI API"],
      year: "2026",
    },
    {
      title: "MeTube — Video Streaming App",
      tagline: "YouTube-inspired streaming platform built with React.",
      description: "A video streaming application exploring media delivery, component architecture, and real-time UI patterns. Built as a React project.",
      tech: ["React", "JavaScript", "APIs", "CSS"],
      year: "2024",
    },
  ],

  achievements: [
    "Built India's first digital sound marketplace from zero to production as founding engineer",
    "Designed an HLS streaming pipeline handling 3,000+ uploads with zero breakage",
    "Achieved 20% infra cost reduction and 30% faster CI/CD pipelines at IndiaP2P",
    "Built a multivendor SaaS platform with 10+ modules, 30+ API endpoints, and full observability stack",
    "Designed an AI coding agent platform with Firecracker VM isolation and 1M+ token context engine",
    "569 GitHub commits in the past year",
    "2,285 LinkedIn connections, active in the engineering community",
  ],

  interests: [
    "Distributed Systems",
    "Cloud-Native Architecture",
    "DevOps & Observability",
    "Serverless Computing",
    "AI Infrastructure",
    "System Design",
    "Open Source",
    "Music Technology",
  ],

  workStyle: "I own problems end to end — from architecture to deployment to monitoring. I work best in high-autonomy environments where I can prototype fast, instrument everything, and iterate with production data. I value async communication, deep focus blocks, and teams that trust engineers to make decisions.",

  personality: "Obsessively systematic. I build with the assumption that every system will break and design accordingly. I care about infrastructure as much as the product layer. I translate complex technical concepts into clear insights for any audience.",

  values: [
    "Ownership over delegation",
    "Reliability over hype",
    "Clarity over complexity",
    "Ship fast, instrument everything",
  ],

  contact: {
    email: "shivang4857@gmail.com",
    github: "https://github.com/shivang4857",
    linkedin: "https://www.linkedin.com/in/shivang4857/",
    twitter: "https://x.com/shivang_4857",
  },

  faqs: [
    {
      question: "What kind of work are you looking for?",
      answer: "I'm looking for founding engineer or senior backend/platform roles where I can own systems end to end — architecture, infrastructure, and product delivery. I thrive in 0-to-1 environments building real products at scale.",
    },
    {
      question: "Are you open to freelance or contract work?",
      answer: "I'm open to select opportunities, particularly in backend engineering, cloud infrastructure, and platform architecture.",
    },
    {
      question: "What's your preferred tech stack?",
      answer: "I'm most productive with TypeScript/Node.js on the backend, AWS for infrastructure, Docker/K8s for orchestration, and the full observability stack (Grafana, Prometheus, OpenTelemetry). On the frontend, React/Next.js with Tailwind.",
    },
    {
      question: "What makes you different?",
      answer: "I've built and scaled production systems from scratch as a founding engineer — not just features, but entire platforms. I think in distributed systems, instrument everything from day one, and own the full stack from CI/CD to user-facing features.",
    },
    {
      question: "What is Beat22?",
      answer: "Beat22 is India's first SaaS-enabled B2B marketplace for Asian musicians. It's a platform where music and sound producers can market, sell, monetize, and license original beats and sounds. I built the core platform as the founding engineer.",
    },
  ],
};

export function getPortfolioContext(): PortfolioContext {
  return portfolio;
}

export function serializeContext(ctx: PortfolioContext): string {
  const sections: string[] = [];

  sections.push(`NAME: ${ctx.name}`);
  sections.push(`HEADLINE: ${ctx.headline}`);
  sections.push(`LOCATION: ${ctx.location}`);
  sections.push(`\nABOUT:\n${ctx.about}`);

  sections.push(`\nSKILLS:`);
  for (const [category, skills] of Object.entries(ctx.skills)) {
    sections.push(`  ${category}: ${skills.join(', ')}`);
  }

  sections.push(`\nEXPERIENCE:`);
  for (const exp of ctx.experience) {
    sections.push(`  ${exp.role} at ${exp.company} (${exp.period})`);
    sections.push(`  ${exp.description}`);
    sections.push(`  Achievements: ${exp.achievements.join('; ')}`);
    sections.push(`  Tools: ${exp.tools.join(', ')}`);
    sections.push('');
  }

  sections.push(`EDUCATION:`);
  for (const edu of ctx.education) {
    sections.push(`  ${edu.degree}, ${edu.institution} (${edu.period})`);
    sections.push(`  ${edu.description}`);
    sections.push(`  Key areas: ${edu.highlights.join(', ')}`);
  }

  sections.push(`\nPROJECTS:`);
  for (const proj of ctx.projects) {
    sections.push(`  ${proj.title} (${proj.year}) — ${proj.tagline}`);
    sections.push(`  ${proj.description}`);
    sections.push(`  Tech: ${proj.tech.join(', ')}`);
    sections.push('');
  }

  sections.push(`ACHIEVEMENTS: ${ctx.achievements.join('; ')}`);
  sections.push(`\nINTERESTS: ${ctx.interests.join(', ')}`);
  sections.push(`\nWORK STYLE: ${ctx.workStyle}`);
  sections.push(`\nPERSONALITY: ${ctx.personality}`);
  sections.push(`\nVALUES: ${ctx.values.join('; ')}`);

  sections.push(`\nCONTACT:`);
  sections.push(`  Email: ${ctx.contact.email}`);
  sections.push(`  GitHub: ${ctx.contact.github}`);
  sections.push(`  LinkedIn: ${ctx.contact.linkedin}`);
  if (ctx.contact.twitter) sections.push(`  Twitter: ${ctx.contact.twitter}`);

  sections.push(`\nFREQUENTLY ASKED QUESTIONS:`);
  for (const faq of ctx.faqs) {
    sections.push(`  Q: ${faq.question}`);
    sections.push(`  A: ${faq.answer}`);
    sections.push('');
  }

  return sections.join('\n');
}
