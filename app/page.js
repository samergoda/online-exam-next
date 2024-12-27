import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { OPTIONS } from './api/auth/[...nextauth]/route';
import Subjects from './_components/Subjects';
import SideNav from './_components/SideNav';
import Link from 'next/link';

export default async function Home() {
  // Get the session data
  // const session = await getServerSession(OPTIONS);

  // Fetch categories from the API

  // async function getOneSubject(id) {
  //   const response = await fetch(
  //     `https://exam.elevateegy.com/api/v1/subjects/${id}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         token: session.token,
  //       },
  //     }
  //   );

  //   const result = await response.json();
  //   return result.subjects || [];
  // }
  // const subjects = await getCategories();

  return (
    <div className='bg-white flex p-3'>
      <div>
        <div className='w-full'></div>

        <Subjects />
      </div>
    </div>
  );
}
