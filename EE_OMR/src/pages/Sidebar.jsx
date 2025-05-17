import React from "react";
import SidebarItem from "../components/SidebarItem";
import IconMerge from "../assets/icons/IconMerge";
import IconImage from "../assets/icons/IconImage";
import IconLine from "../assets/icons/IconLine";
import IconText from "../assets/icons/IconText";
import IconInstructions from "../assets/icons/IconInstructions";
import IconBucket from "../assets/icons/IconBucket";
import IconBarcode from "../assets/icons/IconBarcode";
import IconQrcode from "../assets/icons/IconQrcode";
import IconField from "../assets/icons/IconField";
import IconQuestion from "../assets/icons/IconQuestion";

const sidebarStyles = {
  // width:'200px',
  //height: "100vh",
  backgroundColor: "#3D5EE1",
  color: "#FFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "10px",
  overflowY: "auto",
  paddingTop: "10px",
};

const Sidebar = ({ mergeCells, handleCapture }) => {
  return (
    <div style={sidebarStyles}>
      <SidebarItem icon={<IconMerge />} title={"Merge"} onClick={mergeCells} />
      <>
        {" "}
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          onChange={handleCapture}
          type="file"
        />
        <label htmlFor="raised-button-file"><SidebarItem icon={<IconImage />} title={"Image"} /></label>
      </>
      <SidebarItem icon={<IconLine />} title={"Line"} />
      <SidebarItem icon={<IconText />} title={"Text"} />
      <SidebarItem icon={<IconInstructions />} title={"Instructions"} />
      <SidebarItem icon={<IconBucket />} title={"OMR Color"} />
      <SidebarItem icon={<IconBarcode />} title={"Barcode"} />
      <SidebarItem icon={<IconQrcode />} title={"QR Code"} />
      <SidebarItem icon={<IconField />} title={"Field"} />
      <SidebarItem icon={<IconQuestion />} title={"Question"} />
    </div>
  );
};

export default Sidebar;
