export default function Instraction({handleStartExam}) {
  return (
    <>
      <h3>Exam Instructions</h3>
      <ul>
        <li>Read each question carefully</li>
        <li>Select the best answer</li>
        <li>Manage your time wisely</li>
        <li>You cannot go back once submitted</li>
      </ul>
      <button
        className='w-full py-2 mt-2 rounded-[20px] bg-[#4461F2] text-white'
        onClick={handleStartExam}
      >
        start exam
      </button>
    </>
  );
}
