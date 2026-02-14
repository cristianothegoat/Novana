
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInProps {
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        onSignIn();
        setIsLoading(false);
        navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full max-w-[1200px] min-h-[700px] bg-white dark:bg-background-dark/50 rounded-2xl overflow-hidden shadow-2xl border border-neutral-soft dark:border-white/5">
        {/* Left Visual Side */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary/10">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <img alt="Scenic beach" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrezz8CIJUR4K4K_jQLMoiCzB8WwAZ8WhUUe6YrfW6N17zmdyzenhJ7F5r2Cek8Y7buimsu0J3DefmxypE3oMqnrNquK85x0mWCVfLGbbH8NH4H8SN1CN775hQTZ1RkMeIP2xIUSx3XzrU4vvg8r3y9wPZcqRgU8uEna5d4TPXOGclrqIOfMv9yOGK5G6gS0lANgUW3MEptwD32AfWN5ctUR2_EQWbD0T53k63LwLHmr_chUqsf-TU2ZHausqqJHnKsXSNlXwBZhLe" />
          <div className="relative z-20 flex flex-col justify-end p-12 h-full text-white">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-4xl">explore</span>
              <h1 className="text-3xl font-bold tracking-tight text-white">TripRoute</h1>
            </div>
            <h2 className="text-5xl font-extrabold leading-tight mb-4 text-white">Discover the world's best kept secrets.</h2>
            <p className="text-lg text-white/80 max-w-md">Join over 2 million travelers planning their dream itineraries with our AI-powered route optimization.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-20 bg-white dark:bg-background-dark">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-[#112120] dark:text-white tracking-tight">
                {isSignUp ? 'Create your account' : 'Welcome Back'}
              </h2>
              <p className="text-[#638885] mt-2">
                {isSignUp ? 'Join the community of explorers today.' : 'Enter your details to continue your adventure.'}
              </p>
            </div>

            <div className="flex p-1 bg-background-light dark:bg-white/5 rounded-lg mb-8">
              <button 
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${!isSignUp ? 'bg-white dark:bg-primary shadow-sm text-[#112120]' : 'text-[#638885] dark:text-gray-400 hover:text-[#112120]'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${isSignUp ? 'bg-white dark:bg-primary shadow-sm text-[#112120]' : 'text-[#638885] dark:text-gray-400 hover:text-[#112120]'}`}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                    <label className="block text-sm font-semibold text-[#112120] dark:text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#638885] text-xl">person</span>
                    <input className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-[#dce5e4] dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white" placeholder="John Doe" type="text" required />
                    </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-[#112120] dark:text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#638885] text-xl">mail</span>
                  <input className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-[#dce5e4] dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white" placeholder="alex@example.com" type="email" required />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-[#112120] dark:text-gray-300">Password</label>
                  {!isSignUp && <a className="text-xs font-bold text-primary hover:underline" href="#">Forgot?</a>}
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#638885] text-xl">lock</span>
                  <input className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-[#dce5e4] dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none dark:text-white" placeholder="••••••••" type="password" required />
                </div>
              </div>
              
              {isSignUp && (
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="rounded text-primary focus:ring-primary" required />
                    <label htmlFor="terms" className="text-xs text-accent-muted">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></label>
                </div>
              )}

              <button 
                disabled={isLoading}
                className="w-full py-4 bg-primary text-[#112120] font-bold rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
                type="submit"
              >
                {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                <span className="material-symbols-outlined">{isSignUp ? 'person_add' : 'arrow_forward'}</span>
              </button>
            </form>
            
            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#dce5e4] dark:border-white/10"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-background-dark px-2 text-accent-muted font-bold tracking-widest">Or continue with</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className="flex items-center justify-center gap-2 py-3 border border-[#dce5e4] dark:border-white/10 rounded-lg hover:bg-background-light dark:hover:bg-white/5 transition-all font-bold text-sm">
                        <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="w-4 h-4" alt="Google" />
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 border border-[#dce5e4] dark:border-white/10 rounded-lg hover:bg-background-light dark:hover:bg-white/5 transition-all font-bold text-sm">
                        <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-4 h-4" alt="Apple" />
                        LinkedIn
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
