import React from 'react';
import { Avatar } from '@mui/material';

interface Props {
 auth: boolean;
 menuOpen: boolean;
}

function NavItems(props: Props) {
  const { auth, menuOpen } = props;

  return (
    <div
      className={`absolute top-0 left-0 bg-[#1A1A1B] w-screen transform ${menuOpen ? "-translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out lg:top-14`}
     >
      <div className="flex flex-col justify-center items-center mt-16 space-y-2 pb-3 lg:flex-row lg:pb-0 lg:space-y-0 lg:mt-0 lg:justify-end lg:mr-20 lg:space-x-2">
       {!auth && 
        <>        
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white'>Login</button>
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white'>Sign Up</button>
        </>
       }
       {auth && 
        <>        
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white'>Movies</button>
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white'>Watchlist</button>
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white hidden lg:flex'>
          <Avatar
           sx={{ height: 36, width: 36 }}
          >
           J
          </Avatar>
         </button>
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white'>Profile</button>
         <button className='w-20 sm:text-lg lg:text-xl font-semibold text-white'>Sign Out</button>
        </>
       }
      </div>
     </div>
  );
}

export default NavItems;