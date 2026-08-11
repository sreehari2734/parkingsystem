import React from 'react'
import { Car, CreditCard, ShieldCheck } from 'lucide-react'

export default function PaymentPage({ amount, slot, onPay }) {
  return <section className="center-page page-enter"><span className="eyebrow"><CreditCard size={16}/> Parking complete</span><h1>Ready to <em>exit?</em></h1><p className="lead">Your car has left Slot {slot.id}. Complete payment to receive your secure exit pass.</p>
    <div className="bill-card"><div className="bill-top"><div className="bill-icon"><Car size={25}/></div><div><span>PARKING SESSION</span><strong>Slot {slot.id} · Campus parking</strong></div></div><div className="bill-row"><span>Parking charge</span><strong>₹{amount}</strong></div><div className="bill-row"><span>Platform fee</span><strong>₹0</strong></div><div className="bill-total"><span>Total payable</span><strong>₹{amount}</strong></div></div><button className="primary-btn wide" onClick={onPay}><CreditCard size={20}/> Pay ₹{amount} securely</button><div className="payment-note"><ShieldCheck size={16}/> Secure payment powered by Razorpay</div>
  </section>
}
