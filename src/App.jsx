import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, Linkedin, Mail, ExternalLink } from "lucide-react";

/**
 * Lotus at VCU — Single-file React site (JavaScript)
 * Paste into src/App.jsx in a Vite React app (Tailwind installed).
 */
const BASE = import.meta.env.BASE_URL; // '/lotus-site/' on GH Pages, '/' locally
const LOGO_SRC = "${BASE}lotus-logo.jpg"; // update if your path differs

const COLORS = {
  bg: "#0b0b0b",
  gold: "#C8A44D",
  goldSoft: "#E1C574",
  goldDim: "#9E7E32",
  text: "#EDE9D5",
};

const DATA = {
  brand: {
    name: "Lotus at VCU",
    tagline: "Leaders of Tomorrow: United in Success",
    short: "Professional Asian business development organization at VCU",
  },
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "events", label: "Events" },
    { id: "forms", label: "Forms" },
    { id: "board", label: "Board" },
  ],
  hero: {
    ctaText: "National Organization",
    ctaHref: "https://www.ascendleadership.org/",
  },
  about: {
    pillars: [
      {
        title: "Innovative",
        body:
          "We promote professional development and build a community that celebrates diversity and inclusion.",
      },
      {
        title: "Professional",
        body:
          "Through mentorship, networking, and collaboration, we create opportunities for personal and career growth.",
      },
      {
        title: "Social",
        body:
          "We support members with a welcoming, high-energy culture that thrives inside and outside business settings.",
      },
    ],
    mapCaption:
      "Based in Richmond, VA — open to all majors with an interest in business and leadership.",
  },
  events: [
    {
      title: "Kickoff + Interest Meeting",
      when: "Sept 10, 6:00–7:30 PM",
      where: "MCALC, Room 210",
      blurb:
        "Meet the founding board, learn about our vision, and connect with peers and mentors.",
      rsvp: "https://forms.gle/example",
    },
    {
      title: "Resume x LinkedIn Clinic",
      when: "Sept 18, 5:30–7:00 PM",
      where: "Engineering West 101",
      blurb:
        "Bring your resume for live feedback from upper-class mentors and industry guests.",
      rsvp: "https://forms.gle/example2",
    },
  ],
  forms: [
    { label: "General Interest Form", href: "https://forms.gle/your-interest-form" },
    { label: "Membership Application", href: "https://forms.gle/your-membership-form" },
    { label: "Partner / Sponsor Inquiry", href: "mailto:lotus@vcu.edu" },
  ],
  board: {
    exec: [
      {
        role: "President",
        name: "Cole Villanueva",
        linkedin: "https://www.linkedin.com/in/cole-villanueva-vcu/",
        photo: "${BASE}cole.jpg",
      },
      {
        role: "Vice President",
        name: "Jessica Hoang",
        linkedin: "https://www.linkedin.com/in/jessica-hoang22/",
        photo: "${BASE}jessica.jpg",
      },
      {
        role: "Treasurer",
        name: "Malia Feliciano",
        linkedin: "https://www.linkedin.com/in/malia-feliciano-6242b3294/",
        photo: "${BASE}malia.jpg",
      },
      {
        role: "Logistics Coordinator",
        name: "Ayden Chance",
        linkedin: "https://www.linkedin.com/in/ayden-chance/",
        photo: "${BASE}ayden.jpg",
      },
      {
        role: "Professional Development Coordinator",
        name: "Skyler Luangvitham",
        linkedin: "https://www.linkedin.com/in/skyler-luangvitham-273744286/",
        photo: "${BASE}skyler.jpg",
      },
    ],
  },
  social: {
    email: "lotus@vcu.edu",
    instagram: "https://instagram.com/yourhandle",
    linkedin: "https://www.linkedin.com/company/yourclub/",
  },
};

