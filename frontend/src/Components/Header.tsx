import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import MenuButton from './MenuButton';
import NavItems from './NavItems';

function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useState(true);
  
  return (
    <header className='flex justify-between items-center py-2 bg-[#1A1A1B]'>
      <Link to='/' className='ml-10 lg:ml-20 whitespace-nowrap z-50'>
         <Logo />
      </Link>
      <NavItems 
        auth={auth}
        menuOpen={menuOpen}
      />
      <div className="flex justify-end items-center mt-1 mr-10 lg:hidden">
        <button
          className='z-50'
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
    </header>
  );
}

export default Header;



