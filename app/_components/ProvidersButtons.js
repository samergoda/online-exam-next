'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
// import Google from 'next-auth/providers/google';
// import Facebook from 'next-auth/providers/facebook';

function ProvidersButtons() {
  return (
    <div className='mt-10'>
        <div className='text-center mb-4'><p>or continue with</p></div>
        <div className='flex gap-4  justify-between '>
            
      <button className='rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] ' onClick={() => signIn('google')}>
        <Image alt='idenity provider' width='30' height='30' src='/Logo Google.png' />
      </button>
      <button onClick={() => signIn('facebook')} className='rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] '>
        <Image alt='idenity provider' width='30' height='30' src='/Logo.png' />
      </button>
      <button onClick={() => signIn('twitter')} className='rounded-[16px] shadow-[0px_18px_30px_0px_#4461f21c] '>
        <Image alt='idenity provider' width='30' height='30' src='/facebook-Logo.png' />
      </button>
        </div>
    </div>
  );
}

export default ProvidersButtons;
