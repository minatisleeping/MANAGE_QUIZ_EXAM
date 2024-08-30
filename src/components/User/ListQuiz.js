import { useEffect, useState } from 'react'
import { getQuizByUser } from '../../services/apiService'
import './ListQuiz.scss'

const ListQuiz = () => {
  const [arrQuiz, setArrQuiz] = useState([])

  useEffect(() => {
    getQuizDate()
  }, [])

  const getQuizDate = async () => {
    const res = await getQuizByUser()
    if (res && res.EC === 0) setArrQuiz(res.DT)
  }

  return (
    <div className='list-quiz-container container'>
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div key={`${index}-quiz`} className='card' style={{ width: '18rem' }}>
              <img className='card-img-top' src={`data:image/jpeg;base64,${item.image}`} alt='Card img cap' />
              <div className='card-body'>
                <h5 className='card-title'>Quiz {index + 1}</h5>
                <p className='card-text'>{item.description}</p>
                <button className='btn btn-primary'>Start Now!</button>
              </div>
            </div>
          )
        })}

        {arrQuiz && arrQuiz.length === 0 &&
            <div>Currently you don't have any quiz..</div>
        }
    </div>
  )
}

export default ListQuiz
