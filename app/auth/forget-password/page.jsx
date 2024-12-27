'use client';
import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function Page() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push('/');
    }
  }, [session, router]);

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Simulate API call for password recovery
    try {
      // Example API request - replace with your actual endpoint
      const response = await fetch(
        'https://exam.elevateegy.com/api/v1/auth/forgotPassword',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send recovery email');
      }
      router.push('/auth/verifyCode');
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-[25px] mb-[31px]'>Forgot your password?</h2>
      <form onSubmit={handleRecoverPassword} className='flex flex-col gap-4'>
        <Input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        {/* <button
          type="submit"
          disabled={loading}
          className="text-end bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Sending...' : 'Recover Password'}
        </button> */}

        <Button>{loading ? 'Sending...' : 'Recover Password'}</Button>
      </form>
      <div className='text-end mt-4'>
        <Link href='/auth/signin' className='text-blue-500 hover:underline'>
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default Page;
