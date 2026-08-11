import React from 'react'
import { Car, Gauge, Navigation, Route, TimerReset } from 'lucide-react'
import { formatCountdown } from '../utils/time'

export default function ReservationPage({ slot, remaining, onArrival, onBack }) {
  const slotIndex = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2'].indexOf(slot.id)
  const topRow = slotIndex < 6
  const column = topRow ? slotIndex : slotIndex - 6
  const targetX = 72 + (column * 97)
  const targetY = topRow ? 45 : 175
  const routePath = `M 24 110 H ${targetX} V ${targetY}`
  return <section className="center-page page-enter"><div className="progress"><span className="complete"/><span className="active"/><span/><span/></div><span className="eyebrow"><Route size={16}/> Your spot is held</span><h1>Head to <em>Slot {slot.id}</em></h1><p className="lead">We’ve reserved the closest space to your destination for a few minutes.</p>
    <div className="route-card"><div className="route-card-header"><div><strong>In-lot route</strong><span>Follow the highlighted lane to your bay</span></div><span><Navigation size={15}/> {slot.walk} min</span></div><div className="route-map" aria-label={`Route from entrance to Slot ${slot.id}`}><svg viewBox="0 0 650 220" role="img"><defs><marker id="route-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs><rect x="0" y="0" width="650" height="220" rx="13" className="lot-ground"/><g className="lot-bays">{Array.from({ length: 6 }, (_, index) => <rect key={`top-${index}`} x={42 + (index * 97)} y="19" width="61" height="52" rx="6" className={topRow && index === column ? 'selected-bay' : ''} />)}{Array.from({ length: 6 }, (_, index) => <rect key={`bottom-${index}`} x={42 + (index * 97)} y="149" width="61" height="52" rx="6" className={!topRow && index === column ? 'selected-bay' : ''} />)}</g><path d="M 32 110 H 618" className="lane-center"/><path d={routePath} className="route-path" markerEnd="url(#route-arrow)"/><circle cx="24" cy="110" r="10" className="entrance-point"/><circle cx={targetX} cy={targetY} r="10" className="destination-point"/><text x="24" y="136" textAnchor="middle" className="route-map-label">ENTRY</text><text x={targetX} y={topRow ? 91 : 141} textAnchor="middle" className="route-map-label selected-label">{slot.id}</text></svg></div><div className="route-details"><div><span>START</span><strong>Campus entrance</strong></div><div><span>ARRIVE AT</span><strong>Slot {slot.id} · Zone {slot.zone}</strong></div></div><div className="route-instruction"><Navigation size={18}/><span>Use the central driving lane, then follow the highlighted turn into Slot {slot.id}.</span></div></div>
    <div className="hold-timer"><TimerReset size={21}/><span>Your reservation expires in</span><strong>{formatCountdown(remaining)}</strong></div><button className="primary-btn wide" onClick={onArrival}><Car size={20}/> I’ve parked in Slot {slot.id}</button><button className="text-btn" onClick={onBack}>Choose a different slot</button><p className="sensor-hint"><Gauge size={16}/> Demo: this simulates the slot sensor detecting your vehicle.</p>
  </section>
}
