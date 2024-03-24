export const APPOINTMENTS = [
  {
    id: 1,
    owner: {
      name: 'Chrissie Lee',
      contact_number: '+01 234 567 8910',
      address: '1st Avenue, Golden Street, Springville Village, San Diego, California',
      image: '/assets/img/profile_pic.png',
      email: 'chrissielee@gmail.com',
    },
    service: 'Meeting',
    veterinary_id: 1,
    pet: {
      name: 'Brownie',
      breed: 'French Bulldog',
      age: '10 months',
      gender: 'Male',
      image: '/assets/img/brownie_pic.png',
      birthday: 'January 12, 2023',
      type: 'Dog'
    },
    start: new Date().toISOString(), // Current date and time
    end: new Date(new Date().getTime() + (30 * 60000)).toISOString(), // 30 minutes later
    status: 'active'
  },
  {
    id: 2,
    owner: {
      name: 'John Doe',
      contact_number: '+01 234 567 8911',
      address: '2nd Avenue, Silver Street, Springfield Village, Los Angeles, California',
      image: '/assets/img/profile_pic.png',
      email: 'johndoe@gmail.com'
    },
    service: 'Checkup',
    veterinary_id: 2,
    pet: {
      name: 'Max',
      breed: 'Golden Retriever',
      age: '2 years',
      gender: 'Male',
      image: '/assets/img/max_pic.png',
      birthday: 'March 5, 2022',
      type: 'Dog'
    },
    start: new Date(new Date().getTime() + (90 * 60000)).toISOString(),
    end: new Date(new Date().getTime() + (120 * 60000)).toISOString(),
    status: 'active'
  },
  {
    id: 3,
    owner: {
      name: 'Alice Johnson',
      contact_number: '+01 234 567 8912',
      address: '3rd Avenue, Bronze Street, Parkland Village, San Francisco, California',
      image: '/assets/img/profile_pic.png',
      email: 'alicejohnson@gmail.com'
    },
    service: 'Vaccination',
    veterinary_id: 3,
    pet: {
      name: 'Bella',
      breed: 'Labrador Retriever',
      age: '3 years',
      gender: 'Female',
      image: '/assets/img/bella_pic.png',
      birthday: 'April 20, 2021',
      type: 'Dog'
    },
    start: new Date(new Date().getTime() + (180 * 60000)).toISOString(), 
    end: new Date(new Date().getTime() + (210 * 60000)).toISOString(),
    status: 'active'
  },
  {
    id: 4,
    owner: {
      name: 'Michael Smith',
      contact_number: '+01 234 567 8913',
      address: '4th Avenue, Copper Street, Meadowland Village, Seattle, Washington',
      image: '/assets/img/profile_pic.png',
      email: 'michaelsmith@gmail.com'
    },
    service: 'Grooming',
    veterinary_id: 1,
    pet: {
      name: 'Luna',
      breed: 'Persian Cat',
      age: '1 year',
      gender: 'Female',
      image: '/assets/img/luna_pic.png',
      birthday: 'June 15, 2023',
      type: 'Cat'
    },
    start: new Date(new Date().getTime() + (240 * 60000)).toISOString(), 
    end: new Date(new Date().getTime() + (270 * 60000)).toISOString(),
    status: 'active'
  },
  {
    id: 5,
    owner: {
      name: 'Emily Brown',
      contact_number: '+01 234 567 8914',
      address: '5th Avenue, Iron Street, Hilltop Village, Chicago, Illinois',
      image: '/assets/img/profile_pic.png',
      email: 'emilybrown@gmail.com'
    },
    service: 'Consultation',
    veterinary_id: 2,
    pet: {
      name: 'Simba',
      breed: 'Maine Coon',
      age: '2 years',
      gender: 'Male',
      image: '/assets/img/simba_pic.png',
      birthday: 'July 10, 2022',
      type: 'Cat'
    },
    start: new Date(new Date().getTime() + (300 * 60000)).toISOString(), 
    end: new Date(new Date().getTime() + (330 * 60000)).toISOString(),
    status: 'active'
  }
];
