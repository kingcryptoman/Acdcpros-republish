import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, MessageSquare, Video, Calendar, Zap, Globe, Shield } from "lucide-react";
import CoachBot, { CoachBotHandle } from "../components/CoachBot";
import { useNavigate } from "react-router-dom";

export default function OnlineConsulting() {
  const coachBotRef = useRef<CoachBotHandle>(null);
  const navigate = useNavigate();

  const handleFeatureClick = (title: string) => {
    if (title === "24/7 AI Support") {
      const element = document.getElementById("coachbot");
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (title === "Video Consultations") {
      navigate("/video-session");
    } else if (title === "Project Planning") {
      coachBotRef.current?.sendMessage("I need help planning a new home project. Can you help me create a roadmap?");
      const element = document.getElementById("coachbot");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Info & Features */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32"
            >
              <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                Elite Strategy / 01
              </span>
              <h1 className="text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                DIY <br />
                <span className="text-orange-500">Consulting</span>
              </h1>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-12">
                Master your home repairs with AI-driven insights and elite pro support. 
                Our CoachBot is available 24/7 to provide instant repair guidance.
              </p>

              <div className="space-y-8">
                <ConsultingFeature 
                  icon={MessageSquare} 
                  title="24/7 AI Support" 
                  desc="Instant answers to complex repair and technical questions."
                  onClick={() => handleFeatureClick("24/7 AI Support")}
                />
                <ConsultingFeature 
                  icon={Video} 
                  title="Video Consultations" 
                  desc="Schedule 1-on-1 sessions with licensed industry professionals."
                  onClick={() => handleFeatureClick("Video Consultations")}
                />
                <ConsultingFeature 
                  icon={Calendar} 
                  title="Project Planning" 
                  desc="Custom roadmap generation for long-term home improvement."
                  onClick={() => handleFeatureClick("Project Planning")}
                />
              </div>

              <div className="mt-12 p-8 border border-white/10 bg-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">System Status: Online</span>
                </div>
                <p className="text-white text-xs font-light leading-relaxed">
                  "The CoachBot helped me save $2,000 on my kitchen remodel by guiding me through the plumbing."
                </p>
                <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mt-4 italic">— Sarah J., Homeowner</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: CoachBot Interface */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white/5 border border-white/10 h-[800px] relative overflow-hidden">
              <CoachBot ref={coachBotRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsultingFeature({ icon: Icon, title, desc, onClick }: { icon: any; title: string; desc: string; onClick?: () => void }) {
  return (
    <div className="flex gap-6 group cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-orange-500 transition-colors">
        <Icon className="w-5 h-5 text-white/20 group-hover:text-orange-500 transition-colors" />
      </div>
      <div>
        <h3 className="text-white font-bold uppercase italic tracking-tight mb-1 group-hover:text-orange-500 transition-colors">{title}</h3>
        <p className="text-white/40 text-[10px] font-light leading-relaxed uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  );
}
