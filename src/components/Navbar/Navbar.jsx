import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../images/LogoBN.png";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import Modals from "../Modals/Modals";
import swal from "sweetalert";
import "./Navbar.css";

function Navbar() {
  let navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [refreshLogin, setRefreshLogin] = useState(0);
  const [userLogged, setUserLogged] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  const fieldList = [
    {
      field: "input",
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Email",
    },
    {
      field: "input",
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Senha",
    },
  ];

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
    swal({
      text: "Seja bem vindo!",
      icon: "success",
      timer: "5000",
    });
    setRefreshLogin(refreshLogin + 1);
  }

  function handleExit() {
    localStorage.removeItem("jwt");
    navigate("/");
    setRefreshLogin(refreshLogin + 1);
  }

  function handleOpenMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  function handleProfile() {
    setIsMenuOpen(false);
    navigate("/profile");
  }

  window.addEventListener("click", function (e) {
    if (!e.target.parentElement?.classList.contains("space-user-logged")) {
      setIsMenuOpen(false);
    }
  });

  useEffect(() => {
    setIsMenuOpen(false);
    async function getUser() {
      if (jwt) {
        const response = await fetch(`${baseURL}/user/findById`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status == 401) {
          handleExit();
          return swal({
            title: "Erro",
            text: `Token inválido, faça o login novamente!`,
            icon: "error",
            timer: "7000",
          });
        }

        const data = await response.json();
        setUserLogged(data);
      }
    }
    getUser();
  }, [refreshLogin]);

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
          {jwt ? (
            <div>
              <div className="space-user-logged" onClick={handleOpenMenu}>
                <img className="user-logged-avatar" src={userLogged.avatar} />
                <FiMenu className="icon-menu" />
              </div>
              {isMenuOpen ? (
                <div className="space-menu">
                  <ul>
                    <li onClick={handleProfile}>
                      <FiUser className="icon-menu" />
                      Perfil
                    </li>
                    <hr />
                    <li onClick={handleExit}>
                      <FiLogOut className="icon-menu" />
                      Sair
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <button
              type="button"
              className="btn-menu"
              onClick={handleOpenLoginModal}
            >
              Entrar
            </button>
          )}
        </div>
      </nav>

      <Modals
        isOpen={isLoginModalOpen}
        closeModal={handleCloseLoginModal}
        onChanges={onLogin}
        type="login"
        title="Entrar"
        btnName="Entrar"
        fieldList={fieldList}
      />
    </>
  );
}

export default Navbar;
