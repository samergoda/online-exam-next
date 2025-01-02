'use client';

import { handleSignup } from '@/app/_lib/action';
import Link from 'next/link';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function SignupPage() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch
  } = useForm();

  async function handleSubmit(formData) {
    console.log(data);
    try {
      await handleSignup(formData);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2 className='font-bold text-2xl mb-8'>Sign up</h2>
      {error && <div className='text-red-500 mb-4'>{error}</div>}
      <form onSubmit={handleSubmit(data)} className='flex flex-col gap-4'>
        <Input type='text'  {...register("firstName", { required: true, maxLength: 20 })}  placeholder='First Name' required />
        <Input type='text' name='lastName' placeholder='Last Name' required />
        <Input type='email' name='email' placeholder='Email' required />
        
        <Input
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <Input
          type='password'
          name='rePassword'
          placeholder='Confirm Password'
          required
        />
        <div className='text-center'>
          <Link href='/auth/signin' className='text-[#122D9C]'>
            Already have an account?
          </Link>
        </div>
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
}

export default SignupPage;
