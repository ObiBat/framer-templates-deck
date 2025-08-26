import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Users, DollarSign, Target, PlayCircle } from "lucide-react";


const ABOUT_PHOTO_URL = "/obi.jpg";
const PDF_URL = "/proposal.pdf";

export default function InvestorDeck() {
  const [page, setPage] = useState("overview");

  const revenueData = [
    { name: "Template Sales", value: 49500 },
    { name: "Subscriptions", value: 45000 },
    { name: "Custom Services", value: 10000 },
  ];

  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
  };

  const NavButton = ({ id, label }) => (
    <button
      onClick={() => setPage(id)}
      className={`px-2.5 py-1.5 rounded-xl text-xs md:text-sm font-medium transition ${
        page === id
          ? "bg-black text-white shadow"
          : "bg-white text-gray-800 hover:bg-gray-100 border"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl mx-auto shadow-xl rounded-2xl overflow-hidden">
        <div className="px-5 pt-5 md:px-6 md:pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src="/logo.png" alt="Logo" className="h-9 w-9 md:h-10 md:w-10 object-contain" />
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Creative Framer template & Custom Services</h1>
                <p className="text-xs md:text-sm text-gray-500">Premium, conversion‑optimized templates for faster launches</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <NavButton id="overview" label="Overview" />
              <NavButton id="fundraise" label="We’re Raising" />
              <NavButton id="scale" label="Scale Plan" />
              <NavButton id="about" label="About Founder" />
              <a href={PDF_URL} download>
                <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5">Download PDF</Button>
              </a>
            </div>
          </div>
        </div>

        <CardContent className="p-5 md:p-6">
          <AnimatePresence mode="wait">
            {page === "overview" && (
              <motion.section key="overview" variants={container} initial="hidden" animate="show" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="flex flex-col justify-between">
                    <motion.h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2.5">Why Now</motion.h2>
                    <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-4">
                      We build and sell premium Framer templates tailored to SaaS. Demand is surging — users search for
                      “Framer template” roughly <b>2×</b> more than “Webflow template,” and SaaS teams want design‑quality
                      without agency cost or delay. We help them ship credible marketing sites in days, not weeks.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                      <InfoTile icon={<Users className="h-4 w-4" />} title="ICP" text="SaaS founders, agencies, product marketers" />
                      <InfoTile icon={<Target className="h-4 w-4" />} title="Edge" text="SaaS‑specific UX + CRO patterns" />
                      <InfoTile icon={<PlayCircle className="h-4 w-4" />} title="Go‑to‑Market" text="YouTube, SEO, free kits, remarketing" />
                      <InfoTile icon={<DollarSign className="h-4 w-4" />} title="Model" text="Templates, subscriptions, custom work" />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Marketing System</h3>
                      <p className="text-gray-800 text-xs md:text-sm">
                        • YouTube tutorials • LinkedIn/X tips • SEO blogs • Free templates • Facebook/Google remarketing
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">Year 1 Revenue Projection</h3>
                    <ResponsiveContainer width="100%" height={360}>
                      <BarChart data={revenueData}>
                        <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={{ stroke: '#E5E7EB' }} />
                        <YAxis tick={{ fill: '#374151', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={{ stroke: '#E5E7EB' }} />
                        <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#E5E7EB', background: '#FFFFFF', color: '#111827' }} />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#111827" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.section>
            )}

            {page === "fundraise" && (
              <motion.section key="fundraise" variants={container} initial="hidden" animate="show" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2.5">We’re Raising</h2>
                    <p className="text-gray-800 text-sm md:text-base mb-4">
                      Seeking <b>A$75,000</b> pre‑seed to accelerate template production, marketing, and early
                      subscriptions. Target runway: <b>12 months</b>. Long‑term, scale into a Creative Tech Consulting firm in Sydney, offering SaaS design systems, branding, and digital transformation services.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

            {page === "scale" && (
              <motion.section key="scale" variants={container} initial="hidden" animate="show" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2.5">Scale Plan — Creative Tech Consulting (Sydney)</h2>
                    <p className="text-gray-800 text-sm md:text-base mb-3.5">
                      Over 24 months, evolve from a template‑first engine into a studio serving Sydney SMEs and startups.
                      Use the in‑house template catalogue as IP to accelerate delivery and margins.
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Service Lines</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm">
                      <li>Website‑as‑a‑Service (Framer/Next.js), hosting & care plans</li>
                      <li>Brand & content (identity, systems, photography/video)</li>
                      <li>Conversion & analytics (CRO, GA4/GSC, experimentation)</li>
                      <li>Light cyber & compliance (basic hardening, policies, vendor risk); partner for advanced work</li>
                      <li>Tech consulting (stack selection, integrations, automation prototypes)</li>
                    </ul>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mt-4 mb-1.5">Sydney Go‑to‑Market</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm">
                      <li>Verticals: hospitality, creative retail, health & wellness, professional services, education</li>
                      <li>Partnerships: co‑works, accelerators, chambers, design schools, community groups</li>
                      <li>Lead gen: workshop series (Framer for SMEs), local SEO, referral loops</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Packages (AUD — indicative)</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm">
                      <li>Landing Launch: 3,000–6,000</li>
                      <li>Growth Site (blog/integrations): 7,500–15,000</li>
                      <li>WaaS Care (retainers): 350–1,200 / mo</li>
                      <li>Brand Starter: 2,500–5,000</li>
                    </ul>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mt-4 mb-1.5">Org & Compliance</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm">
                      <li>0–6m: founder‑led + contractors; 6–12m: add PM + junior designer; 12–24m: add full‑stack + content</li>
                      <li>ABN, GST when thresholds apply; PI & public liability insurance</li>
                      <li>Privacy policy & basic data protection; vendor DPAs review</li>
                    </ul>
                    <div className="mt-4 flex gap-3 flex-wrap">
                      <a href={PDF_URL} download>
                        <Button className="bg-black text-white rounded-xl text-xs md:text-sm px-3 py-1.5">Download Full Plan (PDF)</Button>
                      </a>
                      <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5" onClick={() => setPage("fundraise")}>View Raise</Button>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {page === "about" && (
              <motion.section key="about" variants={container} initial="hidden" animate="show" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  <div className="md:col-span-1">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={ABOUT_PHOTO_URL}
                      alt="Founder portrait"
                      className="w-full rounded-2xl object-cover shadow-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Obi Batbileg — Founder</h2>
                    <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-3.5">
                      Designer‑engineer with expertise in SaaS, front‑end (React, Next.js, Tailwind), and creative tech consulting. Experience launching web solutions for SMEs and brands in Sydney. Vision: expand into a Creative Tech Consulting firm supporting small to medium businesses in design, branding, and SaaS scalability.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a href="mailto:hello@obii.tech" target="_blank" rel="noreferrer">
                        <Button className="bg-black text-white rounded-xl text-xs md:text-sm px-3 py-1.5">Email</Button>
                      </a>
                      <a href="https://www.linkedin.com/in/obi-batbileg" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5">LinkedIn</Button>
                      </a>
                      <a href="https://obii.tech" target="_blank" rel="noreferrer">
                        <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5">Portfolio</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </CardContent>

        <div className="px-5 md:px-6 pb-5 md:pb-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm text-gray-500">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Obi Batbileg · Framer Templates for SaaS</p>
          <div className="flex gap-2">
            <button onClick={() => setPage("overview")} className="hover:underline">Overview</button>
            <span>·</span>
            <button onClick={() => setPage("fundraise")} className="hover:underline">Raise</button>
            <span>·</span>
            <button onClick={() => setPage("scale")} className="hover:underline">Scale</button>
            <span>·</span>
            <button onClick={() => setPage("about")} className="hover:underline">About</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoTile({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border bg-white p-3 md:p-3.5 shadow-sm"
    >
      <div className="flex items-center gap-2 text-gray-900 font-semibold text-xs md:text-sm">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-gray-800 text-xs md:text-sm mt-1.5">{text}</p>
    </motion.div>
  );
}
