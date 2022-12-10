import React from 'react';

type Props = {
 backgroundImg: string;
 directionRight?: boolean;
 text: string;
}

function Card(props: Props) {
  const { backgroundImg, directionRight, text } = props;

  return (
    <section style={{backgroundImage: `url(${backgroundImg})`}} className={`h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-end ${directionRight ? 'items-end' : ''}`}>
     <h2 className={`text-white font-bold font-open text-3xl lg:text-6xl text-left w-[250px] lg:w-[500px] bottom-0 leading-snug lg:leading-tight ${directionRight ? 'mr-9 sm:mr-10 lg:mr-20' : 'ml-9 sm:ml-10 lg:ml-20'} mb-10`}>{text}</h2>
    </section>
  );
}

export default Card;