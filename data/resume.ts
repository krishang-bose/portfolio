export const resume = {
  name: "Krishang Bose",
  contact: {
    email: "bosekrishang@gmail.com",
    github: { label: "github.com/krishang-bose", url: "https://github.com/krishang-bose" },
    linkedin: { label: "LinkedIn", url: "https://linkedin.com/in/krishang-bose-68b8a228b" },
    leetcode: { label: "LeetCode", url: "https://leetcode.com/u/krishangbose123/" },
  },

  education: [
    {
      institution: "Bennett University",
      badge: "Merit-Based Scholar",
      degree: "B.Tech in Computer Science and Engineering (Quantum Computing)",
      cgpa: "8.9",
      location: "Greater Noida, India",
      duration: "2023 – 2027",
    },
    {
      institution: "The Air Force School",
      badge: "CBSE",
      degree: "Schooling (12th & 10th grade)",
      cgpa: "90",
      location: "New Delhi, India",
      duration: "2012 – 2022",
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["C++", "Java", "Python", "SQL", "JavaScript", "TypeScript"],
    },
    {
      category: "AI / LLM",
      items: ["LLM Applications", "RAG", "LLM Orchestration", "Embeddings", "Vector Databases", "Function Calling", "FastAPI"],
    },
    {
      category: "Frameworks & Tools",
      items: ["MERN", "Next.js", "REST APIs", "Socket.IO", "JWT", "Supabase", "Vercel", "Git", "GitHub", "Docker"],
    },
  ],

  experience: [
    {
      role: "Development Intern",
      company: "Eleven Studios",
      stack: ["React", "JavaScript", "Framer Motion", "Vercel"],
      duration: "June 2025 – Aug 2025",
      location: "Remote",
      bullets: [
        "Sole developer — designed and built a production marketing site end-to-end, translating Figma designs and pre-built components into responsive, scroll-driven animated layouts with dark and light theme support.",
        "Optimized performance and deployed production-ready builds using Vercel.",
      ],
    },
  ],

  research: [
    {
      title: "Quantum-Classical Hybrid Methods for STAR-RIS Beamforming",
      year: "2026",
      affiliation: "Bennett University",
      status: "Submitted for Publication",
      link: { label: "Simulation Code", url: "https://github.com/krishang-bose/quantum-beamforming-star-ris" },
      bullets: [
        "Built a vehicular V2X simulation where a Base Station (4 Tx antennas, P_max = 5 W) beamforms through a STAR-RIS to simultaneously serve reflection-side and transmission-side cars moving at 5–30 m/s — modelling Rayleigh fading, per-slot Doppler phase rotation, and Jakes coherence decay (down to 0.21 at 30 m/s) at 5.9 GHz DSRC.",
        "Benchmarked three quantum-enhanced algorithms across 30 Monte Carlo trials per operating point: QAOA (4-qubit coarse search over 16 RIS-group configurations + L-BFGS-B warm-started from analytic gradients + classical gradient refinement), QDDPG (PQC actor with classical critic), and QPPO (3-layer PQC optimised for max-min fairness rather than sum-rate). Analytic Hamiltonian gradients verified against central-difference FD at < 1e-7 error before every run.",
        "QAOA achieved 4.25 bits/s/Hz at SNR = 20 dB, outperforming QDDPG by 35% and QPPO by 38%. Key finding: QPPO's lower sum-rate is by design — it optimises max-min fairness, revealing a fundamental trade-off between user-fairness and aggregate throughput in STAR-RIS-assisted V2X.",
      ],
    },
  ],

  achievements: [
    {
      title: "Winner – Lean In Hacks 6.0",
      year: "2025",
      detail: "1st Place out of 150+ teams",
      venue: "Microsoft Office, Gurgaon",
    },
    {
      title: "AlgoRance Coding Contest",
      year: "2025",
      detail: "3rd Place out of 100+ Teams",
      venue: "Bennett University",
    },
    {
      title: "Decrypt – Reverse Coding, APOGEE",
      year: "2024",
      detail: "Ranked 4th out of 80 finalists",
      venue: "BITS Pilani (Pan-India)",
    },
    {
      title: "Codeforces · LeetCode · CSES Problem Set",
      year: "",
      detail: "Solved 1000+ algorithmic problems",
      venue: "Codeforces, LeetCode",
      leetcodeUrl: "https://codolio.com/profile/krishang6969",
    },
  ],

  projects: [
    {
      name: "Hail – Startup Outreach Intelligence",
      tags: ["Full Stack", "AI"],
      year: "2026",
      links: [{ label: "Hail", url: "https://hail-one.vercel.app/" }],
      bullets: [
        "Built a startup intelligence platform in Next.js 14 + TypeScript where a single search delivers: an AI-synthesized company profile (mission, industry, tech stack, recent news scraped live via Firecrawl), a D3.js hierarchical dendrogram of the org chart segmented by role (founder → CTO → engineer → recruiter), and one-click generation of personalized LinkedIn DMs and cold emails tailored to the specific person selected — all in a single, cohesive flow.",
        "Engineered the AI backbone as a 4-provider fallback chain (Gemini → Groq → Cohere → Together AI) in lib/openai.ts with automatic rate-limit detection and provider switching so zero requests are ever blocked; backed by a 3-table Supabase PostgreSQL schema (companies, people, messages) with UUID keys, cascading foreign keys, and Row-Level Security — first lookup costs one AI call, every repeat is instant. Per-user rate limiting (2 searches/day) enforced via NextAuth Google OAuth session IDs.",
      ],
      stack: ["Next.js", "TypeScript", "Gemini", "Groq", "Cohere", "Firecrawl", "Supabase", "D3.js"],
    },
    {
      name: "ChefMate – Smart Kitchen Assistant",
      tags: ["Hackathon Winner"],
      year: "2025",
      links: [{ label: "GitHub", url: "https://github.com/krishang-bose/ChefMate" }],
      bullets: [
        "Led a 4-member team to build a full-featured culinary platform at a hackathon: a React 19 + Zustand SPA with 8 distinct pages — a personal Recipe Diary with full CRUD and Cloudinary image uploads, community Blog, Cooking Courses, CSV-powered Recipe Search, Leaflet.js interactive Map for local discovery, and a built-in Kitchen Timer — all behind a JWT-authenticated multi-page routing system.",
        "Architected the Node.js/Express/MongoDB backend with an MVC structure across auth, recipe, and blog controllers: bcrypt password hashing (salt rounds 10), httpOnly cookie-based JWT sessions, and a Cloudinary media pipeline for profile and recipe images; the recipe search engine parses a structured CSV dataset in-memory for keyword-matched results without a dedicated DB query layer.",
      ],
      stack: ["Node.js", "Express", "MongoDB", "React", "Zustand", "Cloudinary", "Leaflet.js"],
    },
    {
      name: "InFuturum 3.0 – ACM Tech Fest Platform",
      tags: ["Frontend", "Backend"],
      year: "2024",
      links: [
        { label: "ACM-BU Main Site", url: "https://infuturum-acmbu.vercel.app/" },
        { label: "Fish Hunt Game", url: "https://infuturum-acmbu.vercel.app/79035" },
      ],
      bullets: [
        "Built the official site for INFUTURUM 3.0 — ACM Bennett University's flagship 2-day tech fest — as a PWA in Next.js: features a retro arcade landing with a canvas-based animated starfield, CRT scanline overlay, and a live NASDAQ-style ticker (events styled as stocks: $FISHHUNT +8.7%, $DESIGNATHON +12.4%) alongside an Aceternity-style animated timeline of 8 events across 2 days (Resem, Capturathon, Hackauction, Designathon, Breakout Rooms, Mafia, Raw Reality), Google Analytics GA4, and Microsoft Forms registration — serving 3,000+ participants.",
        "Engineered Fish Hunt, a multi-stage logic-based treasure hunt game with a token-gated progression system: each puzzle solution unlocks a unique access code for the next stage, backed by a server-side Node.js backend tracking per-participant state; scores surfaced in a real-time leaderboard embedded on the main arcade landing screen.",
      ],
      stack: ["Next.js", "Tailwind CSS", "Node.js", "Canvas API", "GA4"],
    },
  ],

  leadership: [
    {
      role: "Technical Head",
      org: "ACM Student Chapter, BU",
      duration: "2024 – 2025",
      description: "Led hackathons and technology festival web projects, mentored over 15 junior members directly.",
    },
    {
      role: "Co-Head",
      org: "Alan Turing Club",
      duration: "2024 – 2025",
      description:
        "Coordinated technical events and competitions, engaging with industry mentors such as Akshay Saini. Guided and mentored over 15 students in Data Structures and Competitive Programming.",
    },
  ],
};
