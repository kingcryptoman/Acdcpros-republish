import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Trash2, Zap, Terminal, Sparkles, Camera, FileDown, X, Image as ImageIcon } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string;
}

export interface CoachBotHandle {
  sendMessage: (text: string) => void;
}

const CoachBot = forwardRef<CoachBotHandle>((props, ref) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    sendMessage: (text: string) => {
      handleSend(text);
    }
  }));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateShoppingList = () => {
    const doc = new jsPDF();
    const lastModelMessage = [...messages].reverse().find(m => m.role === 'model');
    
    doc.setFontSize(20);
    doc.setTextColor(249, 115, 22); // Orange-500
    doc.text("ACDC PROS - ELITE SHOPPING LIST", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    
    doc.setDrawColor(249, 115, 22);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(12);
    doc.setTextColor(0);
    
    const content = lastModelMessage ? lastModelMessage.text : "No recent advice found to generate a list.";
    const splitText = doc.splitTextToSize(content, 170);
    doc.text(splitText, 20, 45);
    
    doc.save("ACDC_Pros_Shopping_List.pdf");
  };

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if ((!messageText.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      text: messageText, 
      timestamp: new Date(),
      image: selectedImage || undefined
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setSelectedImage(null);
    setImageFile(null);
    setIsLoading(true);

    try {
      const contents: any[] = messages.map(m => {
        const parts: any[] = [{ text: m.text }];
        if (m.image) {
          parts.push({
            inlineData: {
              data: m.image.split(',')[1],
              mimeType: "image/jpeg"
            }
          });
        }
        return { role: m.role, parts };
      });

      const currentParts: any[] = [{ text: messageText }];
      if (selectedImage) {
        currentParts.push({
          inlineData: {
            data: selectedImage.split(',')[1],
            mimeType: "image/jpeg"
          }
        });
      }
      contents.push({ role: 'user', parts: currentParts });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction: "You are CoachBot, an elite home repair and DIY consultant for ACDC Pros. You are direct, professional, and helpful. You help homeowners master their home repairs through strategic advice, step-by-step guidance, and 24hr emergency disaster relief, cleanup, and water mitigation. If an image is provided, analyze it for damage or repair needs. When asked for a shopping list, provide a clear, formatted list of materials and tools. Keep your responses concise and impactful.",
        }
      });

      const aiMessage: Message = { 
        role: 'model', 
        text: response.text || "I'm processing your request. Please try again.", 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("CoachBot Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "System error. Connection to elite intelligence lost. Please retry.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="coachbot" className="py-24 bg-[#050505] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <Bot className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">CoachBot v1.0</h2>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-orange-500/60">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                System Online / Elite Intelligence Active
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={generateShoppingList}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-orange-500 hover:border-orange-500/50 transition-all"
            >
              <FileDown className="w-4 h-4" />
              Get Shopping List
            </button>
            <button 
              onClick={() => setMessages([])}
              className="p-2 text-white/20 hover:text-orange-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Interface - Hardware/Specialist Tool Vibe */}
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
          {/* Header Bar */}
          <div className="bg-[#1a1a1a] px-6 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Secure_Session_ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </span>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                <div className="space-y-4 opacity-30">
                  <Sparkles className="w-12 h-12 text-orange-500 mx-auto" />
                  <p className="max-w-xs text-sm uppercase tracking-widest font-bold">
                    Initialize session to begin elite home repair consulting
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <QuickPrompt 
                    text="How do I fix a leaky kitchen faucet?" 
                    onClick={() => handleSend("How do I fix a leaky kitchen faucet?")} 
                  />
                  <QuickPrompt 
                    text="What's the best way to prep a room for painting?" 
                    onClick={() => handleSend("What's the best way to prep a room for painting?")} 
                  />
                  <QuickPrompt 
                    text="How can I optimize my home's energy efficiency?" 
                    onClick={() => handleSend("How can I optimize my home's energy efficiency?")} 
                  />
                  <QuickPrompt 
                    text="Step-by-step guide for installing a smart thermostat." 
                    onClick={() => handleSend("Step-by-step guide for installing a smart thermostat.")} 
                  />
                </div>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-white/10' : 'bg-orange-500/10 border border-orange-500/20'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white/60" /> : <Bot className="w-4 h-4 text-orange-500" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-white/5 text-white border border-white/10' 
                        : 'bg-orange-500/5 text-white/90 border border-orange-500/10'
                    }`}>
                      {msg.image && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                          <img src={msg.image} alt="Uploaded repair" className="w-full max-h-64 object-cover" />
                        </div>
                      )}
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                      <div className="mt-2 text-[8px] uppercase tracking-widest opacity-30 font-mono">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4 items-center bg-orange-500/5 border border-orange-500/10 p-4 rounded-2xl">
                  <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500/60">
                    Processing Strategic Data...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-[#1a1a1a] border-t border-white/10">
            <AnimatePresence>
              {selectedImage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-4 relative inline-block"
                >
                  <img src={selectedImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-orange-500/50" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex items-center gap-4">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-orange-500 hover:border-orange-500/50 transition-all"
                title="Upload Photo for Analysis"
              >
                <Camera className="w-5 h-5" />
              </button>
              
              <div className="relative flex-1 flex items-center">
                <Terminal className="absolute left-4 w-4 h-4 text-white/20" />
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="ENTER STRATEGIC QUERY..."
                  className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-16 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-orange-500/50 transition-colors uppercase tracking-widest font-mono"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-2 p-3 bg-orange-500 text-black rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CoachBot;

function QuickPrompt({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-left"
    >
      {text}
    </button>
  );
}
