import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props

  const handleClose = () => setShow(false)

  const handleConfirmDelete = () => {
    alert('Delete user mất tiu!')
  }
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
          <Modal.Title>Confirm delete user !?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user with mail &nbsp;
          <b>
            { dataDelete && dataDelete.email
              ? dataDelete.email
              : '' }
          </b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleConfirmDelete()}>
            Really sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteUser
