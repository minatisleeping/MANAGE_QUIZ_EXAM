import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'
import { ImSpinner10 } from 'react-icons/im'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleClickLoginBtn = async () => {
    if (!validateEmail(email)) return toast.error('Invalid email!')
    if (!password) return toast.error('Invalid password!')

    setIsLoading(true)
    // submit api
    const data = await postLogin(email, password)

    if (data && data.EC === 0) {
      dispatch(doLogin(data))
      toast.success('Login successfully!')
      setIsLoading(false)
      navigate('/')
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM)
      setIsLoading(false)
    }
  }

  const backHomePage = () => navigate('/')
  const signUpPage = () => navigate('/register')

  return (
    <div className='login-container'>
      <div className='header'>
        <span>Don't have an account yet?</span>
        <button onClick={() => signUpPage()}>Sign up</button>
      </div>
      <div className='title col-4 mx-auto'>Minatisleeping</div>
      <div className='welcome col-4 mx-auto'>Hello, who's this?</div>
      <div className='content-form col-4 mx-auto'>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className='text-decoration-underline'>Forgot password?</span>
        <div className='d-flex justify-content-center'>
          <button onClick={() => handleClickLoginBtn()} disabled={isLoading}>
            {isLoading === true && <ImSpinner10 className='loading-icon' />}
            &nbsp;&nbsp;<span>Login to Minatisleeping</span>
          </button>
        </div>
        <div
          className='text-center btn-homepage'
          onClick={() => backHomePage()}
        >
          <span>&lt;&lt; Go to HomePage</span>
        </div>
      </div>
    </div>
  )
}

export default Login
