import React from 'react'
import "./ComponentStyle.css"



const SidebarItem = ({icon, title, onClick}) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
          <div> {icon}</div> 
          <div>{title}</div>
      
    </div>
  )
}

export default SidebarItem
