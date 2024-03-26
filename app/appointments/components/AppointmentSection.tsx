'use client'

import React, { useEffect, useState } from 'react';
import { useStore } from '../../../store';
import Image from "next/image";
import Card from '@/app/appointments/components/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Appointment {
  id: number;
  owner: {
    image: string;
    name: string;
    email: string;
    contact_number: string;
    address: string;
  };
  veterinary_id: number;
  pet: {
    name: string;
    type: string;
    breed: string;
    gender: string;
    age: string;
    birthday: string;
    image: string;
  };
}

interface Veterinary {
  id: number;
  building: string;
  address: string;
  email: string;
  contact_number: string;
  image: string;
}

const AppointmentSection = () => {
  const { eventId, appointments, veterinaries, setResched, setModal, setAppointments, setAppointmentCard } = useStore();
  const [appointment, setAppointment] = useState<Appointment | undefined>(undefined);
  const [veterinary, setVeterinary]= useState<Veterinary | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const open = Number(eventId) > 0;

  const handleResched = () => {
    setResched(eventId)
    setModal(true)
  }

  const handleCancel = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirmCancel = () => {
    const updatedAppointments = appointments.map(appt =>
      appt.id === eventId ? { ...appt, status: 'cancelled' } : appt
    );
    setAppointments(updatedAppointments);
    setShowModal(false);
    setAppointmentCard('')
  };

  useEffect(() => {
    if (appointments && appointments.length > 0 && eventId) {
      const foundAppointment = appointments.find((apt: Appointment) => apt.id === eventId);
      if (foundAppointment) {
        setAppointment(foundAppointment);
      }
    }
  }, [appointments, eventId]);

  useEffect(() => {
    if (appointment && veterinaries && veterinaries.length > 0) {
      const foundVeterinary = veterinaries.find((vet: Veterinary) => vet.id === (appointment?.veterinary_id ?? 0));
      if (foundVeterinary) {
        setVeterinary(foundVeterinary);
      }
    }
  }, [appointment, veterinaries]);

  return (
    <div className="d-flex flex-column border-start position-relative" style={{ width: open ? '24vw' : 0, height: '90vh', transition: 'width 0.5s ease-out', zIndex: 30 }}>
      {appointment && veterinary && (
        <ul style={{ overflowY: 'auto' }}>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Cancellation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to cancel this appointment?
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-outline-secondary" onClick={handleClose}>Close</button>
              <button className="btn btn-outline-primary" onClick={handleConfirmCancel}>Confirm</button>
            </Modal.Footer>
          </Modal>
          <li className='px-4 py-3 border'>
            <div className='d-flex gap-3 align-items-center'>
              <Image alt="Profile Image" src={appointment.owner.image} width={80} height={80} />
              <div>
                <strong style={{ fontSize: 24, marginBottom: 0 }}>{appointment.owner.name}</strong>
                <p className="mt-0" style={{ fontSize: 16, color: '#9D9C9C' }}>Client</p>
              </div>
              <div className='px-4'>
                <Image alt="Vertical Menu" src="/assets/svg/ic_dots-vertical.svg" width={20} height={20} /> 
              </div>
            </div>
          </li>
          <li className='px-4 py-3 border'>
            <Card 
              title="contact information"
              fields={[
                {
                  label: 'Email',
                  value: appointment.owner.email,
                  imageSrc: '/assets/svg/ic_email.svg',
                },
                {
                  label: 'Phone',
                  value: appointment.owner.contact_number,
                  imageSrc: '/assets/svg/ic_phone.svg',
                },
                {
                  label: 'Address',
                  value: appointment.owner.address,
                  imageSrc: '/assets/svg/ic_pin.svg',
                }
              ]}
            />
          </li>
          <li className='px-4 py-3 border'>
            <Card 
              title="clinic details"
              imageSrc={veterinary.image}
              name={veterinary.building}
              subName={veterinary.address.split(',')[1]?.trim()}
              fields={[
                {
                  label: 'Email',
                  value: veterinary.email,
                  imageSrc: '/assets/svg/ic_email.svg',
                },
                {
                  label: 'Phone',
                  value: veterinary.contact_number,
                  imageSrc: '/assets/svg/ic_phone.svg',
                },
                {
                  label: 'Address',
                  value: veterinary.address,
                  imageSrc: '/assets/svg/ic_pin.svg',
                }
              ]}
            />
          </li>
          <li className='px-4 py-3 border'>
            <Card
              title="pet details"
              imageSrc={appointment.pet.image}
              name={appointment.pet.name}
              subName={appointment.pet.type}
              fields={[
                {
                  label: 'Breed',
                  value: appointment.pet.breed,
                  imageSrc: '/assets/svg/ic_breed.svg',
                },
                {
                  label: 'Sex',
                  value: appointment.pet.gender,
                  imageSrc: '/assets/svg/ic_sex.svg',
                },
                {
                  label: 'Age',
                  value: appointment.pet.age,
                  imageSrc: '/assets/svg/ic_age.svg',
                },
                {
                  label: 'Birthday',
                  value: appointment.pet.birthday,
                  imageSrc: '/assets/svg/ic_calendar.svg',
                }
              ]}
            />
          </li>
          <li className='px-4 py-3 d-flex flex-column justify-content-center align-items-center'>
            <p className="w-100 mt-3">
              <button
                className="btn btn-primary w-100"
                style={{ backgroundColor: '#FF630B', borderColor: '#FF630B' }}
                onClick={handleResched}
              >
                  Reschedule Appointment
              </button>
            </p>
            <p className="w-100 mt-3">
              <button
                className="btn btn-outline-secondary w-100"
                disabled={appointment.status == 'cancelled'}
                onClick={handleCancel}
              >
                  {appointment.status == 'cancelled' ? 'Appointment Cancelled' : 'Cancel Appointment'}
              </button>
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AppointmentSection;
