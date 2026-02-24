import React from 'react'
import { SidebarData } from '../../Redux/interface'
import { SideBarItems, Texts } from '../../Redux'
import { BlueArrow } from '../../assets/images'
import { getInitials } from '../../Utils'
import './Sidebar.css'

const Sidebar: React.FunctionComponent<SidebarData> = (props) => {
  const { nameUser, date } = props
  return (
    <aside className="sidebarContent">
      <div className="userDataInfo">
        <p>{getInitials(nameUser)}</p>
        <p>{Texts.CONSULT}: <b>{nameUser}</b></p>
        {date && <p>{Texts.CONSULT_DATE}: <b>{date}</b></p>}
      </div>
      <ul>
        {
          SideBarItems.map((item, index) => (
            <li key={index + 1} className='sideTab activeSideTab'>
              <button type='button' className='sideTabButton'>
                <img src={item.src} alt="sideTab_icon"/>
                <p>{item.id}</p>
                <img src={BlueArrow} alt="arrow_interac" />
              </button>
            </li>
          ))
        }
      </ul>
    </aside>
  )
}

export default Sidebar