import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  HelpCircle,
  ShieldAlert,
  Compass,
  CheckCircle,
  FileText,
  User,
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  suggestedAction?: { label: string; actionId: string };
}

interface AiFenceAdvisorProps {
  onOpenVisualizer: () => void;
  onOpenQuote: () => void;
}

export const AiFenceAdvisor: React.FC<AiFenceAdvisorProps> = ({ onOpenVisualizer, onOpenQuote }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Hello! I am your SteelFencing.ca Technical & Canadian Bylaw Advisor. Ask me anything regarding municipal height bylaws (Ontario, BC, Alberta, Quebec), pool safety enclosure codes, frost depth screw-pile requirements, or wind load engineering.',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const FAQ_PROMPTS = [
    'What is the maximum allowed backyard fence height in Ontario?',
    'What are the pool enclosure safety bylaws in Canada?',
    'How do helical screw piles stop frost heaves in -40°C?',
    'Why is a cantilever gate better than a track gate in heavy snow?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('height') || qLower.includes('bylaw') || qLower.includes('permit') || qLower.includes('ontario') || qLower.includes('toronto')) {
        botResponse = `Under most Canadian municipal bylaws (including Toronto, Mississauga, Ottawa, Vancouver, and Calgary), standard rear yard privacy fences can be built up to 2.0 metres (6'6") without requiring a building permit. Front yard fences are typically capped at 1.0m to 1.2m (3'3" to 4'0") for sightline safety. Our Nordic and Corrugated series come in 4ft, 5ft, 6ft, 7ft, and 8ft heights to suit any municipal allowance.`;
      } else if (qLower.includes('pool') || qLower.includes('swimming')) {
        botResponse = `Canadian Pool Enclosure Bylaws (such as Ontario OBC SB-10 and Quebec residential pool safety regulations) strictly require: 1) Minimum 48" or 60" perimeter height, 2) Self-closing, self-latching gates with latches at least 48" high or interior mounted, 3) Picket spacing under 4" (100mm) to prevent children climbing, and 4) Zero horizontal climbable rails on the exterior. Our Highland and Nordic profiles can be configured to meet these spacing and height rules -- always confirm the exact requirements with your municipality before installing.`;
      } else if (qLower.includes('frost') || qLower.includes('pile') || qLower.includes('heave') || qLower.includes('winter') || qLower.includes('cold')) {
        botResponse = `In Canadian freeze-thaw cycles, soil moisture freezes into ice lenses that expand vertically, lifting shallow posts (frost heaves). SteelFencing.ca uses torque-driven helical screw piles or deep frost-sleeve footings (48" in ON/QC, 60"-72" in Prairies) anchored firmly below the frost line. Because our Galvalume steel has zero water absorption, ice cannot bond to it.`;
      } else if (qLower.includes('cantilever') || qLower.includes('gate') || qLower.includes('snow') || qLower.includes('driveway')) {
        botResponse = `Ground-track gates have a metal rail grooved into the driveway that collects slush, gravel, and ice in winter, jamming rollers. Our Cantilever sliding gates use an internal enclosed roller carriage that floats 4 inches above the driveway, effortlessly clearing heavy Canadian snowbanks and plowed drifts with zero track cleaning needed.`;
      } else if (qLower.includes('price') || qLower.includes('cost') || qLower.includes('quote')) {
        botResponse = `Factory supply starts from $85–$115 CAD per linear foot depending on profile (Highland Ornamental, Corrugated, or Nordic Slat). Complete turnkey installation (including laser excavation, deep frost footings, and structural assembly) ranges from $125–$165/LF. You can test your exact footage right now in our Interactive 3D Visualizer!`;
      } else {
        botResponse = `SteelFencing.ca systems are manufactured from high-grade Galvalume® steel with ASTM A653 zinc-aluminum corrosion resistance and a 5-stage TGIC architectural powder coat. They withstand 160+ km/h wind gusts, -45°C cold, and require zero lifetime staining. Would you like to launch the 3D visualizer or receive a turnkey quote for your property?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          suggestedAction: { label: 'Configure in 3D Visualizer', actionId: 'visualizer' },
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <section className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Canadian Code &amp; Specification Advisor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Ask Our Canadian Steel Fencing Expert
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Instant guidance on municipal permit bylaws, frost engineering, and pool enclosure compliance.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
          
          {/* Header Bar */}
          <div className="p-3.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-bold text-xs">
                🇨🇦
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Canadian Fence Advisor AI</h3>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Active • NBC &amp; Municipal Bylaw Database</span>
                </span>
              </div>
            </div>
            <button
              onClick={onOpenQuote}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold"
            >
              Book Site Consultation →
            </button>
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="p-2.5 bg-neutral-950/60 border-b border-neutral-800 flex overflow-x-auto gap-2 no-scrollbar">
            {FAQ_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] rounded-lg border border-neutral-700 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-neutral-700 text-white'
                      : 'bg-amber-500 text-neutral-950'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-[82%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-none'
                      : 'bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.suggestedAction && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-800">
                      <button
                        onClick={onOpenVisualizer}
                        className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-700"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-xs text-neutral-400">
                <Bot className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Consulting Canadian building codes &amp; engineering database...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about fence heights, frost lines, pool safety, or custom gates..."
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 rounded-xl transition-all font-bold cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
