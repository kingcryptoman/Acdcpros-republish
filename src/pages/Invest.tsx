import { motion } from "motion/react";
import { ArrowRight, TrendingUp, Globe, Shield, Zap, Target, Users, BarChart3, PieChart } from "lucide-react";

export default function Invest() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Growth Strategy / 06
            </span>
            <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
              Invest in <br />
              <span className="text-orange-500">ACDC PROS</span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed mb-12">
              Join us in revolutionizing the professional services industry. 
              We are scaling our AI-powered platform to empower elite pros worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-4">
                Investor Deck
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500">
                Contact IR
              </button>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Market Size" value="$450B" icon={Globe} />
              <StatCard label="Growth Rate" value="24%" icon={TrendingUp} />
              <StatCard label="Active Pros" value="12K+" icon={Users} />
              <StatCard label="AI Precision" value="94%" icon={Zap} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          <InvestmentPillar 
            id="01" 
            title="AI Integration" 
            desc="Our proprietary CoachBot and Smart Estimator engines are built on cutting-edge LLM architectures."
            icon={Zap}
          />
          <InvestmentPillar 
            id="02" 
            title="Elite Network" 
            desc="We control the top 1% of the professional services market through a rigorous vetting process."
            icon={Shield}
          />
          <InvestmentPillar 
            id="03" 
            title="Global Scale" 
            desc="Our platform is designed for rapid expansion into major metropolitan markets worldwide."
            icon={Globe}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="bg-white/5 border border-white/10 p-12 hover:border-orange-500/50 transition-colors group">
      <Icon className="w-6 h-6 text-orange-500 mb-8 group-hover:scale-110 transition-transform" />
      <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-black text-white italic tracking-tighter">{value}</p>
    </div>
  );
}

function InvestmentPillar({ id, title, desc, icon: Icon }: { id: string; title: string; desc: string; icon: any }) {
  return (
    <div className="bg-black p-16 hover:bg-orange-500 transition-all duration-700 group cursor-pointer">
      <div className="flex items-center justify-between mb-12">
        <span className="text-white/20 group-hover:text-black/40 font-mono text-sm tracking-widest">[{id}]</span>
        <Icon className="w-8 h-8 text-orange-500 group-hover:text-black transition-colors duration-500" />
      </div>
      <h3 className="text-3xl font-bold text-white group-hover:text-black uppercase italic tracking-tighter mb-6">{title}</h3>
      <p className="text-white/40 group-hover:text-black/60 text-sm font-light leading-relaxed">{desc}</p>
    </div>
  );
}
