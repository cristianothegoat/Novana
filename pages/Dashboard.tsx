
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-full min-h-[calc(100vh-80px)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 hidden lg:flex flex-shrink-0 border-r border-[#dce5e4] bg-white dark:bg-background-dark flex flex-col justify-between">
        <div className="flex flex-col gap-8 p-6">
          <nav className="flex flex-col gap-2">
            <NavItem icon="dashboard" label="Overview" active />
            <NavItem icon="map" label="Saved Routes" />
            <NavItem icon="history" label="Recent Activity" />
            <NavItem icon="settings" label="Settings" link="/settings" />
          </nav>
        </div>
        <div className="p-6 border-t border-[#dce5e4]">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-full bg-soft-grey overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcpL_UXL-TJZ6WEpP_gFBRpbpx6lxYYmmiRMdavM4zPJwcQrF2ZoSdE8WF01-Jhpu9cnqbT5-CI8La2McSEjcT8PQrEyLiPGAPv7p-vckKez9TvT6rMIh3NgIxVyBE5Kgfi__DdIH6W8piiuzw24PStiXhI3XK2zIvvJcljesx1XlQdb_X7K9K4qQPvlKGqNxaCmoHR_VVsEeSDpbr8QqJ5mMSYSxkypaHaOKyOYp21didjL0D5Eqxtxt1jkMxK52vvr1Kd6azp6By" alt="Alex" />
            </div>
            <div>
              <p className="text-sm font-bold">Alex Rivers</p>
              <p className="text-xs text-accent-muted">Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-background-light dark:bg-background-dark overflow-y-auto">
        <header className="px-8 py-6 flex items-center justify-between border-b border-[#dce5e4]/50 sticky top-0 bg-background-light/80 backdrop-blur-md z-10">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <Link to="/explore" className="bg-primary text-[#112120] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
            <span className="material-symbols-outlined">add_circle</span>
            Create New Route
          </Link>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total distance traveled" value="1,240 km" trend="+12% from last month" icon="distance" />
            <StatCard label="Routes completed" value="12" trend="+5% from last month" icon="task_alt" />
            <StatCard label="Favorite transport mode" value="Train" trend="Used in 65% of trips" icon="train" />
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <section className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Saved Routes</h3>
                <Link to="/explore" className="text-sm font-semibold text-primary hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ROUTES.map(route => (
                  <Link to={`/visualizer/${route.id}`} key={route.id} className="group bg-white rounded-xl border border-[#dce5e4] overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${route.imageUrl})` }}></div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider">{route.type}</div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-lg mb-1">{route.title}</h4>
                      <div className="flex items-center gap-3 text-accent-muted text-xs">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">route</span> {route.distance}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {route.days}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link to="/explore" className="group bg-background-light border-2 border-dashed border-[#dce5e4] rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 hover:border-primary/50 transition-all">
                  <div className="size-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">add</span>
                  </div>
                  <p className="font-bold text-accent-muted">New Destination</p>
                </Link>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <div className="bg-white rounded-xl border border-[#dce5e4] overflow-hidden shadow-sm p-4 space-y-6">
                <ActivityItem icon="edit" title="Updated 'Swiss Alps Explorer'" desc="You added 3 new scenic stops." time="2 hours ago" />
                <ActivityItem icon="add_location_alt" title="Created 'Berlin Weekend'" desc="New city itinerary generated with AI." time="Yesterday" />
                <ActivityItem icon="share" title="Shared 'Pacific Coast'" desc="Route shared with 2 fellow travelers." time="3 days ago" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active?: boolean; link?: string }> = ({ icon, label, active, link }) => (
  <Link to={link || '#'} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all ${active ? 'bg-primary/10 text-[#111817]' : 'text-[#638885] hover:bg-background-light'}`}>
    <span className={`material-symbols-outlined ${active ? 'text-primary' : ''}`}>{icon}</span>
    <span className="text-sm">{label}</span>
  </Link>
);

const StatCard: React.FC<{ label: string; value: string; trend: string; icon: string }> = ({ label, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-[#dce5e4] shadow-sm flex flex-col gap-1">
    <div className="flex items-center justify-between mb-2">
      <span className="text-accent-muted text-sm font-medium">{label}</span>
      <span className="material-symbols-outlined text-primary">{icon}</span>
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-xs font-bold text-green-600 mt-2">{trend}</p>
  </div>
);

const ActivityItem: React.FC<{ icon: string; title: string; desc: string; time: string }> = ({ icon, title, desc, time }) => (
  <div className="flex gap-4">
    <div className="size-8 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary">
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-[#638885]">{desc}</p>
      <span className="text-[10px] text-[#638885]/60 font-medium">{time}</span>
    </div>
  </div>
);

export default Dashboard;
