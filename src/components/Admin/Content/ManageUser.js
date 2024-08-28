import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import { getAllUsers, getListUserWithPagination } from '../../../services/apiService'
import ModalUpdateUser from './ModalUpdateUser'
import ModalViewUser from './ModalViewUser'
import ModalDeleteUser from './ModalDeleteUser'
import TableUserPaginate from './TableUserPaginate'

const ManageUser = () => {
  const LIMIT_USER = 5
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

  const [listUser, setListUser] = useState([])
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataDelete, setDataDelete] = useState({})
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    // fetchListUser()
    fetchListUserWithPagination(1)
  }, [])

  const fetchListUser = async (page) => {
    const result = await getAllUsers()

    if (result.EC === 0) setListUser(result.DT)
  }

  const fetchListUserWithPagination = async (page) => {
    const result = await getListUserWithPagination(page, LIMIT_USER)
    console.log(result.DT.users)

    if (result.EC === 0) {
      setListUser(result.DT.users)
      setPageCount(result.DT.totalPages)
    }
  }

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user)
  }

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true)
    setDataUpdate(user)
  }

  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true)
    setDataDelete(user)
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
          {/* <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUserWithPagination={fetchListUserWithPagination}
            pageCount={pageCount}
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
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  )
}
 
export default ManageUser
