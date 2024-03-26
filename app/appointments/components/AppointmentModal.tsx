'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useStore } from '../../../store';
import Card from '@/app/appointments/components/Card';
import { calculateDuration, sanitizeData } from '../../../utils';
import { FormData, Veterinary } from '../../../types';

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
    appointmentDateTime: '',
    duration: '30'
  });
  const [disableSave, setDisableSave] = useState(false)

  useEffect(() => {
    if (formData.veterinaryId.length || Number(formData.veterinaryId) > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, []);

  useEffect(() => {
    if (reschedId !== null) {
      const reschedAppointment = appointments.find((appointment: any) => Number(appointment.id) === Number(reschedId));
      if (reschedAppointment) {
        const startTime = new Date(reschedAppointment.start);
        const year = startTime.getFullYear();
        const month = String(startTime.getMonth() + 1).padStart(2, '0');
        const day = String(startTime.getDate()).padStart(2, '0');
        const hours = String(startTime.getHours()).padStart(2, '0');
        const minutes = String(startTime.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
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
          appointmentDateTime: formattedDateTime,
          duration: calculateDuration(reschedAppointment.start, reschedAppointment.end)
        });
      }
    }
  }, [reschedId, appointments]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const selectedHours = parseInt(value.substring(11, 13));
  
    const endTime = new Date(value);
    endTime.setMinutes(endTime.getMinutes() + parseInt(formData.duration));
    const endHours = endTime.getHours();
  
    // Check if the selected time is within the allowed range (7 AM to 7 PM)
    if (selectedHours < 7 || selectedHours >= 19 || endHours >= 19) {
      alert('Appointment hours are limited to between 7 AM and 7 PM.');
      return;
    }
  
    setFormData({
      ...formData,
      [name]: value
    });
  
    setDisableSave(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setDisableSave(false);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.veterinaryId ||
      !formData.service ||
      !formData.petName ||
      !formData.breed ||
      !formData.ageValue ||
      !formData.ageUnit ||
      !formData.gender ||
      !formData.ownerName ||
      !formData.appointmentDateTime ||
      !formData.duration
    ) {
      alert('Please fill in all fields.');
      setDisableSave(true);
      return;
    }

    const newAppointment = sanitizeData(formData, appointments, reschedId);
    if (reschedId !== null) {
      // If it's an update, replace the existing appointment with the updated one
      const updatedAppointments = appointments.map((appointment: any) =>
        Number(appointment.id) === Number(formData.id) ? newAppointment : appointment
      );

      setAppointments(updatedAppointments);
    } else {
      // If it's a new appointment, add it to the list
      setAppointments([...appointments, newAppointment]);
    }
    setAppointmentCard(newAppointment.id);

    console.log("UTC Conversion of Appointment Date and Time:", new Date(formData.appointmentDateTime).toUTCString());

    handleClose();
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
      appointmentDateTime: '',
      duration: '30'
    });
    setResched(null);
  };

  const selectedVeterinary = veterinaries.find((vet: Veterinary) => vet.id === parseInt(formData.veterinaryId, 10));

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
            <Form.Select name="veterinaryId" value={formData.veterinaryId} onChange={handleSelectChange}>
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
              <Form.Select name="ageUnit" value={formData.ageUnit} onChange={handleSelectChange}>
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
            <Form.Select name="gender" value={formData.gender} onChange={handleSelectChange}>
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

          {/* Appointment Date and Time */}
          <Form.Group controlId="appointmentDateTime">
            <Form.Label>Appointment Date and Time</Form.Label>
            <Form.Control 
              type="datetime-local" 
              name="appointmentDateTime" 
              value={formData.appointmentDateTime} 
              onChange={handleChange} 
            />
          </Form.Group>

          {/* Duration */}
          <Form.Group controlId="duration">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control 
              type="number" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              min="30"
            />
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
