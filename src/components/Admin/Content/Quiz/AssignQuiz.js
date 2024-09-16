import { useState, useEffect } from 'react'
import Select from 'react-select'
import { getAllQuizByAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState({})
  const [listUser, setListUser] = useState([])
  const [selectedUser, setSelectedUser] = useState({})
  
  useEffect(() => {
    fetchListQuiz()
    fetchListUser()
  }, [])
  
  const fetchListQuiz = async () => {
    const res = await getAllQuizByAdmin()
    if (res && res.EC === 0) {
      const newQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`
        }
      })
      setListQuiz(newQuiz)
    }
  }
  
  const fetchListUser = async () => {
    const res = await getAllUsers()
    if (res && res.EC === 0) {
      const user = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.username}`
               ? `${item.id} - ${item.username} - ${item.email}`
               : `${item.id} - updating.. - ${item.email}`
        }
      })
      setListUser(user)
    }
  }

  const handleAssign = async () => {
    console.log('🚀 ~ selectedQuiz.value, selectedUser.value:', selectedQuiz.value, selectedUser.value)
    const res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
    if (res && res.EC === 0) {
      toast.success('Assign quiz successfully!')
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <div className='assign-quiz-container row'>
      <div className='form-group col-6'>
        <label className='mb-2'>Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className='form-group col-6'>
        <label className='mb-2'>Select User:</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div className='d-flex justify-content-center'>
        <button
          className='btn btn-warning mt-3 w-50 fw-bold'
          onClick={() => handleAssign()}
        >
          ASSIGN
        </button>
      </div>
    </div>
  )
}
 
export default AssignQuiz
