
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setIsCheckingOut(true);
  };

  const handlePayment = () => {
    setIsCheckingOut(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 relative">
      <div className="text-center mb-16">
        <h1 className="text-[#111817] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
          Choose the right plan for your journey
        </h1>
        <p className="text-[#638885] dark:text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          From weekend hikers to professional expedition teams, our tools help you visualize every elevation and turn of your adventure.
        </p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex h-12 w-72 items-center justify-center rounded-xl bg-white dark:bg-background-dark/50 border border-[#dce5e4] dark:border-gray-700 p-1.5 shadow-sm">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-primary/20 text-[#111817]' : 'text-[#638885]'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-bold transition-all ${billingCycle === 'yearly' ? 'bg-primary text-[#111817]' : 'text-[#638885]'}`}
            >
              <span className="flex items-center gap-1.5">Yearly <span className="text-[10px] bg-white/50 px-1.5 py-0.5 rounded uppercase">-20%</span></span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-[1100px] mx-auto">
        <PricingCard 
          title="Free" 
          subtitle="Perfect for casual day trips" 
          price={0} 
          features={['Basic 2D Map Visualization', 'Save up to 3 Active Routes', 'GPX & KML File Imports', 'Community Support Access']}
          cta="Get Started"
          onSelect={() => handleSelectPlan('Free')}
        />
        <PricingCard 
          title="Pro" 
          subtitle="For the serious adventurer" 
          price={billingCycle === 'yearly' ? 12 : 15} 
          features={['3D Elevation Visualization', 'Offline Map Downloads', 'Unlimited Route Saving', 'High-Resolution 4K Exports', 'Priority Support Response']}
          cta="Go Pro Now"
          highlighted
          onSelect={() => handleSelectPlan('Pro')}
        />
        <PricingCard 
          title="Team" 
          subtitle="For clubs and professionals" 
          price={49} 
          features={['Collaborative Route Planning', 'Shared Team Asset Library', 'Centralized Admin Dashboard', 'SSO & Enterprise Security', 'Custom API Integration']}
          cta="Contact Sales"
          onSelect={() => handleSelectPlan('Team')}
        />
      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-background-dark w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-neutral-soft dark:border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold">Secure Checkout</h3>
              <button onClick={() => setIsCheckingOut(false)} className="text-accent-muted hover:text-black">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-background-light dark:bg-white/5 p-4 rounded-xl">
                <p className="text-xs font-bold uppercase text-accent-muted tracking-widest mb-1">Plan Summary</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{selectedPlan} Subscription</span>
                  <span className="font-bold text-lg">{selectedPlan === 'Free' ? '$0' : selectedPlan === 'Pro' ? `$${billingCycle === 'yearly' ? 12 : 15}` : '$49'} /mo</span>
                </div>
                <p className="text-sm text-accent-muted mt-1">Billed {billingCycle}</p>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold">Card Details</label>
                <div className="border border-neutral-soft dark:border-white/10 rounded-xl p-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-muted">credit_card</span>
                  <input placeholder="Card number" className="bg-transparent border-none focus:ring-0 text-sm flex-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM/YY" className="border border-neutral-soft dark:border-white/10 rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary outline-none" />
                  <input placeholder="CVC" className="border border-neutral-soft dark:border-white/10 rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-primary text-background-dark py-4 rounded-xl font-bold hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
              >
                Complete Purchase
              </button>
              <p className="text-[10px] text-center text-accent-muted uppercase tracking-wider">Payments are handled securely via Stripe</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {isSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[120] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-500">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-bold">Subscription activated successfully!</span>
        </div>
      )}
    </div>
  );
};

const PricingCard: React.FC<{ 
  title: string; 
  subtitle: string; 
  price: number; 
  features: string[]; 
  cta: string; 
  highlighted?: boolean;
  onSelect: () => void;
}> = ({ title, subtitle, price, features, cta, highlighted, onSelect }) => (
  <div className={`relative flex flex-col gap-6 rounded-2xl border bg-white dark:bg-[#1a2e2d] p-8 shadow-sm transition-all hover:-translate-y-1 ${highlighted ? 'border-2 border-primary shadow-xl' : 'border-[#dce5e4]'}`}>
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-[#111817] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
        Most Popular
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-[#111817] dark:text-white text-xl font-bold">{title}</h3>
      <p className="text-[#638885] text-sm">{subtitle}</p>
      <div className="flex items-baseline gap-1 pt-4">
        <span className="text-4xl font-black text-[#111817] dark:text-white">${price}</span>
        <span className="text-[#638885] font-medium">/mo</span>
      </div>
    </div>
    <button 
      onClick={onSelect}
      className={`w-full h-11 rounded-lg font-bold transition-all ${highlighted ? 'bg-primary text-[#112120] shadow-md hover:shadow-lg' : 'bg-[#f0f4f4] dark:bg-gray-700 text-[#111817] dark:text-white hover:bg-[#e2eaea]'}`}
    >
      {cta}
    </button>
    <hr className="border-[#f0f4f4] dark:border-gray-700"/>
    <ul className="space-y-4">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#111817] dark:text-gray-300">
          <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
          <span className={highlighted && i < 2 ? 'font-bold' : ''}>{f}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Pricing;
