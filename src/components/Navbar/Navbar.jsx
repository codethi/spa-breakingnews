import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../images/LogoBN.png";
import "./Navbar.css";

function Navbar() {
  let navigate = useNavigate();

  function search(e) {
    if (e.target.value) {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <nav>
        <img src={logo} className="logo-image" />

        <div className="controls">
          <div className="input-search-space">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Pesquise por um titulo"
              onChange={search}
              className="search-input"
            />
          </div>
          <button type="button" className="btn-menu">
            <i className="bi bi-list"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
