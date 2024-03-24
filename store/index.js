import { create } from 'zustand';
import { VETERINARIES, APPOINTMENTS } from '../constants';

export const useStore = create((set) => {
    const veterinaries = {
        veterinaries: VETERINARIES,
        setVeterinaries: (veterinaries) => set({ veterinaries }),
    };

    const appointments = {
        appointments: APPOINTMENTS,
        setAppointments: (appointments) => set({ appointments }),
    };

    const appoinmentCardState = {
      eventId: '',
      setAppointmentCard: (eventId) => set({ eventId }),
    }

    const modal = {
      open: false,
      setModal: (open) => set({ open })
    }

    const resched = {
      reschedId: null,
      setResched: (reschedId) => set({ reschedId })
    }

    return {
        ...veterinaries,
        ...appointments,
        ...appoinmentCardState,
        ...modal,
        ...resched
    }
});