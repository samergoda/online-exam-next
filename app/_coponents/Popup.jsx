'use client';

import { useEffect, useState } from 'react';

function Popup({ id, setShowPopup,token }) {
  const [question, setQuestion] = useState();

  async function handleShowPopup(id) {
    console.log(id);
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

  useEffect(() => {
    console.log(question);
  }, []);
  function handleTogglePopup() {
    setShowPopup(false);
  }
  return (
    <>
      <i
        onClick={handleTogglePopup}
        className=' fixed  bg-[#0000002b] top-0 left-0 w-full h-full '
      ></i>
      <div className='bg-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-4 rounded-[20px]'>
        <h3>instructions</h3>
        <div className=''>
          <ul>
            <li>
              {/* <input type='radio' name='test' id='qrs1' />
              <label htmlFor='qrs1'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label> */}
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </li>
            <li>
              {/* <input type='radio' name='test' id='qrs1' />
              <label htmlFor='qrs1'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label> */}
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </li>
            <li>
              {/* <input type='radio' name='test' id='qrs1' />
              <label htmlFor='qrs1'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label> */}
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </li>
            <li>
              {/* <input type='radio' name='test' id='qrs1' />
              <label htmlFor='qrs1'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label> */}
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </li>
          </ul>
        </div>
        <div className=''>
          <button
            onClick={() => handleShowPopup(id)}
            className='w-full rounded-[20px] bg-[#4461F2] text-white'
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

export default Popup;
