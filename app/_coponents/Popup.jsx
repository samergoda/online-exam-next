'use client';

import { useEffect, useState } from 'react';

function Popup({ id, setShowPopup, token,children }) {



  useEffect(() => {}, []);
  function handleTogglePopup() {
    setShowPopup(false);
  }
  return (
    <>
      <i
        onClick={handleTogglePopup}
        className=' fixed  bg-[#0000002b] top-0 left-0 w-full h-full '
      ></i>
{children}
    </>
  );
}

export default Popup;
