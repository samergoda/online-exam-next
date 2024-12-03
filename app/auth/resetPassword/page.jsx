'use client'
import { useState } from 'react';
import Button from '@/app/_coponents/Button';
import Input from '@/app/_coponents/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    rePassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    const { oldPassword, password, rePassword } = formData;

    // Validation
    if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      setError('Password must be at least 6 characters, include an uppercase letter and a number.');
      return;
    }
    if (password !== rePassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setError('');
      const response = await fetch('https://exam.elevateegy.com/api/v1/auth/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setSuccess('Password changed successfully!');
      router.push('/auth/login'); 
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Reset Password</h2>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleResetPassword}>
          <Input
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="New Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
          />
          <Button type="submit">Reset Password</Button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <div className="text-end">
          <Link href="/auth/forgetPassword">Recover Password</Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
