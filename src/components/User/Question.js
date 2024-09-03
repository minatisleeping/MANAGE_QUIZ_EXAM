import _ from 'lodash'

const Question = (props) => {
  const { data, index } = props  

  if (_.isEmpty(data)) return (<></>)

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
              <div class='form-check'>
                <input class='form-check-input' type='checkbox' value=''/>
                <label class='form-check-label'>
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
