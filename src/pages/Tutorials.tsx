import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Clock, User, ArrowRight, Zap, Globe, Shield, X } from "lucide-react";
import { Link } from "react-router-dom";

const TUTORIALS = [
  {
    id: "01",
    title: "Mastering the ACDC-X1 Multimeter",
    duration: "12:45",
    author: "Alex Rivera",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/TdUK6RPdIrA",
    desc: "Learn how to use AI-powered fault detection to diagnose residential circuit issues in minutes."
  },
  {
    id: "02",
    title: "24hr Emergency Disaster Relief",
    duration: "18:20",
    author: "Elena Chen",
    category: "Emergency",
    image: "https://images.unsplash.com/photo-1544181423-842abb4473ce?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/9XInS_X63hI",
    desc: "Critical response techniques for water mitigation, disaster cleanup, and immediate structural stabilization."
  },
  {
    id: "03",
    title: "Smart Plumbing: AI Leak Detection",
    duration: "15:10",
    author: "Jordan Smith",
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/f1_8v8p2X_M",
    desc: "How to use the Smart Plumbing Camera to identify hidden obstructions and structural leaks."
  },
  {
    id: "04",
    title: "Elite Handyman: Structural Repair",
    duration: "22:30",
    author: "Marcus Thorne",
    category: "Handyman",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/J4_9p9_5_Zk",
    desc: "Advanced techniques for structural maintenance and precision carpentry using pro-series tools."
  }
];

export default function Tutorials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
              Knowledge Base / 07
            </span>
            <h1 className="text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85] mb-8">
              Elite <br />
              <span className="text-orange-500">Tutorials</span>
            </h1>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              Master your equipment with step-by-step guides from ACDC Pros. 
              Professional techniques for high-performance results.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TUTORIALS.map((tutorial) => (
            <TutorialCard 
              key={tutorial.id} 
              tutorial={tutorial} 
              onPlay={() => setActiveVideo(tutorial.videoUrl)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black border border-white/10 shadow-2xl"
            >
              <iframe 
                key={activeVideo}
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TutorialCard({ tutorial, onPlay }: { tutorial: any; onPlay: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={onPlay}
    >
      <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/10">
        <img 
          src={tutorial.image} 
          alt={tutorial.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500">
            <Play className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-white border border-white/10">
            {tutorial.category}
          </span>
          <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-white/60">
            <Clock className="w-3 h-3" />
            {tutorial.duration}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white uppercase italic tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">
            {tutorial.title}
          </h3>
          <p className="text-white/40 text-xs font-light leading-relaxed mb-4 line-clamp-2">
            {tutorial.desc}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-orange-500 flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 italic">
              Pro: {tutorial.author}
            </span>
          </div>
        </div>
        <div className="pt-2">
          <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-orange-500 group-hover:translate-x-2 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
