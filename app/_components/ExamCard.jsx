'use client';
import { useEffect, useState } from 'react';
import Popup from './Popup';
import { CountdownTimer } from 'nextjs-countdown-timer';
import CircleProgress from './CircleProgress.js';
import Instraction from './Instructions.js';
import Button from './Button';
import DisplayResult from './DisplayResult';
import CurrentQuestion from './CurrentQuestion';
import ShowWrongAnswers from './ShowWrongAnswers.jsx';

function ExamCard({ title, numberOfQuestions, duration, id, token }) {
  const [examState, setExamState] = useState({
    showPopup: false,
    questions: [],
    currentQuestion: 0,
    selectedAnswers: { answers: [], time: 0 },
    results: null,
    showResult: false,
    status: 'not_started',
  });

  // Fetch questions when starting the exam
  async function fetchQuestions(id) {
    try {
      const response = await fetch(
        `https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
        {
          method: 'GET',
          headers: { token },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const { questions } = await response.json();
      setExamState((prev) => ({
        ...prev,
        questions,
        status: 'in_progress',
      }));
    } catch (error) {
      console.error('Error fetching questions:', error);
      setExamState((prev) => ({
        ...prev,
        status: 'error',
      }));
    }
  }

  // Handle answer selection
  function handleAnswerSelect(questionId, key, type) {
    setExamState((prev) => {
      const updated = { ...prev };
      updated.selectedAnswers.answers = updated.selectedAnswers.answers || [];

      if (type === 'single_choice') {
        updated.selectedAnswers.answers =
          updated.selectedAnswers.answers.filter(
            (ans) => ans.questionId !== questionId
          );
        updated.selectedAnswers.answers.push({ questionId, correct: key });
      } else if (type === 'multiple_choice') {
        const answerIndex = updated.selectedAnswers.answers.findIndex(
          (ans) => ans.questionId === questionId
        );
        if (answerIndex > -1) {
          const currentAnswers =
            updated.selectedAnswers.answers[answerIndex].correct || [];
          updated.selectedAnswers.answers[answerIndex].correct =
            currentAnswers.includes(key)
              ? currentAnswers.filter((val) => val !== key)
              : [...currentAnswers, key];
        } else {
          updated.selectedAnswers.answers.push({ questionId, correct: [key] });
        }
      }
      return updated;
    });
  }

  // Submit answers
  async function handleSubmitExam() {
    // Prevent multiple submissions
    if (examState.status === 'completed') return;

    try {
      const response = await fetch(
        'https://exam.elevateegy.com/api/v1/questions/check',
        {
          method: 'POST',
          headers: {
            token: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(examState.selectedAnswers),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      const results = await response.json();
      console.log(results);
      setExamState((prev) => ({
        ...prev,
        results,
        status: 'completed',
      }));
    } catch (error) {
      console.error('Error submitting answers:', error);
      setExamState((prev) => ({
        ...prev,
        status: 'error',
      }));
    }
  }

  // Handle timer ending
  function handleTimerEnd() {
    // Avoid direct state update during render
    setTimeout(() => {
      handleSubmitExam();
      setExamState((prev) => ({
        ...prev,
        status: 'timeout',
      }));
    }, 0); // Schedule it for the next event loop
  }

  // Navigation functions
  function handleNextQuestion() {
    setExamState((prev) => ({
      ...prev,
      currentQuestion: Math.min(
        prev.currentQuestion + 1,
        prev.questions.length - 1
      ),
    }));
  }

  function handlePreviousQuestion() {
    setExamState((prev) => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0),
    }));
  }

  // Check if an answer is selected
  function isAnswerSelected(questionId, key) {
    const answerForQuestion = examState.selectedAnswers.answers.find(
      (ans) => ans.questionId === questionId
    );

    if (!answerForQuestion) return false;

    if (Array.isArray(answerForQuestion.correct)) {
      return answerForQuestion.correct.includes(key);
    }

    return answerForQuestion.correct === key;
  }

  // Start exam
  function handleStartExam() {
    fetchQuestions(id);
    setExamState((prev) => ({
      ...prev,
      showPopup: true,
    }));
  }

  return (
    <>
      {/* Exam Card Header */}
      <li className='border shadow-[0px_15px_40px_0px_#2A29290D] p-[16px_24px] flex justify-between'>
        <div>
          <h2>{title}</h2>
          <p>{numberOfQuestions} Question</p>
        </div>
        <div>
          <p>Duration: {duration} minutes</p>
          <button
            className='w-full py-2 mt-2 rounded-[20px] bg-[#4461F2] text-white'
            onClick={() =>
              setExamState((prev) => ({
                ...prev,
                showPopup: true,
              }))
            }
            disabled={examState.status !== 'not_started'}
          >
            Start
          </button>
        </div>
      </li>

      {/* Exam Popup */}
      {examState.showPopup && (
        <Popup
          token={token}
          id={id}
          setShowPopup={(show) =>
            setExamState((prev) => ({ ...prev, showPopup: show }))
          }
        >
          <div className='bg-white w-[500px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-4 rounded-[20px]'>
            {/* Instructions or Exam Flow */}
            {examState.status === 'not_started' ||
            examState.questions.length === 0 ? (
              <>
                <Instraction handleStartExam={handleStartExam} />
              </>
            ) : examState.status === 'completed' ||
              examState.status === 'timeout' ? (
              // Results Display
              <div>
                <h3>your score</h3>
                {examState.results && !examState.showResult ? (
                  <>
                    <DisplayResult />
                  </>
                ) : examState.results && examState.showResult ? (
                  <div className='flex gap-5'>
                    {examState.results.WrongQuestions.map((wrongQ, index) => (
                      <ShowWrongAnswers
                        key={index}
                        wrongQ={wrongQ}
                        index={index}
                        examState={examState}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              // Active Exam
              <>
                <div className='flex justify-between'>
                  <p>
                    Question {examState.currentQuestion + 1} of
                    {examState.questions.length}
                  </p>
                  <p>
                    <CountdownTimer
                      // initialSeconds={10}
                      initialSeconds={duration * 60}
                      onTimerEnd={handleTimerEnd}
                    />
                  </p>
                </div>

                {/* Question Progress Indicators */}
                <div className='flex gap-3 justify-between my-4'>
                  {examState.questions.map((_, i) =>
                    i <= examState.currentQuestion ? (
                      <svg
                        key={`question-circle-filled-${i}`}
                        width='10'
                        height='11'
                        viewBox='0 0 10 11'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle cx='5' cy='5.76343' r='5' fill='#4461F2' />
                      </svg>
                    ) : (
                      <svg
                        key={`question-circle-empty-${i}`}
                        width='11'
                        height='11'
                        viewBox='0 0 11 11'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='5.21045'
                          cy='5.76343'
                          r='5'
                          fill='#D9D9D9'
                        />
                      </svg>
                    )
                  )}
                </div>

                {/* Current Question */}
                <CurrentQuestion examState={examState} />
              </>
            )}

            {/* Navigation Buttons */}
            <div className='flex gap-3'>
              {examState.status === 'in_progress' && (
                <>
                  {examState.currentQuestion > 0 && (
                    <button
                      onClick={handlePreviousQuestion}
                      className='w-full py-2 mt-2 rounded-[20px] bg-[#4461F2] text-white'
                    >
                      Back
                    </button>
                  )}
                  {examState.currentQuestion <
                  examState.questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className='w-full py-2 mt-2 rounded-[20px] bg-[#4461F2] text-white'
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitExam}
                      className='w-full py-2 mt-2 rounded-[20px] bg-[#4461F2] text-white'
                    >
                      Finish
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

export default ExamCard;
