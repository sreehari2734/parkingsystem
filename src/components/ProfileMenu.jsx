import React from 'react'
import { Clock3, Mail, MapPin, UserRound } from 'lucide-react'

export default function ProfileMenu({ activeSlot, expectedExit, onClose }) {
  return <div className="profile-menu" role="dialog" aria-label="Driver profile"><button onClick={onClose} aria-label="Close profile">×</button><div className="profile-user"><span><UserRound size={20}/></span><div><strong>Sree Hari</strong><small>sreehari@gmail.com</small></div></div><div className="profile-details"><div><MapPin size={16}/><span><small>Parked slot</small><strong>{activeSlot ? `${activeSlot.id} · Zone ${activeSlot.zone}` : 'No active session'}</strong></span></div><div><Clock3 size={16}/><span><small>Expected ending time</small><strong>{expectedExit || '—'}</strong></span></div></div></div>
}
