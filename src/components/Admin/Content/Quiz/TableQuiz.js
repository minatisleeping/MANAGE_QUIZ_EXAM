import { useEffect, useState } from 'react'
import { getAllQuizByAdmin } from '../../../../services/apiService'

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([])

  useEffect(() => {
    fetchListQuiz()
  }, [])

  const fetchListQuiz = async () => {
    const res = await getAllQuizByAdmin()
    console.log('🚀 ~ res.DT:', res.DT)
    if (res && res.EC === 0) {
      setListQuiz(res.DT)
    }
  }

  return (
    <>
      <h3 className='text-center mt-3'>List Quiz</h3>
      <table className='table table-bordered table-hover my-2'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Description</th>
            <th scope='col'>Type</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz && listQuiz.map((quiz, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.description}</td>
                <td className='ps-3 pt-3'>{quiz.difficulty}</td>
                <td style={{ display:'flex', gap: '15px' }}>
                  <button className='btn btn-warning'>Edit</button>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
 
export default TableQuiz
