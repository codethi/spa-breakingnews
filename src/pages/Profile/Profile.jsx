import { useState, useEffect } from "react";
import CardNews from "../../components/CardNews/CardNews";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BiPlusCircle, BiEdit } from "react-icons/bi";
import { IoIosArrowDropleft } from "react-icons/io";

import "./Profile.css";
import Modals from "../../components/Modals/Modals";

function Profile() {
  let navigate = useNavigate();
  const [userLogged, setUserLogged] = useState({});
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [formDatails, setFormDatails] = useState({});

  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      swal({
        title: "Erro",
        text: "Faça o login antes de entrar no perfil!",
        icon: "error",
        timer: "7000",
      });
      navigate("/");
    } else {
      async function getPostsUser() {
        const resp = await fetch(`${baseURL}/posts/byUserId`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await resp.json();
        setIsLoading(false);
        setNews(data.postsByUser);
      }

      async function getUser() {
        const response = await fetch(`${baseURL}/user/findById`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await response.json();
        setIsLoading(false);
        setUserLogged(data);
      }

      getPostsUser();
      getUser();
    }
  }, [refresh]);

  function handleOpenCreateNewsModal() {
    setFormDatails({
      type: "createNews",
      title: "Publicar Notícia",
      btnName: "Publicar",
      fieldList: [
        {
          field: "input",
          type: "title",
          name: "title",
          id: "title",
          placeholder: "Titulo",
          value: null,
        },
        {
          field: "input",
          type: "text",
          name: "banner",
          id: "banner",
          placeholder: "Banner",
          value: null,
        },
        {
          field: "textarea",
          name: "text",
          id: "text",
          cols: "30",
          rows: "10",
          placeholder: "Texto da notícia",
          value: null,
        },
      ],
    });
    setIsModalOpen(true);
  }

  function handleOpenEditUserModal() {
    setFormDatails({
      id: userLogged._id,
      type: "editUser",
      title: "Editar Usuário",
      btnName: "Atualizar",
      fieldList: [
        {
          field: "input",
          type: "text",
          name: "name",
          id: "name",
          placeholder: "Nome completo",
          value: userLogged.name,
        },
        {
          field: "input",
          type: "text",
          name: "username",
          id: "username",
          placeholder: "Nome de usuário",
          value: userLogged.username,
        },
        {
          field: "input",
          type: "text",
          name: "avatar",
          id: "avatar",
          placeholder: "Link da foto de perfil",
          value: userLogged.avatar,
        },
        {
          field: "input",
          type: "text",
          name: "background",
          id: "background",
          placeholder: "Link da imagem de background do perfil",
          value: userLogged.background,
        },
        {
          field: "input",
          type: "email",
          name: "email",
          id: "email",
          placeholder: "Email",
          value: userLogged.email,
        },
        {
          field: "input",
          type: "password",
          name: "password",
          id: "password",
          placeholder: "Digite uma nova senha",
          value: userLogged.email,
        },
      ],
    });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function onChanges() {
    setRefresh(refresh + 1);
  }

  function returnHome() {
    navigate("/");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="profile-container">
      <header className="profile-header">
        <IoIosArrowDropleft
          className="profile-icon-backhome"
          onClick={returnHome}
        />
        <BiEdit
          className="profile-icon-edit"
          onClick={handleOpenEditUserModal}
        />
        <img
          className="profile-background"
          src={userLogged.background}
          alt=""
        />
        <div className="profile-user">
          <img
            className="profile-avatar"
            src={userLogged.avatar}
            alt="Foto do usuário"
          />
          <h2>{userLogged.name}</h2>
          <h3>@{userLogged.username}</h3>
        </div>
        <div className="profile-actions">
          <BiPlusCircle
            className="profile-icon-add"
            onClick={handleOpenCreateNewsModal}
          />
        </div>
      </header>

      <main className="profile-posts">
        {news.map((item, idx) => {
          return <CardNews news={item} key={idx} />;
        })}
      </main>

      <Modals
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        onChanges={onChanges}
        type={formDatails.type}
        title={formDatails.title}
        btnName={formDatails.btnName}
        fieldList={formDatails.fieldList}
        id={formDatails?.id}
      />
    </section>
  );
}

export default Profile;

/* swal({
      title: "Erro",
      text: "Erroooouuu",
      icon: "error",
      buttons: ["Não", "Sim"],
    }).then((resp) => {
      if (resp) {
        swal({
          title: "Boa",
          text: "foi",
          icon: "success",
          timer: "2000",
        });
      }
    }); */
