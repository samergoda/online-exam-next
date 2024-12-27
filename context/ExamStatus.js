import { createContext } from "react"

function ExamStatus( {children}) {
    const ExamState = createContext({
        showPopup: false,
        questions: [],
        currentQuestion: 0,
        selectedAnswers: { answers: [], time: 0 },
        results: null,
        showResult: false,
        status: 'not_started',
      })
    
    return (
        <ExamState.Provider>

 {children}
        </ExamState.Provider>
    )
}

export default ExamStatus

