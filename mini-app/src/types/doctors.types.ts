export interface Doctor {
  uid: string // UUID as string
  doctor_id: string
  name: string
  surname: string
  avatar_url?: string // optional field
  speciality: string
  experience: number
  rating: number
  price: number
  description: string
  email: string
}

export type TypeCreateDoctorDTO = Partial<Omit<Doctor, 'uid' | 'doctor_id' | 'updatedAt'>>
