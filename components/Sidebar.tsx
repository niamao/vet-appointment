'use client'

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS } from '../constants';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const pathname = usePathname();

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="d-flex flex-column position-relative bg-black" style={{ height: '100vh', width: open ? 240 : 120, transition: 'width 0.5s ease-out', zIndex: 30 }}>
      <Image
        src={`/assets/svg/toggle_${open ? 'minimize' : 'maximize'}.svg`}
        alt="Toggle Icon"
        width={0}
        height={0}
        priority
        className='position-absolute top-50'
        onClick={handleToggle}
        style={{ left: open ? '93%' : '85%', zIndex: 50, cursor: 'pointer', width: '2.1vw' }}
      />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="d-flex align-items-center justify-content-center nav-item" style={{ height: '10.03vh', width: open ? 240 : 120, marginBottom: '6.5vh', borderBottom: 'solid 1px gray', color: '#FF630B', transition: 'width 0.5s ease-out' }}>
          <Image src="/assets/svg/Logo.svg" alt="Logo Icon" width={36} height={36} priority className='me-2'/>
          {open && <strong >LOREM</strong>}
        </li>
        <ul>
          {SIDEBAR_ITEMS.map((item, index) => (
            <li
              key={index}
              className={`list-group-item d-flex`}
              style={{ 
                height: '5.5vh',
                width: open ? 240 : 120,
                transition: 'width 0.5s ease-out',
                borderRight: pathname === item.url || hoveredItem === index ? "4px solid #FF630B" : "none", backgroundColor: hoveredItem === index ? '#29292B' : 'transparent' }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
              <Link href={item.url} passHref className='w-100'>
                <div className={`text-nowrap nav-link text-white d-flex align-items-center ${open ? 'ps-5' : 'justify-content-center'} w-100 gap-3 `} style={{ color: pathname === item.url ? "#FF630B" : "inherit",  }}>
                  {pathname === item.url || hoveredItem === index ? item.activeIcon : item.icon}
                  {open && <span style={{ color: pathname === item.url || hoveredItem === index ? "#FF630B" : "inherit" }}>{item.name}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ul>
      <div className="d-flex flex-col align-items-center justify-content-center mx-3" style={{ height: '10.03vh', fontSize: 12, borderTop: 'solid 1px gray' }}>
        <Image src="/assets/svg/Logo.svg" alt="Logo Icon" width={20} height={20} priority className='mb-1' />
        <p className="text-secondary">© LOREM 2023</p>
      </div>
    </div>
  );
}

export default Sidebar;
