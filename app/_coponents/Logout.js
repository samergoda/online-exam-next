'use client';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
// import { cookies } from 'next/headers';

export default function Logout() {
  const { data, status } = useSession();
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && data?.token) {
      setToken(data.token);
    //   console.log('Token:', data.token);
    }
  }, [data, status]);

  if (status === 'unauthenticated') {
    // If the session is already cleared, navigate to the login page
    router.push('/auth/login');
    return null;
  }

  async function handleLogout() {
    try {
      const response = await fetch(
        'https://exam.elevateegy.com/api/v1/auth/logout',
        {
          method: 'GET',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
    //   console.log('Logout response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to logout. Please try again.');
      }

    //   console.log('Logout successful');

      // Clear cookies
      document.cookie = 'token=; Max-Age=0; Path=/; SameSite=Lax;';
      document.cookie = 'next-auth.session-token=; Max-Age=0; Path=/;';
// (await cookies()).delete('next-auth.session-token')
      // Use next-auth's signOut to properly clear the session
      await signOut({ callbackUrl: '/auth/login' }); 
    // router.push('/auth/logout');

    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  return <button onClick={handleLogout}>Logout</button>;
}
