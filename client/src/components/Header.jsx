import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { useNavigate } from 'react-router-dom';


function Header(props) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <div>
        <h2>{props.name}</h2>
        {props.logout ? <a href="/" onClick={() => {
          localStorage.removeItem("userInfo");
          navigate("/");
        }}>Logout</a> : null}
      </div>

    </header >
  );
}

export default Header;
