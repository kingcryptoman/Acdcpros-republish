import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-32 bg-black px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              The ACDC Philosophy
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-12">
              ACCELERATED <br />
              <span className="text-white/20">DEVELOPMENT</span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl">
              ACDC Pros was founded on the principle that professional growth shouldn't be a slow, 
              linear process. By combining elite human mentorship with advanced AI intelligence, 
              we create a high-velocity environment for career transformation.
            </p>

            <div className="space-y-6">
              <FeatureItem title="AI-Driven Strategic Insights" />
              <FeatureItem title="Elite Performance Frameworks" />
              <FeatureItem title="Global Leadership Network" />
              <FeatureItem title="24/7 CoachBot Support" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 border border-white/10 rotate-3" />
            <div className="absolute inset-0 border border-orange-500/20 -rotate-3" />
            <img 
              src="https://picsum.photos/seed/leadership/1000/1000" 
              alt="Professional Leadership" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-12 -right-12 bg-orange-500 p-8 max-w-[200px] shadow-2xl">
              <span className="text-black font-black text-4xl italic tracking-tighter uppercase block mb-2">10X</span>
              <span className="text-black/60 font-bold text-[10px] uppercase tracking-widest leading-tight block">
                Average career velocity increase for our elite clients
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-6 h-6 rounded-full border border-orange-500/30 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
        <CheckCircle2 className="w-3 h-3 text-orange-500 group-hover:text-black" />
      </div>
      <span className="text-white/80 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">
        {title}
      </span>
    </div>
  );
}
