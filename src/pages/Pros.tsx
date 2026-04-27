import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Shield, Star, Users, Globe, Zap, CheckCircle2, Hammer, Droplets, TreePine, Construction, Cloud, Layers, Plus, Send } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const TRADES = [
  { name: "Carpentry", icon: Hammer, desc: "Structural framing, finish work, and custom builds." },
  { name: "Plumbing", icon: Droplets, desc: "High-performance systems and emergency repair." },
  { name: "Landscaping", icon: TreePine, desc: "Elite outdoor environments and maintenance." },
  { name: "Flooring", icon: Layers, desc: "Precision installation for high-traffic zones." },
  { name: "Roofing", icon: Cloud, desc: "System-critical protection and disaster relief." },
  { name: "Remodeling", icon: Construction, desc: "Full-scale operations and project management." }
];

export default function Pros() {
  const [view, setView] = useState<'homeowner' | 'contractor'>('homeowner');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    trade: "Carpentry",
    description: "",
    location: ""
  });

  const [partnerForm, setPartnerForm] = useState({
    businessName: "",
    email: "",
    trade: "Carpentry",
    experience: "5-10 Years",
    image: ""
  });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...leadForm,
        status: "new",
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contractors"), {
        ...partnerForm,
        status: "pending",
        commissionRate: 0.25,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-20">
          <div className="bg-white/5 border border-white/10 p-1 flex gap-1">
            <button 
              onClick={() => { setView('homeowner'); setSubmitted(false); }}
              className={`px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all ${
                view === 'homeowner' ? 'bg-orange-500 text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              For Homeowners
            </button>
            <button 
              onClick={() => { setView('contractor'); setSubmitted(false); }}
              className={`px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all ${
                view === 'contractor' ? 'bg-orange-500 text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              For Professionals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Info */}
          <div>
            <AnimatePresence mode="wait">
              {view === 'homeowner' ? (
                <motion.div
                  key="homeowner-info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                    Lead Generation / 05
                  </span>
                  <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
                    Request <br />
                    <span className="text-orange-500">Elite Pros</span>
                  </h1>
                  <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                    Deploy our elite database of vetted contractors. We source the top specialists 
                    for your project, ensuring technical mastery and operational excellence.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Feature icon={Shield} title="Vetted Specialists" desc="Every pro is strictly verified for quality." />
                    <Feature icon={Zap} title="Instant Dispatch" desc="Fast lead deployment to localized teams." />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="contractor-info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                    Network Partner / 05
                  </span>
                  <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
                    Join the <br />
                    <span className="text-orange-500">Network</span>
                  </h1>
                  <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
                    Unlock elite leads and earn <span className="text-white font-bold">25% commission</span> on referral services. 
                    Partner with ACDC Pros to scale your business with high-value project management.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Feature icon={Layers} title="High-Volume Leads" desc="Access a pipeline of qualified projects." />
                    <Feature icon={Star} title="25% Commissions" desc="Earn more on every deployed service lead." />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white/5 border border-white/10 p-12">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">Request Transmitted</h2>
                <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Expect contact within 120 minutes.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-orange-500 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-white transition-colors"
                >
                  [ RESET_FORM ]
                </button>
              </motion.div>
            ) : (
              <form onSubmit={view === 'homeowner' ? handleLeadSubmit : handlePartnerSubmit} className="space-y-8">
                {view === 'homeowner' ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Your Name</label>
                      <input 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={leadForm.name}
                        onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Select Trade</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={leadForm.trade}
                        onChange={e => setLeadForm({...leadForm, trade: e.target.value})}
                      >
                        {TRADES.map(t => <option key={t.name}>{t.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Project Location</label>
                      <input 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={leadForm.location}
                        onChange={e => setLeadForm({...leadForm, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Project Details</label>
                      <textarea 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none h-32 uppercase font-bold text-xs"
                        value={leadForm.description}
                        onChange={e => setLeadForm({...leadForm, description: e.target.value})}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Business Name</label>
                      <input 
                        required
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={partnerForm.businessName}
                        onChange={e => setPartnerForm({...partnerForm, businessName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Primary Trade</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={partnerForm.trade}
                        onChange={e => setPartnerForm({...partnerForm, trade: e.target.value})}
                      >
                        {TRADES.map(t => <option key={t.name}>{t.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Technical Experience</label>
                      <select 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={partnerForm.experience}
                        onChange={e => setPartnerForm({...partnerForm, experience: e.target.value})}
                      >
                        <option>3-5 Years</option>
                        <option>5-10 Years</option>
                        <option>10+ Years</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Business Image/Logo URL</label>
                      <input 
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={partnerForm.image}
                        onChange={e => setPartnerForm({...partnerForm, image: e.target.value})}
                        placeholder="https://imgur.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Email Protocol</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-black border border-white/10 p-4 text-white focus:border-orange-500 outline-none uppercase font-bold text-xs"
                        value={partnerForm.email}
                        onChange={e => setPartnerForm({...partnerForm, email: e.target.value})}
                      />
                    </div>
                  </>
                )}

                <button 
                  disabled={isSubmitting}
                  className="w-full py-6 bg-orange-500 text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all flex items-center justify-center gap-2 group italic disabled:opacity-50"
                >
                  {isSubmitting ? "Transmitting..." : "Submit Application"}
                  <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Trade Grid */}
        <div className="mt-32">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-12">Expertise <span className="text-orange-500">Matrix</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {TRADES.map((trade) => (
              <TradeCard key={trade.name} trade={trade} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <div>
        <h4 className="text-white font-bold uppercase italic tracking-tight mb-2">{title}</h4>
        <p className="text-white/40 text-xs leading-relaxed uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  );
}

function TradeCard({ trade }: { trade: any }) {
  return (
    <div className="bg-black p-12 hover:bg-white/5 transition-all group">
      <trade.icon className="w-10 h-10 text-orange-500 mb-8" />
      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-orange-500 transition-colors mb-4">{trade.name}</h3>
      <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest font-light">{trade.desc}</p>
    </div>
  );
}
