import CircleProgress from './CircleProgress';

export default function DisplayResult() {
  return (
    <>
      <div className='flex justify-evenly items-center'>
        <CircleProgress
          percentage={Number(examState.results.total.replace('%', ''))}
        />

        <div className=''>
          <p className='text-[#02369C] mb-3'>
            Correct{' '}
            <span className=' rounded-full px-2 py-1 border   border-[#02369c]'>
              {' '}
              {examState.results.correct}
            </span>
          </p>
          <p className='text-[#CC1010]'>
            Incorrect{' '}
            <span className=' rounded-full px-2 py-1 border  border-[#CC1010]'>
              {' '}
              {examState.results.wrong || 0}
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setExamState((prev) => ({
            ...prev,
            showResult: true,
          }));
          console.log('worked');
        }}
      >
        Show result
      </button>
    </>
  );
}
