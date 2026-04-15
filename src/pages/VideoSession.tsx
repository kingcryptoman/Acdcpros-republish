import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, MessageSquare, 
  Settings, Monitor, Users, Clock, Shield, Zap, X, Send, CreditCard, CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  sender: "pro" | "user";
  text: string;
  time: string;
}

const RATE_PER_MINUTE = 5.00;

export default function VideoSession() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "pro", text: "Hello! I'm Elena, your Elite Disaster Relief specialist. How can I help you today?", time: "10:00 AM" }
  ]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Timer Logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateCharge = () => {
    const minutes = Math.ceil(seconds / 60);
    return (minutes * RATE_PER_MINUTE).toFixed(2);
  };

  const handleEndSession = () => {
    setIsPaused(true);
    setShowBilling(true);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setTimeout(() => {
        navigate("/online-consulting");
      }, 2000);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText("");
    
    // Simulate Pro response
    setTimeout(() => {
      const proResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "pro",
        text: "I understand. Let's take a look at the structural stabilization points first.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, proResponse]);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col overflow-hidden font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
            <Shield className="w-4 h-4 text-black" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-widest text-white italic">Elite Pro Session</h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Pro: Elena Chen • Disaster Relief</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-white/20' : 'bg-red-500 animate-pulse'}`} />
            <span className="text-xs font-mono text-white tracking-widest">{formatTime(seconds)}</span>
          </div>
          <button 
            onClick={handleEndSession}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex relative overflow-hidden">
        {/* Video Feeds */}
        <div className={`flex-1 relative bg-[#0a0a0a] transition-all duration-500 ${isChatOpen ? 'mr-[350px]' : ''}`}>
          {/* Pro Main Feed */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1920" 
              alt="Pro Video Feed"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Pro Info Overlay */}
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-orange-500 text-[8px] font-bold uppercase tracking-widest text-black">Live</span>
                <h2 className="text-xl font-bold text-white uppercase italic tracking-tight">Elena Chen</h2>
              </div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Structural Stabilization Specialist</p>
            </div>
          </div>

          {/* User Self Feed */}
          <motion.div 
            drag
            dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
            className="absolute top-8 right-8 w-48 aspect-video bg-black border border-white/20 shadow-2xl overflow-hidden cursor-move"
          >
            {isVideoOff ? (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <VideoOff className="w-8 h-8 text-white/20" />
              </div>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                alt="Self Feed"
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-white/60">
              You
            </div>
          </motion.div>
        </div>

        {/* Side Chat Panel */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.aside 
              initial={{ x: 350 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
              className="absolute right-0 top-0 bottom-0 w-[350px] bg-[#0a0a0a] border-l border-white/10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">Session Chat</h3>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/20 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-orange-500 text-black font-medium' 
                        : 'bg-white/5 text-white/80 border border-white/10'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-white/20 mt-2 font-mono">{msg.time}</span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="relative">
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type message..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-12 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Controls */}
      <footer className="h-24 border-t border-white/10 bg-black/80 backdrop-blur-md px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/30 transition-all">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/30 transition-all">
            <Monitor className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-2xl transition-all duration-300 ${
              isMuted ? 'bg-red-500 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={handleEndSession}
            className="p-5 bg-red-500 text-white rounded-3xl hover:bg-red-600 hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
          >
            <PhoneOff className="w-8 h-8" />
          </button>

          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-2xl transition-all duration-300 ${
              isVideoOff ? 'bg-red-500 text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-3 rounded-xl transition-all ${
              isChatOpen ? 'bg-orange-500 text-black' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/30 transition-all">
            <Users className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Billing Modal */}
      <AnimatePresence>
        {showBilling && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">Session Summary</h2>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-2">Elite Consulting Billing</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Duration</span>
                  <span className="text-sm font-mono text-white">{formatTime(seconds)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Rate</span>
                  <span className="text-sm font-mono text-white">${RATE_PER_MINUTE.toFixed(2)} / min</span>
                </div>
                <div className="flex justify-between items-center p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                  <span className="text-sm text-orange-500 uppercase tracking-widest font-black italic">Total Charge</span>
                  <span className="text-2xl font-black text-white italic">${calculateCharge()}</span>
                </div>
              </div>

              {isPaid ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-green-500">Payment Successful</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Redirecting to Dashboard...</p>
                </motion.div>
              ) : (
                <button 
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-orange-500 text-black font-black uppercase italic tracking-widest rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm & Pay ${calculateCharge()}
                    </>
                  )}
                </button>
              )}

              {!isPaid && !isProcessing && (
                <button 
                  onClick={() => setShowBilling(false)}
                  className="w-full mt-4 py-2 text-[10px] uppercase tracking-widest font-bold text-white/20 hover:text-white transition-colors"
                >
                  Resume Session
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Connection Quality Indicator */}
      <div className="absolute bottom-28 left-8 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-1 h-3 bg-green-500" />
          <div className="w-1 h-3 bg-green-500" />
          <div className="w-1 h-3 bg-green-500" />
          <div className="w-1 h-3 bg-white/20" />
        </div>
        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 italic">Elite Connection Stable</span>
      </div>
    </div>
  );
}
