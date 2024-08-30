import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuizById } from '../../services/apiService'

const DetailedQuiz = () => {
  const params = useParams()
  const quizId = params.id
  
  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  const fetchQuestions = async () => {
    const res = await getQuizById(quizId)
    console.log('🚀 ~ res:', res)
  }

  return(
    <div className='detail-quiz-container'>Detailed Quiz</div>
  )
}
 
export default DetailedQuiz
