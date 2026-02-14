
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const RouteSummary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const route = ROUTES.find(r => r.id === id) || ROUTES[0];

  const handleDownload = () => {
    alert(`Generating PDF summary for ${route.title}...`);
    setTimeout(() => {
      alert("Download started!");
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `TripRoute: ${route.title}`,
        text: `Check out my journey on ${route.title}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Copied link to ${route.title} to clipboard!`);
    }
  };

  return (
    <div className="max-w-[1024px] mx-auto py-10 px-6">
      <div className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-2xl min-h-[400px] shadow-2xl mb-12" 
           style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url(${route.imageUrl})` }}>
        <div className="absolute top-6 left-6">
          <Link to={`/visualizer/${route.id}`} className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all text-sm font-semibold">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Visualizer
          </Link>
        </div>
        <div className="p-10 text-white">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Full Route Summary</span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight mt-2">{route.title}</h1>
          <div className="flex items-center gap-4 text-white/80 text-sm mt-4">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> Oct 12, 2023</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">person</span> 2 Travelers</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <SummaryStat icon="distance" label="Distance" value={route.distance} />
            <SummaryStat icon="schedule" label="Duration" value={route.days} />
            <SummaryStat icon="trending_up" label="Elevation Gain" value="120m" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">format_list_bulleted</span>
              Detailed Itinerary
            </h2>
            <div className="space-y-6">
              {route.segments.map((s, i) => (
                <div key={s.id} className="relative pl-8 border-l-2 border-primary/30 ml-4 pb-8 last:pb-0">
                  <div className="absolute -left-[11px] top-0 size-5 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                  <div className="bg-white rounded-2xl border border-neutral-soft overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-all">
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Segment {i+1}</span>
                        <span className="text-xs text-accent-muted">{s.departureTime} - {s.arrivalTime}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{s.name}</h3>
                      <p className="text-sm text-accent-muted mb-4">{s.highlights.join(', ')}</p>
                      <div className="flex gap-4 text-xs font-bold text-accent-muted">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">{s.icon}</span> {s.distance}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">timer</span> {s.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#112120] rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">lightbulb</span>
              Expert Tips
            </h3>
            <ul className="space-y-5">
              <ExpertTip tip="Carry a physical map for when GPS signals are unstable in heritage areas." />
              <ExpertTip tip="Wear breathable footwear for long walking segments." />
              <ExpertTip tip="South Bombay tap water is generally filtered, but carry a reusable bottle." />
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-soft p-8 shadow-sm text-center">
            <p className="text-sm font-bold text-accent-muted uppercase tracking-widest mb-6">Actions</p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-[#112120] font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                <span className="material-symbols-outlined">picture_as_pdf</span>
                Download PDF
              </button>
              <button 
                onClick={handleShare}
                className="w-full py-4 border border-neutral-soft text-[#112120] font-bold rounded-xl hover:bg-background-light transition-all"
              >
                Share Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryStat: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-neutral-soft shadow-sm text-center">
    <div className="flex items-center justify-center gap-2 text-accent-muted mb-2">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <p className="text-[10px] font-bold uppercase tracking-widest">{label}</p>
    </div>
    <p className="text-2xl font-black text-[#112120]">{value}</p>
  </div>
);

const ExpertTip: React.FC<{ tip: string }> = ({ tip }) => (
  <li className="flex gap-4">
    <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
    <p className="text-sm text-white/80 leading-relaxed">{tip}</p>
  </li>
);

export default RouteSummary;
