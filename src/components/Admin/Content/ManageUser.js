import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import TableUser from './TableUser'
import { getAllUsers } from '../../../services/apiService'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
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

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true)
    setDataUpdate(user)
  }

  const resetUpdateData = () => {
    setDataUpdate({})
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
            handleClickBtnView={handleClickBtnView}
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
          fetchListUser={fetchListUser}
          resetUpdateData={resetUpdateData}
        />
        <ModalViewUser 
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  )
}
 
export default ManageUser
