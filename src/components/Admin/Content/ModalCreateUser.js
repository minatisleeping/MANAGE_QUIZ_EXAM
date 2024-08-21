import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FcPlus } from "react-icons/fc"
import { toast } from 'react-toastify'

const ModalCreateUser = (props) => {
  const { show, setShow } = props
  const handleClose = () => {
    setShow(false)
    setEmail('')
    setPassword('')
    setRole('user')
    setUsername('')
    setImage('')
    setPreviewImage('')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

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

  const handleSubmitCreateUser = async () => {
    if (!validateEmail(email)) {
      // alert('Email is invalid!')
      // toast.error('Email is invalid!')
      toast.error('Email is invalid!')
      return
    }

    if (!password) {
      toast.error('Password is required!')
      return
    }

    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    data.append('username', username)
    data.append('role', role)
    data.append('userImage', image)

    const res = await axios.post('http://localhost:8081/api/v1/participant', data)
    console.log('🚀 ~ res:', res.data)
    if (res.data && res.data.EC === 0) {
      toast.success('Create user successfully!')
      handleClose()
    }

    if (res.data && res.data.EC !== 0) toast.error(res.data.EM)
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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                value={password}
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
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
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
          <Button variant='primary' onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCreateUser