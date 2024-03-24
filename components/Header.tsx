'use client'

import React, { useState, useEffect } from 'react';
import SearchIcon from '../public/assets/svg/ic_search-lg.svg';
import Image from "next/image";
import { useStore } from '../store'; 
import { HEADER_ITEMS } from '@/constants';

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);
  const [activeItem, setActiveItem] = useState<null | number>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const { appointments, setAppointmentCard } = useStore(); 
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [hoveredSearchItem, setHoveredSearchItem] = useState<null | number>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase()); 
    setShowOptions(true);
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.owner.name.toLowerCase().includes(searchTerm) ||
    appointment.service.toLowerCase().includes(searchTerm) ||
    appointment.pet.name.toLowerCase().includes(searchTerm)
  );

  const handleOptionSelect = (option: object) => {
    setSearchTerm(option.service);
    setAppointmentCard(option.id)
    setShowOptions(false); 
  };

  const handleOnFocus = () => {
    setSearchTerm('')
    setShowOptions(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowOptions(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target instanceof Element)) return;
      if (!event.target.closest('.search-container')) {
        setShowOptions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-light bg-light" style={{ height: '10.03vh', borderBottom: 'solid 1px #c8c6c6' }}>
        <div className='d-flex px-3 w-100 justify-content-between align-items-center position-relative'>
          <div className=" position-relative search-container" style={{ width: '77%' }}>
            <input
              type="text"
              className="form-control border-end-0 rounded"
              placeholder="Search"
              style={{ backgroundColor: '#f3f2f0' }}
              value={searchTerm}
              onChange={handleSearch}
              onClick={handleOnFocus}
            />
            <button
              className="btn btn-outline-black input-group-append position-absolute right-0 top-1"
              type="button"
              style={{ backgroundColor: '#f3f2f0', zIndex: 999 }}
            >
              <SearchIcon />
            </button>
            {showOptions && (
              <div className="bg-white border position-absolute bottom-15 start-0 px-3 py-2 w-100" style={{ zIndex: 100 }}>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className="dropdown-item"
                      onClick={() => {
                        if (appointment.status !== 'cancelled') {
                          handleOptionSelect(appointment);
                        }
                      }}
                      onMouseEnter={() => setHoveredSearchItem(index)}
                      onMouseLeave={() => setHoveredSearchItem(null)}
                      style={{
                        cursor: appointment.status === 'cancelled' ? 'not-allowed' : 'pointer',
                        backgroundColor: hoveredSearchItem === index ? '#f3f2f0' : 'transparent', 
                      }}
                    >
                      {appointment.service}
                      {appointment.status === 'cancelled' && (
                        <span style={{ marginLeft: '5px', color: 'red' }}>(Cancelled)</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item">Nothing found</div>
                )}
              </div>
            )}
          </div>
          <div className='d-flex align-items-center gap-2 ps-2'>
            <Image alt="Profile Image" src="/assets/img/jane_dee.png" width={36} height={36} />
            <span style={{ fontSize: 16 }}>Jane Dee</span>
            <Image alt="Profile Image" src="/assets/svg/ic_d_chevron.svg" width={20} height={20} />
            {HEADER_ITEMS.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center gap-2 cursor-pointer"
                style={{ color: (activeItem === index || hoveredItem === index) ? "#FF630B" : "inherit" }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveItem(index)}
              >
                {activeItem === index ? item.activeIcon : (hoveredItem === index ? item.hoveredIcon : item.icon)}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;







