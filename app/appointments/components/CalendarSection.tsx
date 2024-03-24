'use client'

import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import AppointmentModal from './AppointmentModal';
import { useStore } from '../../../store';

const CalendarSection = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInstance = useRef<Calendar | null>(null);
  const { open, setModal, eventId, setAppointmentCard, appointments } = useStore();

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [bootstrap5Plugin, timeGridPlugin, dayGridPlugin],
        themeSystem: 'bootstrap5',
        initialView: 'timeGridDay',
        headerToolbar: {
          left: 'prev,next',
          right: 'timeGridDay,dayGridMonth'
        },
        events: mapAppointmentsToEvents(appointments),
        eventClick: function(info) {
          setAppointmentCard(eventId != Number(info.event.id) ? Number(info.event.id) : 0)
          info.el.style.borderColor = 'red';
        }
      });

      calendar.render();
      calendarInstance.current = calendar;
    }
  }, [eventId, appointments]);

  useEffect(() => {
    const handleResize = () => {
      if (calendarInstance.current) {
        calendarInstance.current.rerenderEvents();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const mapAppointmentsToEvents = (appointments) => {
    return appointments.map(appointment => ({
      title: appointment.service,
      start: appointment.start,
      end: appointment.end,
      id: appointment.id.toString(),
      className: appointment.status === 'cancelled' ? 'cancelled-event' : '',
    }));
  };

  return (
    <div className='ps-2 pe-3'>
      <div className='d-flex align-item-center justify-content-between my-4 ms-4 me-1'>
        <p style={{ fontSize: 16, color: '#9D9C9C' }}>Appointments</p>
        <button
          className="btn btn-primary"
          style={{ backgroundColor: '#FF630B', borderColor: '#FF630B' }}
          onClick={() => setModal(!open)}
        >
          New Appointment
        </button>
      </div>
      <div ref={calendarRef} className='ms-4 me-0 pe-1'></div>
      <AppointmentModal /> 
    </div>
  );
}

export default CalendarSection;


