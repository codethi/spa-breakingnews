import "./LoginModal.css";

import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import { useState } from "react";

Modal.setAppElement("#root");

function LoginModal({ isOpen, closeModal, onLogin }) {
  const [values, setValues] = useState();
  const baseURL = import.meta.env.VITE_API_URL;

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(values),
    });

    const result = await response.json();

    const jwt = result.token;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      onLogin(response);
      closeModal();
    } else {
      alert(result.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="overley-react-modal"
      className="content-react-modal"
    >
      <button type="button" className="close-modal-button" onClick={closeModal}>
        <BiX />
      </button>
      <h2>Entrar</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChangeValues}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          onChange={handleChangeValues}
        />

        <button type="submit" className="login">
          Entrar
        </button>
      </form>

      <p className="text-signup">Não tem uma conta?<a href="https://www.google.com.br" className="signup">Cadastre-se</a></p>

    </Modal>
  );
}

export default LoginModal;
