import { motion } from "motion/react";
import { ArrowRight, Shield, Star, Users, Globe, Zap, CheckCircle2 } from "lucide-react";

const PROS = [
  {
    id: "01",
    name: "Alex Rivera",
    role: "Master Electrician",
    rating: 4.9,
    experience: "15+ Years",
    image: "https://picsum.photos/seed/pro1/600/800",
    specialties: ["Smart Home Automation", "Industrial Wiring", "Solar Integration"]
  },
  {
    id: "02",
    name: "Elena Chen",
    role: "Disaster Relief Specialist",
    rating: 5.0,
    experience: "12+ Years",
    image: "https://picsum.photos/seed/pro2/600/800",
    specialties: ["Water Mitigation", "Disaster Cleanup", "Emergency Response"]
  },
  {
    id: "03",
    name: "Marcus Thorne",
    role: "Senior Consultant",
    rating: 4.8,
    experience: "20+ Years",
    image: "https://picsum.photos/seed/pro3/600/800",
    specialties: ["Project Management", "Career Strategy", "Risk Analysis"]
  },
  {
    id: "04",
    name: "Jordan Smith",
    role: "Elite Handyman",
    rating: 4.9,
    experience: "10+ Years",
    image: "https://picsum.photos/seed/pro4/600/800",
    specialties: ["Finish Carpentry", "Structural Repair", "System Maintenance"]
  }
];

export default function Pros() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Elite Network / 05
            </span>
            <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
              Verified <br />
              <span className="text-orange-500">Pros</span>
            </h1>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              Connect with the top 1% of industry professionals. 
              Every ACDC Pro is vetted for elite performance, technical mastery, and strategic insight.
            </p>
          </motion.div>

          <div className="flex items-center gap-8 text-white/20 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-500" />
              <span>Vetted</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-orange-500" />
              <span>Elite</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-500" />
              <span>Verified</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {PROS.map((pro) => (
            <ProCard key={pro.id} pro={pro} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProCard({ pro }: { pro: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-black p-8 hover:bg-orange-500 transition-all duration-700 cursor-pointer relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-white/20 group-hover:text-black/40 font-mono text-xs tracking-widest">[{pro.id}]</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-orange-500 group-hover:text-black fill-current" />
            <span className="text-white group-hover:text-black font-bold text-[10px]">{pro.rating}</span>
          </div>
        </div>
        
        <div className="aspect-[3/4] mb-8 overflow-hidden bg-white/5">
          <img 
            src={pro.image} 
            alt={pro.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-black uppercase italic tracking-tighter mb-1">{pro.name}</h3>
        <p className="text-orange-500 group-hover:text-black font-bold text-[10px] uppercase tracking-widest italic mb-6">{pro.role}</p>
        
        <div className="space-y-2 border-t border-white/10 group-hover:border-black/20 pt-6">
          {pro.specialties.map((spec: string, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-white/20 group-hover:bg-black/40" />
              <span className="text-white/40 group-hover:text-black/60 font-bold uppercase tracking-widest text-[8px]">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
