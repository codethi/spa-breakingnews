import "./RegisterModal.css";

import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import { useState } from "react";
import Loading from "../Loading/Loading";

Modal.setAppElement("#root");

function RegisterModal({ isOpen, closeModal, onLogin }) {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_URL;

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${baseURL}/user/create`, {
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

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

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
      <h2>Cadastrar</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nome de usuário"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="avatar"
          id="avatar"
          placeholder="Link da foto de perfil"
          onChange={handleChangeValues}
        />
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

        <button type="submit" className="register">
          Cadastrar
        </button>
      </form>
    </Modal>
  );
}

export default RegisterModal;
