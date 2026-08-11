import React from 'react'
import { ArrowRight, Building2, MapPin } from 'lucide-react'
import { cities } from '../data/parkingData'

export default function CityPage({ selectedCity, onSelect }) {
  return <section className="choice-page page-enter"><span className="eyebrow"><MapPin size={16}/> Location setup</span><h1>Choose your <em>city</em></h1><p className="lead">Select the city where you want to find a secure parking space.</p>
    <div className="location-list">{cities.map((city) => <button key={city.id} className={selectedCity?.id === city.id ? 'selected' : ''} onClick={() => onSelect(city)}><span className="location-icon"><Building2 size={24}/></span><span><strong>{city.name}</strong><small>{city.subtitle}</small></span><ArrowRight size={19}/></button>)}</div>
  </section>
}
