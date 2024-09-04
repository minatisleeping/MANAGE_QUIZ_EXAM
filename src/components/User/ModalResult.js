import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props
  
  const handleClose = () => setShow(false)

  console.log('🚀 ~ dataModalResult:', dataModalResult)

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        centered // center modal
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Your result..</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Questions: <b>{dataModalResult.countTotal}</b></div>
          <div>Total Correct Answer: <b>{dataModalResult.countCorrect}</b></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Show answer
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalResult
