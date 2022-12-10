import React from 'react';

type Props = {
 backgroundImg: string;
 directionLeft?: boolean;
 text: string;
}

function Card(props: Props) {
  const { backgroundImg, directionLeft, text } = props;

  return (
    <section style={{backgroundImage: `url(${backgroundImg})`}} className='bg-no-repeat bg-contain h-screen'>
     <h2>{text}</h2>
    </section>
  );
}

export default Card;