import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  return (
    <header className='relative flex flex-wrap justify-between items-center bg-[#040402] text-white p-2 mb-0 h-auto overflow-x-hidden font-open'>
     <div className="container px-4 ml-3 lg:ml-12 flex flex-wrap items-center justify-between">
       <Link to='/' className='mr-4 py-2 whitespace-nowrap'>
        <Logo />
       </Link>
     </div>
    </header>
  );
}

export default Header;