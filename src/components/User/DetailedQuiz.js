import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getQuizById } from '../../services/apiService'
import _ from 'lodash'
import './DetailedQuiz.scss'

const DetailedQuiz = () => {
  const params = useParams()
  const location = useLocation()
  const quizId = params.id
  
  console.log('🚀 ~ location:', location)
  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  const fetchQuestions = async () => {
    const res = await getQuizById(quizId)

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
          <div className='question'>Question 1: How are u doing?</div>
          <div className='answer'>
            <div className='a-child'>A. Con chim</div>
            <div className='b-child'>B. Con mèo</div>
            <div className='c-child'>C. Con kền kền</div>
          </div>
        </div>
        <div className='footer'>
          <button className='btn btn-primary'>Prev</button>
          <button className='btn btn-secondary'>Next</button>
        </div>
      </div>
      <div className='right-content'>
        Count down
      </div>
    </div>
  )
}
 
export default DetailedQuiz
