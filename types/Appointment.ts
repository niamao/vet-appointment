import { Owner, Pet } from './'

export interface Appointment {
  id: number;
  owner: Owner;
  service: string;
  veterinary_id: number;
  pet: Pet;
  start: string;
  end: string;
  status: string;
}