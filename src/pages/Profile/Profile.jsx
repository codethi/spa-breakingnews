import { useState, useEffect } from "react";
import LongCardNews from "../../components/LongCardNews/LongCardNews";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "./Profile.css";
import Modals from "../../components/Modals/Modals";

function Profile() {
  let navigate = useNavigate();
  const [userLogged, setUserLogged] = useState({});
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshCreate, setRefreshCreate] = useState(0);
  const [fieldArray, setFieldArray] = useState([]);

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
    setFieldArray([
      {
        field: "input",
        type: "title",
        name: "title",
        id: "title",
        placeholder: "Titulo",
      },
      {
        field: "input",
        type: "text",
        name: "banner",
        id: "banner",
        placeholder: "Banner",
      },
      {
        field: "textarea",
        name: "text",
        id: "text",
        cols: "30",
        rows: "10",
        placeholder: "Texto da notícia",
      },
    ]);
  }, [refreshCreate]);

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
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
  }


  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function onCreate() {
    setRefreshCreate(refreshCreate + 1);
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
          <button type="button" onClick={handleOpenCreateModal}>
            Publicar Notícia
          </button>
        </div>
      </header>

      <main className="profile-posts">
        {news.map((item, idx) => {
          return <LongCardNews news={item} key={idx} />;
        })}
      </main>

      <Modals
        isOpen={isCreateModalOpen}
        closeModal={handleCloseCreateModal}
        onChanges={onCreate}
        type="createNews"
        title="Publicar Notícia"
        btnName="Publicar"
        fieldList={fieldArray}
      />
    </section>
  );
}

export default Profile;
