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
     </div>
     <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: menuOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </motion.div>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            className="navbar-options"
          >
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;