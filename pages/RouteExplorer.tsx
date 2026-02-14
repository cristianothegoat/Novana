
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { TripRoute, RouteSegment, RouteType } from '../types';

const RouteExplorer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const dynamicFrom = searchParams.get('from');
  const dynamicTo = searchParams.get('to');

  const [route, setRoute] = useState<TripRoute | null>(null);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [is3D, setIs3D] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showTraffic, setShowTraffic] = useState(true);
  
  const timerRef = useRef<number | null>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const mockNotifications = [
    { id: 1, text: "Optimal route found for current traffic.", time: "Now", type: "success" },
    { id: 2, text: "Scenic detour suggested in 5km.", time: "10m ago", type: "info" },
    { id: 3, text: "Weather alert: Clear skies ahead.", time: "1h ago", type: "info" }
  ];

  // Reset active segment when route changes to avoid errors
  useEffect(() => {
    setActiveSegmentIndex(0);
    setIsPlaying(false);
    
    if (id === 'dynamic' && dynamicFrom && dynamicTo) {
      const dynamicRoute: TripRoute = {
        id: 'dynamic',
        title: `Express: ${dynamicFrom} ➔ ${dynamicTo}`,
        description: `Custom generated route between ${dynamicFrom} and ${dynamicTo}.`,
        distance: '124 km',
        days: '1 day',
        rating: 5.0,
        type: RouteType.SCENIC,
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267923af?auto=format&fit=crop&q=80&w=1000',
        segments: [
          {
            id: 'ds1',
            name: 'Departure Phase',
            transport: 'Car',
            distance: '15.4 km',
            duration: '22 mins',
            startLocation: dynamicFrom,
            endLocation: 'Highway Junction A4',
            departureTime: '10:00 AM',
            arrivalTime: '10:22 AM',
            highlights: ['Urban exit', 'Toll road access'],
            icon: 'directions_car'
          },
          {
            id: 'ds2',
            name: 'Cruising Segment',
            transport: 'Car',
            distance: '88.2 km',
            duration: '55 mins',
            startLocation: 'Highway Junction A4',
            endLocation: 'City Entrance',
            departureTime: '10:25 AM',
            arrivalTime: '11:20 AM',
            highlights: ['Speedway', 'Scenic Overlook'],
            icon: 'speed'
          },
          {
            id: 'ds3',
            name: 'Final Arrival',
            transport: 'Car',
            distance: '20.4 km',
            duration: '35 mins',
            startLocation: 'City Entrance',
            endLocation: dynamicTo,
            departureTime: '11:25 AM',
            arrivalTime: '12:00 PM',
            highlights: ['Last mile navigation'],
            icon: 'flag'
          }
        ]
      };
      setRoute(dynamicRoute);
    } else {
      const found = ROUTES.find(r => r.id === id) || ROUTES[0];
      setRoute(found);
    }
  }, [id, dynamicFrom, dynamicTo]);

  useEffect(() => {
    if (isPlaying && route && route.segments.length > 0) {
      timerRef.current = window.setInterval(() => {
        setActiveSegmentIndex((prev) => {
          if (prev >= route.segments.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, route, playbackSpeed]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    console.log(`Zooming ${direction}`);
  };

  const handleMyLocation = () => {
    console.log("Locating user...");
  };

  if (!route) return <div className="p-20 text-center">Loading route...</div>;

  const activeSegment = route.segments[activeSegmentIndex] || route.segments[0];
  
  const filteredSegments = route.segments.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.startLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fullPathPoints = [[10, 85], [20, 80], [40, 60], [60, 70], [80, 30], [90, 45], [95, 20]];
  
  const getSimPath = () => {
    const points = fullPathPoints;
    const startPos = points[activeSegmentIndex % points.length] || [0, 0];
    const endPos = points[(activeSegmentIndex + 1) % points.length] || [0, 0];
    return { startPos, endPos };
  };

  const { startPos, endPos } = getSimPath();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Explorer Header */}
      <header className="flex h-20 items-center justify-between border-b border-neutral-soft dark:border-white/10 bg-white dark:bg-background-dark px-8 shrink-0 relative z-[60]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-[#112120]">
              <span className="material-symbols-outlined">route</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#112120] dark:text-white truncate max-w-[200px]">{route.title}</h1>
          </Link>
          
          <div className="flex items-center gap-2 rounded-xl bg-background-light dark:bg-white/5 p-1 border border-neutral-soft dark:border-white/10">
            <button 
              onClick={() => setIsPlaying(true)}
              disabled={isPlaying || route.segments.length === 0}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${isPlaying ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'hover:bg-white dark:hover:bg-white/10 text-accent-muted disabled:opacity-30'}`}
            >
              <span className="material-symbols-outlined">play_arrow</span>
            </button>
            <button 
              onClick={() => setIsPlaying(false)}
              disabled={!isPlaying}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${!isPlaying ? 'text-accent-muted' : 'hover:bg-white dark:hover:bg-white/10 text-primary'}`}
            >
              <span className="material-symbols-outlined">pause</span>
            </button>
            <div className="mx-2 h-6 w-[1px] bg-neutral-soft dark:bg-white/10"></div>
            {[1, 2, 3].map(speed => (
              <button 
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${playbackSpeed === speed ? 'text-primary bg-white dark:bg-white/10 shadow-sm' : 'text-accent-muted hover:text-primary'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowTraffic(!showTraffic)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${showTraffic ? 'bg-primary/20 border-primary text-primary font-bold' : 'border-neutral-soft dark:border-white/10 text-accent-muted'}`}
          >
            <span className="material-symbols-outlined text-lg">traffic</span>
            <span className="text-sm hidden sm:inline">Traffic</span>
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-neutral-soft dark:border-white/10 px-4 py-2 bg-background-light dark:bg-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-accent-muted">Perspective</span>
              <span className="text-xs font-bold dark:text-white">{is3D ? '3D' : '2D'}</span>
            </div>
            <label className="relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full bg-neutral-soft dark:bg-white/10 p-0.5 transition-colors">
              <input type="checkbox" checked={is3D} onChange={() => setIs3D(!is3D)} className="sr-only peer" />
              <div className="h-5 w-5 rounded-full bg-white dark:bg-background-dark shadow-sm transition-transform peer-checked:translate-x-5 peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex gap-2 relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-background-light dark:bg-white/5 text-accent-muted hover:text-primary transition-all relative ${isNotificationsOpen ? 'bg-primary/20 text-primary' : ''}`}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            
            {isNotificationsOpen && (
              <div ref={notificationsRef} className="absolute top-12 right-0 w-80 bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-neutral-soft dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[70]">
                <div className="p-4 border-b border-neutral-soft dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
                  <span className="font-bold text-sm">Real-time Alerts</span>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Clear All</button>
                </div>
                <div className="max-h-80 overflow-y-auto no-scrollbar">
                  {mockNotifications.map(n => (
                    <div key={n.id} className="p-4 hover:bg-background-light dark:hover:bg-white/5 transition-colors border-b border-neutral-soft/50 dark:border-white/5 last:border-0 cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`size-2 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-green-500' : 'bg-primary'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#112120] dark:text-white leading-snug group-hover:text-primary transition-colors">{n.text}</p>
                          <span className="text-[10px] font-bold text-accent-muted uppercase mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link to="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary overflow-hidden hover:scale-105 transition-transform">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcpL_UXL-TJZ6WEpP_gFBRpbpx6lxYYmmiRMdavM4zPJwcQrF2ZoSdE8WF01-Jhpu9cnqbT5-CI8La2McSEjcT8PQrEyLiPGAPv7p-vckKez9TvT6rMIh3NgIxVyBE5Kgfi__DdIH6W8piiuzw24PStiXhI3XK2zIvvJcljesx1XlQdb_X7K9K4qQPvlKGqNxaCmoHR_VVsEeSDpbr8QqJ5mMSYSxkypaHaOKyOYp21didjL0D5Eqxtxt1jkMxK52vvr1Kd6azp6By" alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative">
        <div className="relative flex-1 bg-[#112120] overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqOlrAgnY2w60gvuL7LIc6sWzm_5ywWcN0FN68qtjbcFALa1kuseFd3T_CNrf6-mugqr3F9Xm0bS9yvu5mMEAiUKZYyudBqzw2LO_AzaNG5GcJR6mKiRQYaDnssaj_i-h_LiFK3esfcLlPRPj8jzVTrQ2gQl3_hydQNyQd4DF5CgNBJ98UpGriY3Eahv6UsdRNGpXfLGLQUxPKszTjnEJHq7VZ0m0iT8RcKrVj9Lc70YcZXrR3_EJzmm3FdBh7TliLocwXeMi6mlbj')",
              transform: is3D ? 'perspective(1200px) rotateX(30deg) scale(1.2)' : 'scale(1.0)',
              filter: searchQuery && filteredSegments.length === 0 ? 'grayscale(0.6) brightness(0.4)' : 'brightness(0.7)'
            }}
          >
            <svg className="absolute inset-0 h-full w-full pointer-events-none drop-shadow-2xl" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#30e8d9" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <polyline 
                points={fullPathPoints.map(p => p.join(',')).join(' ')}
                fill="none" 
                stroke="white" 
                strokeWidth="0.5" 
                strokeDasharray="1,1" 
                className="opacity-20" 
              />
              
              {showTraffic && (
                <g className="transition-opacity duration-500">
                    <line x1="10" y1="85" x2="20" y2="80" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.6" filter="url(#glow)" />
                    <line x1="20" y1="80" x2="40" y2="60" stroke="#facc15" strokeWidth="2" strokeLinecap="round" opacity="0.6" filter="url(#glow)" />
                    <line x1="40" y1="60" x2="60" y2="70" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.6" filter="url(#glow)" />
                    <line x1="60" y1="70" x2="80" y2="30" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" opacity="0.6" filter="url(#glow)" />
                </g>
              )}

              {route.segments.length > 0 && (
                <>
                  <line 
                    x1={startPos[0]} y1={startPos[1]} x2={endPos[0]} y2={endPos[1]} 
                    stroke="url(#activeGradient)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    className="animate-pulse"
                    filter="url(#glow)"
                  />
                  <g transform={`translate(${startPos[0]}, ${startPos[1]})`}>
                    <circle r="2.5" fill="#30e8d9" className="animate-ping opacity-75" />
                    <circle r="1.5" fill="#30e8d9" />
                  </g>
                </>
              )}
            </svg>
          </div>

          <div className="absolute right-6 top-6 flex flex-col gap-3">
            <button onClick={() => handleZoom('in')} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 dark:bg-background-dark/80 backdrop-blur-md shadow-xl text-accent-muted hover:text-primary transition-all active:scale-90 border border-white/20">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button onClick={() => handleZoom('out')} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 dark:bg-background-dark/80 backdrop-blur-md shadow-xl text-accent-muted hover:text-primary transition-all active:scale-90 border border-white/20">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <button onClick={handleMyLocation} className="mt-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 dark:bg-background-dark/80 backdrop-blur-md shadow-xl text-accent-muted hover:text-primary transition-all active:scale-90 border border-white/20">
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>

          <div className="absolute left-6 top-6 w-80">
            <div className="flex items-center gap-2 rounded-2xl bg-white/90 dark:bg-background-dark/80 backdrop-blur-md p-2 shadow-2xl border border-white/20">
              <span className="material-symbols-outlined pl-2 text-accent-muted">search</span>
              <input 
                className="flex-1 border-none bg-transparent py-2 text-sm focus:ring-0 placeholder:text-accent-muted dark:text-white" 
                placeholder="Find stop..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <aside className="w-96 flex flex-col border-l border-neutral-soft dark:border-white/10 bg-white dark:bg-background-dark overflow-y-auto relative z-50">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black dark:text-white">Segment Details</h2>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                Phase {activeSegmentIndex + 1}
              </span>
            </div>

            {activeSegment ? (
              <div className="space-y-8">
                <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-[#112120] shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined text-3xl">{activeSegment.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg dark:text-white leading-tight">{activeSegment.name}</h3>
                      <p className="text-xs text-accent-muted font-bold uppercase tracking-wider mt-1">{activeSegment.transport} Mode</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 border-t border-primary/10 pt-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent-muted mb-1">Distance</p>
                      <p className="text-2xl font-black dark:text-white">{activeSegment.distance}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent-muted mb-1">Duration</p>
                      <p className="text-2xl font-black dark:text-white">{activeSegment.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="relative space-y-10 pl-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2.5px] bg-gradient-to-b from-primary to-[#2563eb] rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -left-[24px] top-1.5 h-4 w-4 rounded-full border-[3px] border-primary bg-white dark:bg-background-dark shadow-sm"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-muted mb-1">Departure</p>
                    <p className="font-bold text-base dark:text-white">{activeSegment.startLocation}</p>
                    <p className="text-xs text-primary font-bold mt-1">{activeSegment.departureTime}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[24px] top-1.5 h-4 w-4 rounded-full border-[3px] border-[#2563eb] bg-white dark:bg-background-dark shadow-sm"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-muted mb-1">Arrival</p>
                    <p className="font-bold text-base dark:text-white">{activeSegment.endLocation}</p>
                    <p className="text-xs text-blue-500 font-bold mt-1">{activeSegment.arrivalTime}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-accent-muted italic">No segments available for this route.</div>
            )}
          </div>
          
          <div className="mt-auto p-8 border-t border-neutral-soft dark:border-white/10 bg-slate-50/50 dark:bg-transparent">
            <Link to={`/summary/${route.id}`} className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#112120] dark:bg-primary py-5 font-black text-white dark:text-[#112120] shadow-2xl hover:scale-[1.03] transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
              <span className="material-symbols-outlined">analytics</span>
              Full Trip Summary
            </Link>
          </div>
        </aside>
      </main>

      <footer className="h-44 border-t border-neutral-soft dark:border-white/10 bg-white dark:bg-background-dark p-6 shrink-0 relative z-[60]">
        <div className="flex h-full flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-muted">Itinerary Explorer</h3>
          </div>
          <div className="custom-scrollbar flex flex-1 gap-5 overflow-x-auto pb-3">
            {route.segments.length > 0 ? (
              (searchQuery ? filteredSegments : route.segments).map((s, idx) => {
                const actualIdx = route.segments.findIndex(seg => seg.id === s.id);
                return (
                  <button 
                    key={s.id}
                    onClick={() => {
                      setActiveSegmentIndex(actualIdx);
                      setIsPlaying(false);
                    }}
                    className={`flex min-w-[240px] flex-col justify-between rounded-2xl border-2 p-5 transition-all group ${activeSegmentIndex === actualIdx ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-neutral-soft dark:border-white/5 hover:border-primary/50 bg-white dark:bg-white/5'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`material-symbols-outlined text-2xl transition-transform group-hover:scale-110 ${activeSegmentIndex === actualIdx ? 'text-primary' : 'text-accent-muted'}`}>{s.icon}</span>
                      <span className={`text-xs font-black uppercase tracking-widest ${activeSegmentIndex === actualIdx ? 'text-primary' : 'text-accent-muted'}`}>{s.distance}</span>
                    </div>
                    <div className="text-left">
                      <p className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${activeSegmentIndex === actualIdx ? 'text-primary' : 'text-accent-muted'}`}>Step 0{actualIdx + 1}</p>
                      <p className={`truncate text-sm font-bold ${activeSegmentIndex === actualIdx ? 'text-[#112120] dark:text-white' : 'text-accent-muted'}`}>{s.name}</p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-full text-accent-muted italic text-sm">No segments to display in timeline.</div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RouteExplorer;
