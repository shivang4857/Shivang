export const personalData = {
  name: "Shivang Dwivedi",
  fullName: "Shivang Dwivedi",
  title: "Founding Engineer @ Beat22",
  tagline: "Building and scaling production-grade platforms from zero to one.",
  location: "Chandigarh, India",
  email: "shivang4857@gmail.com",
  phone: "8319096593",

  about: {
    short: "Founding Engineer with hands-on experience building and scaling production-grade platforms from zero to one. I own architecture, backend systems, infrastructure, and product delivery end to end. I obsessively architect elastic, fault-tolerant distributed backend systems that solve real-world challenges.",
    long: `I blend deep expertise in cloud-native architectures — serverless, containerization, Infrastructure-as-Code — with strong business acumen to bridge the gap between engineering teams and stakeholders. I deliver robust, scalable solutions that drive growth.

Passionate about automation, observability, and DevSecOps best practices, I continuously optimize performance and reliability. I translate complex technical concepts into actionable insights for both technical and non-technical audiences, ensuring alignment and accelerating innovation.

At Beat22, I joined as a founding engineer and led the development of India's first digital sound marketplace. I built and scaled core platform systems including a secure, encrypted HLS-based audio streaming pipeline, a distributed upload system handling 3,000+ uploads with zero breakage, recommendation engines, a credits and wallet system, and KYC-based authentication integrating Aadhaar and passport verification.

I think in distributed systems but care about the end user experience. I optimize for reliability over hype, clarity over complexity, and ownership over delegation.`,
    philosophy: "Technology should solve real-world challenges without unnecessary complexity. The best systems are the ones you never have to think about because they just work — reliably, at scale, every time.",
    process: "I start with architecture, prototype fast, instrument everything, and iterate with production data. Every system I build has monitoring, logging, and observability from day one."
  },

  education: [
    {
      institution: "Chandigarh College of Engineering & Technology (Degree Wing), Panjab University",
      degree: "Bachelor of Technology in Electronics and Communication",
      period: "2021 — 2025",
      description: "Focused on core engineering fundamentals while self-directing deep into software engineering, distributed systems, and cloud infrastructure. Built multiple full-stack projects during this period.",
      highlights: ["Data Structures & Algorithms", "Operating Systems", "OOPs", "DBMS", "Machine Learning"]
    }
  ],

  skills: {
    "Languages": ["TypeScript", "JavaScript", "Python", "Go", "C", "C++", "SQL", "Bash"],
    "Frontend": ["React", "Next.js", "Redux Toolkit", "Tailwind CSS", "Framer Motion"],
    "Backend & Systems": ["Node.js", "Express", "NestJS", "FastAPI", "GraphQL", "REST APIs"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Cassandra"],
    "DevOps & Infra": ["Docker", "Kubernetes", "Helm Charts", "Jenkins", "Nginx", "AWS SAM", "CloudFormation", "CI/CD"],
    "Observability": ["Grafana", "Prometheus", "OpenTelemetry", "Loki", "Jaeger", "SonarQube"],
    "AI & Machine Learning": ["Keras", "TensorFlow", "scikit-learn", "PyTorch", "ANN", "CNN", "Transformers"],
    "Platforms & Tools": ["AWS", "Kafka", "RabbitMQ", "Supabase", "Prisma", "Nx Monorepo", "Vercel", "Jest"]
  },

  experience: [
    {
      role: "Founding Engineer",
      company: "Beat22",
      period: "July 2025 — Present",
      type: "current",
      description: "Owned 0-to-1 engineering across multiple products at India's first digital sound marketplace — a SaaS-enabled B2B marketplace for musicians. Taking ideas from rough brief to architecture, implementation, and launch.",
      achievements: [
        "Built a secure, encrypted HLS-based audio streaming pipeline that streams content without exposing MP3 or source files — 3,000+ uploads, zero breakage",
        "Designed scalable backend systems (microservices, queues, caching, background jobs) on AWS, cutting API latency and infra costs",
        "Built recommendation algorithms for ranking and personalization with tracking and monitoring",
        "Implemented a credits and wallet system and secure KYC-based auth flow integrating Aadhaar and passport verification",
        "Set up CI/CD, monitoring, logging, and performance optimizations for reliability and fast iteration",
        "Drove frontend performance by refactoring components, reducing bundle size, and adding performance monitoring"
      ],
      tools: ["Node.js", "AWS", "HLS", "Microservices", "Kafka", "Redis", "Next.js", "CI/CD"]
    },
    {
      role: "Cloud Infra & DevOps Intern",
      company: "IndiaP2P",
      period: "Jan 2025 — June 2025",
      type: "previous",
      description: "Managed cloud infrastructure and DevOps at a fintech startup. Built serverless systems, automated deployments, and achieved significant cost and speed improvements.",
      achievements: [
        "Built and deployed serverless apps with AWS SAM, integrating MongoDB with advanced data aggregation pipelines",
        "Instrumented services with OpenTelemetry, centralized logs in Loki and Grafana",
        "Architected automated CI/CD pipelines with strict quality checks via Jenkins",
        "Designed a comprehensive Jest-driven testing strategy for high reliability",
        "Introduced multi-stack CloudFormation workflow to overcome framework limitations",
        "Achieved ~20% cost reduction and 30% faster CI/CD pipelines"
      ],
      tools: ["AWS SAM", "CloudFormation", "Jenkins", "OpenTelemetry", "Grafana", "Loki", "Jest", "MongoDB"]
    },
    {
      role: "Web Developer Intern",
      company: "Onfinance",
      period: "March 2023 — Nov 2023",
      type: "previous",
      description: "Focused on frontend engineering — building scalable user interfaces, improving SEO, and optimizing performance at a fintech product company.",
      achievements: [
        "Built and deployed dynamic websites and applications with high user engagement",
        "Implemented SEO strategies to enhance web content across platforms",
        "Optimized site performance and user experience through testing and updates"
      ],
      tools: ["React", "JavaScript", "SEO", "Performance Optimization"]
    }
  ],

  projects: [
    {
      title: "Distributed Multivendor SaaS Platform",
      tagline: "Full-stack marketplace with microservices, observability, and real-time features.",
      description: "Architected an end-to-end multivendor SaaS platform with 3 roles (user/seller/admin), 10+ core feature modules (auth with OTP, seller onboarding, products, discounts, cart/wishlist, orders, coupons, notifications, chat, recommendations) and 30+ secured API endpoints. Implemented Kafka-based user activity tracking, Stripe onboarding for sellers, and full observability with Prometheus, Grafana, OpenTelemetry, Loki, and Jaeger across all microservices.",
      tech: ["Nx Monorepo", "Kafka", "Node.js", "GraphQL", "Next.js", "Grafana", "Prometheus"],
      category: "Backend / Platform",
      year: "2025"
    },
    {
      title: "Firecracker-Powered AI Coding Agent",
      tagline: "Sandboxed AI coding environment with VM-level isolation.",
      description: "Built a sandboxed coding agent with 4 tools (Shell, Code Exec, xdot, FS) in a hardened Docker image with display server, noVNC, and Jupyter. Designed a context engine handling 1M+ tokens using file-based state, pruning, and structured metadata. Implemented an orchestration API that spins up 1 Firecracker VM per job and returns a downloadable project bundle.",
      tech: ["Python", "REST APIs", "Firecracker", "noVNC", "Docker"],
      category: "AI / Infrastructure",
      year: "2025"
    },
    {
      title: "Conversational Portfolio",
      tagline: "This experience you're interacting with right now.",
      description: "A portfolio reimagined as a dialogue. Visitors explore my story through conversation powered by a personal AI assistant with strict context boundaries. Built with Next.js, Framer Motion, and OpenAI API.",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "OpenAI API"],
      category: "Creative / Full-Stack",
      year: "2026"
    },
    {
      title: "Mystery Message — Anonymous Message Sending Platform",
      tagline: "Share a unique link, receive messages without revealing the sender's identity.",
      description: "An anonymous messaging platform built with Next.js where users share a unique link and receive messages without revealing the sender's identity. Features: anonymous messaging via shareable profile/message link, NextAuth for secure inbox management, messages stored in MongoDB, form validation with Zod, modern UI with Tailwind CSS + shadcn/ui, and Resend for email verification/notifications.",
      tech: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Zod", "Tailwind CSS", "shadcn/ui", "Resend"],
      category: "Full-Stack",
      year: "2025",
      url: "https://mystery-message-anonymous-message-sending-platfrom.vercel.app"
    }
  ],

  contact: {
    email: "shivang4857@gmail.com",
    github: "https://github.com/shivang4857",
    linkedin: "https://www.linkedin.com/in/shivang4857/",
    twitter: "https://x.com/shivang_4857",
    phone: "8319096593"
  },

  meta: {
    interests: ["Distributed Systems", "Cloud-Native Architecture", "DevOps & Observability", "Serverless", "AI Infrastructure", "System Design", "Open Source", "Music Technology"],
    values: ["Ownership over delegation", "Reliability over hype", "Clarity over complexity", "Ship fast, instrument everything"],
    workStyle: "I own problems end to end — from architecture to deployment to monitoring. I work best in high-autonomy environments where I can prototype fast, instrument everything, and iterate with production data. I value async communication, deep focus blocks, and teams that trust engineers to make decisions.",
    personality: "Obsessively systematic. I build with the assumption that every system will break and design accordingly. I care about infrastructure as much as the product layer. I translate complex technical concepts into clear insights for any audience."
  }
};
