import React from 'react';
import Card from '../Components/Card';

export default function Landing() {
  return (
    <div className='flex flex-col'>
     <Card
      backgroundImg='/Images/2001.jpg'
      text='The greatest films of all time...'
     />
     <Card
      backgroundImg='/Images/vertigo.jpg'
      directionRight
      text='Collected for your viewing...'
     />
     <Card
      backgroundImg='/Images/jeanne_dielman.jpg'
      text='As voted on by over 1100 critics and 1000 directors...'
     />
    </div>
  );
}