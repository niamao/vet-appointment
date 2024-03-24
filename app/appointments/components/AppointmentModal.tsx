'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useStore } from '../../../store';
import Card from '@/app/appointments/components/Card';

interface Veterinary {
  id: number;
  veterinary_name: string;
  address: string;
  building: string;
  contact_number: string;
  image: string;
  email: string;
}

interface FormData {
  id: number,
  veterinaryId: string;
  service: string;
  petName: string;
  breed: string;
  type: string;
  ageValue: string; 
  ageUnit: string; 
  gender: string;
  ownerName: string;
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
}

const AppointmentModal = () => {
  const { open, setModal, veterinaries, appointments, setAppointments, setAppointmentCard, reschedId, setResched } = useStore();
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    veterinaryId: '',
    service: '',
    petName: '',
    breed: '',
    type: '',
    ageValue: '', 
    ageUnit: 'years', 
    gender: '',
    ownerName: '',
    appointmentDate: '',
    appointmentStartTime: '',
    appointmentEndTime: ''
  });
  const [disableSave, setDisableSave] = useState(false)

  useEffect(() => {
    if (reschedId !== null) {
      const reschedAppointment = appointments.find(appointment => appointment.id === reschedId);
      if (reschedAppointment) {
        setFormData({
          ...reschedAppointment,
          id: reschedAppointment.id.toString(),
          petName: reschedAppointment.pet.name,
          breed: reschedAppointment.pet.breed,
          type: reschedAppointment.pet.type,
          gender: reschedAppointment.pet.gender,
          ageValue: reschedAppointment.pet.age.split(' ')[0],
          ageUnit: reschedAppointment.pet.age.split(' ')[1],
          ownerName: reschedAppointment.owner.name,
          veterinaryId: reschedAppointment.veterinary_id.toString(),
          appointmentDate: reschedAppointment.start.split('T')[0],
          appointmentStartTime: reschedAppointment.start.split('T')[1].slice(0, 5),
          appointmentEndTime: reschedAppointment.end.split('T')[1].slice(0, 5) 
        });
      }
    }
  }, [reschedId, appointments]);

  const sanitizeData = (data: FormData) => {
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
  
    const appointmentDate = new Date(data.appointmentDate);
    const [startHour, startMinute] = data.appointmentStartTime.split(':').map(Number);
    const [endHour, endMinute] = data.appointmentEndTime.split(':').map(Number);
  
    appointmentDate.setUTCHours(startHour, startMinute);
    const start = appointmentDate.toISOString();
  
    appointmentDate.setUTCHours(endHour, endMinute);
    const end = appointmentDate.toISOString();
  
    // Log UTC conversion of appointment datetime
    console.log('UTC Conversion Appointment Start:', start);
    console.log('UTC Conversion Appointment End:', end);
  
    const newAppointment = {
      id: reschedId !== null ? data.id : appointments.length + 1,
      owner: {
        name: data.ownerName,

        // defaults
        contact_number: '+01 234 567 8910', 
        address: '1st Avenue, Golden Street, Springville Village, San Diego, California', 
        image: '/assets/img/profile_pic.png', 
        email: 'chrissielee@gmail.com'
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
      start: start,
      end: end,
      status: 'active'
    };
  
    return newAppointment;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const imageData = reader.result as string;
        localStorage.setItem('petImage', imageData);
      };
    }
  };

  const handleClose = () => {
    setModal(false);
    setFormData({
      id: 0,
      veterinaryId: '',
      service: '',
      petName: '',
      breed: '',
      type: '',
      ageValue: '',
      ageUnit: 'years',
      gender: '',
      ownerName: '',
      appointmentDate: '',
      appointmentStartTime: '',
      appointmentEndTime: ''
    });
    setResched(null)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'appointmentEndTime' && formData.appointmentStartTime.length && value < formData.appointmentStartTime) {
      alert('End time cannot be earlier than start time');
      setDisableSave(true);

      return 
    } 

    if (name === 'appointmentStartTime' && formData.appointmentEndTime.length && value > formData.appointmentEndTime) {
      alert('Start time cannot be later than end time');
      setDisableSave(true);
      return  
    }

    setDisableSave(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAppointment = sanitizeData(formData);
    if (reschedId !== null) {
      // If it's an update, replace the existing appointment with the updated one
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === parseInt(formData.id, 10) ? newAppointment : appointment
      );
      setAppointments(updatedAppointments);
    } else {
      // If it's a new appointment, add it to the list
      setAppointments([...appointments, newAppointment]);
    }
    setAppointmentCard(newAppointment.id);
    handleClose();
  };

  const selectedVeterinary = veterinaries.find(vet => vet.id === parseInt(formData.veterinaryId, 10));

  return (
    <Modal show={open} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{reschedId !== null ? 'Update Appointment' : 'Add New Appointment'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='position-relative'>
        <Form onSubmit={handleSubmit}>
          {/* Select Veterinary */}
          <Form.Group controlId="veterinaryId">
            <Form.Label>Veterinary</Form.Label>
            <Form.Select name="veterinaryId" value={formData.veterinaryId} onChange={handleChange}>
              <option value="">Select Veterinary</option>
              {veterinaries.map((vet: Veterinary) => (
                <option key={vet.id} value={vet.id}>{vet.veterinary_name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Display Veterinary Card */}
          {selectedVeterinary && (
            <div className='px-4 py-3 border'>
              <Card 
                title="clinic details"
                imageSrc={selectedVeterinary.image || '/assets/img/default_veterinary_image.png'}
                name={selectedVeterinary.building}
                subName={selectedVeterinary.address.split(',')[1]?.trim()} // City (with optional chaining)
                fields={[
                  {
                    label: 'Email',
                    value: selectedVeterinary.email,
                    imageSrc: '/assets/svg/ic_email.svg',
                  },
                  {
                    label: 'Phone',
                    value: selectedVeterinary.contact_number,
                    imageSrc: '/assets/svg/ic_phone.svg',
                  },
                  {
                    label: 'Address',
                    value: selectedVeterinary.address,
                    imageSrc: '/assets/svg/ic_pin.svg',
                  }
                ]}
              />
            </div>
          )}

          {/* Service */}
          <Form.Group controlId="service">
            <Form.Label>Service</Form.Label>
            <Form.Control type="text" name="service" value={formData.service} onChange={handleChange} />
          </Form.Group>

          {/* Pet Information */}
          <Form.Group controlId="petName">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control type="text" name="petName" value={formData.petName} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="breed">
            <Form.Label>Breed</Form.Label>
            <Form.Control type="text" name="breed" value={formData.breed}  onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="number" 
                name="ageValue" 
                onChange={handleChange} 
                style={{ width: '50%', marginRight: '10px' }} 
                placeholder="Age"
                value={formData.ageValue}
              />
              <Form.Select name="ageUnit" value={formData.ageUnit} onChange={handleChange}>
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="weeks">Weeks</option>
                <option value="years">Years</option>
              </Form.Select>
            </div>
          </Form.Group>

          {/* Animal Family */}
          <Form.Group controlId="animalFamily">
            <Form.Label>{`Animal Family (e.g Dog, Cat)`}</Form.Label>
            <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Enter Animal Family" />
          </Form.Group>

          {/* Gender */}
          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>

          {/* Pet Image */}
          <Form.Group controlId="petImage">
            <Form.Label>Pet Image</Form.Label>
            <Form.Control type="file" name="petImage" onChange={handleImageChange} />
          </Form.Group>

          {/* Owner Name */}
          <Form.Group controlId="ownerName">
            <Form.Label>Owner Name</Form.Label>
            <Form.Control type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} />
          </Form.Group>

          {/* Appointment Date */}
          <Form.Group controlId="appointmentDate">
            <Form.Label>Appointment Date</Form.Label>
            <Form.Control type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
          </Form.Group>

          {/* Appointment Start Time */}
          <Form.Group controlId="appointmentStartTime">
            <Form.Label>Appointment Start Time</Form.Label>
            <Form.Control type="time" name="appointmentStartTime" value={formData.appointmentStartTime} onChange={handleChange} />
          </Form.Group>

          {/* Appointment End Time */}
          <Form.Group controlId="appointmentEndTime">
            <Form.Label>Appointment End Time</Form.Label>
            <Form.Control type="time" name="appointmentEndTime" value={formData.appointmentEndTime} onChange={handleChange} />
          </Form.Group>

          <div className='d-flex justify-content-end mt-2 gap-1'>
            <button className="btn btn-outline-primary" type="submit" disabled={disableSave}>Save Appointment</button>
          </div>
        </Form>
        <button className="position-absolute btn btn-outline-secondary" style={{ bottom: 15, right: 180 }} onClick={handleClose}>Close</button>
      </Modal.Body>
    </Modal>

  );
};

export default AppointmentModal;


              


