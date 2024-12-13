'use client';
import Image from 'next/image';
import Logout from './Logout';
import Link from 'next/link';
import { useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const segment = useSelectedLayoutSegment();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleMenu} 
        className='md:hidden fixed top-4 left-4 z-50 p-2 bg-[#4461F2] text-white rounded-md'
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Side Navigation */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-64 md:bg-transparent bg-white transform transition-transform duration-300 ease-in-out z-40
          md:relative md:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='p-4'>
          <Image src='/Final Logo 1.png' width={200} height={200} alt='logo' />
          
          <ul className='mt-8 space-y-2'>
            <li>
              <Link
                onClick={toggleMenu}
                className={`rounded-[10px] flex items-center gap-10 p-2 ${
                  segment == null ? 'bg-[#4461F2] text-white' : ''
                }`}
                href='/'
              >
                <span>
                  <svg
                    width='25'
                    height='24'
                    viewBox='0 0 25 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.5 21H5.5C4.4 21 3.5 20.1 3.5 19V5C3.5 3.9 4.4 3 5.5 3H9.5C10.6 3 11.5 3.9 11.5 5V19C11.5 20.1 10.6 21 9.5 21ZM15.5 21H19.5C20.6 21 21.5 20.1 21.5 19V14C21.5 12.9 20.6 12 19.5 12H15.5C14.4 12 13.5 12.9 13.5 14V19C13.5 20.1 14.4 21 15.5 21ZM21.5 8V5C21.5 3.9 20.6 3 19.5 3H15.5C14.4 3 13.5 3.9 13.5 5V8C13.5 9.1 14.4 10 15.5 10H19.5C20.6 10 21.5 9.1 21.5 8Z'
                      fill={`${segment == null ? '#fff' : '#4461F2'}`}
                    />
                  </svg>
                </span>
                dashboard
              </Link>
            </li>
            
            <li>
              <Link 
                onClick={toggleMenu}
                className='rounded-[10px] flex items-center gap-10 p-2' 
                href='/'
              >
                <span>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_3719_369)'>
                      <path
                        d='M13.25 0.75C10.2663 0.75 7.40483 1.93526 5.29505 4.04505C3.18526 6.15483 2 9.01631 2 12H-1.75L3.1125 16.8625L3.2 17.0375L8.25 12H4.5C4.5 7.1625 8.4125 3.25 13.25 3.25C18.0875 3.25 22 7.1625 22 12C22 16.8375 18.0875 20.75 13.25 20.75C10.8375 20.75 8.65 19.7625 7.075 18.175L5.3 19.95C6.34177 20.9975 7.58061 21.8284 8.94508 22.3948C10.3095 22.9612 11.7726 23.2518 13.25 23.25C16.2337 23.25 19.0952 22.0647 21.205 19.955C23.3147 17.8452 24.5 14.9837 24.5 12C24.5 9.01631 23.3147 6.15483 21.205 4.04505C19.0952 1.93526 16.2337 0.75 13.25 0.75ZM12 7V13.25L17.3125 16.4L18.275 14.8L13.875 12.1875V7H12Z'
                        fill='#4461F2'
                      />
                    </g>
                  </svg>
                </span>
                quiz history
              </Link>
            </li>
            
            <li className='rounded-[10px] flex items-center gap-10 p-2'>
              <span>
                <svg
                  width='25'
                  height='26'
                  viewBox='0 0 25 26'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.20841 2.58334H19.7917C20.068 2.58334 20.333 2.69308 20.5283 2.88843C20.7237 3.08378 20.8334 3.34874 20.8334 3.625V22.375C20.8334 22.6513 20.7237 22.9162 20.5283 23.1116C20.333 23.3069 20.068 23.4167 19.7917 23.4167H5.20841C4.93215 23.4167 4.6672 23.3069 4.47185 23.1116C4.27649 22.9162 4.16675 22.6513 4.16675 22.375V3.625C4.16675 3.34874 4.27649 3.08378 4.47185 2.88843C4.6672 2.69308 4.93215 2.58334 5.20841 2.58334ZM9.37508 11.9583V8.83334L4.16675 13L9.37508 17.1667V14.0417H15.6251V11.9583H9.37508Z'
                    fill='#4461F2'
                  />
                </svg>
              </span>
              <Logout />
            </li>
          </ul>
        </div>

        {/* Overlay for mobile */}
        {isOpen && (
          <div 
            onClick={toggleMenu} 
            className='md:hidden fixed inset-0 z-30'
          />
        )}
      </div>
    </>
  );
}

export default SideNav;