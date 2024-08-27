import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { deleteUser } from '../../../services/apiService'
import { toast } from 'react-toastify'

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, fetchListUser } = props

  const handleClose = () => setShow(false)

  const handleConfirmDelete = async () => {
    console.log('🚀 ~ dataDelete.id:', dataDelete.id)
    const data = await deleteUser(dataDelete.id)

    if (data && data.EC === 0) {
      toast.success('Delete user successfully!')
      await fetchListUser()
      handleClose()
    }

    if (data && data.EC !== 0) toast.error(data.EM)
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
