
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-mesh-subtle min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl font-black tracking-tight text-[#112120] md:text-5xl">We're here for your journey.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#112120]/60">
          Whether you have a question about a route, need technical support, or just want to share your travel story, we'd love to hear from you.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#30e8d9]/10">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold text-[#112120]">Message Sent!</h3>
                <p className="text-accent-muted max-w-sm">Thanks for reaching out. We've received your inquiry and will get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#112120]/80">Full Name</label>
                      <input required className="w-full rounded-lg border-[#dce5e4] bg-background-light/50 px-4 py-3 text-base focus:border-primary focus:ring-primary/20 transition-all outline-none" placeholder="John Doe" type="text"/>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-[#112120]/80">Email Address</label>
                      <input required className="w-full rounded-lg border-[#dce5e4] bg-background-light/50 px-4 py-3 text-base focus:border-primary focus:ring-primary/20 transition-all outline-none" placeholder="john@example.com" type="email"/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#112120]/80">Subject</label>
                    <select className="w-full rounded-lg border-[#dce5e4] bg-background-light/50 px-4 py-3 text-base focus:border-primary focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer">
                      <option>Route Inquiries</option>
                      <option>Technical Support</option>
                      <option>Partnership Opportunities</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#112120]/80">Tell us more about your trip</label>
                    <textarea required className="w-full rounded-lg border-[#dce5e4] bg-background-light/50 px-4 py-3 text-base focus:border-primary focus:ring-primary/20 transition-all outline-none resize-none" placeholder="Your message here..." rows={5}></textarea>
                  </div>
                  <button className="w-full rounded-lg bg-primary py-4 text-base font-bold text-[#112120] shadow-md hover:brightness-105 transition-all active:scale-[0.99]" type="submit">
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Side Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="group rounded-2xl bg-white p-8 shadow-sm border border-[#30e8d9]/10 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">help_center</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#112120]">Help Center</h4>
                  <p className="mt-2 text-[#112120]/60 text-sm">Browse our detailed FAQs and step-by-step guides for planning your perfect route.</p>
                  <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:underline" href="#" onClick={(e) => {e.preventDefault(); alert("Redirecting to help center...");}}>
                    Visit Help Center
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl bg-white p-8 shadow-sm border border-[#30e8d9]/10 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#112120]">Email Support</h4>
                  <p className="mt-2 text-[#112120]/60 text-sm">Prefer writing? Drop us an email and our team will get back to you within 24 hours.</p>
                  <p className="mt-4 font-bold text-[#112120] cursor-pointer hover:text-primary transition-colors" onClick={() => window.location.href="mailto:support@triproute.com"}>support@triproute.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#112120] p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="font-bold">Live Chat Available</span>
                </div>
                <button onClick={() => alert("Initiating live chat...")} className="rounded-lg bg-white/10 px-4 py-2 text-xs font-bold hover:bg-white/20 transition-colors">
                  Start Chat
                </button>
              </div>
              <p className="mt-4 text-sm text-white/60">Typical response time: <span className="text-primary font-medium">Under 5 minutes</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
