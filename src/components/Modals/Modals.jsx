import Modal from "react-modal";
import { BiX } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import Loading from "../Loading/Loading";
import swal from "sweetalert";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  editUserService,
  singinService,
  singupService,
} from "../../services/user.service";
import { LoadContext } from "../../Contexts/LoadContext";
import {
  createNewsService,
  editNewsService,
} from "../../services/news.service";
import { Button, Form, Input, P, TextArea } from "./Modals.js";

Modal.setAppElement("#root");

export default function Modals({
  isOpen,
  closeModal,
  onChanges,
  type,
  title,
  btnName,
  fieldList,
  id,
}) {
  const [values, setValues] = useState();
  const [formDetails, setFormDetails] = useState({});

  const { jwt, setJwt } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadContext);

  const handleChangeValues = (event) => {
    setValues((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  function handleRegister() {
    setFormDetails({
      type: "register",
      title: "Cadastro",
      btnName: "Cadastrar",
      fieldList: [
        {
          field: "input",
          type: "text",
          name: "name",
          id: "name",
          placeholder: "Nome completo",
          value: null,
        },
        {
          field: "input",
          type: "text",
          name: "username",
          id: "username",
          placeholder: "Nome de usuário",
          value: null,
        },
        {
          field: "input",
          type: "text",
          name: "avatar",
          id: "avatar",
          placeholder: "Link da foto de perfil",
          value: null,
        },
        {
          field: "input",
          type: "text",
          name: "background",
          id: "background",
          placeholder: "Link da imagem de background do perfil",
          value: null,
        },
        {
          field: "input",
          type: "email",
          name: "email",
          id: "email",
          placeholder: "Email",
          value: null,
        },
        {
          field: "input",
          type: "password",
          name: "password",
          id: "password",
          placeholder: "Senha",
          value: null,
        },
      ],
    });
  }

  useEffect(() => {
    setFormDetails({ id, title, type, btnName, fieldList });
  }, [isOpen]);

  const singin = async () => {
    setIsLoading(true);
    const resp = await singinService(values);
    const jwt = resp.token;
    if (jwt) {
      setJwt(jwt);
      onChanges(response);
      closeModal();
    } else {
      swal({
        title: "Erro",
        text: `${resp.message}`,
        icon: "error",
        timer: "7000",
      });
    }
    setIsLoading(false);
  };

  const singup = async () => {
    setIsLoading(true);
    const resp = await singupService(values);
    const jwt = resp.token;
    if (jwt) {
      setJwt(jwt);
      onChanges(response);
      closeModal();
    } else {
      alert(resp);
    }
    setIsLoading(false);
  };

  const createNews = async () => {
    setIsLoading(true);
    const response = await createNewsService(values, jwt);

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

  const editUser = async () => {
    setIsLoading(true);
    const response = await editUserService(values, formDetails.id, jwt);

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

  const editPost = async () => {
    setIsLoading(true);
    const response = await editNewsService(values, formDetails.id, jwt);

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

  function submitFunction(event) {
    event.preventDefault();
    switch (type) {
      case "login":
        return singin();
      case "register":
        return singup();
      case "createNews":
        return createNews();
      case "editUser":
        return editUser();
      case "editPost":
        return editPost();
    }
  }

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
        <h2 className="modal-title">{formDetails.title}</h2>

        <Form onSubmit={submitFunction}>
          {formDetails.fieldList?.map((item, idx) => {
            return item.field == "input" ? (
              <Input
                key={idx}
                type={item.type}
                name={item.name}
                id={item.id}
                placeholder={item.placeholder}
                defaultValue={item.value}
                onChange={handleChangeValues}
              />
            ) : (
              <TextArea
                key={idx}
                type={item.type}
                name={item.name}
                id={item.id}
                cols={item.cols}
                rows={item.rows}
                placeholder={item.placeholder}
                defaultValue={item.value}
                onChange={handleChangeValues}
              ></TextArea>
            );
          })}

          <Button type="submit">{formDetails.btnName}</Button>
        </Form>

        {formDetails.title == "Entrar" ? (
          <P className="text-signup">
            Não tem uma conta?
            <A className="signup" onClick={handleRegister}>
              Cadastre-se
            </A>
          </P>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}
