import React, { useState } from 'react'
import { Check, UserRoundCheck, X } from 'lucide-react'

export default function CheckInModal({ onClose }) {
  const [response, setResponse] = useState('')
  return <div className="modal-backdrop"><div className="checkin-modal"><button className="close-modal" onClick={onClose} aria-label="Close safety check"><X size={20}/></button><div className="checkin-icon"><UserRoundCheck size={28}/></div><span className="eyebrow">Safety check-in</span><h2>Are you okay?</h2><p>Your expected parking duration has ended while your vehicle is still detected.</p>{response ? <div className="response-confirm"><Check size={22}/><strong>Thanks for letting us know.</strong><span>Your parking session has been updated.</span></div> : <div className="checkin-options"><button onClick={() => setResponse('okay')}>I’m okay</button><button onClick={() => setResponse('returning')}>I’m returning shortly</button></div>}</div></div>
}
