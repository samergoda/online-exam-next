import { getServerSession } from 'next-auth';
import { OPTIONS } from './../api/auth/[...nextauth]/route';
import ExamCard from '../_coponents/ExamCard';

async function page() {
  const session = await getServerSession(OPTIONS);
  console.log('session.token',session.token);
  async function getAllExams() {
    let data = await fetch('https://exam.elevateegy.com/api/v1/exams', {
      method: 'GET',
      headers: {
        token: session.token,
      },
    });
    let res = await data.json();
    return res;
  }
  let resu = await getAllExams();
  // console.log('resu', resu);
  //   console.log(resu.exams);
  return (
    <>
      <ul className='w-full flex flex-col gap-8'>
        {resu.exams.map((e, index) => (
          <ExamCard
            key={index}
            title={e.title}
            numberOfQuestions={e.numberOfQuestions}
            duration={e.duration}
            token={session.token}
            id={e._id}
          />
        ))}
      </ul>
    </>
  );
}

export default page;
