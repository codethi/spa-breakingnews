import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../images/LogoBN.png";
import LoginModal from "../LoginModal/LoginModal";
import "./Navbar.css";

function Navbar() {
  let navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [refreshLogin, setRefreshLogin] = useState(0);

  function search(e) {
    if (e.target.value) {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate("/");
    }
  }

  function goHome() {
    navigate("/");
  }

  function handleOpenLoginModal() {
    setIsLoginModalOpen(true);
  }

  function handleCloseLoginModal() {
    setIsLoginModalOpen(false);
  }

  function onLogin() {
    setRefreshLogin(refreshLogin + 1);
  }

  

  return (
    <>
      <nav>
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

        <img src={logo} className="logo-image" onClick={goHome} />

        <div className="space-btn-menu">
          <button
            type="button"
            className="btn-menu"
            onClick={handleOpenLoginModal}
          >
            Entrar
          </button>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        closeModal={handleCloseLoginModal}
        onLogin={onLogin}
      />
    </>
  );
}

export default Navbar;
