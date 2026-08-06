"use client";

/**
 * COGENT — Enterprise AI Automation Partner
 * Luxury, dark-mode landing page built to convert enterprise buyers.
 *
 * Dependencies required:
 *   npm install gsap
 *
 * Design tokens (see globals.css):
 *   --bg          #0A0B0E   graphite black canvas
 *   --bg-elev     #111319   elevated panel
 *   --ink         #F5F3EE   warm off-white text
 *   --ink-dim     #9A9CA6   secondary text
 *   --brass       #C9A227   luxury accent (authority, high-ticket)
 *   --brass-glow  #E8C766
 *   --signal      #4F7CFF   electric "automation" accent
 *   --signal-glow #86A8FF
 *   --line        rgba(255,255,255,0.08)
 *
 * Fonts: Fraunces (display) / Manrope (body/UI) / JetBrains Mono (data, labels)
 */

import { useEffect, useRef, useState } from "react";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Engagement", href: "#engagement" },
];

const METRICS = [
  { value: 180, prefix: "$", suffix: "M+", label: "Processes under active automation" },
  { value: 42, prefix: "", suffix: "", label: "Enterprise deployments shipped" },
  { value: 99.98, prefix: "", suffix: "%", label: "Trailing 12-month uptime SLA", decimals: 2 },
  { value: 6, prefix: "", suffix: " wks", label: "Average time to first production system" },
];

const CAPABILITIES = [
  {
    title: "Workflow Orchestration",
    copy: "We replace tribal-knowledge spreadsheets and Slack threads with orchestrated systems that route, escalate, and execute without a human in the loop.",
    icon: "orchestration",
  },
  {
    title: "Intelligent Data Pipelines",
    copy: "Structured and unstructured data, unified. Ingestion, cleaning, and enrichment pipelines built to feed decisions in real time, not overnight batch jobs.",
    icon: "pipeline",
  },
  {
    title: "Custom LLM Agents",
    copy: "Purpose-built agents scoped to a single job to be done — trained on your systems of record, constrained by your policies, and audited at every step.",
    icon: "agent",
  },
  {
    title: "Systems Integration",
    copy: "ERP, CRM, data warehouse, legacy mainframe — we integrate at the API and data layer so automation sits inside your stack, not bolted on top of it.",
    icon: "integration",
  },
  {
    title: "Compliance & Governance",
    copy: "Role-based access, full audit trails, and human-approval gates on every irreversible action. Built for regulated industries from day one, not retrofitted.",
    icon: "shield",
  },
  {
    title: "24/7 Operations & Monitoring",
    copy: "Once live, our operations team watches every system around the clock — with alerting, rollback, and a named engineer on call, not a support ticket queue.",
    icon: "ops",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery & Systems Audit",
    copy: "We map every manual workflow costing you headcount and error rate, and quantify the automation opportunity in hours reclaimed and risk removed.",
  },
  {
    num: "02",
    title: "Architecture & Scoping",
    copy: "A full systems architecture — data flows, integration points, failure modes, and governance gates — reviewed and signed off before a line of code ships.",
  },
  {
    num: "03",
    title: "Build & Integrate",
    copy: "Our engineers build directly against your stack in two-week increments, with your team in the room for every checkpoint. No black boxes.",
  },
  {
    num: "04",
    title: "Validate & Harden",
    copy: "Adversarial testing, edge-case simulation, and a staged rollout against shadow traffic before any system touches production data.",
  },
  {
    num: "05",
    title: "Deploy & Operate",
    copy: "We go live, then stay live — monitoring, tuning, and reporting on measurable outcomes for as long as the system is mission-critical to you.",
  },
];

const RESULTS = [
  {
    tag: "Global Logistics Carrier",
    headline: "Cut exception-handling time from 4 hours to 6 minutes",
    metric: "97%",
    metricLabel: "reduction in manual dispatch review",
  },
  {
    tag: "Tier-1 Insurance Group",
    headline: "Automated first-notice-of-loss triage across 11 business units",
    metric: "$22M",
    metricLabel: "in reclaimed adjuster capacity, annualized",
  },
  {
    tag: "Enterprise SaaS Platform",
    headline: "Replaced a 14-person manual QA rotation with agentic review",
    metric: "11x",
    metricLabel: "faster release cadence",
  },
];

const COMPLIANCE = [
  "SOC 2 Type II",
  "ISO 27001",
  "GDPR-aligned",
  "HIPAA-ready architecture",
  "Full audit trails",
  "Named on-call engineering",
];

/* ------------------------------------------------------------------ */
/* Icons — hand-drawn, single stroke, no external icon dependency      */
/* ------------------------------------------------------------------ */

