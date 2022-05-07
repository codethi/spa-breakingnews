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

  function goHome() {
    navigate("/")
  }

  return (
    <>
      <nav>
        <div className="space-btn-menu">
          <button type="button" className="btn-menu">
            <i className="bi bi-list"></i>
          </button>
        </div>

        <img src={logo} className="logo-image" onClick={goHome} />

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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
