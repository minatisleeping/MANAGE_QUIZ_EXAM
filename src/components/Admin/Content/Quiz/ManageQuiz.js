import { useState } from 'react'
import './ManageQuiz.scss'
import Select from 'react-select'

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
]

const ManageQuiz = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('EASY')
  const [image, setImage] = useState(null)

  const handleChangeFile = (event) => {
    // setType(event)
  }

  return(
    <div className='quiz-container'>
      <div className='title'>
        Manage Quiz
        <hr />
      </div>
      <div className='add-new'>
        <fieldset className='border rounded-3 p-3'>
          <legend className='float-none w-auto px-3'>Add new Quiz</legend>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='..'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              placeholder='..'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>
          <div className='my-3'>
            <Select
              value={type}
              options={options}
              placeholder='Quiz type..'
              
            />
          </div>
          <div className='more-actions form-group'>
            <label className='mb-2'>Upload Image</label> <br />
            <input
              style={{ cursor:'pointer' }}
              type='file'
              className='form-control'
              onChange={(event) => handleChangeFile(event)}
            />
          </div>
        </fieldset>
      </div>
      <div className='list-detail'>
        List Detail
      </div>
    </div>
  )
}
 
export default ManageQuiz
