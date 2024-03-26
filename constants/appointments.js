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
    start: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(), // 8:00 AM
    end: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(), // 9:30 AM
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
    service: "Brownie's Vaccination",
    veterinary_id: 2,
    pet: {
      name: 'Brownie',
      breed: 'French Bulldog',
      age: '10 months',
      gender: 'Male',
      image: '/assets/img/brownie_pic.png',
      birthday: 'January 12, 2023',
      type: 'Dog'
    },
    start: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(), // 10:30 AM
    end: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(), // 11:30 AM
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
      name: 'Max',
      breed: 'Labrador Retriever',
      age: '3 years',
      gender: 'Male',
      image: '/assets/img/max_pic.png',
      birthday: 'April 20, 2021',
      type: 'Dog'
    },
    start: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(), // 1:00 PM
    end: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(), // 2:30 PM
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
    start: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(), // 3:30 PM
    end: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(), // 4:30 PM
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
    start: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(), // 5:00 PM
    end: new Date(new Date().setHours(17, 30, 0, 0)).toISOString(), // 5:30 PM
    status: 'active'
  }
];
