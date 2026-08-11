import React from 'react'
import { ArrowRight, Check, Clock3, QrCode, ShieldCheck } from 'lucide-react'

export default function ExitPassPage({ slot, onFinish }) {
  return <section className="center-page page-enter"><span className="eyebrow"><Check size={16}/> Payment successful</span><h1>Your exit pass<br />is <em>ready.</em></h1><p className="lead">Show this QR at the exit camera. It is valid for five minutes and can be used once.</p>
    <div className="qr-card"><div className="qr-label"><ShieldCheck size={17}/> ONE-TIME EXIT PASS</div><div className="qr-pattern" aria-label="Simulated exit QR code">{Array.from({ length: 121 }, (_, index) => <i className={(index * 13 + index % 7) % 5 < 2 ? 'dark' : ''} key={index}/>)}</div><strong>PKG-{slot.id}-7F2C</strong><span><Clock3 size={15}/> Valid for 04:59</span></div>
    <div className="exit-instruction"><QrCode size={24}/><div><strong>Drive to the exit gate</strong><span>The camera scans your QR, validates payment, then opens the toll gate.</span></div></div><button className="primary-btn wide" onClick={onFinish}>Journey completed <ArrowRight size={20}/></button>
  </section>
}
