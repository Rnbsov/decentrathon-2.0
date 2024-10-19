import { Compass, Library, User, Activity, Ambulance, HeartPulse, ShoppingBag, Heart, FileText, Beaker, ClipboardPlus, CreditCard, MapPin, Clock, Share2 } from 'lucide-react'

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

export const profileLinks = [
  {
    icon: ShoppingBag,
    route: '/my-orders',
    label: 'My Orders'
  },
  {
    icon: Heart,
    route: '/wishlist',
    label: 'My Wishlist'
  },
  {
    icon: FileText,
    route: '/my-prescription',
    label: 'My Prescription'
  },
  {
    icon: Beaker,
    route: '/lab-test',
    label: 'Your Lab Test'
  },
  {
    icon: ClipboardPlus,
    route: '/doctor-consultations',
    label: 'Doctor Consultations'
  },
  {
    icon: CreditCard,
    route: '/payment-methods',
    label: 'Payment Methods'
  },
  {
    icon: MapPin,
    route: '/addresses',
    label: 'Your Addresses'
  },
  {
    icon: Clock,
    route: '/pill-reminder',
    label: 'Pill Reminder'
  },
  {
    icon: Share2,
    route: '/invite-friends',
    label: 'Invites Friends'
  }
]
