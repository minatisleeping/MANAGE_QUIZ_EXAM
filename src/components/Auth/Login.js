import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClickLoginBtn = async () => {
    // validate

    // submit api
    const data =  await postLogin(email, password)

    if (data && data.EC === 0) {
      dispatch(doLogin(data))
      toast.success('Login successfully!')
      navigate('/')
    }

    if (data && +data.EC !== 0) toast.error(data.EM)
  }

  const backHomePage = () => navigate('/')
  const signUpPage = () => navigate('/register')

  return(
    <div className='login-container'>
      <div className='header'>
        <span>Don't have an account yet?</span>
        <button onClick={() => signUpPage()}>Sign up</button>
      </div>
      <div className='title col-4 mx-auto'>Minatisleeping</div>
      <div className='welcome col-4 mx-auto'>
        Hello, who's this?
      </div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
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
        <span className='text-decoration-underline'>Forgot password?</span>
        <div className='d-flex justify-content-center'>
          <button
            onClick={() => handleClickLoginBtn()}
          >
            Login to Minatisleeping
          </button>
        </div>
        <div className='text-center btn-homepage' onClick={() => backHomePage()}>
          <span>&lt;&lt; Go to HomePage</span>
        </div>
      </div>
    </div>
  )
}
 
export default Login
