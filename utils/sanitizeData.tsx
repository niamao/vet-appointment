import { FormData, Appointment } from '../types'

export const sanitizeData = (data: FormData, appointments: Appointment[], reschedId: number) => {
  const currentDate = new Date();
  const ageValue = parseInt(data.ageValue);
  let birthday: Date;

  if (data.ageUnit === 'years') {
      birthday = new Date(currentDate.getFullYear() - ageValue, currentDate.getMonth(), currentDate.getDate());
  } else if (data.ageUnit === 'months') {
      birthday = new Date(currentDate.getFullYear(), currentDate.getMonth() - ageValue, currentDate.getDate());
  } else if (data.ageUnit === 'weeks') {
      birthday = new Date(currentDate.getTime() - (ageValue * 7 * 24 * 60 * 60 * 1000));
  } else if (data.ageUnit === 'days') {
      birthday = new Date(currentDate.getTime() - (ageValue * 24 * 60 * 60 * 1000));
  } else {
      birthday = currentDate;
  }

  const petImageData = localStorage.getItem('petImage') || '';
  const petImg = petImageData || '/assets/img/default_pet_image.png';

  const age = `${data.ageValue} ${data.ageUnit}`;

  const [appointmentDate, appointmentTime] = data.appointmentDateTime.split('T');
  const [startHour, startMinute] = appointmentTime.split(':').map(Number);
  const durationInMinutes = parseInt(data.duration);

  const startDateTime = new Date(appointmentDate)
  startDateTime.setHours(startHour, startMinute);
  const start = startDateTime.toISOString()

  const endDateTime = new Date(startDateTime.getTime() + durationInMinutes * 60000); // Calculate end time by adding duration
  const end = endDateTime.toISOString()

  const newAppointment = {
      id: reschedId !== null ? data.id : appointments.length + 1,
      owner: {
          name: data.ownerName,
          email: `${data.ownerName.replace(/\s+/g, '').toLowerCase()}@email.test`,

          // defaults
          contact_number: '+01 234 567 8910', 
          address: '1st Avenue, Golden Street, Springville Village, San Diego, California', 
          image: '/assets/img/profile_pic.png'
      },
      service: data.service,
      veterinary_id: parseInt(data.veterinaryId),
      pet: {
          name: data.petName,
          breed: data.breed,
          age: age,
          gender: data.gender,
          birthday: birthday.toDateString(),
          image: petImg,
          type: data.type
      },
      start,
      end,
      status: 'active'
  };

  return newAppointment;
};