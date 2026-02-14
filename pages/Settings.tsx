
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Changes saved successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-[960px] mx-auto px-6 py-12">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-4xl font-black tracking-tight text-[#112120] dark:text-white">Settings</h1>
        <p className="text-[#638885] text-base font-normal">Manage your account preferences and connected services.</p>
      </div>

      <div className="pb-8 overflow-x-auto no-scrollbar">
        <div className="flex border-b border-[#dce5e4] dark:border-white/10 gap-8 min-w-max">
          {['General', 'Security', 'Notifications', 'Billing'].map(tab => (
            <Tab 
              key={tab} 
              label={tab} 
              active={activeTab === tab} 
              onClick={() => setActiveTab(tab)} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {activeTab === 'General' && (
          <>
            {/* Profile Section */}
            <section className="bg-white dark:bg-[#1c2e2d] p-6 rounded-xl border border-neutral-soft dark:border-white/5 shadow-sm">
              <div className="flex w-full flex-col gap-6 md:flex-row md:items-center">
                <div className="flex gap-6 items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full border-4 border-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeOVNTQXVaQi3fM15dfeDwOuf-MNTjIWsPl_ap9QbQD8my8NR5JRuDhgyPBqqTDLxU6EXrIuTFF7Pnxg6GVCuBGjARILGvCFUWOSXg0cUd1V0K77VOjPvmu2OKO_gYxmeCGIdRPpQgxPFXTP0hmp8UQaTLjJskqziOI9ZToKovanHQEhy90bfmj6e_xMzZGEwKYRwwE_dJ5-En38bRtKvA2OFhIXOxZXB3CHlnb-ie0gnnCXMoS6H_cypEfYAO9or8VHWGG7EgsInT')" }}></div>
                    <button className="absolute bottom-0 right-0 bg-primary text-[#112120] p-1.5 rounded-full border-2 border-white dark:border-[#1c2e2d] shadow-md hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  </div>
                  <div>
                    <p className="text-xl font-bold">Profile Picture</p>
                    <p className="text-[#638885] text-sm">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-auto">
                  <button onClick={() => alert("Upload dialog...")} className="px-4 py-2 bg-background-light dark:bg-white/5 font-bold rounded-lg text-sm hover:brightness-95 transition-all">Upload New</button>
                  <button onClick={() => alert("Picture removed")} className="px-4 py-2 text-red-500 font-bold rounded-lg text-sm hover:bg-red-50 transition-all">Remove</button>
                </div>
              </div>
            </section>

            {/* Basic Info */}
            <section className="bg-white dark:bg-[#1c2e2d] p-6 rounded-xl border border-neutral-soft dark:border-white/5 shadow-sm">
              <h2 className="text-lg font-bold pb-4 border-b border-[#e5eaea] dark:border-white/5 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" defaultValue="Alex Johnson" />
                <Input label="Email Address" defaultValue="alex.j@example.com" type="email" />
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold">Bio</label>
                  <textarea className="w-full rounded-lg border-[#dce5e4] dark:border-white/10 dark:bg-white/5 p-4 outline-none focus:border-primary transition-all" rows={3} defaultValue="Avid cyclist and mountain explorer."></textarea>
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="bg-white dark:bg-[#1c2e2d] p-6 rounded-xl border border-neutral-soft dark:border-white/5 shadow-sm space-y-6">
              <h2 className="text-lg font-bold pb-4 border-b border-[#e5eaea] dark:border-white/5 mb-6">Preferences</h2>
              <ToggleItem title="Enable 3D View by Default" desc="Render maps in immersive 3D when loading routes." defaultChecked />
              <ToggleItem title="Email Updates" desc="Get news about new features." />
              <div className="pt-2">
                <label className="text-sm font-semibold block mb-2">Unit System</label>
                <select className="w-full md:w-64 rounded-lg border-[#dce5e4] dark:border-white/10 dark:bg-white/5 h-11 px-4 cursor-pointer outline-none focus:border-primary transition-all">
                  <option>Metric (km, m, °C)</option>
                  <option defaultValue="Imperial">Imperial (mi, ft, °F)</option>
                </select>
              </div>
            </section>
          </>
        )}

        {activeTab === 'Security' && (
          <section className="bg-white dark:bg-[#1c2e2d] p-6 rounded-xl border border-neutral-soft dark:border-white/5 shadow-sm space-y-6">
            <h2 className="text-lg font-bold pb-4 border-b border-[#e5eaea] dark:border-white/5 mb-6">Password & Access</h2>
            <div className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
              <button className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-lg text-sm">Change Password</button>
            </div>
            <hr className="border-[#e5eaea] dark:border-white/5"/>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Two-Factor Authentication</p>
                <p className="text-xs text-accent-muted">Keep your account extra secure.</p>
              </div>
              <button className="px-4 py-2 border border-[#dce5e4] rounded-lg text-sm font-bold">Setup 2FA</button>
            </div>
          </section>
        )}

        {(activeTab === 'Notifications' || activeTab === 'Billing') && (
          <div className="py-20 text-center bg-white dark:bg-[#1c2e2d] rounded-xl border border-neutral-soft border-dashed">
             <p className="text-accent-muted">Additional {activeTab} settings will be available in the next version.</p>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-6">
          <button 
            onClick={() => { if(confirm("Discard changes?")) window.location.reload(); }}
            className="px-6 py-3 text-accent-muted font-bold hover:text-[#112120] transition-all"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-primary text-[#112120] font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            {isSaving ? "Saving..." : "Save Changes"}
            {!isSaving && <span className="material-symbols-outlined text-sm">done</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

const Tab: React.FC<{ label: string; active?: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`pb-3 pt-4 font-bold text-sm border-b-[3px] transition-all ${active ? 'border-primary text-[#112120]' : 'border-transparent text-accent-muted hover:text-primary'}`}
  >
    {label}
  </button>
);

const Input: React.FC<{ label: string; defaultValue?: string; placeholder?: string; type?: string }> = ({ label, defaultValue, placeholder, type = 'text' }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold">{label}</label>
    <input 
      className="w-full rounded-lg border-[#dce5e4] dark:border-white/10 dark:bg-white/5 h-11 px-4 outline-none focus:border-primary transition-all" 
      type={type} 
      defaultValue={defaultValue} 
      placeholder={placeholder}
    />
  </div>
);

const ToggleItem: React.FC<{ title: string; desc: string; defaultChecked?: boolean }> = ({ title, desc, defaultChecked }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs text-accent-muted">{desc}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#2a3f3e] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  </div>
);

export default Settings;