function Icon({ name }: { name: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "orchestration":
      return (
        <svg {...common}>
          <circle cx="14" cy="6" r="2.4" />
          <circle cx="5" cy="20" r="2.4" />
          <circle cx="23" cy="20" r="2.4" />
          <path d="M14 8.4V13M14 13L6.6 18M14 13l7.4 5" />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...common}>
          <path d="M4 7h20M4 14h20M4 21h20" />
          <circle cx="9" cy="7" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="17" cy="14" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="11" cy="21" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "agent":
      return (
        <svg {...common}>
          <rect x="6" y="8" width="16" height="12" rx="2.5" />
          <path d="M14 8V4M10 4h8" />
          <circle cx="10.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "integration":
      return (
        <svg {...common}>
          <path d="M10 8V5.5A2.5 2.5 0 0 1 12.5 3h0A2.5 2.5 0 0 1 15 5.5V8" />
          <rect x="6" y="8" width="16" height="7" rx="1.5" />
          <path d="M11 19v2.5A2.5 2.5 0 0 0 13.5 24h0a2.5 2.5 0 0 0 2.5-2.5V19" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M14 3.5 23 7v6.5c0 6-4 9.6-9 11.5-5-1.9-9-5.5-9-11.5V7l9-3.5Z" />
          <path d="M10.2 14 13 16.8l5-5.6" />
        </svg>
      );
    case "ops":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="9.5" />
          <circle cx="14" cy="14" r="1.6" fill="currentColor" stroke="none" />
          <path d="M14 14 19 9.5" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Reusable UI                                                         */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="reveal inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--signal-glow)]">
      <span className="h-[5px] w-[5px] rounded-full bg-[var(--signal-glow)] shadow-[0_0_8px_var(--signal-glow)]" />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--brass)] px-7 py-3.5 font-medium text-[15px] text-[#0A0B0E] transition-transform duration-300 will-change-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brass-glow)]"
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </a>
  );
}

function SecondaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-7 py-3.5 font-medium text-[15px] text-[var(--ink)] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--signal-glow)]"
    >
      {children}
      <span aria-hidden className="translate-y-[0.5px]">→</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".reveal, .reveal-group > *, .hero-graphic", { opacity: 1, y: 0 });
        return;
      }

      /* ---------- Hero entry sequence ---------- */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 46, duration: 0.9, stagger: 0.12 },
          "-=0.25"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 },
          "-=0.35"
        )
        .from(
          ".hero-graphic",
          { opacity: 0, scale: 0.92, duration: 1.1, ease: "power2.out" },
          "-=0.9"
        );

      /* ---------- Hero parallax ---------- */
      gsap.to(".hero-graphic", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.to(".glow-orb-1", {
        yPercent: -28,
        xPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.8 },
      });
      gsap.to(".glow-orb-2", {
        yPercent: 20,
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 0.8 },
      });

      /* ---------- Pulsing schematic nodes ---------- */
      gsap.to(".node-pulse", {
        opacity: 0.35,
        scale: 0.85,
        duration: 1.4,
        ease: "sine.inOut",
        stagger: { each: 0.25, repeat: -1, yoyo: true },
        transformOrigin: "center",
      });
      gsap.to(".flow-dot", {
        opacity: 0,
        duration: 1.6,
        repeat: -1,
        ease: "power1.inOut",
        stagger: 0.5,
      });

      /* ---------- Generic section reveals ---------- */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 34,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-group").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* ---------- Metric count-up ---------- */
      gsap.utils.toArray<HTMLElement>(".metric-value").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const counter = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;
              },
            });
          },
        });
      });

      /* ---------- Circuit trace — draws itself through the process section ---------- */
      const tracePath = document.querySelector(".circuit-trace path") as SVGPathElement | null;
      if (tracePath) {
        const length = tracePath.getTotalLength();
        tracePath.style.strokeDasharray = `${length}`;
        tracePath.style.strokeDashoffset = `${length}`;
        gsap.to(tracePath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        const dot = step.querySelector(".process-dot");
        if (!dot) return;
        gsap.to(dot, {
          backgroundColor: "var(--brass-glow)",
          boxShadow: "0 0 22px var(--brass-glow)",
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* ---------- Final CTA glow pulse ---------- */
      gsap.to(".final-glow", {
        opacity: 0.9,
        scale: 1.08,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${fraunces.variable} ${manrope.variable} ${mono.variable} relative min-h-screen overflow-x-clip bg-[var(--bg)] font-[var(--font-manrope)] text-[var(--ink)] antialiased`}
    >
      {/* ambient background texture */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M42 0H0V42" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Nav                                                                */}
      {/* ---------------------------------------------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          navSolid ? "border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 lg:px-10">
          <a href="#top" className="font-display text-[21px] tracking-tight text-[var(--ink)]">
            COGENT
          </a>
          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[12px] tracking-[0.14em] uppercase text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#engagement"
            className="rounded-full border border-[var(--line)] px-5 py-2.5 font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--ink)] transition-colors hover:border-[var(--brass-glow)]/60 hover:text-[var(--brass-glow)]"
          >
            Request Access
          </a>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="top" className="hero-section relative z-10 px-6 pb-28 pt-40 lg:px-10 lg:pt-48">
        <div className="glow-orb-1 pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[var(--signal)]/20 blur-[140px]" />
        <div className="glow-orb-2 pointer-events-none absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-[var(--brass)]/15 blur-[140px]" />

        <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="hero-eyebrow">
              <Eyebrow>Enterprise AI Automation Partner</Eyebrow>
            </div>

            <h1 className="mt-7 font-display text-[42px] leading-[1.08] tracking-tight text-[var(--ink)] sm:text-[56px] lg:text-[64px]">
              <span className="hero-line block">We engineer the</span>
              <span className="hero-line block italic text-[var(--brass-glow)]">nervous system</span>
              <span className="hero-line block">for companies that can&rsquo;t afford downtime.</span>
            </h1>

            <p className="hero-sub mt-7 max-w-[520px] text-[17px] leading-relaxed text-[var(--ink-dim)]">
              COGENT designs, builds, and operates mission-critical AI automation for
              enterprises running on thin margins for error — replacing brittle manual
              workflows with systems that don&rsquo;t sleep, don&rsquo;t forget, and don&rsquo;t quit.
            </p>

            <div className="hero-cta mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryButton href="#engagement">Book a Systems Audit</PrimaryButton>
              <SecondaryButton href="#process">See how we work</SecondaryButton>
            </div>

            <div className="hero-sub mt-14 flex items-center gap-6 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink-dim)]">
              <span>SOC 2 Type II</span>
              <span className="h-1 w-1 rounded-full bg-[var(--ink-dim)]" />
              <span>ISO 27001</span>
              <span className="h-1 w-1 rounded-full bg-[var(--ink-dim)]" />
              <span>HIPAA-ready architecture</span>
            </div>
          </div>

          {/* hero schematic graphic */}
          <div className="hero-graphic relative mx-auto aspect-square w-full max-w-[480px]">
            <div className="absolute inset-0 rounded-full bg-[var(--signal)]/10 blur-3xl" />
            <svg viewBox="0 0 400 400" className="relative h-full w-full">
              <g stroke="var(--line)" strokeWidth="1" fill="none">
                <path d="M60 320 L150 250 L150 130 L60 60" />
                <path d="M150 250 L260 250 L340 190" />
                <path d="M150 130 L260 130 L340 190" />
                <path d="M260 130 L260 250" />
              </g>
              {[
                { cx: 60, cy: 320, r: 8, fill: "var(--brass-glow)" },
                { cx: 60, cy: 60, r: 6, fill: "var(--signal-glow)" },
                { cx: 150, cy: 250, r: 9, fill: "var(--signal-glow)" },
                { cx: 150, cy: 130, r: 6, fill: "var(--brass-glow)" },
                { cx: 260, cy: 250, r: 6, fill: "var(--brass-glow)" },
                { cx: 260, cy: 130, r: 7, fill: "var(--signal-glow)" },
                { cx: 340, cy: 190, r: 11, fill: "var(--brass-glow)" },
              ].map((n, i) => (
                <circle
                  key={i}
                  className="node-pulse"
                  cx={n.cx}
                  cy={n.cy}
                  r={n.r}
                  fill={n.fill}
                  style={{ filter: `drop-shadow(0 0 10px ${n.fill})` }}
                />
              ))}
              {[
                { cx: 100, cy: 290 },
                { cx: 205, cy: 250 },
                { cx: 300, cy: 220 },
              ].map((d, i) => (
                <circle key={i} className="flow-dot" cx={d.cx} cy={d.cy} r="3" fill="var(--signal-glow)" />
              ))}
              <text x="340" y="216" textAnchor="middle" className="font-mono" fill="var(--ink-dim)" fontSize="10" letterSpacing="1">
                LIVE
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Metrics bar                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-y border-[var(--line)] bg-[var(--bg-elev)]/60 px-6 py-14 lg:px-10">
        <div className="reveal-group mx-auto grid max-w-[1240px] grid-cols-2 gap-10 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label}>
              <div
                className="metric-value font-display text-[34px] tracking-tight text-[var(--brass-glow)] lg:text-[40px]"
                data-value={m.value}
                data-decimals={m.decimals ?? 0}
                data-prefix={m.prefix}
                data-suffix={m.suffix}
              >
                {m.prefix}0{m.suffix}
              </div>
              <div className="mt-2 max-w-[200px] text-[13px] leading-snug text-[var(--ink-dim)]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Positioning                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="reveal max-w-[640px]">
            <Eyebrow>The gap we close</Eyebrow>
            <h2 className="mt-6 font-display text-[32px] leading-tight tracking-tight sm:text-[40px]">
              Manual workflows don&rsquo;t scale.
              <br />
              Neither do fragile automations.
            </h2>
          </div>

          <div className="reveal-group mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)]/40 p-8">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ink-dim)]">
                Without COGENT
              </div>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--ink-dim)]">
                <li>Point solutions and no-code tools that break the moment an upstream system changes.</li>
                <li>Automation logic that lives in one engineer&rsquo;s head — and leaves when they do.</li>
                <li>No audit trail, no rollback plan, no answer for what happens when it fails silently.</li>
                <li>Headcount growing in lockstep with transaction volume, indefinitely.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--brass)]/25 bg-gradient-to-b from-[var(--brass)]/[0.06] to-transparent p-8">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--brass-glow)]">
                With COGENT
              </div>
              <ul className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--ink)]">
                <li>Systems architected against your actual infrastructure, documented and owned by our team.</li>
                <li>Governance and approval gates built in — nothing irreversible happens without sign-off.</li>
                <li>Full observability: every decision an agent makes is logged, explainable, and reversible.</li>
                <li>Throughput scales with automation capacity, not with new hires.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Capabilities                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="capabilities" className="relative z-10 border-t border-[var(--line)] px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="reveal max-w-[560px]">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="mt-6 font-display text-[32px] leading-tight tracking-tight sm:text-[40px]">
              Six disciplines. One accountable team.
            </h2>
          </div>

          <div className="reveal-group mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="group rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)]/30 p-7 transition-colors duration-300 hover:border-[var(--signal)]/40 hover:bg-[var(--bg-elev)]/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--signal-glow)] transition-colors duration-300 group-hover:border-[var(--signal-glow)]/50">
                  <Icon name={c.icon} />
                </div>
                <h3 className="mt-6 font-display text-[19px] tracking-tight">{c.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--ink-dim)]">{c.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Process — circuit trace signature moment                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="process" className="process-section relative z-10 border-t border-[var(--line)] px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="reveal max-w-[560px]">
            <Eyebrow>Engagement process</Eyebrow>
            <h2 className="mt-6 font-display text-[32px] leading-tight tracking-tight sm:text-[40px]">
              Five phases. Zero black boxes.
            </h2>
          </div>

          <div className="relative mt-20 max-w-[720px]">
            {/* circuit trace svg, spans the step list */}
            <svg
              className="circuit-trace pointer-events-none absolute left-[15px] top-[6px] h-[calc(100%-12px)] w-[2px] sm:left-[19px]"
              width="2"
              height="100%"
              preserveAspectRatio="none"
            >
              <path
                d={`M1 0 L1 1000`}
                vectorEffect="non-scaling-stroke"
                stroke="var(--brass-glow)"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 6px var(--brass-glow))" }}
              />
            </svg>
            <div className="absolute left-0 top-0 h-full w-[2px] bg-[var(--line)] sm:left-[4px]" />

            <div className="space-y-14">
              {PROCESS.map((step) => (
                <div key={step.num} className="process-step reveal relative flex gap-7 pl-11 sm:pl-14">
                  <span className="process-dot absolute left-[6px] top-1.5 h-[18px] w-[18px] -translate-x-1/2 rounded-full border-2 border-[var(--line)] bg-[var(--bg)] transition-all duration-500 sm:left-[10px]" />
                  <div>
                    <div className="font-mono text-[12px] tracking-[0.16em] text-[var(--ink-dim)]">{step.num}</div>
                    <h3 className="mt-2 font-display text-[22px] tracking-tight">{step.title}</h3>
                    <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-[var(--ink-dim)]">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Results                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="results" className="relative z-10 border-t border-[var(--line)] px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="reveal max-w-[560px]">
            <Eyebrow>Results</Eyebrow>
            <h2 className="mt-6 font-display text-[32px] leading-tight tracking-tight sm:text-[40px]">
              Outcomes our clients report to their board.
            </h2>
          </div>

          <div className="reveal-group mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {RESULTS.map((r) => (
              <div key={r.tag} className="flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)]/30 p-8">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--signal-glow)]">
                    {r.tag}
                  </div>
                  <h3 className="mt-4 font-display text-[19px] leading-snug tracking-tight">{r.headline}</h3>
                </div>
                <div className="mt-10 border-t border-[var(--line)] pt-6">
                  <div className="font-display text-[34px] tracking-tight text-[var(--brass-glow)]">{r.metric}</div>
                  <div className="mt-1 text-[13px] text-[var(--ink-dim)]">{r.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* testimonial */}
          <div className="reveal mt-20 rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[var(--signal)]/[0.06] to-transparent p-10 lg:p-14">
            <p className="font-display text-[22px] italic leading-relaxed text-[var(--ink)] lg:text-[26px]">
              &ldquo;COGENT didn&rsquo;t sell us software. They rebuilt how our claims org actually
              operates, then stayed on to run it with us. That distinction is the reason our board
              signed off on phase two before phase one even finished.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[var(--brass)]/60 to-[var(--signal)]/60" />
              <div>
                <div className="text-[14px] font-medium">Elena Cho</div>
                <div className="font-mono text-[12px] text-[var(--ink-dim)]">COO, Meridian Freight &amp; Casualty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Compliance / assurance strip                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-[var(--line)] px-6 py-20 lg:px-10">
        <div className="reveal mx-auto max-w-[1240px]">
          <div className="text-center">
            <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--ink-dim)]">
              Built for regulated, security-conscious enterprises
            </div>
          </div>
          <div className="reveal-group mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {COMPLIANCE.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2.5 font-mono text-[13px] tracking-[0.08em] text-[var(--ink-dim)]"
              >
                <span className="h-[6px] w-[6px] rounded-full bg-[var(--signal-glow)] shadow-[0_0_8px_var(--signal-glow)]" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Engagement / tiers                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section id="engagement" className="relative z-10 border-t border-[var(--line)] px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="reveal max-w-[600px]">
            <Eyebrow>Engagement</Eyebrow>
            <h2 className="mt-6 font-display text-[32px] leading-tight tracking-tight sm:text-[40px]">
              Built for organizations already running at scale.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--ink-dim)]">
              We take on a limited number of engagements each quarter so every client gets a
              senior, dedicated team. Pricing is scoped after your systems audit — not off a menu.
            </p>
          </div>

          <div className="reveal-group mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--line)] p-9">
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--ink-dim)]">
                Systems Partnership
              </div>
              <div className="mt-4 font-display text-[28px] tracking-tight">Custom-scoped build</div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--ink-dim)]">
                End-to-end design and delivery of a mission-critical automation system, from audit
                through production. Typical engagements run 8–16 weeks.
              </p>
              <div className="mt-6 font-mono text-[13px] text-[var(--ink-dim)]">From $60K, scoped after audit</div>
            </div>
            <div className="rounded-2xl border border-[var(--brass)]/30 bg-gradient-to-b from-[var(--brass)]/[0.06] to-transparent p-9">
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--brass-glow)]">
                Managed Operations
              </div>
              <div className="mt-4 font-display text-[28px] tracking-tight">Ongoing systems retainer</div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--ink-dim)]">
                We continue to monitor, tune, and extend your systems after launch — with a named
                engineering team on call and quarterly architecture reviews.
              </p>
              <div className="mt-6 font-mono text-[13px] text-[var(--brass-glow)]">From $15K/mo</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Final CTA                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 border-t border-[var(--line)] px-6 py-32 text-center lg:px-10">
        <div className="final-glow pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brass)]/15 opacity-60 blur-[140px]" />
        <div className="reveal relative mx-auto max-w-[640px]">
          <h2 className="font-display text-[34px] leading-tight tracking-tight sm:text-[44px]">
            Your next hire shouldn&rsquo;t be another analyst.
            <br />
            <span className="italic text-[var(--brass-glow)]">It should be a system.</span>
          </h2>
          <p className="mt-6 text-[15.5px] leading-relaxed text-[var(--ink-dim)]">
            Fifteen enterprise systems audits available this quarter. We&rsquo;ll tell you honestly
            if you&rsquo;re not ready — and exactly what would need to change.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="#engagement">Book a Systems Audit</PrimaryButton>
            <SecondaryButton href="mailto:partnerships@cogent.ai">Email Partnerships</SecondaryButton>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Footer                                                             */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative z-10 border-t border-[var(--line)] px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="font-display text-[18px] tracking-tight">COGENT</div>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--ink-dim)]">
            © {new Date().getFullYear()} Cogent Systems, Inc. — Enterprise automation, engineered like infrastructure.
          </div>
        </div>
      </footer>
    </div>
  );
}
