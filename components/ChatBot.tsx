
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I am your TripRoute AI assistant. How can I help you plan your journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Initialize with environment variable as per safety requirements
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are a helpful travel assistant for the TripRoute app. You help users plan routes, understand travel logistics, and provide city tips. Keep responses concise, friendly, and use formatting like bold text where appropriate. You are an expert in Mumbai, Swiss Alps, and California coast trips."
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Can you try again?";
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please check your network or API settings." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-display">
      {isOpen ? (
        <div className="flex flex-col w-80 md:w-96 h-[500px] bg-white dark:bg-background-dark border border-neutral-soft dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-primary text-background-dark flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <div className="bg-background-dark text-primary p-1 rounded-md">
                <span className="material-symbols-outlined text-sm block">smart_toy</span>
              </div>
              <span className="font-bold tracking-tight">TripRoute AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 rounded-full p-1 transition-colors">
              <span className="material-symbols-outlined block">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50/50 dark:bg-transparent">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-primary text-background-dark rounded-tr-none font-medium' 
                  : 'bg-white dark:bg-white/5 text-[#112120] dark:text-white rounded-tl-none border border-neutral-soft/50 dark:border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-neutral-soft/50 dark:border-white/5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-background-dark border-t border-neutral-soft dark:border-white/10">
            <div className="flex gap-2 bg-background-light dark:bg-white/5 rounded-xl px-3 py-1 items-center border border-neutral-soft dark:border-white/10 focus-within:border-primary transition-colors">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your next adventure..."
                className="flex-1 bg-transparent border-none py-2 text-sm focus:ring-0 outline-none dark:text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-lg transition-all ${!input.trim() || isTyping ? 'text-accent-muted cursor-not-allowed' : 'text-primary hover:scale-110 active:scale-90'}`}
              >
                <span className="material-symbols-outlined block">send</span>
              </button>
            </div>
            <p className="text-[9px] text-center text-accent-muted mt-2 font-medium tracking-wide">Powered by Gemini AI Engine</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-primary text-background-dark rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-4 border-white dark:border-background-dark"
        >
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">chat</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
