import { motion } from "motion/react";
import { ArrowRight, Phone, Zap, Shield, Target, Globe, AlertTriangle, Clock, MapPin } from "lucide-react";

export default function Emergency() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                Critical Support / 24/7
              </span>
            </div>
            <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
              Emergency <br />
              <span className="text-red-500">Response</span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed mb-12">
              24hr emergency disaster relief, we clean up, and water mitigation. 
              Our elite pros are on standby 24/7 for immediate structural stabilization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-12 py-5 bg-red-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4">
                Call Now: 1-800-ACDC-PRO
                <Phone className="w-4 h-4" />
              </button>
              <button className="px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500">
                Request Dispatch
              </button>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-4">
              <EmergencyCard 
                icon={Zap} 
                title="Electrical Failure" 
                desc="Total power loss, sparking, or critical system malfunctions."
                time="30-60 Min Response"
              />
              <EmergencyCard 
                icon={Shield} 
                title="Disaster Relief" 
                desc="Water mitigation, cleanup, and structural stabilization."
                time="60-90 Min Response"
              />
              <EmergencyCard 
                icon={AlertTriangle} 
                title="Plumbing Crisis" 
                desc="Major leaks, flooding, or sewage system failure."
                time="45-60 Min Response"
              />
            </div>
          </div>
        </div>

        <div className="p-12 border border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 flex items-center justify-center border border-white/10">
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-bold uppercase italic tracking-tight text-xl mb-1">Elite Standby</h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Our network of verified pros is distributed across major metropolitan areas for rapid deployment.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Global Coverage</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmergencyCard({ icon: Icon, title, desc, time }: { icon: any; title: string; desc: string; time: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 hover:border-red-500/50 transition-colors group flex items-center gap-8">
      <div className="w-16 h-16 flex items-center justify-center border border-white/10 group-hover:border-red-500 transition-colors">
        <Icon className="w-8 h-8 text-white/20 group-hover:text-red-500 transition-colors" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold uppercase italic tracking-tight text-xl group-hover:text-red-500 transition-colors">{title}</h3>
          <span className="text-red-500 font-bold text-[10px] uppercase tracking-widest italic">{time}</span>
        </div>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
