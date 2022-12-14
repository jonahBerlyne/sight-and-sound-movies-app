import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '@mui/material';
import MenuButton from './MenuButton';

function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(true);

  return (
    <header className='relative flex flex-row justify-between items-center bg-[#1A1A1B] text-white p-2 mb-0 h-auto overflow-x-hidden font-open'>
     <div className="container px-4 ml-3 lg:ml-12 flex flex-wrap items-center justify-between">
       <Link to='/' className='mr-4 py-2 whitespace-nowrap'>
        <Logo />
       </Link>
       <button
            className='text-primary-100 cursor-pointer text-xl leading-none px-3 mt-1 border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
        >
         <MenuButton 
          isOpen={menuOpen}
          color="#FFFFFF"
          strokeWidth={1}
         />
        </button>
     </div>
     <div
      className={
       `text-center hidden md:flex md:gap-x-3 md:mr-3 lg:mr-12 flex-grow items-center justify-center py-1`}
     >
      <button className='w-20 sm:text-lg lg:text-xl font-semibold'>Login</button>
      <button className='w-20 sm:text-lg lg:text-xl font-semibold'>Sign Up</button>
     </div>
    </header>
  );
}

export default Header;