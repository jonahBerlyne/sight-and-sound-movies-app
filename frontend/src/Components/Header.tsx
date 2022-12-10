import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='relative flex flex-row justify-between items-center bg-[#040402] text-white p-2 mb-0 h-auto overflow-x-hidden font-open'>
     <div className="container px-4 ml-3 lg:ml-12 flex flex-wrap items-center justify-between">
       <Link to='/' className='mr-4 py-2 whitespace-nowrap'>
        <Logo />
       </Link>
       <button
            className='text-primary-100 cursor-pointer text-xl leading-none px-3 mt-1 border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
        >
         <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1}
              stroke='white'
              className='w-10 h-8'
         >
          <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
         </svg>
        </button>
     </div>
     <div
      className={
       `text-center md:flex md:gap-x-3 md:mr-3 lg:mr-12 flex-grow items-center justify-center py-1 ${menuOpen ? 'flex' : 'hidden'}`}
     >
      <button className='w-20 sm:text-lg lg:text-xl font-semibold'>Login</button>
      <button className='w-20 sm:text-lg lg:text-xl font-semibold'>Sign Up</button>
     </div>
    </header>
  );
}

export default Header;