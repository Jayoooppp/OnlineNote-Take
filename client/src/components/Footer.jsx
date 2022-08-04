import React from "react";
import "./common.css"

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div id="footer">Copyright ⓒ {year}</div>
  );
}

export default Footer;
