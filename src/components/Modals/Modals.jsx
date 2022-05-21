import "./Modals.css";

import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import swal from "sweetalert";

Modal.setAppElement("#root");

function Modals({
  isOpen,
  closeModal,
  onChanges,
  type,
  title,
  btnName,
  fieldList,
}) {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [inputArray, setInputArray] = useState([]);
  const [formDatails, setFormDetails] = useState({});
  const [refreshModal, setRefreshModal] = useState(0);

  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  function handleRegister() {
    setFormDetails({
      type: "register",
      title: "Cadastro",
      btnName: "Cadastrar",
    });
    fieldList = [
      {
        field: "input",
        type: "text",
        name: "name",
        id: "name",
        placeholder: "Nome completo",
      },
      {
        field: "input",
        type: "text",
        name: "username",
        id: "username",
        placeholder: "Nome de usuário",
      },
      {
        field: "input",
        type: "text",
        name: "avatar",
        id: "avatar",
        placeholder: "Link da foto de perfil",
      },
      {
        field: "input",
        type: "text",
        name: "background",
        id: "background",
        placeholder: "Link da imagem de background do perfil",
      },
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
    setInputArray(fieldList);
  }

  useEffect(() => {
    setInputArray(fieldList);
    setFormDetails({ title, type, btnName });
  }, [isOpen]);

  const login = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      onChanges(response);
      closeModal();
    } else {
      swal({
        title: "Erro",
        text: `${result.message}`,
        icon: "error",
        timer: "7000",
      });
    }

    setIsLoading(false);
  };

  const register = async (event) => {
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
      onChanges(response);
      closeModal();
    } else {
      alert(result.message);
    }

    setIsLoading(false);
  };

  const createNews = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${baseURL}/posts/create`, {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }),
      body: JSON.stringify(values),
    });
    const result = await response.json();

    if (response.status === 500 || response.status === 400) {
      swal({
        title: "Erro",
        text: `${result.message}`,
        icon: "error",
        timer: "7000",
      });
    } else {
      swal({
        text: `${result.message}`,
        icon: "success",
        timer: "7000",
      });
      onChanges(response);
      closeModal();
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        overlayClassName="overley-react-modal"
        className="content-react-modal"
      >
        <button
          type="button"
          className="close-modal-button"
          onClick={closeModal}
        >
          <BiX />
        </button>
        <h2 className="modal-title">{formDatails.title}</h2>

        <form
          onSubmit={
            formDatails.type == "login"
              ? login
              : formDatails.type == "register"
              ? register
              : formDatails.type == "createNews"
              ? createNews
              : ""
          }
        >
          {inputArray.map((item, idx) => {
            return item.field == "input" ? (
              <input
                key={idx}
                type={item.type}
                name={item.name}
                id={item.id}
                placeholder={item.placeholder}
                onChange={handleChangeValues}
              />
            ) : (
              <textarea
                key={idx}
                type={item.type}
                name={item.name}
                id={item.id}
                cols={item.cols}
                rows={item.rows}
                placeholder={item.placeholder}
                onChange={handleChangeValues}
              ></textarea>
            );
          })}

          <button type="submit">{formDatails.btnName}</button>
        </form>

        {formDatails.title == "Entrar" ? (
          <p className="text-signup">
            Não tem uma conta?
            <a className="signup" onClick={handleRegister}>
              Cadastre-se
            </a>
          </p>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}

export default Modals;
