'use client';

import Button from '@/app/_coponents/Button';
import Input from '@/app/_coponents/Input';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Page() {
    const [loading, setLoading] = useState(false);

  const { data } = useSession();

  console.log('session data from sign up', data);
  useEffect(() => {
    if (data) window.location.href = '/';
  }, [data]);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '01094155711',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      // Update the username dynamically
      if (name === 'firstName' || name === 'lastName') {
        updatedForm.username = `${updatedForm.firstName}${updatedForm.lastName}`;
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (formData.password !== formData.rePassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
        setError('Password must be at least 6 characters, include an uppercase letter and a number.');
        return;
      }
    try {
      // Call the backend API to create a new user
      const response = await fetch(
        'https://exam.elevateegy.com/api/v1/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      setLoading(false)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
        
    }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2 className='font-bold text-[25px]  mb-[31px]'>Sign up</h2>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input
          type='text'
          name='firstName'
          placeholder='First Name'
          onChange={handleChange}
          value={formData.firstName}
        />
        <Input
          type='text'
          name='lastName'
          placeholder='Last Name'
          onChange={handleChange}
          value={formData.lastName}
        />
        <Input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          value={formData.password}
        />
        <Input
          type='password'
          name='rePassword'
          placeholder='Confirm Password'
          onChange={handleChange}
          value={formData.rePassword}
        />

        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}

        <div className='text-center'>
          <Link href='/auth/signin' className='text-[#122D9C]'>
            Already have an account?
          </Link>
        </div>

        <Button>
            {loading?'loading...':'sign up'}
          </Button>
      </form>
    </div>
  );
}

export default Page;
