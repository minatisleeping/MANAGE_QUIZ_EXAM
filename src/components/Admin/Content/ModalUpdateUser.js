import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcPlus } from "react-icons/fc"
import { toast } from 'react-toastify'
import { putUpdateUser } from '../../../services/apiService'
import _ from 'lodash'

const ModalUpdateUser = (props) => {
  const {
    show,
    setShow,
    dataUpdate,
    resetUpdateData,
    currentPage,
    // setCurrentPage,
    fetchListUserWithPagination
  } = props

  const handleClose = () => {
    setShow(false)
    setEmail('')
    setPassword('')
    setRole('user')
    setUsername('')
    setImage('')
    setPreviewImage('')
    resetUpdateData()
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    console.log('run useEffect', dataUpdate)
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email)
      setRole(dataUpdate.role)
      setUsername(dataUpdate.username)
      setImage('')
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
      }
    }
  }, [dataUpdate])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0]) // dòng này để lưu file image vào state image
    } else {
      // setPreviewImage('')
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSubmitUpdateUser = async () => {
    if (!validateEmail(email)) return toast.error('Email is invalid!')

    const data = await putUpdateUser(dataUpdate.id, username, role, image)
    console.log('🚀 ~ data:', data)

    if (data && data.EC === 0) {
      toast.success('Update user successfully!')
      handleClose()
      // setCurrentPage(1)
      await fetchListUserWithPagination(currentPage)
    }

    if (data && data.EC !== 0) toast.error(data.EM)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        backdrop='static'
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                value={email}
                disabled
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
                disabled
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label'>Role</label>
              <select
                className='form-select'
                onChange={event => setRole(event.target.value)}
                value={role}
              >
                <option value='USER'>User</option>
                <option value='ADMIN'>Admin</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus />
                Upload File Image
              </label>
              <input
                type='file'
                hidden
                id='labelUpload'
                onChange={event => handleUploadImage(event)}
              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage
                ? <img src={previewImage} alt='restaurant-img' />
                : <span>Image Preview</span>
              }
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUpdateUser
