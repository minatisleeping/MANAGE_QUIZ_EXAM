import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa'
import sidebarBg from '../../assets/bg2.jpg'
import './SideBar.scss'

import { DiReact } from 'react-icons/di'
import { MdDashboard } from 'react-icons/md'


const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props
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
          <DiReact size={'2.5em'} color={'00bfff'}/>
          &nbsp;Minatisleeping
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape='circle'>
          <MenuItem
            icon={<MdDashboard />}
          >
            Dashboard
          </MenuItem>
        </Menu>
        <Menu iconShape='circle'>
          <SubMenu
            icon={<FaGem />}
            title='Features'
          >
            <MenuItem>Manage User</MenuItem>
            <MenuItem>Manage Quiz</MenuItem>
            <MenuItem>Manage Answer</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className='sidebar-btn-wrapper'
          style={{
            padding: '20px 24px',
          }}
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