// --- Utilities ---------------------------------------------------------------

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useMemo(() => {
    const handler = () => {
      const offsets = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return { id, top: Number.MAX_SAFE_INTEGER };
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top };
        })
        .sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
      setActive(offsets[0]?.id || ids[0]);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids.join("|")]);
  return active;
}

const Section = ({ id, className, children }) => (
  <section id={id} className={`scroll-mt-24 ${className || ""}`}>
    {children}
  </section>
);

// --- App ---------------------------------------------------------------------

export default function LotusSite() {
  const active = useScrollSpy(DATA.nav.map((n) => n.id));
  return (
    <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
      <Nav active={active} />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <About />
        <Events />
        <Forms />
        <Board />
      </main>
      <Footer />
    </div>
  );
}

// --- Nav ---------------------------------------------------------------------

function Nav({ active }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50 border-b/10 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-[rgba(200,164,77,0.25)]">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_SRC}
            alt="Lotus logo"
            className="h-9 w-9 rounded-full ring-1 ring-[rgba(200,164,77,0.35)]"
          />
          <div
            className="font-semibold tracking-wide text-sm sm:text-base"
            style={{ color: COLORS.gold }}
          >
            {DATA.brand.name}
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          {DATA.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-2 rounded-xl text-sm transition-colors ${
                active === item.id
                  ? "bg-[rgba(200,164,77,0.15)] text-white"
                  : "text-gray-300 hover:text-white hover:bg-[rgba(200,164,77,0.1)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#forms"
          className="inline-flex items-center gap-1 text-sm rounded-xl px-3 py-2 border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.12)]"
        >
          Join Us <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}

// --- Hero --------------------------------------------------------------------

function Starfield() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.35), transparent 2px)," +
          "radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.45), transparent 2px)," +
          "radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.4), transparent 2px)," +
          "radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.25), transparent 2px)",
      }}
    />
  );
}

