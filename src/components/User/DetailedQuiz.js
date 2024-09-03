/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getQuizById } from '../../services/apiService'
import _ from 'lodash'
import './DetailedQuiz.scss'
import Question from './Question'

const DetailedQuiz = () => {
  const params = useParams()
  const location = useLocation()
  const quizId = params.id
  
  const [dataQuiz, setDataQuiz] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  const fetchQuestions = async () => {
    const res = await getQuizById(quizId)

    if (res && res.EC === 0) {
      let raw = res.DT
      let data = _.chain(raw)
        .groupBy('id')
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
      setDataQuiz(data)
    }
  }

  const handlePrev = () => dataQuiz && index > 0 && setIndex(index - 1) // Nếu index > 0 thì mới cho phép giảm index
  const handleNext = () => dataQuiz && dataQuiz.length > index + 1 && setIndex(index + 1) // Nếu index < dataQuiz.length thì mới cho phép tăng index

  return(
    <div className='detail-quiz-container'>
      <div className='left-content'>
        <div className='title'>
          Quiz: {quizId}: {location?.state?.quizTitle}
          <hr/>
        </div>
        <div className='q-body'>
          <img alt=''/>
        </div>
        <div className='q-content'>
          <Question index={index} data={
            dataQuiz && dataQuiz.length > 0
            ? dataQuiz[index]
            : []
          } />
        </div>
        <div className='footer'>
          <button className='btn btn-primary' onClick={() => handlePrev()}>
            Prev
          </button>
          <button className='btn btn-secondary' onClick={() => handleNext()}>
            Next
          </button>
          <button className='btn btn-warning' onClick={() => handleNext()}>
            Finish
          </button>
        </div>
      </div>
      <div className='right-content'>
        Count down
      </div>
    </div>
  )
}
 
export default DetailedQuiz
