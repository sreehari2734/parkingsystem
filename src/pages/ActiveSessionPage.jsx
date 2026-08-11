import React from 'react'
import { Car, CircleParking, Clock3, ShieldCheck } from 'lucide-react'
import { formatDuration } from '../utils/time'
import CheckInModal from '../components/CheckInModal'

export default function ActiveSessionPage({ slot, limitSeconds, elapsed, showCheckIn, setShowCheckIn, onExtend, onLeave }) {
  const remaining = Math.max(0, limitSeconds - elapsed)
  const expectedExit = new Date(Date.now() + remaining * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const selectedHours = Math.round(limitSeconds / 3600)

  return <section className="active-page page-enter"><div className="active-header"><div><span className="eyebrow"><span className="pulse"/> Active session</span><h1>You’re safely parked</h1><p>Slot {slot.id} · Zone {slot.zone}</p></div></div>
    <div className="session-card"><div className="session-top"><div className="slot-badge"><CircleParking size={30}/><span>{slot.id}</span></div><div><span className="tiny-label">PARKING SINCE</span><strong>Just now</strong></div><div><span className="tiny-label">EXPECTED EXIT</span><strong>{expectedExit}</strong></div></div><div className="timer-ring"><div><span>TIME REMAINING</span><strong>{formatDuration(remaining)}</strong><small>Selected duration: {selectedHours} hour{selectedHours === 1 ? '' : 's'}</small></div></div><div className="session-actions"><button onClick={onExtend}><Clock3 size={18}/> Extend parking time</button><button className="leave-btn" onClick={onLeave}><Car size={18}/> I’m leaving now</button></div></div>
    <div className="status-row"><ShieldCheck size={20}/><div><strong>Safety monitoring is on</strong><span>When your selected time ends and the sensor still detects your vehicle, ParkGuardian automatically asks: “Are you okay?”</span></div></div>{showCheckIn && <CheckInModal onClose={() => setShowCheckIn(false)} />}
  </section>
}
