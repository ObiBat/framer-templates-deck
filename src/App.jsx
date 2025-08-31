import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Users, DollarSign, Target, PlayCircle, Moon, Sun, Copy } from "lucide-react";


const ABOUT_PHOTO_URL = "/obi.jpg";
const PDF_URL = "/proposal.pdf";

export default function InvestorDeck() {
  const [page, setPage] = useState("overview");
  const [amountRaised, setAmountRaised] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  // Dark mode toggle function
  const toggleDarkMode = () => {
    console.log('Toggle clicked! Current mode:', isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode to body and persist preference
  useEffect(() => {
    // Check for saved preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      // Default to light mode instead of system preference
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to html element and save preference
    const htmlElement = document.documentElement;
    
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    
    // Debug logging
    console.log('Dark mode:', isDarkMode);
    console.log('HTML classes:', htmlElement.classList.toString());
  }, [isDarkMode]);

  // Auto-cycle opportunities every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOpportunity(prev => prev === 4 ? 0 : prev + 1);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    const email = 'obibatbileg@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch (e) {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    }
  };

  const TARGET_AMOUNT = 10000;
  const raisedPercent = Math.max(0, Math.min(100, Math.round((amountRaised / TARGET_AMOUNT) * 100)));

  const revenueData = [
    { 
      name: "Templates", 
      value: 86940, 
      calculation: "15 sales/mo × $69 × 8 templates",
      details: "1,260 sales total",
      breakdown: "10-30 sales/mo per template"
    },
    { 
      name: "Setup", 
      value: 7920, 
      calculation: "8 projects × $990",
      details: "One-time setups",
      breakdown: "Custom implementations"
    },
    { 
      name: "WaaS Care", 
      value: 8940, 
      calculation: "5 clients avg × $149 × 12mo",
      details: "Recurring revenue",
      breakdown: "Monthly maintenance"
    },
    { 
      name: "Affiliate", 
      value: 2880, 
      calculation: "20 referrals × $12 × 12mo",
      details: "Framer commissions",
      breakdown: "Recurring referrals"
    }
  ];

  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
  };

  const NavButton = ({ id, label, isDarkMode: isDM }) => {
    const isActive = page === id;
    const activeClass = isDM
      ? 'bg-white text-gray-900 border border-gray-600 shadow'
      : 'bg-gray-700 text-white border border-gray-700 hover:bg-gray-600 shadow';
    const inactiveClass = isDM
      ? 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600'
      : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-100';
    return (
    <button
        onClick={() => {
          setPage(id);
        }}
        className={`px-2.5 py-1.5 rounded-xl text-xs md:text-sm font-medium transition ${isActive ? activeClass : inactiveClass}`}
    >
      {label}
    </button>
  );
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Card className={`w-full max-w-6xl mx-auto shadow-xl rounded-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`px-5 pt-5 md:px-6 md:pt-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                src="/logo.png" 
                alt="Logo" 
                className={`h-9 w-9 md:h-10 md:w-10 object-contain transition-all duration-300 ${isDarkMode ? 'brightness-0 invert' : ''}`}
              />
            <div>
                <h1 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Premium Framer templates & Custom Services</h1>
                <p className={`text-xs md:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium, conversion‑optimized templates for faster launches</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
            <NavButton id="overview" label="Overview" isDarkMode={isDarkMode} />
              <NavButton id="market" label="Market Analysis" isDarkMode={isDarkMode} />
            <NavButton id="scale" label="Scale Plan" isDarkMode={isDarkMode} />
              <NavButton id="roadmap" label="Roadmap" isDarkMode={isDarkMode} />
              <NavButton id="about" label="About Me" isDarkMode={isDarkMode} />
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl border transition-all duration-200 ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'}`}
                aria-label="Toggle dark mode"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        <CardContent className={`p-5 md:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <AnimatePresence mode="wait">
            {page === "overview" && (
              <motion.section key="overview" variants={container} initial="hidden" animate="show" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="flex flex-col justify-between">
                    <motion.h2 className={`text-xl md:text-2xl font-bold mb-2.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Now</motion.h2>
                    <p className={`text-sm md:text-base leading-relaxed mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      We build and sell premium Framer templates tailored to SaaS. Teams want design‑quality without
                      agency cost or delay. We help them ship credible marketing sites in days, not weeks.
                    </p>

                    <div className="grid grid-cols-2 gap-2.5">
                      <InfoTile icon={<Users className="h-4 w-4" />} title="ICP" text="SaaS founders, agencies, product marketers" isDarkMode={isDarkMode} />
                      <InfoTile icon={<Target className="h-4 w-4" />} title="Edge" text="SaaS‑specific UX + CRO patterns" isDarkMode={isDarkMode} />
                      <InfoTile icon={<PlayCircle className="h-4 w-4" />} title="Go‑to‑Market" text="Framer marketplace, Trending web design, High Speed & Low Cost" isDarkMode={isDarkMode} />
                      <InfoTile icon={<DollarSign className="h-4 w-4" />} title="Model" text="Templates, subscriptions, custom work" isDarkMode={isDarkMode} />
                    </div>

                    <div className="mt-4">
                      <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Marketing System</h3>
                      <p className={`text-xs md:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        YouTube tutorials • LinkedIn/X tips • SEO blogs • Free templates • Facebook/Google remarketing
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className={`rounded-2xl p-4 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Year 1 Revenue Projection</h3>
                        <div className={`px-2.5 py-1 rounded-xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`} style={{ fontSize: '10px', lineHeight: '1.3', textAlign: 'center', maxWidth: '80px', wordWrap: 'break-word' }}>
                          Focus: Template Production
                        </div>
                      </div>
                      <p className={`text-xs mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Detailed breakdown with calculations and assumptions</p>
                      
                      {/* Main Chart */}
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: isDarkMode ? '#E5E7EB' : '#374151', fontSize: 10 }} 
                            axisLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }} 
                            tickLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                          />
                          <YAxis 
                            domain={[0, 90000]} 
                            tick={{ fill: isDarkMode ? '#E5E7EB' : '#374151', fontSize: 10 }} 
                            axisLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }} 
                            tickLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                            label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 10, fill: isDarkMode ? '#9CA3AF' : '#6B7280' } }}
                          />
                          <Tooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                const total = 106680;
                                const percentage = Math.round((data.value / total) * 100);
                                return (
                                  <div style={{ 
                                    background: isDarkMode ? '#374151' : '#FFFFFF', 
                                    padding: '12px', 
                                    borderRadius: '12px', 
                                    border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '11px',
                                    minWidth: '200px'
                                  }}>
                                    <p style={{ fontWeight: 'bold', color: isDarkMode ? '#FFFFFF' : '#374151', marginBottom: '6px' }}>{label}</p>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: isDarkMode ? '#FFFFFF' : '#111827', fontWeight: 'bold' }}>Revenue:</span> <span style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}>${data.value.toLocaleString()}</span>
                                    </div>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>Calculation:</span> <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>{data.calculation}</span>
                                    </div>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>Details:</span> <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>{data.details}</span>
                                    </div>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>Share:</span> 
                                      <span style={{ 
                                        marginLeft: '4px', 
                                        fontWeight: 'bold',
                                        color: '#059669'
                                      }}>
                                        {percentage}%
                                      </span>
                                    </div>
                                    <div style={{ fontSize: '10px', color: isDarkMode ? '#FFFFFF' : '#6B7280', paddingTop: '4px', borderTop: `1px solid ${isDarkMode ? '#4B5563' : '#F3F4F6'}` }}>
                                      Monthly Avg: ${Math.round(data.value / 12).toLocaleString()}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar 
                            dataKey="value" 
                            radius={[6, 6, 0, 0]} 
                            fill={isDarkMode ? "#FFFFFF" : "#111827"}
                          />
                      </BarChart>
                    </ResponsiveContainer>
                      
                      {/* Key Metrics Grid */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div className={`text-center p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white border border-gray-100'}`}>
                          <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$106.7K</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Gross Revenue</div>
                        </div>
                        <div className={`text-center p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white border border-gray-100'}`}>
                          <div className={`font-bold text-sm text-green-600`}>$79K</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Net Revenue</div>
                        </div>
                        <div className={`text-center p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white border border-gray-100'}`}>
                          <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$69</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg Template Price</div>
                        </div>
                        <div className={`text-center p-2 rounded-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-white border border-gray-100'}`}>
                          <div className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>81%</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Template Share</div>
                        </div>
                      </div>
                      
                      {/* Assumptions & Details */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Assumptions</h4>
                            <ul className={`space-y-0.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <li>• 8 templates released staggered</li>
                              <li>• 10-30 sales/mo per template</li>
                              <li>• 5 WaaS care clients average</li>
                              <li>• 20 Framer referrals/year</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Expense Breakdown</h4>
                            <ul className={`space-y-0.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <li>• Platform fees: ~7%</li>
                              <li>• Operations: $600/mo</li>
                              <li>• Marketing: $800–$1,200/mo</li>
                              <li>• Total deduction: ~26%</li>
                            </ul>
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
                <h2 className={`text-xl md:text-2xl font-bold mb-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Roadmap</h2>

                
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
                      <div className={`flex-1 min-w-0 rounded-2xl p-4 border backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50'}`}>
                        <h3 className={`text-base md:text-lg font-semibold mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Foundation (0-3 months)</h3>
                        <p className={`text-xs md:text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Build core template collection and establish market presence</p>
                        <ul className={`list-disc list-inside text-xs space-y-1 opacity-100 h-auto overflow-visible ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>Create 5 premium SaaS templates</li>
                          <li>Launch marketplace presence</li>
                          <li>Establish brand and website</li>
                          <li>Initial marketing campaigns</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`flex-1 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "5%" }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className={`h-2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                            />
                          </div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>5% Complete</span>
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
                      <div className={`flex-1 min-w-0 rounded-2xl p-4 border backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50'}`}>
                        <h3 className={`text-base md:text-lg font-semibold mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Growth (3-6 months)</h3>
                        <p className={`text-xs md:text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Scale template library and introduce subscription model</p>
                        <ul className={`list-disc list-inside text-xs space-y-1 opacity-100 h-auto overflow-visible ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>Expand to 15+ templates</li>
                          <li>Launch subscription service</li>
                          <li>Build email funnel system</li>
                          <li>Community engagement & partnerships</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`flex-1 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "0%" }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="bg-gray-600 h-2 rounded-full"
                            />
                          </div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Planned</span>
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
                      <div className={`flex-1 min-w-0 rounded-2xl p-4 border backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50'}`}>
                        <h3 className={`text-base md:text-lg font-semibold mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Expansion (6-12 months)</h3>
                        <p className={`text-xs md:text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Introduce custom services and scale operations</p>
                        <ul className={`list-disc list-inside text-xs space-y-1 opacity-100 h-auto overflow-visible ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>Launch custom design services</li>
                          <li>Hire junior designer/developer</li>
                          <li>Diversify revenue streams</li>
                          <li>International market expansion</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`flex-1 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "0%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-gray-400 h-2 rounded-full"
                            />
                          </div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Future</span>
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
                      <div className={`flex-1 min-w-0 rounded-2xl p-4 border backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50'}`}>
                        <h3 className={`text-base md:text-lg font-semibold mb-1 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Studio Evolution (12+ months)</h3>
                        <p className={`text-xs md:text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Transform into full-service Creative Tech Consulting</p>
                        <ul className={`list-disc list-inside text-xs space-y-1 opacity-100 h-auto overflow-visible ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>Establish Sydney-based studio</li>
                          <li>Full-service design & development</li>
                          <li>Enterprise client acquisition</li>
                          <li>Team scaling & process optimization</li>
                        </ul>
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`flex-1 rounded-full h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            <div className="bg-gray-300 h-2 rounded-full w-0"></div>
                          </div>
                          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Future</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Key Milestones */}
                  <div className={`mt-8 rounded-2xl p-4 md:p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                    <h3 className={`text-base md:text-lg font-bold mb-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🎯 Key Milestones</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`rounded-lg p-3 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-100'}`}
                      >
                        <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>Month 3:</span> <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>First $1K revenue</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`rounded-lg p-3 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-100'}`}
                      >
                        <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Month 6:</span> <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>$5K monthly recurring</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`rounded-lg p-3 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-100'}`}
                      >
                        <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>Month 9:</span> <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>First custom project</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`rounded-lg p-3 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-100'}`}
                      >
                        <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>Month 12:</span> <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>$15K monthly revenue</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Funding Requirements */}
                  <div className={`mt-6 rounded-2xl p-4 md:p-6 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                    <h3 className={`text-base md:text-lg font-bold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>💰 Funding Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                        <p className={`text-xs md:text-sm mb-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          Seeking <b>$10,000</b> pre-seed to accelerate template production, marketing, and early subscriptions. Target runway: <b>12 months</b>.
                        </p>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Template Development:</span>
                            <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$4,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Marketing & Ads:</span>
                            <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$3,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tools & Infrastructure:</span>
                            <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$2,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Operations Buffer:</span>
                            <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$1,000</span>
                          </div>
                          <div className={`flex justify-between border-t pt-2 transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Total:</span>
                            <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$10,000</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-xs">
                          <div className="flex items-end justify-between mb-1">
                            <span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
                            <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>${amountRaised.toLocaleString()} / ${TARGET_AMOUNT.toLocaleString()}</span>
                          </div>
                          <div className={`h-3 w-full rounded-full overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`} role="progressbar" aria-valuemin={0} aria-valuemax={TARGET_AMOUNT} aria-valuenow={amountRaised}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${raisedPercent}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full ${isDarkMode ? 'bg-white' : 'bg-black'}`}
                            />
                          </div>
                          <p className={`text-xs mt-2 text-center transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{raisedPercent}% funded</p>
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
                    <h2 className={`text-xl md:text-2xl font-bold mb-2.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Scale Plan — Creative Tech Consulting (Sydney)</h2>
                    <p className={`text-sm md:text-base mb-3.5 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Over 24 months, evolve from a template‑first engine into a studio serving Sydney SMEs and startups.
                      Use the in‑house template catalogue as IP to accelerate delivery and margins.
                    </p>
                    <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Service Lines</h3>
                    <ul className={`list-disc list-inside space-y-1 text-xs md:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <li>Website‑as‑a‑Service (Framer/Next.js), hosting & care plans</li>
                      <li>Brand & content (identity, systems, photography/video)</li>
                      <li>Conversion & analytics (CRO, GA4/GSC, experimentation)</li>
                      <li>Light cyber & compliance (basic hardening, policies, vendor risk); partner for advanced work</li>
                      <li>Tech consulting (stack selection, integrations, automation prototypes)</li>
                    </ul>
                    <h3 className={`text-base md:text-lg font-semibold mt-4 mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sydney Go‑to‑Market</h3>
                    <ul className={`list-disc list-inside space-y-1 text-xs md:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <li>Verticals: hospitality, creative retail, health & wellness, professional services, education</li>
                      <li>Partnerships: co‑works, accelerators, chambers, design schools, community groups</li>
                      <li>Lead gen: workshop series (Framer for SMEs), local SEO, referral loops</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={`text-base md:text-lg font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Service Packages (AUD)</h3>
                    
                    {/* Pricing Table */}
                    <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden mb-4 transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500' : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-200'}`}>
                              <th className={`text-left py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Service</th>
                              <th className={`text-right py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Price Range</th>
                              <th className={`text-center py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Timeline</th>
                            </tr>
                          </thead>
                          <tbody>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className={`border-b transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:bg-gray-600/80' : 'border-gray-100 hover:bg-white/80'}`}
                            >
                              <td className="py-3 px-4">
                                <div className={`text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Landing Launch</div>
                                <div className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Basic website setup</div>
                              </td>
                              <td className={`text-right py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$3,000–6,000</td>
                              <td className={`text-center py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>1-2 weeks</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className={`border-b transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:bg-gray-600/80' : 'border-gray-100 hover:bg-white/80'}`}
                            >
                              <td className="py-3 px-4">
                                <div className={`text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Growth Site</div>
                                <div className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Blog + integrations</div>
                              </td>
                              <td className={`text-right py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$7,500–15,000</td>
                              <td className={`text-center py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>3-4 weeks</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className={`border-b transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:bg-gray-600/80' : 'border-gray-100 hover:bg-white/80'}`}
                            >
                              <td className="py-3 px-4">
                                <div className={`text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>WaaS Care</div>
                                <div className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monthly retainers</div>
                              </td>
                              <td className={`text-right py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$350–1,200<span className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span></td>
                              <td className={`text-center py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ongoing</td>
                            </motion.tr>
                            <motion.tr 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className={`transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-600/80' : 'hover:bg-white/80'}`}
                            >
                              <td className="py-3 px-4">
                                <div className={`text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Brand Starter</div>
                                <div className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Identity & systems</div>
                              </td>
                              <td className={`text-right py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$2,500–5,000</td>
                              <td className={`text-center py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>2-3 weeks</td>
                            </motion.tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <h3 className={`text-base md:text-lg font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Team & Operations</h3>
                    
                    {/* Team Evolution Table */}
                    <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden mb-4 transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 border-white/50'}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                                                          <tr className={`border-b transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500' : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-200'}`}>
                                                          <th className={`text-left py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phase</th>
                            <th className={`text-left py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Team Structure</th>
                            <th className={`text-left py-3 px-4 text-xs md:text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Focus</th>
                            </tr>
                          </thead>
                          <tbody>
                                                          <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className={`border-b transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:bg-gray-600/80' : 'border-gray-100 hover:bg-white/80'}`}
                              >
                              <td className={`py-3 px-4 text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>0-6 months</td>
                                                              <td className={`py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Founder-led + contractors</td>
                                <td className={`py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Template production</td>
                            </motion.tr>
                                                          <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`border-b transition-all duration-300 ${isDarkMode ? 'border-gray-600 hover:bg-gray-600/80' : 'border-gray-100 hover:bg-white/80'}`}
                              >
                              <td className={`py-3 px-4 text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>6-12 months</td>
                                                              <td className={`py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>+ PM + Junior Designer</td>
                                <td className={`py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Service scaling</td>
                            </motion.tr>
                                                          <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-600/80' : 'hover:bg-white/80'}`}
                              >
                              <td className={`py-3 px-4 text-xs md:text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12-24 months</td>
                                                              <td className={`py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>+ Full-stack + Content</td>
                                <td className={`py-3 px-4 text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Studio operations</td>
                            </motion.tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className={`text-xs mb-4 p-3 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'text-gray-300 bg-gray-700 border-gray-600' : 'text-gray-600 bg-gray-50 border-gray-100'}`}>
                      <strong className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Compliance:</strong> ABN, GST (when applicable), PI & public liability insurance, privacy policy & basic data protection, vendor DPA reviews.
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <a href={PDF_URL} download>
                        <Button className={`rounded-xl text-xs md:text-sm px-3 py-1.5 ambient-attention ${isDarkMode ? 'ambient-dark' : 'ambient-light'}`} isDarkMode={isDarkMode}>Download Full Plan (PDF)</Button>
                      </a>
                      <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5" onClick={() => { setPage("roadmap"); }} isDarkMode={isDarkMode}>View Roadmap</Button>
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
                                 <h2 className={`text-xl md:text-2xl font-bold mb-2.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Market Research & Analysis</h2>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                   {/* Left Column */}
                   <div>
                     <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Market Demand</h3>
                     <p className={`text-sm md:text-base mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                       "Framer templates" are searched nearly <b>2× more</b> than "Webflow templates."
                       SaaS market projected at <b>$582B+ by 2027.</b> Every SaaS needs a
                       fast, credible landing page → consistent demand.
                     </p>

                    {/* Chart: Search Trends */}
                    <div className={`rounded-2xl p-4 mb-6 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                      <h4 className={`text-xs md:text-sm font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>📊 Yearly Average Popularity</h4>
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
                            tick={{ fill: isDarkMode ? '#E5E7EB' : '#374151', fontSize: 11 }}
                            axisLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                            tickLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                          />
                          <YAxis 
                            tick={{ fill: isDarkMode ? '#E5E7EB' : '#374151', fontSize: 11 }}
                            axisLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                            tickLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                            domain={[0, 80]}
                            label={{ value: 'Search Interest (0-100)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: isDarkMode ? '#9CA3AF' : '#6B7280' } }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: 12, 
                              border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`, 
                              background: isDarkMode ? '#374151' : '#FFFFFF', 
                              color: isDarkMode ? '#E5E7EB' : '#111827',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              fontSize: 12
                            }}
                            labelStyle={{ color: isDarkMode ? '#E5E7EB' : '#374151', fontWeight: 'bold', marginBottom: 8 }}
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div style={{ 
                                    background: isDarkMode ? '#374151' : '#FFFFFF', 
                                    padding: '12px', 
                                    borderRadius: '12px', 
                                    border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px'
                                  }}>
                                    <p style={{ fontWeight: 'bold', color: isDarkMode ? '#FFFFFF' : '#374151', marginBottom: '8px' }}>{label}</p>
                                    <div style={{ marginBottom: '4px' }}>
                                      <span style={{ color: isDarkMode ? '#FFFFFF' : '#111827', fontWeight: 'bold' }}>Framer:</span> <span style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}>{data.framer}</span>
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
                                      <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280', fontWeight: 'bold' }}>Webflow:</span> <span style={{ color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>{data.webflow}</span>
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
                            stroke={isDarkMode ? "#FFFFFF" : "#111827"} 
                            strokeWidth={3}
                            dot={{ fill: isDarkMode ? "#FFFFFF" : "#111827", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: isDarkMode ? "#FFFFFF" : "#111827", strokeWidth: 3 }}
                            name="Framer Templates"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="webflow" 
                            stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280", strokeWidth: 2, r: 3 }}
                            activeDot={{ r: 5, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                            name="Webflow Templates"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      
                      {/* Key Insights */}
                      <div className="mt-4 space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>2020-2021:</span>
                          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Webflow led; Framer non-existent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>2024:</span>
                          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Framer +247% growth, closing the gap</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>2025:</span>
                          <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Framer surged past Webflow (<span className="text-green-600">+110%</span> vs <span className="text-orange-500">+11%</span>)</span>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between mt-4 pt-3 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-3 h-0.5 rounded transition-colors duration-300 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
                            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Framer Templates</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-3 h-0.5 border-dashed border-t transition-colors duration-300 ${isDarkMode ? 'bg-gray-400 border-gray-400' : 'bg-gray-500 border-gray-500'}`}></div>
                            <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Webflow Templates</span>
                          </div>
                        </div>
                        <a 
                          href="https://trends.google.com/trends/explore?date=today%205-y&q=framer%20templates,webflow%20templates" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`text-xs underline transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Source: Google Trends
                        </a>
                      </div>
                    </div>



                     <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Market Landscape</h3>
                     <p className={`text-xs md:text-sm mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                       <b>• SaaS founders & Devs</b> → want fast, credible sites without agencies. Pain points: speed, design credibility, low cost. <br/>
                       <b>• SMEs</b> (construction, health, hospitality and retail in Sydney initially) → want "modern online presence" but not technical. Pain points: complexity, maintenance. <br/>
                       <b>• Creators / coaches</b> → want funnels, landing pages, email capture quickly. Pain points: too much DIY, poor conversions.
                     </p>

                     {/* Chart: SaaS Market Growth */}
                     <div className={`rounded-2xl p-4 mb-6 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                       <h4 className={`text-xs md:text-sm font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>💰 Global SaaS Market Size (2022-2030)</h4>
                       <ResponsiveContainer width="100%" height={220}>
                         <LineChart data={[
                           { year: "2022", value: 261, growth: null },
                           { year: "2023", value: 333, growth: "+28%" },
                           { year: "2024", value: 399, growth: "+20%" },
                           { year: "2025", value: 464, growth: "+16%" },
                           { year: "2026", value: 520, growth: "+12%" },
                           { year: "2027", value: 582, growth: "+12%" },
                           { year: "2028", value: 652, growth: "+12%" },
                           { year: "2029", value: 730, growth: "+12%" },
                           { year: "2030", value: 819, growth: "+12%" }
                         ]}>
                           <XAxis 
                             dataKey="year" 
                             tick={{ fill: isDarkMode ? '#E5E7EB' : '#374151', fontSize: 11 }}
                             axisLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                             tickLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                           />
                           <YAxis 
                             tick={{ fill: isDarkMode ? '#E5E7EB' : '#374151', fontSize: 11 }}
                             axisLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                             tickLine={{ stroke: isDarkMode ? '#4B5563' : '#E5E7EB' }}
                             domain={[200, 900]}
                             label={{ value: 'Market Size (US$B)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11, fill: isDarkMode ? '#9CA3AF' : '#6B7280' } }}
                           />
                           <Tooltip 
                             content={({ active, payload, label }) => {
                               if (active && payload && payload.length) {
                                 const data = payload[0].payload;
                                 return (
                                   <div style={{ 
                                     background: isDarkMode ? '#374151' : '#FFFFFF', 
                                     padding: '12px', 
                                     borderRadius: '12px', 
                                     border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                     fontSize: '12px'
                                   }}>
                                     <p style={{ fontWeight: 'bold', color: isDarkMode ? '#FFFFFF' : '#374151', marginBottom: '8px' }}>{label}</p>
                                     <div style={{ marginBottom: '4px' }}>
                                       <span style={{ color: isDarkMode ? '#FFFFFF' : '#111827', fontWeight: 'bold' }}>Market Value:</span> <span style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}>${data.value}B</span>
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
                                     <div style={{ fontSize: '11px', color: isDarkMode ? '#FFFFFF' : '#6B7280' }}>
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
                             stroke={isDarkMode ? "#FFFFFF" : "#111827"} 
                             strokeWidth={3}
                             dot={{ fill: isDarkMode ? "#FFFFFF" : "#111827", strokeWidth: 2, r: 4 }}
                             activeDot={{ r: 6, fill: isDarkMode ? "#FFFFFF" : "#111827", strokeWidth: 3 }}
                             name="SaaS Market Value"
                           />
                         </LineChart>
                       </ResponsiveContainer>
                       
                       {/* Key Market Insights */}
                       <div className="mt-4 space-y-2 text-xs">
                         <div className="flex items-center gap-2">
                           <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>2024-2030:</span>
                           <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Expected to grow from $399B to $819B</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Growth Rate:</span>
                           <span className="font-semibold text-green-600">12% CAGR</span> <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>(2025-2030)</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>By 2030:</span>
                           <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Market reaches $819B+ globally</span>
                         </div>
                       </div>

                       <div className={`flex items-center justify-between mt-4 pt-3 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                         <div className="flex items-center gap-2 text-xs">
                           <span className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Top Markets: U.S., UK, India, Canada, Germany, France, Australia, Netherlands, China, Spain</span>
                         </div>
                         <a 
                           href="https://www.grandviewresearch.com/horizon/outlook/software-as-a-service-saas-market-size/global" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className={`text-xs underline transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                         >
                           Source: Grand View Research
                         </a>
                       </div>
                     </div>

                  </div>

                  {/* Right Column */}
                  <div>
                    <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>🎯 Marketing Funnel</h3>
                    
                    {/* Marketing Funnel Chart */}
                    <div className={`rounded-2xl p-4 mb-6 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                      {/* Funnel Shape Visualization */}
                      <div className="relative mb-4">
                        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
                        <svg 
                          width="100%" 
                          height="120" 
                          viewBox="0 0 300 120" 
                          className="overflow-visible"
                          style={{ maxWidth: '100%' }}
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {/* Funnel Shape */}
                          <motion.path
                            variants={{
                              hidden: { opacity: 0, pathLength: 0 },
                              show:   { opacity: 1, pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut' } }
                            }}
                            d="M50 20 L250 20 L220 40 L80 40 L190 60 L110 60 L160 80 L140 80 L155 100 L145 100 Z"
                            fill={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                            stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            vectorEffect="non-scaling-stroke"
                          />
                          
                          {/* Stage Markers */}
                          {[
                            { x: 150, y: 15, stage: "1" },
                            { x: 150, y: 35, stage: "2" },
                            { x: 150, y: 55, stage: "3" },
                            { x: 150, y: 75, stage: "4" },
                            { x: 150, y: 95, stage: "5" }
                          ].map((marker, index) => (
                            <motion.g
                              variants={{
                                hidden: { opacity: 0, scale: 0.85 },
                                show:   { opacity: 1, scale: 1, transition: { delay: index * 0.12 + 0.25, duration: 0.4, ease: 'easeOut' } }
                              }}
                              key={index}
                              style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
                            >
                              <circle
                                cx={marker.x}
                                cy={marker.y}
                                r="12"
                                fill={isDarkMode ? "#374151" : "#FFFFFF"}
                                stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                              />
                              <text
                                x={marker.x}
                                y={marker.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="10"
                                fill={isDarkMode ? "#FFFFFF" : "#111827"}
                                style={{ userSelect: 'none', pointerEvents: 'none' }}
                              >
                                {marker.stage}
                              </text>
                            </motion.g>
                          ))}
                        </svg>
                        </motion.div>
                      </div>

                      {/* Compact Stage Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          {
                            stage: "1",
                            title: "Awareness",
                            tactics: "YouTube + Shorts + Free Templates + LinkedIn/X + Blog posts + Tutorials",
                            key: "Value proves delivery"
                          },
                          {
                            stage: "2", 
                            title: "Interest",
                            tactics: "Email drips + Community signals",
                            key: "Storytelling reduces friction"
                          },
                          {
                            stage: "3",
                            title: "Decision", 
                            tactics: "Landing pages with comparison: Free vs Pro, Urgency: launch-week discount, Guarantee: 14-day no-questions refund, Up-sell path",
                            key: "Remove risk + add urgency"
                          },
                          {
                            stage: "4",
                            title: "Retention",
                            tactics: "Free updates + WaaS ($149/mo)",
                            key: "Reciprocity triggers purchases"
                          }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-600 border-gray-500 hover:bg-gray-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}>
                                {item.stage}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 mb-1">
                                  <h4 className={`text-xs font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                                </div>
                                <p className={`text-xs mb-1 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.tactics}</p>
                                <p className={`text-xs italic transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>🔑 {item.key}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Advocacy Stage - Special Treatment */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`mt-3 p-3 rounded-lg border-2 border-dashed transition-colors duration-300 ${isDarkMode ? 'border-gray-500 bg-gray-600' : 'border-gray-300 bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}>5</div>
                          <h4 className={`text-xs font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Advocacy (Scale)</h4>
                        </div>
                        <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Affiliates + Showcases + "Powered by" badge → <span className="italic">Make users feel like insiders</span>
                        </p>
                      </motion.div>

                      {/* Flow Summary */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className={`mt-4 pt-3 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
                      >
                        <div className={`text-xs text-center transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-semibold">Flow:</span> Attract → Nurture → Convert → Retain → Scale
                        </div>
                      </motion.div>
                    </div>

                    <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Competitor Analysis</h3>
                    <p className={`text-xs md:text-sm mb-4 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <b>Direct:</b> Framer Marketplace creators. <br/>
                      <b>Indirect:</b> Gumroad sellers, Webflow, ThemeForest, WordPress, Squarespace, Wix, Shopify, Carrd/Notion/Ghost. <br/>
                      <b>Gap:</b> Lack of SaaS-focused templates with CRO patterns, advanced design, low cost, and high speed → clear opportunity to dominate.
                    </p>
                    <div className="mb-4">
                      <a href="/Competitor Analysis.pdf" download>
                        <Button
                          variant="outline"
                          className={`rounded-xl text-xs md:text-sm px-3 py-1.5 ambient-attention ${isDarkMode ? 'ambient-dark' : 'ambient-light'}`}
                          isDarkMode={isDarkMode}
                        >
                          Download Full Competitor Analysis (PDF)
                        </Button>
                      </a>
                    </div>

                    <h3 className={`text-base md:text-lg font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Revenue & Growth Strategy</h3>
                    
                    {/* Revenue Models */}
                    <div className={`rounded-2xl p-4 mb-4 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                      <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Monetization</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { title: "Templates", price: "$49–$150", desc: "One-time website templates", icon: "📄" },
                          { title: "Bundles", price: "$250+", desc: "Website Starter Kit", icon: "📦" },
                          { title: "Subscription", price: "$19/mo", desc: "Recurring access", icon: "🔄" },
                          { title: "Custom WaaS", price: "$500–$2k", desc: "Done-for-you", icon: "⚡" }
                        ].map((item, index) => (
                          <div key={index} className={`p-3 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{item.icon}</span>
                              <span className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</span>
                              <span className={`text-xs font-bold ml-auto transition-colors duration-300 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{item.price}</span>
                            </div>
                            <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Growth Opportunities - Compact Swiper */}
                    <div className={`rounded-2xl p-4 mb-4 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`text-sm font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Strategic Opportunities</h4>
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentOpportunity === 0 ? (isDarkMode ? 'bg-white' : 'bg-gray-800') : (isDarkMode ? 'bg-gray-500' : 'bg-gray-300')}`}></div>
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentOpportunity === 1 ? (isDarkMode ? 'bg-white' : 'bg-gray-800') : (isDarkMode ? 'bg-gray-500' : 'bg-gray-300')}`}></div>
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentOpportunity === 2 ? (isDarkMode ? 'bg-white' : 'bg-gray-800') : (isDarkMode ? 'bg-gray-500' : 'bg-gray-300')}`}></div>
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentOpportunity === 3 ? (isDarkMode ? 'bg-white' : 'bg-gray-800') : (isDarkMode ? 'bg-gray-500' : 'bg-gray-300')}`}></div>
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentOpportunity === 4 ? (isDarkMode ? 'bg-white' : 'bg-gray-800') : (isDarkMode ? 'bg-gray-500' : 'bg-gray-300')}`}></div>
                        </div>
                      </div>
                      
                      <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentOpportunity}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`p-3 rounded-lg border transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'}`}
                          >
                            {(() => {
                              const opportunities = [
                                {
                                  title: "SaaS Template Niche Dominance",
                                  insight: "First-mover advantage in SaaS-specific templates with CRO blocks, integrations, changelogs.",
                                  potential: "Own Framer Marketplace category"
                                },
                                {
                                  title: "AI-Ready Positioning", 
                                  insight: "Target AI-first startups needing credible sites for investors and early customers.",
                                  potential: "Growth accelerator templates"
                                },
                                {
                                  title: "Multi-Platform Expansion",
                                  insight: "Port best-sellers to Webflow, WordPress, ThemeForest for broader reach.",
                                  potential: "Tens of millions of buyers"
                                },
                                {
                                  title: "Agency Upsell Ladder",
                                  insight: "Free → Pro → WaaS → Full Branding packages for recurring revenue.",
                                  potential: "Complete service ecosystem"
                                },
                                {
                                  title: "Community & Affiliates",
                                  insight: "50% Framer commissions + own affiliate program via Lemon Squeezy.",
                                  potential: "Network effect distribution"
                                }
                              ];
                              const opp = opportunities[currentOpportunity];
                              return (
                                <div className="flex items-start gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-1 gap-2">
                                      <h5 className={`text-xs font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{opp.title}</h5>
                                      <span className={`text-xs px-1.5 py-0.5 rounded-full text-center leading-tight flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'}`} style={{ fontSize: '10px' }}>{opp.potential}</span>
                                    </div>
                                    <p className={`text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{opp.insight}</p>
                                  </div>
                                </div>
                              );
                            })()}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      
                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-3">
                        <button 
                          onClick={() => setCurrentOpportunity(prev => prev === 0 ? 4 : prev - 1)}
                          className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                          ← Prev
                        </button>
                        <button 
                          onClick={() => setCurrentOpportunity(prev => prev === 4 ? 0 : prev + 1)}
                          className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Insight */}
                <div className={`mt-6 md:mt-8 p-4 md:p-6 rounded-2xl shadow-inner transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className={`text-base md:text-lg font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📒 Note</h3>
                  <p className={`text-xs md:text-sm mb-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Launch with 2–3 premium SaaS templates; niche down into SaaS landing pages; 
                    build in public on X & LinkedIn; capture emails via free templates; validate 
                    pricing ($49–$79 each); expand into subscriptions once 10–15 templates exist.
                  </p>
                  <p className={`font-semibold text-xs md:text-sm transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Verdict: Low-cost, high-upside. Demand is real, competition unsaturated, 
                    success hinges on consistent content + premium quality.
                  </p>
                </div>
              </motion.section>
            )}

            {page === "about" && (
              <motion.section key="about" variants={container} initial="hidden" animate="show" exit="exit">
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Obi Batbileg</h2>
                  <p className={`text-sm md:text-base leading-relaxed mb-3.5 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    I am a recent graduate in Information and Communications Technology (Information Systems) with hands-on experience in front-end development, SaaS concepts, and digital solutions. Over the past few years, I've worked on projects combining design, coding, and consulting—ranging from building Figma-to-code prototypes to delivering web and branding solutions for small businesses and community groups in Sydney.
                  </p>
                  <h3 className={`text-base md:text-lg font-semibold mb-1.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Vision</h3>
                  <p className={`text-sm md:text-base leading-relaxed mb-3.5 transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    My vision is to grow this experience into a Framer-driven, no-code, high-speed production approach that evolves into a Creative Tech Consulting firm. The goal is to help small to medium-sized businesses improve their digital presence by offering accessible services in web development, design, and scalable SaaS solutions—supporting SMEs in streamlining their operations and building stronger brands.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 relative">
                      <button onClick={handleCopyEmail} aria-label="Copy email address">
                        <Button className={`rounded-xl text-xs md:text-sm px-3 py-1.5 ambient-attention ${isDarkMode ? 'ambient-dark' : 'ambient-light'}`} isDarkMode={isDarkMode}>
                          <span className="inline-flex items-center gap-1">
                            Email
                            <Copy className="w-3.5 h-3.5 opacity-90" />
                          </span>
                        </Button>
                      </button>
                      <a href="https://www.linkedin.com/in/obi-batbileg" target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-xl text-xs md:text-sm px-3 py-1.5" isDarkMode={isDarkMode}>LinkedIn</Button>
                      </a>
                      {emailCopied && (
                        <div className={`absolute -top-9 left-0 rounded-md px-2 py-1 text-[11px] shadow transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-900 border border-gray-200'}`}>
                          Copied! obibatbileg@gmail.com ✔️
                    </div>
                      )}
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </CardContent>

        <div className={`px-5 md:px-6 pb-5 md:pb-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm transition-colors duration-300 ${isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-white'}`}>
          <p className="text-center md:text-left">© {new Date().getFullYear()} Obi Batbileg · Framer Templates for SaaS</p>
          <div className="flex gap-2">
            <button onClick={() => { setPage("overview"); }} className={`hover:underline transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Overview</button>
            <span>·</span>
            <button onClick={() => { setPage("roadmap"); }} className={`hover:underline transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Roadmap</button>
            <span>·</span>
            <button onClick={() => { setPage("scale"); }} className={`hover:underline transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>Scale</button>
            <span>·</span>
            <button onClick={() => { setPage("about"); }} className={`hover:underline transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>About</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoTile({ icon, title, text, isDarkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl border p-3 md:p-3.5 shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
    >
      <div className={`flex items-center gap-2 font-semibold text-xs md:text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {icon}
        <span>{title}</span>
      </div>
      <p className={`text-xs md:text-sm mt-1.5 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{text}</p>
    </motion.div>
  );
}
