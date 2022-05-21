import "./CreateNewsModal.css";

import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import { useState } from "react";
import Loading from "../Loading/Loading";
import swal from "sweetalert";

Modal.setAppElement("#root");

function CreateNewsModal({ isOpen, closeModal, onCreate }) {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleCreateNews = async (event) => {
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

    const post = result.post;

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
      onCreate(response);
      closeModal();
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
      <h2>Publicar Notícia</h2>
      <form onSubmit={handleCreateNews}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Titulo"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          name="banner"
          id="banner"
          placeholder="Banner"
          onChange={handleChangeValues}
        />
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          placeholder="Texto da notícia"
          onChange={handleChangeValues}
        ></textarea>

        <button type="submit" className="publish-news">
          Publicar
        </button>
      </form>
    </Modal>
  );
}

export default CreateNewsModal;
