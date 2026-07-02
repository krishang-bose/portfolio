export const resume = {
  name: "Krishang Bose",
  contact: {
    email: "bosekrishang@gmail.com",
    github: { label: "github.com/krishang-bose", url: "https://github.com/krishang-bose" },
    linkedin: { label: "LinkedIn", url: "https://linkedin.com/in/krishang-bose-68b8a228b" },
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
      link: { label: "Simulation Code", url: "#" },
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
    },
  ],

  projects: [
    {
      name: "Hail – Startup Outreach Intelligence",
      tags: ["Full Stack", "AI"],
      year: "2026",
      links: [{ label: "Hail", url: "#" }],
      bullets: [
        "Search any startup and instantly get an AI-generated company profile (mission, industry, tech stack, recent news), a D3.js dendrogram mapping founders → CTOs → engineers → recruiters, and personalized LinkedIn DM + email drafts tailored to the selected person — all in one flow.",
        "Engineered a 4-provider LLM fallback chain (Gemini → Groq → Cohere → Together AI) with automatic rate-limit switching, so new company lookups never block. Results are cached in Supabase PostgreSQL — the first search for any startup costs one AI call; every repeat search is instant and free for all users, with Firecrawl powering live web scraping for enrichment.",
      ],
      stack: ["Next.js", "Gemini", "Groq", "Cohere", "Firecrawl", "Supabase", "D3.js"],
    },
    {
      name: "ChefMate – Smart Kitchen Assistant",
      tags: ["Hackathon Winner"],
      year: "2025",
      links: [{ label: "GitHub", url: "#" }],
      bullets: [
        "Led a 4-member team to develop a comprehensive kitchen assistant using Node.js/Express, MongoDB, and React with Zustand.",
        "Integrated a nutrition API and designed a recommendation engine that matches inventory for enhanced user experience.",
      ],
      stack: ["Node.js", "Express", "MongoDB", "React", "Zustand"],
    },
    {
      name: "InFuturum Tech Fest & Fish Hunt Game",
      tags: ["Frontend", "Backend"],
      year: "2024",
      links: [
        { label: "ACM-BU Main Site", url: "#" },
        { label: "Fish Hunt Game", url: "#" },
      ],
      bullets: [
        "Created a tech fest website and an interactive logic-based treasure hunt game using Next.js and Tailwind CSS.",
        "Developed a custom backend with token-based progression, participant tracking, and Google Forms integration, supporting 3,000+ users during the event.",
      ],
      stack: ["Next.js", "Tailwind CSS", "Node.js"],
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
