import { Route, Routes } from 'react-router-dom'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage'
import ManageUser from './components/Admin/Content/ManageUser'
import Dashboard from './components/Admin/Content/Dashboard'
import Login from './components/Auth/Login'
import App from './App'
import { ToastContainer } from 'react-toastify'
import Register from './components/Auth/Register'
import ListQuiz from './components/User/ListQuiz'
import DetailedQuiz from './components/User/DetailedQuiz'
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz'
import Questions from './components/Admin/Content/Question/Questions'

const NotFound = () => {
  return(
    <div className='container mt-3 alert alert-danger d-flex justify-content-center t-1'>
      <span>404 Not found data with your current URL..</span>
    </div>
  )
}

const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='/user' element={<ListQuiz />} />
        </Route>
        <Route path='/quiz/:id' element={<DetailedQuiz />} />
        <Route path='/admin' element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path='manage-user' element={<ManageUser />} />
          <Route path='manage-quiz' element={<ManageQuiz />} />
          <Route path='manage-question' element={<Questions />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}

export default Layout
