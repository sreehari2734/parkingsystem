import React from 'react'
import { ArrowRight, Building2, Car, Sparkles } from 'lucide-react'

export default function WelcomePage({ onContinue }) {
  return <section className="welcome page-enter"><div className="welcome-copy">
    <span className="eyebrow"><Sparkles size={16} /> Smart campus parking</span><h1>Park confidently.<br /><em>Leave safely.</em></h1>
    <p>Find the best nearby parking slot, navigate to it, and let ParkGuardian handle the rest.</p>
    <div className="signin-card"><div><strong>Welcome to Campus Parking</strong><span>Scan, sign in, and select a slot</span></div>
      <button className="google-btn" onClick={onContinue}><img className="google-mark" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" /> Continue with Google <ArrowRight size={18} /></button>
      <button className="email-btn" onClick={onContinue}>Continue with email</button>
    </div><small>By continuing, you agree to receive essential parking and safety notifications.</small>
  </div><div className="hero-card"><div className="hero-map"><span className="map-line one"/><span className="map-line two"/><span className="map-line three"/><span className="destination-dot"><Building2 size={22}/></span><span className="car-dot"><Car size={23}/></span><span className="route-dash"/></div>
    <div className="hero-card-copy"><span className="tiny-label">YOUR SMARTEST ROUTE</span><strong>Parking and peace of mind.</strong><span>Real-time slots · safety check-ins · seamless exit</span></div></div>
  </section>
}
