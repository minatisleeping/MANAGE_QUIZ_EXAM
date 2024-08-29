import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../../services/apiService'
import { toast } from 'react-toastify'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleClickRegisterBtn = async () => {
    // validate

    // submit api
    const res =  await postRegister(username, email, password)

    if (res && res.EC === 0) {
      toast.success('Register successfully!')
      navigate('/login')
    }
 
    if (res && +res.EC !== 0) toast.error(res.EM)
  }

  const backHomePage = () => {
    navigate('/')
  }

  return(
    <div className='login-container'>
      <div className='title col-4 mx-auto'>Minatisleeping</div>
      <div className='welcome col-4 mx-auto'>
        Register Form
      </div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            className='form-control'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button
            onClick={() => handleClickRegisterBtn()}
          >
            Register
          </button>
        </div>
        <div className='text-center btn-homepage' onClick={() => backHomePage()}>
          <span>&lt;&lt; Go to HomePage</span>
        </div>
      </div>
    </div>
  )
}
 
export default Register
