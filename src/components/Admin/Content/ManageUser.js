import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import TableUser from './TableUser'
import { getAllUsers } from '../../../services/apiService'
import ModalUpdateUser from './ModalUpdateUser'

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [listUser, setListUser] = useState([])
  const [dataUpdate, setDataUpdate] = useState({})

  useEffect(() => {
    fetchListUser()
  }, [])

  const fetchListUser = async () => {
    const result = await getAllUsers()

    if (result.EC === 0) setListUser(result.DT)
  }

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user)
  }

  return(
    <div className='manage-user-container'>
      <div className='title'>
        Manage User
      </div>
      <div className='user-content'>
        <div className='btn-add-new'>
          <button
            className='btn btn-primary'
            onClick={() => setShowModalCreateUser(true)}
          > 
            <FcPlus /> Add new user
          </button>
        </div>
        <div className='table-user-container'>
          <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
        <ModalUpdateUser 
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  )
}
 
export default ManageUser
