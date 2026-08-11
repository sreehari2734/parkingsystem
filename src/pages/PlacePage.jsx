import React from 'react'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'

export default function PlacePage({ city, onBack, onSelect }) {
  return <section className="choice-page page-enter"><button className="back-link" onClick={onBack}><ArrowLeft size={17}/> Change city</button><span className="eyebrow"><MapPin size={16}/> {city.name}, {city.subtitle}</span><h1>Choose a <em>place</em></h1><p className="lead">Select where you are going. We will show the nearest available parking area.</p>
    <div className="location-list">{city.places.map((place, index) => <button key={place} onClick={() => onSelect(place)}><span className="location-icon place-number">{String(index + 1).padStart(2, '0')}</span><span><strong>{place}</strong><small>{city.name} · Live parking availability</small></span><ArrowRight size={19}/></button>)}</div>
  </section>
}
