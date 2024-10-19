import { Doctor, TypeCreateDoctorDTO } from '@/types/doctors.types'

import { xiorClassic } from '@/api/instance'

class DoctorsService {
  private BASE_URL = '/doctors'

  async getDoctors() {
    return (await xiorClassic.get<Doctor[]>(this.BASE_URL)).data
  }

  async getDoctorsBySpeciality(speciality: string) {
    return (await xiorClassic.get<Doctor[]>(`${this.BASE_URL}/${speciality}`)).data
  }

  async createDoctor(data: TypeCreateDoctorDTO) {
    return xiorClassic.post(this.BASE_URL, data)
  }
}

export const doctorsService = new DoctorsService()
