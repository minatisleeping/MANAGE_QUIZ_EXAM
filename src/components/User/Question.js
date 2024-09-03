import _ from 'lodash'

const Question = (props) => {
  const { data, index, handleCheckbox } = props  

  if (_.isEmpty(data)) return (<></>)

  const handleTickCheckbox = (event, aId, qId) => {
    // console.log('🚀 ~ aId, qId:', aId, qId)
    // console.log(event.target.checked)
    handleCheckbox(aId, qId)
  }

  return (
    <>
      {data.image
        ? <div className='q-image'>
            <img src={`data:image/png;base64, ${data.image}` } alt='img-question'/>
          </div>
        : <div className='q-image'>

          </div>
      }
      <div className='question'>Question {index + 1}: {data.questionDesc}?</div>
      <div className='answer'>
        {data.answers && data.answers.length && data.answers.map((item, index) => {
          return (
            <div className='a-child' key={`answer-${index}`}>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={item.isSelected}
                  onChange={(event) => handleTickCheckbox(event, item.id, data.questionId)}
                />
                <label className='form-check-label'>
                  {item.description}
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
 
export default Question
