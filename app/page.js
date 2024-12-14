import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { OPTIONS } from './api/auth/[...nextauth]/route';
import Subjects from './_coponents/Subjects';
import SideNav from './_coponents/SideNav';
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
      <SideNav />
      <div>

      <div className='w-full'>
        <div className='flex gap-3 mb-5'>
          <input
            type='search'
            className="w-full border px-4 rounded-[20px] shadow-[0px_15px_40px_0px_#0000001a] bg-[url('/carbon_search.png')] bg-[10px] ps-10 bg-no-repeat"
            placeholder='Search Quiz'
            />
          <Link
            className='bg-[#4461F2] text-white w-auto p-2 text-nowrap rounded-[20px]'
            href='/exams'
            >
            Start Quiz
          </Link>
        </div>
      </div>

      <Subjects />
            </div>
    </div>
  );
}
