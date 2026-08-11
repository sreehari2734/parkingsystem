import React, { useEffect, useMemo, useState } from 'react'
import AppHeader from './components/AppHeader'
import { initialSlots } from './data/parkingData'
import ActiveSessionPage from './pages/ActiveSessionPage'
import CityPage from './pages/CityPage'
import DurationPage from './pages/DurationPage'
import ExitPassPage from './pages/ExitPassPage'
import PaymentPage from './pages/PaymentPage'
import PlacePage from './pages/PlacePage'
import ReservationPage from './pages/ReservationPage'
import SlotMapPage from './pages/SlotMapPage'
import WelcomePage from './pages/WelcomePage'

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [city, setCity] = useState(null)
  const [place, setPlace] = useState(null)
  const [slots, setSlots] = useState(initialSlots)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [duration, setDuration] = useState(60)
  const [durationMode, setDurationMode] = useState('start')
  const [parkingLimit, setParkingLimit] = useState(0)
  const [reservationSeconds, setReservationSeconds] = useState(300)
  const [elapsed, setElapsed] = useState(0)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [safetyRaised, setSafetyRaised] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const recommendedSlot = useMemo(() => slots.filter((slot) => slot.status === 'available').sort((a, b) => a.walk - b.walk)[0], [slots])

  useEffect(() => {
    if (screen !== 'reservation') return undefined
    const timer = window.setInterval(() => setReservationSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [screen])

  useEffect(() => {
    if (screen === 'active' && parkingLimit > 0 && elapsed >= parkingLimit && !safetyRaised) {
      setSafetyRaised(true)
      setShowCheckIn(true)
    }
  }, [elapsed, parkingLimit, safetyRaised, screen])

  useEffect(() => {
    if (screen !== 'active') return undefined
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [screen])

  function chooseSlot(slot) {
    if (slot.status !== 'available') return
    setSelectedSlot(slot)
    setSlots((items) => items.map((item) => item.id === slot.id ? { ...item, status: 'reserved' } : item))
    setReservationSeconds(300)
    setScreen('reservation')
  }

  function confirmArrival() {
    setSlots((items) => items.map((item) => item.id === selectedSlot.id ? { ...item, status: 'occupied' } : item))
    setScreen('duration')
  }

  function startParking() {
    if (durationMode === 'extend') {
      setParkingLimit((limit) => limit + (duration * 60))
    } else {
      setElapsed(0)
      setParkingLimit(duration * 60)
      setSafetyRaised(false)
    }
    setDurationMode('start')
    setScreen('active')
  }

  function openExtension() {
    setDurationMode('extend')
    setDuration(60)
    setScreen('duration')
  }
  function leaveSlot() { setSlots((items) => items.map((item) => item.id === selectedSlot.id ? { ...item, status: 'available' } : item)); setScreen('payment') }
  function finishDemo() { setSelectedSlot(null); setShowCheckIn(false); setProfileOpen(false); setScreen('map') }
  function requestSlot(slot) { window.alert(`Request registered for Slot ${slot.id}. We will notify you when it becomes free.`) }

  const fee = Math.max(20, Math.ceil(Math.max(elapsed, 60) / 60) * 20)
  const pageProps = { slot: selectedSlot }
  const remainingSeconds = Math.max(0, parkingLimit - elapsed)
  const expectedExit = selectedSlot && parkingLimit > 0 ? new Date(Date.now() + remainingSeconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null

  return <main className="app-shell">
    <AppHeader live={screen !== 'welcome'} onHome={() => setScreen('welcome')} activeSlot={selectedSlot} expectedExit={expectedExit} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
    {screen === 'welcome' && <WelcomePage onContinue={() => setScreen('city')} />}
    {screen === 'city' && <CityPage selectedCity={city} onSelect={(selectedCity) => { setCity(selectedCity); setScreen('place') }} />}
    {screen === 'place' && <PlacePage city={city} onBack={() => setScreen('city')} onSelect={(selectedPlace) => { setPlace(selectedPlace); setScreen('map') }} />}
    {screen === 'map' && <SlotMapPage city={city} place={place} slots={slots} recommendedSlot={recommendedSlot} onChoose={chooseSlot} onRequest={requestSlot} />}
    {screen === 'reservation' && <ReservationPage {...pageProps} remaining={reservationSeconds} onArrival={confirmArrival} onBack={() => setScreen('map')} />}
    {screen === 'duration' && <DurationPage {...pageProps} mode={durationMode} duration={duration} setDuration={setDuration} onStart={startParking} />}
    {screen === 'active' && <ActiveSessionPage {...pageProps} limitSeconds={parkingLimit} elapsed={elapsed} showCheckIn={showCheckIn} setShowCheckIn={setShowCheckIn} onExtend={openExtension} onLeave={leaveSlot} />}
    {screen === 'payment' && <PaymentPage {...pageProps} amount={fee} onPay={() => setScreen('exit')} />}
    {screen === 'exit' && <ExitPassPage {...pageProps} onFinish={finishDemo} />}
  </main>
}
