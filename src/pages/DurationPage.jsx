import React from 'react'
import { ArrowRight, Check, Clock3, UserRoundCheck } from 'lucide-react'
import { durationOptions } from '../data/parkingData'

export default function DurationPage({ slot, mode, duration, setDuration, onStart }) {
  const isExtension = mode === 'extend'
  const selectedHours = duration / 60

  return <section className="center-page page-enter">
    <div className="progress"><span className="complete"/><span className="complete"/><span className="active"/><span/></div>
    <span className="eyebrow"><Clock3 size={16}/> {isExtension ? 'Update parking time' : 'Sensor confirmed'}</span>
    <h1>{isExtension ? <>Extend your <em>parking</em></> : <>You’re parked in <em>{slot.id}</em></>}</h1>
    <p className="lead">{isExtension ? 'Choose how much additional parking time you need.' : 'Choose your expected duration. We only send a safety check-in if this time ends while your vehicle remains in the slot.'}</p>
    <div className="duration-picker"><div className="picker-summary"><span>SELECTED DURATION</span><strong>{selectedHours} hour{selectedHours === 1 ? '' : 's'}</strong></div><div className="duration-scroller" aria-label="Scroll to select a parking duration">{durationOptions.map((option) => <button key={option.value} className={duration === option.value ? 'selected' : ''} onClick={() => setDuration(option.value)}><Clock3 size={17}/><strong>{option.label}</strong>{duration === option.value && <i><Check size={14}/></i>}</button>)}</div><span className="picker-hint">Scroll horizontally to choose from 1 to 12 hours.</span></div>
    {!isExtension && <div className="safety-explainer"><UserRoundCheck size={21}/><p><strong>Safety check-in</strong> If your chosen duration ends while your vehicle is still in the slot, the app displays an “Are you okay?” notification.</p></div>}
    <button className="primary-btn wide" onClick={onStart}>{isExtension ? 'Update parking time' : 'Start parking session'} <ArrowRight size={20}/></button>
  </section>
}
