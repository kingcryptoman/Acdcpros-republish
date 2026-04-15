import { motion } from "motion/react";
import { ArrowUpRight, Zap, Target, Users, TrendingUp, Shield, Globe } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Project Strategy",
    description: "High-level planning for your home improvement and renovation goals.",
    icon: Target,
    tags: ["Leadership", "Vision", "Impact"]
  },
  {
    id: "02",
    title: "Performance Optimization",
    description: "Data-driven home repair coaching to maximize output and efficiency in your DIY projects.",
    icon: Zap,
    tags: ["Efficiency", "Focus", "Flow"]
  },
  {
    id: "03",
    title: "Project Management",
    description: "Cultivating elite project management skills for your home renovations.",
    icon: Users,
    tags: ["Management", "Influence", "Culture"]
  },
  {
    id: "04",
    title: "Home Value Optimization",
    description: "Strategic home improvements and market analysis to maximize your property value.",
    icon: TrendingUp,
    tags: ["Branding", "Network", "Value"]
  },
  {
    id: "05",
    title: "Crisis Management",
    description: "Navigating complex professional transitions and high-stakes negotiations.",
    icon: Shield,
    tags: ["Resilience", "Negotiation", "Risk"]
  },
  {
    id: "06",
    title: "Global Networking",
    description: "Connecting elite professionals across international markets and industries.",
    icon: Globe,
    tags: ["Global", "Connect", "Scale"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-black px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Elite Service Portfolio
            </span>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
              PRECISION <br />
              <span className="text-white/20">COACHING</span>
            </h2>
          </div>
          <p className="max-w-xs text-white/40 text-sm font-light leading-relaxed uppercase tracking-widest">
            Our services are built for those who refuse to settle for mediocrity. 
            Elite results require elite strategy.
          </p>
        </div>

        {/* Services Grid - Technical Dashboard Vibe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-black p-12 hover:bg-orange-500 transition-all duration-700 cursor-pointer relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <span className="text-white/20 group-hover:text-black/40 font-mono text-sm tracking-widest">
                    [{service.id}]
                  </span>
                  <service.icon className="w-6 h-6 text-orange-500 group-hover:text-black transition-colors duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white group-hover:text-black uppercase italic tracking-tighter mb-4">
                  {service.title}
                </h3>
                
                <p className="text-white/40 group-hover:text-black/60 text-sm font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-widest font-bold px-2 py-1 border border-white/10 group-hover:border-black/20 text-white/40 group-hover:text-black/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight className="w-8 h-8 text-black" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
