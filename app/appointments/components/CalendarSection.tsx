'use client'

import React, { useState, useEffect, useRef } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import AppointmentModal from './AppointmentModal';
import { useStore } from '../../../store';
import FullCalendar from '@fullcalendar/react'
import Image from "next/image";

const CalendarSection = () => {
  const calendarRef = useRef(null)
  const [calendarApi, setCalendarApi] = useState(null);
  const { open, setModal, eventId, setAppointmentCard, appointments, openSidebar } = useStore();
  const [leftNavState, setLeftNavState] = useState('default');
  const [rightNavState, setRightNavState] = useState('default');
  const [view, setView] = useState('timeGridDay')

  useEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      setCalendarApi(api);
      api.changeView(view)
      setTimeout(() => {
        api.updateSize();
      }, 500);
    }
  }, [calendarRef.current, eventId, openSidebar]);

  const mapAppointmentsToEvents = (appointments) => {
    return appointments.map(appointment => ({
      title: `${appointment.owner.name}~${appointment.service}`,
      start: appointment.start,
      end: appointment.end,
      id: appointment.id.toString(),
      status: appointment.status,
    }));
  };

  const isTimeLineView = view === 'timeGridDay'

  const renderEventContent = (eventInfo) => {
    const titleSegment = eventInfo.event.title.split('~');
    const appointmentName = titleSegment[1].toLowerCase();
    const formattedAppointmentName = appointmentName.charAt(0).toUpperCase() + appointmentName.slice(1); // Uppercase first letter
    const appointmentee = titleSegment[0];

    const startTime = new Date(eventInfo.event.start);
    const endTime = new Date(eventInfo.event.end);
  
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
  
    const practicalKeywords = ['groom', 'vac', 'check', 'surgery', 'procedure', 'treatment', 'dressing', 'therapy'];
    const isPractical = practicalKeywords.some(keyword => appointmentName.includes(keyword));
  
    return (
      <div className="d-flex p-3 justify-content-between" style={{ border: `2px solid ${isPractical ? '#FF9447' : '#9747FF'}`, borderRadius: 12, background: isPractical ? "#FFE0CE" : "#e1d7fd" }}>
        {isTimeLineView ? (
          <>
            <div className='d-flex gap-2'>
              <Image width={0} height={0} style={{ height: 26, width: 26 }} alt="Event Icon" src={`/assets/svg/${isPractical ? 'ic_park-outline_injection' : 'ic_consultation'}.svg`} />
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1E' }}>{formattedAppointmentName}</p>
                <p style={{ fontSize: 12, color: '#1C1C1E' }} >{formattedStartTime} - {formattedEndTime}</p>
                <div className='d-flex gap-1 pt-1'>
                  <Image width={0} height={0} style={{ height: 16, width: 16 }} alt="User Event Icon" src={`/assets/svg/ic_${isPractical ? 'technical' : 'consultation'}_user.svg`} />
                  <p style={{ fontSize: 12, color: '#1C1C1E' }}>{appointmentee}</p>
                </div>
              </div>
            </div>
            <Image width={0} height={0} style={{ height: 16, width: 16 }} alt="User Event Icon" src="/assets/svg/ic_dots-vertical_events.svg" />
          </>
        ) : (
          <div className='d-flex align-items-center gap-1'>
            <Image width={0} height={0} style={{ height: 16, width: 16 }} alt="Event Icon" src={`/assets/svg/${isPractical ? 'ic_park-outline_injection' : 'ic_consultation'}.svg`} />
            <p style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1E' }}>{formattedAppointmentName}</p>
          </div>
        )}
      </div>
    );
  };  
  
  const formatTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${minutes} ${amOrPm}`;
  }

  const handleLeftNavMouseEnter = () => {
    setLeftNavState('hovered');
  };

  const handleLeftNavMouseLeave = () => {
    setLeftNavState('default');
  };

  const handleRightNavMouseEnter = () => {
    setRightNavState('hovered');
  };

  const handleRightNavMouseLeave = () => {
    setRightNavState('default');
  };

  const handleLeftNavClick = () => {
    setLeftNavState('active');
    if (calendarApi) {
      calendarApi.prev();
    }
  };

  const handleRightNavClick = () => {
    setRightNavState('active');
    if (calendarApi) {
      calendarApi.next();
    }
  };

  const changeToDayGridMonth = () => {
    if (calendarApi) {
      calendarApi.changeView('dayGridMonth');
      setView('dayGridMonth')
    }
  };

  const setCurrentDateInTimeGridDay = () => {
    if (calendarApi) {
      calendarApi.today(); 
      calendarApi.changeView('timeGridDay'); 
      setView('timeGridDay')
    }
  };

  const currentData = calendarApi && calendarApi.currentData || ''
  const calendarDate = currentData?.viewTitle || ''
  const currentDate = new Date(currentData.currentDate || '');
  const today = new Date();

  const isToday = currentDate.getDate() === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekIndex = currentDate.getDay();
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

   
  const leftNavIconSrc = `/assets/svg/nav_icon_left_${leftNavState}.svg`;
  const rightNavIconSrc = `/assets/svg/nav_icon_right_${rightNavState}.svg`;

  return (
    <div className='ps-2 pe-3'>
      <div className='d-flex align-items-center justify-content-between my-4 ms-4 me-1'>
        <div className='align-items-left'>
          <p style={{ fontSize: 16, color: '#9D9C9C' }}>Appointments</p>
          <div className='d-flex gap-2 my-1' style={{ fontSize: 24, fontWeight: 700, color: "#1C1C1E" }}>
            {calendarApi && calendarDate.split(" ")[0]} 
            <Image
              style={{ cursor: 'pointer' }}
              onMouseEnter={handleLeftNavMouseEnter}
              onMouseLeave={handleLeftNavMouseLeave}
              onClick={handleLeftNavClick}
              width={36}
              height={36}
              alt="Nav Left Icon"
              src={leftNavIconSrc}
            />
            <Image
              style={{ cursor: 'pointer' }}
              onMouseEnter={handleRightNavMouseEnter}
              onMouseLeave={handleRightNavMouseLeave}
              onClick={handleRightNavClick}
              width={36}
              height={36}
              alt="Nav Right Icon"
              src={rightNavIconSrc}
            />
          </div>
          <p style={{ fontSize: 16, color: '#9D9C9C' }}>
            {isToday ? 'Today is' : ''} {dayOfWeek}, {calendarDate}
          </p>
        </div>
        <div className="btn-group mt-2" role="group" aria-label="View Options">
          <button className="btn btn-secondary" onClick={setCurrentDateInTimeGridDay}>Day View</button>
          <button className="btn btn-secondary" onClick={changeToDayGridMonth}>Month View</button>
        </div>
        <div>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#FF630B', borderColor: '#FF630B' }}
            onClick={() => setModal(!open)}
          >
            New Appointment
          </button>
        </div>
      </div>
      <div className='ms-4 me-0 pe-1' style={{ height: "67vh", overflow: "auto" }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[ timeGridPlugin, dayGridPlugin ]}
          initialView='timeGridDay'
          eventClick={(info) => {
            setAppointmentCard(eventId != Number(info.event.id) ? Number(info.event.id) : 0)
          }}
          eventContent={renderEventContent}
          eventSources={[
            {
              events: mapAppointmentsToEvents(appointments).filter(apt => apt.status !== 'cancelled'),
              color: 'transparent',
            },
          ]}
          height={isTimeLineView ? '5000px' : '67vh'}
          headerToolbar={false}
          allDaySlot={false}
          slotEventOverlap={false}
          slotDuration="01:00:00"
          expandRows={true}
        />
      </div>
      <AppointmentModal /> 
    </div>
  );
}

export default CalendarSection;


