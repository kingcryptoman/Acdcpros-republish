import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-[#050505] px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Elite Access
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-12">
              CONTACT <br />
              <span className="text-white/20">ELITE PROS</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-12 max-w-md">
              Ready to master your home repairs? Our elite team is standing by to discuss your home improvement goals.
            </p>

            <div className="space-y-8">
              <ContactItem icon={Mail} title="Email" value="acdcproservices@gmail.com" />
              <ContactItem icon={Phone} title="Phone" value="+1 (888) ACDC-PRO" />
              <ContactItem icon={MapPin} title="Global HQ" value="Silicon Valley, CA" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#111] p-12 border border-white/10 rounded-2xl shadow-2xl"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Full Name" placeholder="JOHN DOE" />
                <InputGroup label="Email Address" placeholder="JOHN@EXAMPLE.COM" />
              </div>
              <InputGroup label="Project Type" placeholder="KITCHEN REMODEL / ELECTRICAL REPAIR" />
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/30">Project Details</label>
                <textarea 
                  rows={4}
                  placeholder="DESCRIBE YOUR HOME REPAIR OR DIY GOALS..."
                  className="w-full bg-black border border-white/10 rounded-xl p-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-orange-500/50 transition-colors uppercase tracking-widest font-mono"
                />
              </div>
              <button className="w-full py-6 bg-orange-500 text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 flex items-center justify-center gap-4 group">
                SUBMIT PROJECT INQUIRY
                <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-orange-500 transition-colors duration-300">
        <Icon className="w-5 h-5 text-white/20 group-hover:text-orange-500 transition-colors" />
      </div>
      <div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-white/20 block mb-1">{title}</span>
        <span className="text-white font-bold uppercase tracking-widest text-sm">{value}</span>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase tracking-widest font-bold text-white/30">{label}</label>
      <input 
        type="text"
        placeholder={placeholder}
        className="w-full bg-black border border-white/10 rounded-xl p-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-orange-500/50 transition-colors uppercase tracking-widest font-mono"
      />
    </div>
  );
}
