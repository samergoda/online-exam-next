'use client';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Logout() {
  const { data } = useSession();
  const token = data?.token;
  const router = useRouter();
  console.log('token', token);

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
      console.log(result);

      if (!response.ok) {
        throw new Error('Failed to logout. Please try again.');
      }

      console.log('Logout successful');
      
      // Clear cookies
      document.cookie = 'token=; Max-Age=0; Path=/; SameSite=Lax;'; // Clear specific token cookie
      document.cookie = 'next-auth.session-token=; Max-Age=0; Path=/;'; // Clear NextAuth session cookie (if used)
      
      // Sign out from NextAuth (clears session)
      await signOut({ redirect: false });

      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  return <button onClick={handleLogout}>Logout</button>;
}
