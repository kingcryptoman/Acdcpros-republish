import { motion } from "motion/react";
import { ArrowRight, Zap, Shield, Target, Users, TrendingUp, Globe, PenTool as Tool, Lightbulb, Settings } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "Construction Management",
    desc: "Elite-level project oversight, resource allocation, and operational excellence for complex construction projects.",
    icon: Shield,
    features: ["Project Scheduling", "Budget Optimization", "Quality Assurance"]
  },
  {
    id: "02",
    title: "24hr Emergency Disaster Relief",
    desc: "24hr emergency disaster relief, we clean up, and water mitigation. Immediate response for structural stabilization during critical emergencies.",
    icon: Shield,
    features: ["Water Mitigation", "Disaster Cleanup", "Structural Stabilization"]
  },
  {
    id: "03",
    title: "Project Consulting",
    desc: "AI-driven project planning and expert consulting for your home improvement goals.",
    icon: Target,
    features: ["Project Planning", "Budgeting", "DIY Roadmaps"]
  },
  {
    id: "04",
    title: "Elite Handyman",
    desc: "Precision maintenance and repair services executed with professional-grade accuracy.",
    icon: Tool,
    features: ["Structural Repair", "Finish Carpentry", "System Maintenance"]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Our Capabilities / 04
            </span>
            <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
              Elite <br />
              <span className="text-orange-500">Services</span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed">
              We provide a comprehensive suite of professional services engineered 
              for those who demand excellence in every project.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-black p-16 hover:bg-orange-500 transition-all duration-700 cursor-pointer relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <span className="text-white/20 group-hover:text-black/40 font-mono text-sm tracking-widest">[{service.id}]</span>
          <service.icon className="w-8 h-8 text-orange-500 group-hover:text-black transition-colors duration-500" />
        </div>
        
        <h3 className="text-4xl font-bold text-white group-hover:text-black uppercase italic tracking-tighter mb-6">{service.title}</h3>
        <p className="text-white/40 group-hover:text-black/60 text-lg font-light leading-relaxed mb-12">{service.desc}</p>
        
        <div className="space-y-4">
          {service.features.map((feature: string, i: number) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-1 h-1 bg-orange-500 group-hover:bg-black" />
              <span className="text-white/60 group-hover:text-black font-bold uppercase tracking-widest text-[10px]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <ArrowRight className="w-12 h-12 text-black" />
      </div>
    </motion.div>
  );
}
