import { motion } from "motion/react";
import { ArrowRight, Zap, Target, Users, TrendingUp, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { AFFILIATES } from "../data/market";

export default function Home() {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl w-full mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6">
              Elite Home Repair & DIY Consulting
            </span>
            
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter text-white uppercase italic skew-x-[-10deg] mb-8">
              ACDC <br />
              <span className="text-transparent border-t-2 border-b-2 border-white/20 px-4">PROS</span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-end gap-8 w-full justify-between">
              <p className="max-w-md text-white/60 text-lg md:text-xl font-light leading-relaxed">
                Precision home repair consulting and elite DIY support. 
                Unlock your potential with AI-driven insights and pro-level guidance.
              </p>
              
              <div className="flex flex-col gap-4">
                <Link to="/online-consulting" className="group flex items-center gap-4 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all duration-500">
                  Launch CoachBot
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <div className="flex items-center gap-4 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                  <span>01 / STRATEGY</span>
                  <div className="w-8 h-[1px] bg-white/10" />
                  <span>02 / GROWTH</span>
                  <div className="w-8 h-[1px] bg-white/10" />
                  <span>03 / ELITE</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 py-8 border-t border-white/10 overflow-hidden whitespace-nowrap bg-black/50 backdrop-blur-sm">
          <div className="flex animate-marquee gap-12 text-white/10 font-black uppercase text-6xl tracking-tighter italic">
            <span>COACHBOT AI</span>
            <span>•</span>
            <span>ELITE HOME REPAIR</span>
            <span>•</span>
            <span>DIY STRATEGY</span>
            <span>•</span>
            <span>ACDC PROS</span>
            <span>•</span>
            <span>COACHBOT AI</span>
            <span>•</span>
            <span>ELITE HOME REPAIR</span>
            <span>•</span>
            <span>DIY STRATEGY</span>
            <span>•</span>
            <span>ACDC PROS</span>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <FeatureCard 
              id="01" 
              title="DIY Consulting" 
              desc="Video chat with licensed pros for instant guidance on any home project."
              icon={Users}
              link="/online-consulting"
            />
            <FeatureCard 
              id="02" 
              title="Smart Estimator" 
              desc="AI-powered project estimates based on your specific dimensions."
              icon={Zap}
              link="/estimator"
            />
            <FeatureCard 
              id="03" 
              title="Verified Pros" 
              desc="Connect with vetted contractors for elite-level execution."
              icon={Shield}
              link="/pros"
            />
          </div>
        </div>
      </section>
      {/* Partner Section */}
      <section className="py-20 px-6 border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Official Partners
            </span>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">
              One-Stop <br />
              <span className="text-orange-500">Shop Experience</span>
            </h2>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              We've partnered with industry leaders to bring you elite equipment 
              with ACDC-exclusive tutorials and DIY support.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-700">
            {AFFILIATES.map((partner) => (
              <a 
                key={partner.id}
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`group/partner p-4 border border-${partner.color}-500/30 hover:border-${partner.color}-500 bg-${partner.color}-500/5 transition-all duration-300`}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 grayscale group-hover/partner:grayscale-0 group-hover/partner:scale-110 transition-all duration-500" 
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials Section */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                Knowledge Base / 07
              </span>
              <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
                Featured <br />
                <span className="text-orange-500">Tutorials</span>
              </h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">
                Master your equipment with step-by-step guides from ACDC Pros. 
                Professional techniques for high-performance results.
              </p>
            </div>
            <Link to="/tutorials" className="group flex items-center gap-4 px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:border-orange-500 transition-all duration-500 italic">
              View All Tutorials
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <TutorialPreviewCard 
              id="01"
              title="Mastering the ACDC-X1 Multimeter"
              category="Electrical"
              image="https://picsum.photos/seed/tut1/800/450"
              pro="Alex Rivera"
            />
            <TutorialPreviewCard 
              id="02"
              title="24hr Emergency Disaster Relief"
              category="Emergency"
              image="https://images.unsplash.com/photo-1544181423-842abb4473ce?auto=format&fit=crop&q=80&w=800"
              pro="Elena Chen"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function TutorialPreviewCard({ id, title, category, image, pro }: { id: string; title: string; category: string; image: string; pro: string }) {
  return (
    <Link to="/tutorials" className="group cursor-pointer">
      <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/10">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-white border border-white/10">
            {category}
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white uppercase italic tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">
            {title}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 italic">
            Pro: {pro}
          </span>
        </div>
        <span className="text-white/20 font-mono text-xs tracking-widest">[{id}]</span>
      </div>
    </Link>
  );
}

function FeatureCard({ id, title, desc, icon: Icon, link }: { id: string; title: string; desc: string; icon: any; link: string }) {
  return (
    <Link to={link} className="group bg-black p-12 hover:bg-orange-500 transition-all duration-700 cursor-pointer relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <span className="text-white/20 group-hover:text-black/40 font-mono text-sm tracking-widest">[{id}]</span>
          <Icon className="w-6 h-6 text-orange-500 group-hover:text-black transition-colors duration-500" />
        </div>
        <h3 className="text-2xl font-bold text-white group-hover:text-black uppercase italic tracking-tighter mb-4">{title}</h3>
        <p className="text-white/40 group-hover:text-black/60 text-sm font-light leading-relaxed">{desc}</p>
      </div>
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <ArrowRight className="w-8 h-8 text-black" />
      </div>
    </Link>
  );
}
