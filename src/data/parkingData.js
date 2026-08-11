export const initialSlots = [
  { id: 'A1', zone: 'A', status: 'occupied', walk: 3 }, { id: 'A2', zone: 'A', status: 'available', walk: 2 },
  { id: 'A3', zone: 'A', status: 'occupied', walk: 4, release: '8 min' }, { id: 'A4', zone: 'A', status: 'occupied', walk: 5, release: '14 min' },
  { id: 'A5', zone: 'A', status: 'available', walk: 6 }, { id: 'B1', zone: 'B', status: 'occupied', walk: 7 },
  { id: 'B2', zone: 'B', status: 'available', walk: 4 }, { id: 'B3', zone: 'B', status: 'occupied', walk: 8, release: '18 min' },
  { id: 'B4', zone: 'B', status: 'occupied', walk: 9 }, { id: 'B5', zone: 'B', status: 'available', walk: 10 },
  { id: 'C1', zone: 'C', status: 'occupied', walk: 11 }, { id: 'C2', zone: 'C', status: 'available', walk: 9 },
]

export const cities = [
  { id: 'chennai', name: 'Chennai', subtitle: 'Tamil Nadu', places: ['Phoenix Marketcity', 'Tidel Park', 'Chennai Central'] },
  { id: 'coimbatore', name: 'Coimbatore', subtitle: 'Tamil Nadu', places: ['Brookefields Mall', 'TIDEL Park Coimbatore', 'Gandhipuram Central'] },
  { id: 'madurai', name: 'Madurai', subtitle: 'Tamil Nadu', places: ['Mattuthavani Bus Stand', 'Vishaal de Mal', 'Madurai Railway Junction'] },
]

export const durationOptions = Array.from({ length: 12 }, (_, index) => ({ label: `${index + 1} hour${index === 0 ? '' : 's'}`, value: (index + 1) * 60 }))
