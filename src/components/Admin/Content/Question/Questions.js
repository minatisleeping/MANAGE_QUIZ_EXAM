import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsPatchMinusFill, BsPatchPlusFill } from "react-icons/bs"
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai"


const Questions = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className='questions-container'>
      <div className='title'>Manage Questions</div>

      <div className='add-new-question'>
        <label>Select Quiz:</label>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <div className='mt-3'>
        Add questions:
      </div>
      <div>
        <div className='questions-content'>
          <div className='form-floating description'>
            <input type='text' className='form-control' placeholder='name@example.com' />
            <label>Description</label>
          </div>
          <div className='group-upload'>
            <label className='lbl-up'>Upload Image</label>
            <input type='file' hidden />
            <span>0 file is uploaded</span>
          </div>
          <div className='btn-add'>
            <span>
              <BsPatchPlusFill className='icon-add' />
            </span>
            <span>
              <BsPatchMinusFill className='icon-remove' />
            </span>
          </div>
        </div>
        <div className='answers-content'>
          <input
            className='form-check-input is-correct'
            type='checkbox'
          />
          <div className='form-floating answer-name'>
            <input type='text' className='form-control' placeholder='name@example.com' />
            <label>Answer 1</label>
          </div>
          <div className='btn-group'>
            <span>
              <AiFillPlusSquare className='icon-add' />
            </span>
            <span>
              <AiFillMinusSquare className='icon-remove' />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Questions
