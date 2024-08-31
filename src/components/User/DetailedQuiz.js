import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuizById } from '../../services/apiService'
import _ from 'lodash'

const DetailedQuiz = () => {
  const params = useParams()
  const quizId = params.id
  
  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  const fetchQuestions = async () => {
    const res = await getQuizById(quizId)
    console.log('🚀 ~ res:', res)
    if (res && res.EC === 0) {
      let raw = res.DT
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = []
          let questionDesc, image = null
          value.forEach((item, index) => {
            if (index === 0) { // vòng lặp đầu tiên lấy ra questionDesc và image vì nó không thay đổi
              questionDesc = item.description
              image = item.image
            }
            answers.push(item.answers)
          })
          
          return { questionId: key, questionDesc, answers, image }
        })
        .value()
      console.log('🚀 ~ data:', data)
    }
  }

  return(
    <div className='detail-quiz-container'>Detailed Quiz</div>
  )
}
 
export default DetailedQuiz
