import React from 'react'
import { ArrowRight, Building2, Car, MapPin, Navigation, ShieldCheck, Sparkles } from 'lucide-react'

export default function SlotMapPage({ city, place, slots, recommendedSlot, onChoose, onRequest }) {
  const waitingSlots = slots.filter((slot) => slot.release)
  const availableCount = slots.filter((slot) => slot.status === 'available').length
  return <section className="dashboard page-enter"><div className="section-heading"><div><span className="eyebrow"><MapPin size={16}/> {city?.name || 'Selected city'}</span><h1>Parking at {place}</h1><p>Live availability for your selected destination. Choose an available bay to reserve it.</p></div><div className="availability-stat"><strong>{availableCount}</strong><span>slots free</span></div></div>
    {recommendedSlot && <div className="recommendation"><div className="recommendation-icon"><Sparkles size={22}/></div><div><span>BEST MATCH FOR {place?.toUpperCase()}</span><strong>Slot {recommendedSlot.id} is your quickest choice</strong><p>{recommendedSlot.walk}-minute walk · Available now · Zone {recommendedSlot.zone}</p></div><button onClick={() => onChoose(recommendedSlot)}>Reserve {recommendedSlot.id} <Navigation size={18}/></button></div>}
    <div className="parking-layout"><div className="map-card"><div className="map-card-header"><div><h2>Live parking map</h2><span><i className="available-dot"/> Available <i className="occupied-dot"/> Occupied <i className="waiting-dot"/> Waiting <i className="reserved-dot"/> Reserved</span></div><div className="map-gate"><Navigation size={16}/> Entrance</div></div>
      <div className="parking-floor" aria-label="Parking floor layout"><div className="floor-direction top"><span><ArrowRight size={14}/> One-way parking lane</span></div><div className="parking-row top-row">{slots.slice(0, 6).map((slot) => <ParkingBay key={slot.id} slot={slot} recommendedSlot={recommendedSlot} onChoose={onChoose} direction="down"/>)}</div><div className="drive-lane"><span className="entry-label"><Navigation size={14}/> Entrance</span><div className="lane-line"/><span className="drive-arrow"><ArrowRight size={22}/></span><div className="lane-line"/><span className="exit-label">Exit</span></div><div className="parking-row bottom-row">{slots.slice(6).map((slot) => <ParkingBay key={slot.id} slot={slot} recommendedSlot={recommendedSlot} onChoose={onChoose} direction="up"/>)}</div><div className="floor-direction bottom"><span><ArrowRight size={14}/> One-way parking lane</span></div></div>
      <div className="map-destination"><Building2 size={20}/><span>{place}</span><small>{city?.name} · {recommendedSlot?.walk || 2} min walk from best slot</small></div>
    </div><aside className="side-panel"><h2>Waiting slots</h2><p>These drivers expect to leave soon. Request a waiting slot and receive a private offer when it becomes free.</p>{waitingSlots.map((slot) => <div className="release-card" key={slot.id}><div><span>Slot {slot.id}</span><strong>Likely free in {slot.release}</strong></div><button onClick={() => onRequest(slot)}>Request</button></div>)}<div className="privacy-note"><ShieldCheck size={18}/><span>Waiting times are estimates, not guarantees.</span></div></aside></div>
  </section>
}

function ParkingBay({ slot, recommendedSlot, onChoose, direction }) {
  const isRecommended = recommendedSlot?.id === slot.id
  const displayState = slot.status === 'reserved' ? 'reserved' : slot.release ? 'waiting' : slot.status
  const label = displayState === 'available' ? 'Available' : displayState === 'waiting' ? `Waiting, expected in ${slot.release}` : displayState === 'reserved' ? 'Reserved' : 'Occupied'
  return <button onClick={() => onChoose(slot)} disabled={slot.status !== 'available'} className={`parking-bay ${displayState} ${isRecommended ? 'recommended' : ''} ${direction}`} aria-label={`Slot ${slot.id}: ${label}`}>{isRecommended && <b>Recommended</b>}<span className="bay-number">{slot.id}</span><span className="bay-car"><Car size={30}/></span><span className="bay-status">{displayState === 'available' ? 'Available' : displayState === 'waiting' ? `~ ${slot.release}` : displayState === 'reserved' ? 'Reserved' : 'Occupied'}</span></button>
}
