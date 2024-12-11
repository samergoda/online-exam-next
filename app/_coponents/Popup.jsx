'use client';

import { useEffect } from 'react';

function Popup({ question }) {
  useEffect(() => {
    console.log(question);
  }, []);
  return (
    <>
      <i className=' fixed  bg-[#0000002b] top-0 left-0 w-full h-full '></i>
      <div className='bg-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-4 rounded-[20px]'>
        <h3>Exercitationem pariatur quae facere vel id est illo velit aut.</h3>
        <div className=''>
          <ul>
            <li>
              <input type='radio' name='test' id='qrs1' />
              <label htmlFor='qrs1'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label>
            </li>
            <li>
              <input type='radio' name='test' id='qrs2' />
              <label htmlFor='qrs2'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label>
            </li>
            <li>
              <input type='radio' name='test' id='qrs3' />
              <label htmlFor='qrs3'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label>
            </li>
            <li>
              <input type='radio' name='test' id='qrs4' />
              <label htmlFor='qrs4'>
                Numquam ipsum et nostrum non iste porro laudantium.
              </label>
            </li>
          </ul>
        </div>
        <div className=''>
          <button>back</button>
          <button>next</button>
        </div>
      </div>
    </>
  );
}

export default Popup;
