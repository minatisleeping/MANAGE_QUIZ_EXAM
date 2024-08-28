import ReactPaginate from 'react-paginate'

const TableUserPaginate = (props) => {
  const {
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchListUserWithPagination,
    pageCount,
    currentPage,
    setCurrentPage
  } = props
  
  const handlePageClick = (event) => {
    fetchListUserWithPagination(+event.selected + 1)
    setCurrentPage(+event.selected + 1)
    console.log(`User requested page number ${event.selected}`)
  }

  return (
    <>
      <table className='table table-hover table-bordered'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Username</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className='btn btn-secondary'
                      onClick={() => handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className='btn btn-warning mx-3'
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                     className='btn btn-danger'
                     onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
          {listUser && listUser.length === 0 &&
            <tr>
              <td colSpan={4}>Not found user</td>
            </tr>
          }
        </tbody>
      </table>
      <div className='user-pagination'>
        <ReactPaginate
          nextLabel='next >'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel='< prev'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  )
}

export default TableUserPaginate
