function CurrentQuestion({examState}) {
    return (
        <div>
        <p className='text-[24px] font-medium'>
          {examState.questions[examState.currentQuestion].question}
        </p>
        <ul>
          {examState.questions[examState.currentQuestion].answers.map(
            (answer, aIndex) => (
              <li
                key={`answer-${examState.currentQuestion}-${aIndex}`}
                className='bg-[#EDEFF3] mb-3 rounded-[10px] p-[16px_8px]'
              >
                <input
                  type={
                    examState.questions[examState.currentQuestion]
                      .type === 'single_choice'
                      ? 'radio'
                      : 'checkbox'
                  }
                  name={`question-${examState.currentQuestion}`}
                  id={`answer-${examState.currentQuestion}-${aIndex}`}
                  className='me-3'
                  onChange={() =>
                    handleAnswerSelect(
                      examState.questions[examState.currentQuestion]
                        ._id,
                      answer.key,
                      examState.questions[examState.currentQuestion]
                        .type
                    )
                  }
                  checked={isAnswerSelected(
                    examState.questions[examState.currentQuestion]
                      ._id,
                    answer.key
                  )}
                />
                <label
                  className='text-[20px]'
                  htmlFor={`answer-${examState.currentQuestion}-${aIndex}`}
                >
                  {answer.answer}
                </label>
              </li>
            )
          )}
        </ul>
      </div>
    )
}

export default CurrentQuestion
