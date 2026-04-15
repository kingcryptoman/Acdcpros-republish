import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden px-6 pt-20">
      {/* Background Decorative Elements */}
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
              <button className="group flex items-center gap-4 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all duration-500">
                Launch CoachBot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
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

      {/* Marquee Effect */}
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
  );
}
