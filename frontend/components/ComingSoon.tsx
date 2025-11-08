'use client';

import { useState, useEffect } from 'react';
import { Rocket, Mail, Bell, Sparkles, Zap } from 'lucide-react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,128,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,128,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Neon glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-pink rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyber-blue rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-purple rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,128,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Brand with neon effect */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-black/50 backdrop-blur-sm rounded-full mb-6 border-2 border-cyber-pink shadow-[0_0_30px_rgba(255,0,128,0.5)]">
              <Zap className="w-12 h-12 text-cyber-pink animate-pulse" />
            </div>
          </div>

          {/* Main Content with glitch effect */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-up">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue drop-shadow-[0_0_30px_rgba(255,0,128,0.5)]">
              COMING
            </span>
            <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              SOON
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-cyber-pink to-transparent"></div>
            <Sparkles className="w-6 h-6 text-cyber-pink" />
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-blue uppercase tracking-wider">
              Hutton Technologies
            </p>
            <Sparkles className="w-6 h-6 text-cyber-blue" />
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-cyber-pink font-semibold">Preparing to launch</span> the next generation of 
            <span className="text-cyber-blue font-semibold"> cutting-edge technology solutions</span>. 
            The future is being built.
          </p>

          {/* Email Signup with cyberpunk styling */}
          <div className="max-w-md mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border-2 border-cyber-pink/30 shadow-[0_0_50px_rgba(255,0,128,0.3)] hover:shadow-[0_0_70px_rgba(255,0,128,0.5)] transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-cyber-pink" />
                <h3 className="text-white font-bold text-lg uppercase tracking-wide">Join the Waitlist</h3>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                Get exclusive early access and be notified when we go live
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-blue group-hover:text-cyber-pink transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-cyber-blue/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyber-pink focus:shadow-[0_0_20px_rgba(255,0,128,0.4)] transition-all duration-300"
                  />
                </div>

                {isSubmitted ? (
                  <div className="bg-cyber-pink/10 border-2 border-cyber-pink text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,128,0.4)]">
                    <Sparkles className="w-5 h-5 text-cyber-pink" />
                    <span className="font-semibold">Welcome to the future!</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyber-pink to-cyber-purple text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:from-cyber-purple hover:to-cyber-blue transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(255,0,128,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]"
                  >
                    Get Early Access
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Features Preview with neon cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border-2 border-cyber-pink/20 hover:border-cyber-pink hover:shadow-[0_0_30px_rgba(255,0,128,0.3)] transition-all duration-300 group">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide group-hover:text-cyber-pink transition-colors">Lightning Fast</h4>
              <p className="text-gray-400 text-sm">Next-gen performance technology</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border-2 border-cyber-blue/20 hover:border-cyber-blue hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group">
              <div className="text-4xl mb-3">🌐</div>
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide group-hover:text-cyber-blue transition-colors">Hyper Connected</h4>
              <p className="text-gray-400 text-sm">Seamless digital integration</p>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border-2 border-cyber-purple/20 hover:border-cyber-purple hover:shadow-[0_0_30px_rgba(189,0,255,0.3)] transition-all duration-300 group">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide group-hover:text-cyber-purple transition-colors">Ultra Secure</h4>
              <p className="text-gray-400 text-sm">Military-grade encryption</p>
            </div>
          </div>

          {/* Social Links with neon effect */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-gray-400 mb-4 uppercase tracking-widest text-sm">Connect With Us</p>
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-cyber-pink/30 hover:border-cyber-pink hover:shadow-[0_0_20px_rgba(255,0,128,0.5)] transition-all duration-300 hover:scale-110 group"
              >
                <span className="text-white group-hover:text-cyber-pink transition-colors">𝕏</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-cyber-blue/30 hover:border-cyber-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-110 group"
              >
                <span className="text-white group-hover:text-cyber-blue transition-colors">in</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-cyber-purple/30 hover:border-cyber-purple hover:shadow-[0_0_20px_rgba(189,0,255,0.5)] transition-all duration-300 hover:scale-110 group"
              >
                <span className="text-white group-hover:text-cyber-purple transition-colors">@</span>
              </a>
            </div>
          </div>

          {/* Terminal-style footer */}
          <div className="mt-12 text-gray-600 text-sm font-mono animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <span className="text-cyber-pink">$</span> <span className="text-cyber-blue">system.status</span> <span className="text-gray-500">=&gt;</span> <span className="text-green-400">INITIALIZING...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
