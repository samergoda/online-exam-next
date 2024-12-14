'use client';
import { useState } from 'react';
import Popup from './Popup';
// import { useSession } from 'next-auth/react';

function ExamCard({ title, numberOfQuestions, duration, id, token }) {
  const [showPopup, setShowPopup] = useState(false);
  //   const session = useSession();
  //   console.log('session', session);
  function handleShowPopup() {
    setShowPopup(true);
  }
  return (
    <>
      <li className='border shadow-[0px_15px_40px_0px_#2A29290D] p-[16px_24px] flex justify-between'>
        <div className=''>
          <h2>{title}</h2>
          <p>{numberOfQuestions} Question </p>
        </div>
        <div className=''>
          <p>Duration: {duration}</p>
          <button
            className='border bg-gray-950 text-white'
            onClick={handleShowPopup}
          >
            Start
          </button>
        </div>
      </li>
      {showPopup && <Popup token={token} id={id} setShowPopup={setShowPopup} />}
    </>
  );
}

export default ExamCard;
