
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { TripRoute } from '../types';

const RouteSelection: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState('');
  
  // Custom Planner State
  const [fromLoc, setFromLoc] = useState('');
  const [toLoc, setToLoc] = useState('');

  const filteredRoutes = ROUTES.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLoc || !toLoc) return alert("Please enter both Source and Destination.");
    // Navigate with query params for dynamic routing
    navigate(`/visualizer/dynamic?from=${encodeURIComponent(fromLoc)}&to=${encodeURIComponent(toLoc)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111817] dark:text-white mb-4 leading-tight">
          Where will your <span className="text-primary">next adventure</span> take you?
        </h2>
        <p className="text-lg text-[#638885] font-medium max-w-xl">
          Choose from curated routes or use our AI generator to build a custom journey with real-time traffic data.
        </p>
      </div>

      {/* Quick Route Generator Section */}
      <section className="mb-16 bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-3xl border border-primary/20">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4 text-center lg:text-left">
                <h3 className="text-2xl font-bold">Quick AI Route Planner</h3>
                <p className="text-accent-muted text-sm max-w-md mx-auto lg:mx-0">Enter any two locations globally and we'll generate the most efficient route with real-time traffic insights.</p>
            </div>
            <form onSubmit={handleGenerateCustom} className="flex-2 w-full lg:w-auto flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">location_on</span>
                    <input 
                        type="text" 
                        placeholder="Source (e.g. New York)" 
                        className="w-full pl-10 pr-4 py-4 rounded-xl border border-neutral-soft dark:border-white/10 dark:bg-background-dark/50 focus:ring-2 focus:ring-primary outline-none"
                        value={fromLoc}
                        onChange={(e) => setFromLoc(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </div>
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">flag</span>
                    <input 
                        type="text" 
                        placeholder="Destination (e.g. London)" 
                        className="w-full pl-10 pr-4 py-4 rounded-xl border border-neutral-soft dark:border-white/10 dark:bg-background-dark/50 focus:ring-2 focus:ring-primary outline-none"
                        value={toLoc}
                        onChange={(e) => setToLoc(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-primary text-background-dark font-black px-10 py-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                    Generate Route
                </button>
            </form>
        </div>
      </section>

      {/* Curated Routes Section */}
      <div className="mb-10 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Curated Adventures</h3>
        <div className="relative w-64">
           <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-accent-muted">search</span>
           <input 
             type="text"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Filter routes..."
             className="w-full pl-10 pr-4 py-2 bg-white dark:bg-white/5 border border-neutral-soft dark:border-white/10 rounded-xl outline-none focus:ring-1 focus:ring-primary"
           />
        </div>
      </div>

      {/* Route Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRoutes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>

      {/* Pagination/Footer Actions */}
      <div className="mt-16 flex flex-col items-center gap-6">
        <button 
          onClick={() => alert("Loading more routes...")}
          className="flex items-center gap-2 px-10 py-3 bg-white dark:bg-white/5 border border-[#e5eaea] dark:border-white/10 rounded-full font-bold text-[#638885] hover:text-[#111817] hover:border-primary transition-all"
        >
          View All Routes <span className="material-symbols-outlined">expand_more</span>
        </button>
        <p className="text-[#638885] text-sm">Showing {filteredRoutes.length} curated experiences</p>
      </div>
    </div>
  );
};

const RouteCard: React.FC<{ route: TripRoute }> = ({ route }) => (
  <div className="group bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-[#e5eaea] dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
    <div className="relative h-56 w-full bg-[#f0f4f4] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
        style={{ backgroundImage: `url(${route.imageUrl})` }}
      ></div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#111817] flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px] text-primary">verified</span> {route.type}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-[#111817] dark:text-white">{route.title}</h3>
        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded">{route.rating} ★</span>
      </div>
      <p className="text-[#638885] text-sm mb-6 line-clamp-2">{route.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f0f4f4] dark:bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">distance</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#638885] font-bold">Distance</p>
            <p className="text-sm font-bold text-[#111817] dark:text-white">{route.distance}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#f0f4f4] dark:bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">schedule</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#638885] font-bold">Duration</p>
            <p className="text-sm font-bold text-[#111817] dark:text-white">{route.days}</p>
          </div>
        </div>
      </div>
      <Link to={`/visualizer/${route.id}`} className="w-full mt-auto py-3 bg-background-light dark:bg-white/10 hover:bg-primary hover:text-background-dark text-[#111817] dark:text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
        Select Route <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </Link>
    </div>
  </div>
);

export default RouteSelection;
