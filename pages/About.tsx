
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="antialiased">
      {/* Hero Section */}
      <section className="px-6 md:px-20 lg:px-40 py-16 md:py-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-[#111817]">
              Bringing travel <span className="text-primary">narratives</span> to life.
            </h1>
            <p className="text-lg text-[#638885] leading-relaxed max-w-xl">
              We believe that every journey is more than just a sequence of coordinates. Trip Visualizer transforms static GPS data into fluid, interactive route animations, allowing travelers to relive and share their experiences in 3D.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/explore')}
                className="bg-primary text-[#111817] px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all active:scale-95"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate(`/visualizer/${ROUTES[0].id}`)}
                className="bg-white border border-[#dce5e4] text-[#111817] px-8 py-3 rounded-lg font-bold hover:bg-background-light hover:border-primary transition-all active:scale-95"
              >
                View Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent-blue/40 rounded-3xl overflow-hidden relative shadow-2xl border border-white/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <img className="object-cover w-full h-full opacity-80 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3DWgPxPY6_SuWSMb1dJFiwjIl4WkjUnhN0d2QMh8y4IsMX2Cl2mM2cZj2YLD8TQpKaBf_K5O8ZjukaLM_7JIM89AKe2KQnnjBWLWWL4KwfGOXOyCsZ2yeKbqEK76xeUVYAYRAx6z2_A6omPglqiNRtmzta0CLNP5xBQ-ypGNmGFBCqfDfQ5F5iTUJUqyfN9dSYjVocLjHEE7aDSqo43L2Qmy6rwRZYME1eagZdONKCF_yE0dhqdREjVqY8rL25wIKW3FVm4cCGNwZ" alt="Map" />
              </div>
              <div 
                className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-xl border border-[#dce5e4] flex items-center gap-4 cursor-pointer hover:bg-white transition-colors"
                onClick={() => navigate(`/visualizer/${ROUTES[0].id}`)}
              >
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">play_arrow</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#111817]">Interactive Playback</p>
                  <p className="text-[10px] text-[#638885]">Click to animate route</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-6 md:px-20 lg:px-40 py-20 max-w-[1200px] mx-auto bg-white rounded-3xl mb-20 shadow-sm border border-neutral-soft">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-[#111817] mb-4">The Tech Stack</h2>
            <p className="text-[#638885] leading-relaxed">We utilize a modern, high-performance stack to ensure smooth interactions and responsive rendering for even the most complex route data.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <TechItem label="React" symbol="R" color="#61dafb" />
            <TechItem label="Tailwind CSS" symbol="T" color="#38bdf8" />
            <TechItem label="Three.js" symbol="3" color="#000000" />
            <TechItem label="Framer Motion" symbol="F" color="#f107a0" />
            <TechItem label="Gemini AI" symbol="G" color="#30e8d9" />
            <div className="flex flex-col items-center p-6 bg-primary/10 border border-primary/20 rounded-xl text-center gap-3">
              <div className="size-10 bg-primary/20 text-primary rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-sm">add</span></div>
              <p className="font-bold text-sm">And more...</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TechItem: React.FC<{ label: string; symbol: string; color: string }> = ({ label, symbol, color }) => (
  <div className="flex flex-col items-center p-6 bg-white border border-[#dce5e4] rounded-xl hover:border-primary transition-all text-center gap-3 cursor-default hover:-translate-y-1">
    <div className={`size-10 rounded-full flex items-center justify-center font-bold`} style={{ backgroundColor: `${color}20`, color }}>{symbol}</div>
    <p className="font-bold text-sm">{label}</p>
  </div>
);

export default About;
