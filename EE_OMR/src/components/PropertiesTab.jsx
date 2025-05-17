import React from 'react'

const propertiesStyles = {
    width:'20rem',
    height: "400px",
    backgroundColor: "#FFF",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent:"start",
    gap: "10px",
    overflowY: 'auto',
    border:"1px solid #3D5EE1",
    marginTop:"80px",
    fontSize:"12px",
    borderRadius:"5px"
}

const PropertiesTab = () => {
  return (
    <div style={propertiesStyles}>
        <div style={{backgroundColor: "#3D5EE1", color:"#FFF", padding:"5px", border:"1px solid #3D5EE1",}}>Properties</div>

        <div style={{padding:"10px", display:"flex", justifyContent:"space-between"}}>
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" />
        </div>
        <div style={{padding:"10px", display:"flex", justifyContent:"space-between"}}>
            <label htmlFor="value">Value: </label>
            <input id="value" type="text" />
        </div>
        <div style={{padding:"10px", display:"flex", justifyContent:"space-between"}}>
            <label htmlFor="length">Length: </label>
            <input id="length" type="text" />
        </div>
        <div style={{padding:"10px", display:"flex", justifyContent:"space-between"}}>
            <label htmlFor="spacing">Spacing: </label>
            <input id="spacing" type="text" />
        </div>
      
    </div>
  )
}

export default PropertiesTab
