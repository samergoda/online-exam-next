'use client';
import { useState } from 'react';
import Popup from './Popup';
// import { useSession } from 'next-auth/react';

function ExamCard({ title, numberOfQuestions, duration, id,token }) {
  const [question, setQuestion] = useState();
  const [showPopup, setShowPopup] = useState(false);
//   const session = useSession();
//   console.log('session', session);
  async function handleShowPopup(id) {
    console.log(token);
    let data = await fetch(
      `https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
      {
        method: 'GET',
        headers: {
           token,
        },
      }
    );
    let res = await data.json();
    console.log('res questio ', res);
    setShowPopup(true);
    setQuestion(res);
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
            onClick={() => handleShowPopup(id)}
          >
 
            Start
          </button>
        </div>
      </li>
      {showPopup && <Popup question={question} setShowPopup={setShowPopup} />}
    </>
  );
}

export default ExamCard;
