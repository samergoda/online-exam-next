'use client';
import Button from '@/app/_coponents/Button';
import Input from '@/app/_coponents/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const [resetCode, setResetCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(
        'https://exam.elevateegy.com/api/v1/auth/verifyResetCode',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resetCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify the code');
      }

      setSuccessMessage('Code verified successfully!');
      router.push('/auth/resetPassword')
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-[25px] mb-[31px]'>Verify Code</h2>
      <form onSubmit={handleRecoverPassword} className='flex flex-col gap-4'>
        <Input
          type='text'
          placeholder='Enter code'
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
        />
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
        {/* <button
          type="submit"
          disabled={loading}
          className="text-end bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </button> */}

        <Button>{loading ? 'Verifying...' : 'Verify Code'}</Button>
      </form>
      <div className='text-end mt-4'>
        <Link
          href='/auth/forgetPassword'
          className='text-blue-500 hover:underline'
        >
          Recover password
        </Link>
      </div>
    </div>
  );
}

export default Page;
