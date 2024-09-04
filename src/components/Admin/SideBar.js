import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'
import { FaGem, FaGithub } from 'react-icons/fa'
import sidebarBg from '../../assets/bg2.jpg'
import './SideBar.scss'
import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props
  const nav = useNavigate()

  return(
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint='md'
        onToggle={handleToggleSidebar}
      >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <DiReact size={'2.5em'} color={'00bfff'} onClick={() => nav('/')} style={{ cursor:'pointer' }}/>
          <span onClick={() => nav('/')} style={{ cursor:'pointer' }}>
            &nbsp;Minatisleeping
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
          <MenuItem
            icon={<MdDashboard />}
          >
            Dashboard
            <Link to='/admin' />
          </MenuItem>
        </Menu>
        <Menu iconShape='circle'>
          <SubMenu
            icon={<FaGem />}
            title='Features'
          >
            <MenuItem>
              Manage User
              <Link to='/admin/manage-user' />
            </MenuItem>
            <MenuItem>
              Manage Quiz
              <Link to='/admin/manage-quiz' />
            </MenuItem>
            <MenuItem>
              Manage Answer
              <Link to='/admin/manage-answer' />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className='sidebar-btn-wrapper'
          style={{ padding: '20px 24px' }}
        >
          <a
            href='https://github.com/minatisleeping'
            target='_blank'
            className='sidebar-btn'
            rel='noopener noreferrer'
          >
            <FaGithub />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Minatisleeping
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
    </>
  )
}
 
export default SideBar
