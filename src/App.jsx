import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Users, DollarSign, Target, PlayCircle } from "lucide-react";


const ABOUT_PHOTO_URL = "/obi.jpg";
const PDF_URL = "/proposal.pdf";

export default function InvestorDeck() {
  const [page, setPage] = useState("overview");
  const [amountRaised, setAmountRaised] = useState(0);

  const TARGET_AMOUNT = 10000;
  const raisedPercent = Math.max(0, Math.min(100, Math.round((amountRaised / TARGET_AMOUNT) * 100)));

  const revenueData = [
    { name: "Template Sales", value: 30000 },
    { name: "Subscriptions", value: 5000 },
    { name: "Custom Services", value: 15000 },
  ];

  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
  };

  const NavButton = ({ id, label }) => (
    <button
      onClick={() => {
        setPage(id);
      }}
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
                <h1 className="text-lg md:text-xl font-bold text-gray-900">Creative Framer templates & Custom Services</h1>
                <p className="text-xs md:text-sm text-gray-500">Premium, conversion‑optimized templates for faster launches</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
            <NavButton id="overview" label="Overview" />
              <NavButton id="market" label="Market Analysis" />
            <NavButton id="scale" label="Scale Plan" />
              <NavButton id="roadmap" label="Roadmap" />
              <NavButton id="about" label="About Me" />
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
                      <InfoTile icon={<PlayCircle className="h-4 w-4" />} title="Go‑to‑Market" text="Framer marketplace, Trending web design, High Speed & Low Cost" />
                      <InfoTile icon={<DollarSign className="h-4 w-4" />} title="Model" text="Templates, subscriptions, custom work" />
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Marketing System</h3>
                      <p className="text-gray-800 text-xs md:text-sm">
                        YouTube tutorials • LinkedIn/X tips • SEO blogs • Free templates • Facebook/Google remarketing
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">💰 Year 1 Revenue Projection</h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-4">Conservative estimates based on market research and competitor analysis</p>
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#374151', fontSize: 11 }} 
                            axisLine={{ stroke: '#E5E7EB' }} 
                            tickLine={{ stroke: '#E5E7EB' }}
                          />
                          <YAxis 
                            domain={[0, 40000]} 
                            tick={{ fill: '#374151', fontSize: 11 }} 
                            axisLine={{ stroke: '#E5E7EB' }} 
                            tickLine={{ stroke: '#E5E7EB' }}
                            label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#6B7280' } }}
                          />
                          <Tooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                const total = 50000; // Sum of all revenue streams
                                const percentage = Math.round((data.value / total) * 100);
                                return (
                                  <div style={{ 
                                    background: '#FFFFFF', 
                                    padding: '16px', 
                                    borderRadius: '12px', 
                                    border: '1px solid #E5E7EB',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px',
                                    minWidth: '180px'
                                  }}>
                                    <p style={{ fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>{label}</p>
                                    <div style={{ marginBottom: '6px' }}>
                                      <span style={{ color: '#111827', fontWeight: 'bold' }}>Revenue:</span> ${data.value.toLocaleString()}
                                    </div>
                                    <div style={{ marginBottom: '6px' }}>
                                      <span style={{ color: '#6B7280' }}>Share of Total:</span> 
                                      <span style={{ 
                                        marginLeft: '6px', 
                                        fontWeight: 'bold',
                                        color: '#059669'
                                      }}>
                                        {percentage}%
                                      </span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#6B7280', paddingTop: '4px', borderTop: '1px solid #F3F4F6' }}>
                                      Monthly: ${Math.round(data.value / 12).toLocaleString()}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar 
                            dataKey="value" 
                            radius={[8, 8, 0, 0]} 
                            fill="#111827"
                          >
                            {revenueData.map((entry, index) => (
                              <motion.rect
                                key={`bar-${index}`}
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                              />
                            ))}
                          </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                      
                      {/* Revenue Insights */}
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="font-bold text-gray-900">$50K</div>
                            <div className="text-gray-600">Total Revenue</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="font-bold text-gray-900">$4.2K</div>
                            <div className="text-gray-600">Monthly Average</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="font-bold text-green-600">60%</div>
                            <div className="text-gray-600">Template Sales</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {page === "roadmap" && (
              <motion.section key="roadmap" variants={container} initial="hidden" animate="show" exit="exit">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">🗺️ Project Roadmap</h2>

                
                <div className="space-y-6">
                  {/* Timeline */}
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {/* Phase 1 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative flex items-start gap-4 pb-8"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold relative z-10">1</div>
                      <div className="flex-1 min-w-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-4 border border-white/50 backdrop-blur-sm transition-all duration-500 relative overflow-hidden">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Foundation (0-3 months)</h3>
                        <p className="text-gray-800 text-xs md:text-sm mb-2">Build core template collection and establish market presence</p>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1 opacity-100 h-auto overflow-visible">
                          <li>Create 5 premium SaaS templates</li>
                          <li>Launch marketplace presence</li>
                          <li>Establish brand and website</li>
                          <li>Initial marketing campaigns</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "5%" }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className="bg-gray-600 h-2 rounded-full"
                            />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">Starting</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Phase 2 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative flex items-start gap-4 pb-8"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold relative z-10">2</div>
                      <div className="flex-1 min-w-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-4 border border-white/50 backdrop-blur-sm transition-all duration-500 relative overflow-hidden">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Growth (3-6 months)</h3>
                        <p className="text-gray-800 text-xs md:text-sm mb-2">Scale template library and introduce subscription model</p>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1 opacity-100 h-auto overflow-visible">
                          <li>Expand to 15+ templates</li>
                          <li>Launch subscription service</li>
                          <li>Build email funnel system</li>
                          <li>Community engagement & partnerships</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "0%" }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="bg-gray-600 h-2 rounded-full"
                            />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">Planned</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Phase 3 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative flex items-start gap-4 pb-8"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold relative z-10">3</div>
                      <div className="flex-1 min-w-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-4 border border-white/50 backdrop-blur-sm transition-all duration-500 relative overflow-hidden">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Expansion (6-12 months)</h3>
                        <p className="text-gray-800 text-xs md:text-sm mb-2">Introduce custom services and scale operations</p>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1 opacity-100 h-auto overflow-visible">
                          <li>Launch custom design services</li>
                          <li>Hire junior designer/developer</li>
                          <li>Diversify revenue streams</li>
                          <li>International market expansion</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "0%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-gray-400 h-2 rounded-full"
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Future</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Phase 4 */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold relative z-10">4</div>
                      <div className="flex-1 min-w-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-4 border border-white/50 backdrop-blur-sm transition-all duration-500 relative overflow-hidden">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Studio Evolution (12+ months)</h3>
                        <p className="text-gray-800 text-xs md:text-sm mb-2">Transform into full-service Creative Tech Consulting</p>
                        <ul className="list-disc list-inside text-gray-700 text-xs space-y-1 opacity-100 h-auto overflow-visible">
                          <li>Establish Sydney-based studio</li>
                          <li>Full-service design & development</li>
                          <li>Enterprise client acquisition</li>
                          <li>Team scaling & process optimization</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-300 h-2 rounded-full w-0"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Future</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Key Milestones */}
                  <div className="mt-8 bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4">🎯 Key Milestones</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-lg p-3 border border-gray-100"
                      >
                        <span className="font-semibold text-black">Month 3:</span> First $1K revenue
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg p-3 border border-gray-100"
                      >
                        <span className="font-semibold text-gray-700">Month 6:</span> $5K monthly recurring
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-lg p-3 border border-gray-100"
                      >
                        <span className="font-semibold text-gray-600">Month 9:</span> First custom project
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-lg p-3 border border-gray-100"
                      >
                        <span className="font-semibold text-gray-500">Month 12:</span> $15K monthly revenue
                      </motion.div>
                    </div>
                  </div>

                  {/* Funding Requirements */}
                  <div className="mt-6 bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3">💰 Funding Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                        <p className="text-gray-800 text-xs md:text-sm mb-3">
                          Seeking <b>$10,000</b> pre-seed to accelerate template production, marketing, and early subscriptions. Target runway: <b>12 months</b>.
                        </p>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Template Development:</span>
                            <span className="font-medium">$4,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Marketing & Ads:</span>
                            <span className="font-medium">$3,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tools & Infrastructure:</span>
                            <span className="font-medium">$2,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Operations Buffer:</span>
                            <span className="font-medium">$1,000</span>
                          </div>
                          <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-gray-800 font-semibold">Total:</span>
                            <span className="font-bold">$10,000</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-xs">
                          <div className="flex items-end justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs text-gray-900 font-medium">${amountRaised.toLocaleString()} / ${TARGET_AMOUNT.toLocaleString()}</span>
                          </div>
                          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={TARGET_AMOUNT} aria-valuenow={amountRaised}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${raisedPercent}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-black"
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-2 text-center">{raisedPercent}% funded</p>
                        </div>
                      </div>
                    </div>
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
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Service Packages (AUD)</h3>
                    
                    {/* Pricing Table */}
                    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl border border-white/50 backdrop-blur-sm overflow-hidden mb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">Service</th>
                              <th className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">Price Range</th>
                              <th className="text-center py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">Timeline</th>
                            </tr>
                          </thead>
                          <tbody>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="border-b border-gray-100 hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4">
                                <div className="text-xs md:text-sm font-medium text-gray-900">Landing Launch</div>
                                <div className="text-xs text-gray-600">Basic website setup</div>
                              </td>
                              <td className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">$3,000–6,000</td>
                              <td className="text-center py-3 px-4 text-xs text-gray-600">1-2 weeks</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="border-b border-gray-100 hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4">
                                <div className="text-xs md:text-sm font-medium text-gray-900">Growth Site</div>
                                <div className="text-xs text-gray-600">Blog + integrations</div>
                              </td>
                              <td className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">$7,500–15,000</td>
                              <td className="text-center py-3 px-4 text-xs text-gray-600">3-4 weeks</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="border-b border-gray-100 hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4">
                                <div className="text-xs md:text-sm font-medium text-gray-900">WaaS Care</div>
                                <div className="text-xs text-gray-600">Monthly retainers</div>
                              </td>
                              <td className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">$350–1,200<span className="text-xs text-gray-500">/mo</span></td>
                              <td className="text-center py-3 px-4 text-xs text-gray-600">Ongoing</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4">
                                <div className="text-xs md:text-sm font-medium text-gray-900">Brand Starter</div>
                                <div className="text-xs text-gray-600">Identity & systems</div>
                              </td>
                              <td className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">$2,500–5,000</td>
                              <td className="text-center py-3 px-4 text-xs text-gray-600">2-3 weeks</td>
                            </motion.tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Team & Operations</h3>
                    
                    {/* Team Evolution Table */}
                    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl border border-white/50 backdrop-blur-sm overflow-hidden mb-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">Phase</th>
                              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">Team Structure</th>
                              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-900">Focus</th>
                            </tr>
                          </thead>
                          <tbody>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="border-b border-gray-100 hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900">0-6 months</td>
                              <td className="py-3 px-4 text-xs text-gray-700">Founder-led + contractors</td>
                              <td className="py-3 px-4 text-xs text-gray-600">Template production</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="border-b border-gray-100 hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900">6-12 months</td>
                              <td className="py-3 px-4 text-xs text-gray-700">+ PM + Junior Designer</td>
                              <td className="py-3 px-4 text-xs text-gray-600">Service scaling</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="hover:bg-white/80 transition-all duration-300"
                            >
                              <td className="py-3 px-4 text-xs md:text-sm font-medium text-gray-900">12-24 months</td>
                              <td className="py-3 px-4 text-xs text-gray-700">+ Full-stack + Content</td>
                              <td className="py-3 px-4 text-xs text-gray-600">Studio operations</td>
                            </motion.tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <strong>Compliance:</strong> ABN, GST (when applicable), PI & public liability insurance, privacy policy & basic data protection, vendor DPA reviews.
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <a href={PDF_URL} download>
                        <Button className="bg-black text-white rounded-xl text-xs md:text-sm px-3 py-1.5">Download Full Plan (PDF)</Button>
                      </a>
                      <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5" onClick={() => { setPage("roadmap"); }}>View Roadmap</Button>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {page === "market" && (
              <motion.section
                key="market"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                                 <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2.5">📊 Market Research & Analysis</h2>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                   {/* Left Column */}
                   <div>
                     <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Market Demand</h3>
                     <p className="text-gray-800 text-sm md:text-base mb-4">
                       "Framer templates" are searched nearly <b>2× more</b> than "Webflow templates."
                       SaaS market projected at <b>$232B+ by 2028</b> (CAGR ~12%). Every SaaS needs a
                       fast, credible landing page → consistent demand.
                     </p>

                    {/* Chart: Search Trends */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">📊 Yearly Average Popularity</h4>
                      <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={[
                          { year: "2020", framer: 0.0, webflow: 10.2, framerGrowth: null, webflowGrowth: null },
                          { year: "2021", framer: 0.0, webflow: 9.7, framerGrowth: "0%", webflowGrowth: "-5%" },
                          { year: "2022", framer: 0.06, webflow: 25.7, framerGrowth: "New", webflowGrowth: "+166%" },
                          { year: "2023", framer: 9.8, webflow: 32.8, framerGrowth: "+16,233%", webflowGrowth: "+28%" },
                          { year: "2024", framer: 33.9, webflow: 39.6, framerGrowth: "+247%", webflowGrowth: "+21%" },
                          { year: "2025", framer: 71.2, webflow: 44.0, framerGrowth: "+110%", webflowGrowth: "+11%" }
                        ]}>
                          <XAxis 
                            dataKey="year" 
                            tick={{ fill: "#374151", fontSize: 11 }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            tickLine={{ stroke: "#E5E7EB" }}
                          />
                          <YAxis 
                            tick={{ fill: "#374151", fontSize: 11 }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            tickLine={{ stroke: "#E5E7EB" }}
                            domain={[0, 80]}
                            label={{ value: 'Search Volume', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#6B7280' } }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: 12, 
                              border: '1px solid #E5E7EB', 
                              background: '#FFFFFF', 
                              color: '#111827',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              fontSize: 12
                            }}
                            labelStyle={{ color: '#374151', fontWeight: 'bold', marginBottom: 8 }}
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div style={{ 
                                    background: '#FFFFFF', 
                                    padding: '12px', 
                                    borderRadius: '12px', 
                                    border: '1px solid #E5E7EB',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px'
                                  }}>
                                    <p style={{ fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>{label}</p>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: '#111827', fontWeight: 'bold' }}>Framer:</span> {data.framer}
                                      {data.framerGrowth && (
                                        <span style={{ 
                                          marginLeft: '8px', 
                                          fontSize: '11px',
                                          color: data.framerGrowth.includes('-') ? '#DC2626' : data.framerGrowth === "0%" ? '#6B7280' : '#059669',
                                          fontWeight: 'bold'
                                        }}>
                                          {data.framerGrowth}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <span style={{ color: '#6B7280', fontWeight: 'bold' }}>Webflow:</span> {data.webflow}
                                      {data.webflowGrowth && (
                                        <span style={{ 
                                          marginLeft: '8px', 
                                          fontSize: '11px',
                                          color: data.webflowGrowth.includes('-') ? '#DC2626' : data.webflowGrowth === "0%" ? '#6B7280' : '#059669',
                                          fontWeight: 'bold'
                                        }}>
                                          {data.webflowGrowth}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="framer" 
                            stroke="#111827" 
                            strokeWidth={3}
                            dot={{ fill: "#111827", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: "#111827", strokeWidth: 3 }}
                            name="Framer Templates"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="webflow" 
                            stroke="#6B7280" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ fill: "#6B7280", strokeWidth: 2, r: 3 }}
                            activeDot={{ r: 5, fill: "#6B7280" }}
                            name="Webflow Templates"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      
                      {/* Key Insights */}
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">2020-2021:</span>
                          <span className="text-gray-800">Webflow led; Framer non-existent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">2024:</span>
                          <span className="text-gray-800">Framer +247% growth, closing the gap</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">2025:</span>
                          <span className="font-semibold text-gray-900">Framer surged past Webflow (+110% vs +11%)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-0.5 bg-black rounded"></div>
                            <span className="text-gray-700">Framer Templates</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-0.5 bg-gray-500 border-dashed border-t border-gray-500"></div>
                            <span className="text-gray-700">Webflow Templates</span>
                          </div>
                        </div>
                        <a 
                          href="https://trends.google.com/trends/explore?date=2020-01-01%202025-01-31&q=framer%20templates,webflow%20templates" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-gray-700 underline"
                        >
                          Source: Google Trends
                        </a>
                      </div>
                    </div>

                                         <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Competitor Analysis</h3>
                     <p className="text-gray-800 text-xs md:text-sm mb-4">
                       <b>Direct:</b> Framer Marketplace, Gumroad creators. <br/>
                       <b>Indirect:</b> Webflow sellers, ThemeForest. <br/>
                       <b>Gap:</b> Few SaaS-focused premium templates → opportunity to dominate niche.
                     </p>

                     <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Target Audience</h3>
                     <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm mb-4">
                       <li>SaaS founders, indie hackers, startup teams</li>
                       <li>Agencies & freelancers delivering for clients</li>
                       <li>Geography: US, Europe, global tech hubs</li>
                       <li>Behavior: value speed + aesthetics, active on X, LinkedIn, IndieHackers</li>
                     </ul>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Marketing & Distribution</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm mb-4">
                      <li>YouTube tutorials ("Build SaaS site in Framer")</li>
                      <li>SEO blogs & case studies</li>
                      <li>Free templates → email funnel → upsell</li>
                      <li>Retargeting ads (Google/Meta)</li>
                      <li>Community launches: ProductHunt, IndieHackers</li>
                    </ul>

                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Monetization Models</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm mb-4">
                      <li>One-time template sales ($49–$150)</li>
                      <li>Bundles (SaaS Starter Kit $250+)</li>
                      <li>Subscription (~$19/mo recurring)</li>
                      <li>Custom upsells ($500–$2k per project)</li>
                    </ul>

                    {/* Chart: SaaS Market Growth */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                      <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">💰 Global SaaS Market Value (2022-2030)</h4>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={[
                          { year: "2022", value: 130, growth: null },
                          { year: "2023", value: 145, growth: "+12%" },
                          { year: "2024", value: 164, growth: "+13%" },
                          { year: "2025", value: 185, growth: "+13%" },
                          { year: "2026", value: 208, growth: "+12%" },
                          { year: "2027", value: 233, growth: "+12%" },
                          { year: "2028", value: 261, growth: "+12%" },
                          { year: "2029", value: 292, growth: "+12%" },
                          { year: "2030", value: 327, growth: "+12%" }
                        ]}>
                          <XAxis 
                            dataKey="year" 
                            tick={{ fill: "#374151", fontSize: 11 }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            tickLine={{ stroke: "#E5E7EB" }}
                          />
                          <YAxis 
                            tick={{ fill: "#374151", fontSize: 11 }}
                            axisLine={{ stroke: "#E5E7EB" }}
                            tickLine={{ stroke: "#E5E7EB" }}
                            domain={[100, 350]}
                            label={{ value: 'Value ($B)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: '#6B7280' } }}
                          />
                          <Tooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div style={{ 
                                    background: '#FFFFFF', 
                                    padding: '12px', 
                                    borderRadius: '12px', 
                                    border: '1px solid #E5E7EB',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px'
                                  }}>
                                    <p style={{ fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>{label}</p>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: '#111827', fontWeight: 'bold' }}>Market Value:</span> ${data.value}B
                                      {data.growth && (
                                        <span style={{ 
                                          marginLeft: '8px', 
                                          fontSize: '11px',
                                          color: '#059669',
                                          fontWeight: 'bold'
                                        }}>
                                          {data.growth}
                                        </span>
                                      )}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#6B7280' }}>
                                      Compound Annual Growth Rate: ~12%
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#111827" 
                            strokeWidth={3}
                            dot={{ fill: "#111827", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: "#111827", strokeWidth: 3 }}
                            name="SaaS Market Value"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      
                      {/* Key Market Insights */}
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">2024-2028:</span>
                          <span className="text-gray-800">Expected to grow from $164B to $261B</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Growth Rate:</span>
                          <span className="font-semibold text-green-600">~12% CAGR (Compound Annual)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">By 2030:</span>
                          <span className="font-semibold text-gray-900">Market reaches $327B+ globally</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-0.5 bg-black rounded"></div>
                          <span className="text-gray-700">Market Value ($B)</span>
                        </div>
                        <a 
                          href="https://www.grandviewresearch.com/industry-analysis/software-as-a-service-market" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-gray-700 underline"
                        >
                          Source: Grand View Research
                        </a>
                      </div>
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Opportunities</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-xs md:text-sm mb-4">
                      <li>First-mover SaaS template niche</li>
                      <li>AI-ready template positioning</li>
                      <li>Cross-platform expansion (Webflow, WP)</li>
                      <li>Agency upsell: full SaaS branding packages</li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Insight */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-100 rounded-2xl shadow-inner">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">🔑 Key Recommendations</h3>
                  <p className="text-gray-800 text-xs md:text-sm mb-2">
                    Launch with 2–3 premium SaaS templates; niche down into SaaS landing pages; 
                    build in public on X & LinkedIn; capture emails via free templates; validate 
                    pricing ($49–$79 each); expand into subscriptions once 10–15 templates exist.
                  </p>
                  <p className="text-gray-900 font-semibold text-xs md:text-sm">
                    ✅ Verdict: Low-cost, high-upside. Demand is real, competition unsaturated, 
                    success hinges on consistent content + premium quality.
                  </p>
                </div>
              </motion.section>
            )}

            {page === "about" && (
              <motion.section key="about" variants={container} initial="hidden" animate="show" exit="exit">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Obi Batbileg</h2>
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-3.5">
                    I am a recent graduate in Information and Communications Technology (Information Systems) with hands-on experience in front-end development, SaaS concepts, and digital solutions. Over the past few years, I've worked on projects combining design, coding, and consulting—ranging from building Figma-to-code prototypes to delivering web and branding solutions for small businesses and community groups in Sydney.
                  </p>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">Vision</h3>
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-3.5">
                    My vision is to grow this experience into a Framer-driven, no-code, high-speed production approach that evolves into a Creative Tech Consulting firm. The goal is to help small to medium-sized businesses improve their digital presence by offering accessible services in web development, design, and scalable SaaS solutions—supporting SMEs in streamlining their operations and building stronger brands.
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
              </motion.section>
            )}
          </AnimatePresence>
        </CardContent>

        <div className="px-5 md:px-6 pb-5 md:pb-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm text-gray-500">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Obi Batbileg · Framer Templates for SaaS</p>
          <div className="flex gap-2">
            <button onClick={() => { setPage("overview"); }} className="hover:underline">Overview</button>
            <span>·</span>
            <button onClick={() => { setPage("roadmap"); }} className="hover:underline">Roadmap</button>
            <span>·</span>
            <button onClick={() => { setPage("scale"); }} className="hover:underline">Scale</button>
            <span>·</span>
            <button onClick={() => { setPage("about"); }} className="hover:underline">About</button>
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
