'use client';
import Button from '@/app/_coponents/Button';
import Input from '@/app/_coponents/Input';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { data } = useSession();

  // console.log('session data', data);

  useEffect(() => {
    if (data) {
      router.push('/'); // Redirect if the user is already authenticated
    }
  }, [data, router]);

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setErrorMessage(result.error);
      setloading(false);
    } else {
      router.push('/')
    }
  };

  return (
    <div>
      <h2 className='font-bold text-[25px] mb-[31px]'>Sign in</h2>
      <div className='flex flex-col gap-4'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            type='text'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
          <Link className='text-end text-[#122D9C]' href='/auth/forgetPassword'>
            Recover password
          </Link>

          <Button>{loading ? 'loading...' : 'sign in'}</Button>
          {/* <button type='submit' className='text-end'>
            Sign in
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Page;
