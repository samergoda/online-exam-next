'use client'

import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
// import { handleSignin } from '@/app/_lib/action';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { data } = useSession();

  // useEffect(() => {
  //   async function fetchData() {
  //       let data = await create();
  //       console.log('session data',data);
  //       if (data) {
  //         router.push('/'); // Redirect if the user is already authenticated
  //       }
     
  //   }
  //   fetchData();
  // }, [ router]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setErrorMessage(result.error);
      setLoading(false);
    } else {
      router.push('/');
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
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
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
