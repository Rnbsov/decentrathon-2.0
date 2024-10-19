import { Compass, Library, User, Activity, Ambulance, HeartPulse } from 'lucide-react'

import ConsultationIcon from '../../../public/ConsultationIcon.svg'
import MedicationIcon from '../../../public/MedicationIcon.svg'

export const bottombarLinks = [
  {
    icon: Compass,
    route: '/',
    label: 'Home'
  },
  {
    icon: Library,
    route: '/records',
    label: 'Records'
  },
  {
    icon: User,
    route: '/profile',
    label: 'Profile'
  }
]

export const servicesList = [
  {
    icon: ConsultationIcon,
    title: 'Consultation',
    bgColor: 'bg-primary',
    label: '89 doctors'
  },
  { icon: MedicationIcon, title: 'Pharmacy', bgColor: 'bg-primaryPink', label: 'Pharmacies Near' },
  { icon: MedicationIcon, title: 'Pills', bgColor: 'bg-primaryOrange', label: '6 types of pills' }
]

export const HealthCheckList = [
  {
    icon: HeartPulse,
    title: 'Heart risks'
  },
  {
    icon: Activity,
    title: 'ECG'
  },
  {
    icon: Ambulance,
    title: 'Call Ambulance'
  },
  {
    icon: HeartPulse,
    title: 'Heart risks'
  },
  {
    icon: Activity,
    title: 'ECG'
  },
  {
    icon: Ambulance,
    title: 'Call Ambulance'
  }
]
