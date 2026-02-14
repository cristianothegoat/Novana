
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen soft-gradient dark:from-[#112120] dark:to-[#0f172a]">
      {/* Hero Section */}
      <section className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: Real-time Traffic Routing
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#112120] leading-[1.1] dark:text-white">
              Your World <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">In 3D Perspective</span>
            </h1>
            <p className="text-lg text-[#112120]/70 dark:text-white/70 max-w-lg leading-relaxed">
              Plan, visualize, and share your adventures with high-fidelity map data. Experience the first interactive route engine built for modern explorers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore" className="flex items-center gap-2 px-8 py-4 bg-primary text-[#112120] rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-all">
                <span>Start Planning</span>
                <span className="material-symbols-outlined">map</span>
              </Link>
              <button 
                onClick={() => navigate(`/visualizer/${ROUTES[0].id}`)}
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#1e293b] text-[#112120] dark:text-white border border-[#dce5e4] dark:border-white/10 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
              >
                View Demo
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center h-[450px] md:h-[550px]">
            {/* Realistic Rotating Globe Container */}
            <div className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(48,232,217,0.4)] border-4 border-white/20 group cursor-pointer" onClick={() => navigate('/explore')}>
              {/* Globe Atmosphere Glow */}
              <div className="absolute inset-0 z-20 pointer-events-none rounded-full shadow-[inset_-40px_-40px_80px_rgba(0,0,0,0.6),inset_40px_40px_80px_rgba(255,255,255,0.2)]"></div>
              
              {/* Background Space/Ocean Color */}
              <div className="absolute inset-0 bg-[#0a192f] transition-all duration-700 group-hover:bg-[#0c233f]"></div>
              
              {/* Rotating Landmass Layer */}
              <div className="absolute inset-0 flex items-center animate-[globe-spin_25s_linear_infinite]">
                 <svg viewBox="0 0 1000 500" className="h-full w-auto flex-shrink-0 opacity-80 fill-primary/60">
                    <path d="M 0 250 Q 50 150 100 250 T 200 250 T 300 250 T 400 250 T 500 250 T 600 250 T 700 250 T 800 250 T 900 250 T 1000 250" />
                    <circle cx="150" cy="200" r="40" />
                    <circle cx="350" cy="300" r="60" />
                    <circle cx="550" cy="180" r="50" />
                    <circle cx="750" cy="320" r="70" />
                    <circle cx="950" cy="220" r="45" />
                 </svg>
                 {/* Duplicate for seamless wrap */}
                 <svg viewBox="0 0 1000 500" className="h-full w-auto flex-shrink-0 opacity-80 fill-primary/60">
                    <path d="M 0 250 Q 50 150 100 250 T 200 250 T 300 250 T 400 250 T 500 250 T 600 250 T 700 250 T 800 250 T 900 250 T 1000 250" />
                    <circle cx="150" cy="200" r="40" />
                    <circle cx="350" cy="300" r="60" />
                    <circle cx="550" cy="180" r="50" />
                    <circle cx="750" cy="320" r="70" />
                    <circle cx="950" cy="220" r="45" />
                 </svg>
              </div>

              {/* Grid Lines Layer */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full border-2 border-white/40 rounded-full"></div>
                <div className="absolute top-1/2 w-full h-px bg-white/40"></div>
                <div className="absolute left-1/2 h-full w-px bg-white/40"></div>
              </div>

              {/* Pins on the Globe */}
              <div className="absolute top-1/3 left-1/2 z-30 group-hover:scale-125 transition-transform">
                <span className="material-symbols-outlined text-primary drop-shadow-[0_0_10px_rgba(48,232,217,1)] animate-bounce">location_on</span>
              </div>
            </div>

            {/* Float UI Labels */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-xl border border-primary/20 animate-pulse hidden md:block">
              <p className="text-xs font-bold text-[#112120]">3D Map Engine v2.4</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes globe-spin {
          from { transform: translateX(0); }
          to { transform: translateX(-1000px); }
        }
      `}</style>

      {/* Feature Highlights */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold text-[#112120] dark:text-white">Experience the Journey</h2>
          <p className="text-[#112120]/60 dark:text-white/60 max-w-xl mx-auto">Our tool provides a comprehensive suite of features to bring your travels to life with precision and style.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon="traffic" title="Real-time Traffic" desc="Visualise live traffic flow on your planned routes with colour-coded density markers." />
          <FeatureCard icon="view_timeline" title="Horizontal Timeline" desc="Scrub through your trip chronologically with our intuitive segment timeline." />
          <FeatureCard icon="play_circle" title="Route Playback" desc="Watch your journey unfold in real-time with smooth camera animations." />
          <FeatureCard icon="info" title="Segment Details" desc="Deep dive into speed, elevation, and terrain data for every leg of the journey." />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 mx-auto max-w-4xl text-center">
        <div className="bg-gradient-to-br from-primary/10 to-pastel-blue/20 dark:from-primary/20 dark:to-background-dark p-12 rounded-3xl border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#112120] dark:text-white mb-4">Ready to visualize your next adventure?</h2>
          <p className="text-[#112120]/70 dark:text-white/70 mb-8 text-lg">Join thousands of travelers mapping their world in stunning detail.</p>
          <Link to="/signin" className="inline-block px-10 py-4 bg-[#112120] dark:bg-primary text-white dark:text-[#112120] rounded-xl font-bold hover:scale-105 transition-transform shadow-xl">
            Start Mapping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="group p-8 bg-white dark:bg-[#1e293b] rounded-2xl feature-card-shadow border border-transparent hover:border-primary/30 transition-all hover:-translate-y-1">
    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl text-primary mb-6 group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <h3 className="text-lg font-bold text-[#112120] dark:text-white mb-2">{title}</h3>
    <p className="text-sm leading-relaxed text-[#112120]/60 dark:text-white/60">{desc}</p>
  </div>
);

export default Landing;
