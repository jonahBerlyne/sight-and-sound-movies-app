import React from 'react';
import Card from '../Components/Card';

export default function Landing() {
  return (
    <div className='flex flex-col gap-y-0 space-y-0'>
     <Card
      backgroundImg='/Images/2001.jpg'
      directionLeft
      text='The greatest films of all time...'
     />
     <Card
      backgroundImg='/Images/vertigo.jpg'
      text='Collected for your viewing...'
     />
     <Card
      backgroundImg='/Images/jeanne_dielman.jpg'
      directionLeft
      text='As voted on by over 1100 critics and 1000 directors...'
     />
    </div>
  );
}