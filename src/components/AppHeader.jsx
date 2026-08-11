import React from 'react'
import { ShieldCheck } from 'lucide-react'
import ProfileMenu from './ProfileMenu'

export default function AppHeader({ live, onHome, activeSlot, expectedExit, profileOpen, setProfileOpen }) {
  return <header className="topbar">
    <button className="brand" onClick={onHome} aria-label="Go to ParkGuardian home">
      <span className="brand-icon"><ShieldCheck size={24} /></span><span>Park<span>Guardian</span></span>
    </button>
    {live && <div className="live-pill"><span className="pulse" /> Live parking</div>}
    <div className="profile-area"><button className="profile" aria-label="Open profile" onClick={() => setProfileOpen((open) => !open)}>SH</button>{profileOpen && <ProfileMenu activeSlot={activeSlot} expectedExit={expectedExit} onClose={() => setProfileOpen(false)} />}</div>
  </header>
}