function Hero() {
  return (
    <Section id="home" className="relative">
      <div className="h-[78vh] sm:h-[86vh] grid place-items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,164,77,0.08),transparent_55%)]" />
        <Starfield />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <div className="flex items-center justify-center mb-6">
            <img
              src={LOGO_SRC}
              alt="Lotus"
              className="h-28 w-28 sm:h-36 sm:w-36 drop-shadow-[0_0_20px_rgba(200,164,77,0.25)]"
            />
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-tight text-white">
            Lotus at VCU
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Leaders of Tomorrow: United in Success — a professional Asian business development organization at VCU.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#events"
              className="rounded-2xl px-5 py-3 text-sm font-medium bg-[rgba(200,164,77,0.16)] border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.24)]"
            >
              View Events
            </a>
            <a
              href={DATA.hero.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl px-5 py-3 text-sm font-medium bg-transparent border border-white/20 hover:border-white/35 inline-flex items-center gap-2"
            >
              {DATA.hero.ctaText}
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// --- About -------------------------------------------------------------------

function About() {
  return (
    <Section id="about" className="py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white">Who are we?</h2>
          <p className="mt-4 text-gray-300 max-w-prose">
            Lotus at VCU empowers APIDA and allied students to grow as principled leaders through
            mentorship, workshops, and community. We develop professional skills while celebrating culture
            and building a network that lasts beyond campus.
          </p>

          <dl className="mt-8 grid sm:grid-cols-3 gap-6">
            {DATA.about.pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[rgba(200,164,77,0.35)] bg-[rgba(200,164,77,0.06)] p-5"
              >
                <dt className="font-semibold" style={{ color: COLORS.gold }}>
                  {p.title}
                </dt>
                <dd className="text-sm text-gray-300 mt-2">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl border border-[rgba(200,164,77,0.35)] overflow-hidden bg-black/40">
            <div className="h-full w-full grid place-items-center p-6">
              <div className="text-center">
                <MapPin className="mx-auto mb-3" />
                <p className="text-gray-300">{DATA.about.mapCaption}</p>
                <div className="mt-6 text-xs text-gray-400">Campus map embed can go here.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// --- Events ------------------------------------------------------------------

function Events() {
  return (
    <Section id="events" className="py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-serif text-white">Events</h2>
      <p className="mt-2 text-gray-300">Workshops, networking nights, and socials throughout the semester.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA.events.map((e, idx) => (
          <motion.article
            key={e.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-2xl border border-[rgba(200,164,77,0.35)] bg-[rgba(200,164,77,0.06)] p-5"
          >
            <h3 className="text-lg font-semibold text-white">{e.title}</h3>
            <div className="mt-2 text-sm text-gray-300 flex items-center gap-2">
              <Calendar size={16} /> {e.when}
            </div>
            <div className="text-sm text-gray-300 flex items-center gap-2 mt-1">
              <MapPin size={16} /> {e.where}
            </div>
            <p className="mt-3 text-sm text-gray-300">{e.blurb}</p>
            {e.rsvp && (
              <a
                href={e.rsvp}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm rounded-xl px-3 py-2 border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.12)]"
              >
                RSVP <ArrowUpRight size={16} />
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

// --- Forms -------------------------------------------------------------------

function Forms() {
  return (
    <Section id="forms" className="py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-serif text-white">Forms</h2>
      <p className="mt-2 text-gray-300">
        Get involved — membership, interest, and partner outreach.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA.forms.map((f) => (
          <a
            key={f.label}
            href={f.href}
            target={f.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group rounded-2xl border border-[rgba(200,164,77,0.35)] bg-[rgba(200,164,77,0.06)] p-5 hover:bg-[rgba(200,164,77,0.12)] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="text-white font-medium">{f.label}</div>
              <ArrowUpRight className="opacity-70 group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

// --- Board -------------------------------------------------------------------

function AvatarCircle({ src, alt }) {
  if (!src) {
    return (
      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[rgba(200,164,77,0.25)] to-transparent border border-[rgba(200,164,77,0.35)] grid place-items-center text-sm text-gray-300">
        Photo
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || "Board member"}
      className="h-24 w-24 rounded-full object-cover border border-[rgba(200,164,77,0.35)]"
      loading="lazy"
    />
  );
}

function Grid({ cards, minimal = false }) {
  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cards.map((c) => (
        <div key={c.role + c.name} className="text-center">
          <div className="flex items-center justify-center">
            <AvatarCircle src={c.photo} alt={c.name} />
          </div>
          <div className="mt-3 text-lg text-white">{c.role}</div>
          <div className="text-sm text-gray-300">{c.name}</div>
          {c.linkedin && (
            <a
              href={c.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs rounded-xl px-3 py-2 border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.12)]"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function Board() {
  return (
    <Section id="board" className="py-16 sm:py-24">
      <h2 className="text-3xl sm:text-4xl font-serif text-white text-center">Executive Board</h2>
      <Grid cards={DATA.board.exec} />
      <div className="mt-14">
        <h3 className="text-2xl font-serif text-white text-center">Officers</h3>
        <Grid cards={DATA.board.officers} minimal />
      </div>
    </Section>
  );
}

// --- Footer ------------------------------------------------------------------

function Footer() {
  return (
    <footer className="mt-20 border-t border-[rgba(200,164,77,0.25)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_SRC}
            alt="Lotus"
            className="h-8 w-8 rounded-full ring-1 ring-[rgba(200,164,77,0.35)]"
          />
          <div className="text-sm text-gray-300">
            © {new Date().getFullYear()} Lotus at VCU — Leaders of Tomorrow: United in Success
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <a
            href={`mailto:${DATA.social.email}`}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.12)]"
          >
            <Mail size={16} /> Email
          </a>
          <a
            href={DATA.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.12)]"
          >
            Instagram
          </a>
          <a
            href={DATA.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-[rgba(200,164,77,0.35)] hover:bg-[rgba(200,164,77,0.12)]"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
