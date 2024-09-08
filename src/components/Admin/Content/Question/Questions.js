import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { BsPatchMinusFill, BsPatchPlusFill } from 'react-icons/bs'
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'

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
      <hr />
      <div className='add-new-question'>
        <label className='mb-2'>Select Quiz:</label>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <div className='mt-3 mb-2'>
        Add questions:
      </div>
      <div>
        <div className='questions-content'>
          <div className='form-floating description'>
            <input type='text' className='form-control' placeholder='name@example.com' />
            <label>Question's description</label>
          </div>
          <div className='group-upload'>
            <label>
              <RiImageAddFill className='lbl-up'/>
            </label>
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
