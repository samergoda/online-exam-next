'use client';
import { useRouter } from 'next/navigation';
import { useSession ,getToken  } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Logout() {
  const {data} = useSession();
  const router = useRouter();
  const [token,setToken]=useState('')
  useEffect(()=>{
      if(data){

          setToken(data.token)
          console.log(token);
        }
      
    //   console.log('token', token);

  },[data, token])
if(!data) return null
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
        throw new Error(result.message);
      }

    //   console.log('Logout successful');
      
      // Clear cookies
      document.cookie = 'token=; Max-Age=0; Path=/; SameSite=Lax;'; 
      document.cookie = 'next-auth.session-token=; Max-Age=0; Path=/;';
      
      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  }

  return <button onClick={handleLogout}>Logout</button>;
}
