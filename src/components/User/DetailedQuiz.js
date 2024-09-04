/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getQuizById, postSubmitQuiz } from '../../services/apiService'
import _ from 'lodash'
import './DetailedQuiz.scss'
import Question from './Question'
import ModalResult from './ModalResult'

const DetailedQuiz = () => {
  const params = useParams()
  const location = useLocation()
  const quizId = params.id
  
  const [dataQuiz, setDataQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModalResult, setDataModalResult] = useState({})

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
            item.answers.isSelected = false
            answers.push(item.answers)
          })
          
          return { questionId: key, questionDesc, answers, image }
        })
        .value()
      setDataQuiz(data)
    }
  }

  const handlePrev = () => dataQuiz && index > 0 && setIndex(index - 1) // Nếu index > 0 thì mới cho phép giảm index

  const handleNext = () => dataQuiz && dataQuiz.length > index + 1 && setIndex(index + 1) // Nếu index < dataQuiz.length thì mới cho phép tăng index

  const handleFinish = async () => {
    console.log('🚀 ~ dataQuiz:', dataQuiz)

    let payload = {
      quizId: +quizId,
      answers: []
    }
    let answers = []

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(question => {
        let questionId = +question.questionId
        let userAnswerId = []

        question.answers.forEach(answer => {
          if (answer.isSelected) userAnswerId.push(answer.id)
        })

        answers.push({ questionId, userAnswerId })
      })
    }

    payload.answers = answers
    
    // submit api
    const res = await postSubmitQuiz(payload)
    console.log('🚀 ~ res:', res)

    if (res && res.EC === 0) {
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.quizData
      })
      setIsShowModalResult(true)
    } else {
      alert('Something went wrong!')
    }
  }

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz)
    let question = dataQuizClone.find(item => +item.questionId === +questionId)

    if (question && question.answers) {
      let tmp = question.answers.map(item => {
        if (+item.id === +answerId) item.isSelected = !item.isSelected

        return item
      })

      question.answers = tmp
    }

    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if (index > -1) {
      dataQuizClone[index] = question
      setDataQuiz(dataQuizClone)
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
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={
              dataQuiz && dataQuiz.length > 0
              ? dataQuiz[index]
              : []
            } 
          />
        </div>
        <div className='footer'>
          <button className='btn btn-primary' onClick={() => handlePrev()}>
            Prev
          </button>
          <button className='btn btn-secondary' onClick={() => handleNext()}>
            Next
          </button>
          <button className='btn btn-warning' onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className='right-content'>
        Count down
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  )
}
 
export default DetailedQuiz
