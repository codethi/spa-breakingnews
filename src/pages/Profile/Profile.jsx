import { useState, useEffect } from "react";
import SmallCardNews from "../../components/SmallCardNews/SmallCardNews";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import "./Profile.css";

function Profile() {
  let navigate = useNavigate();
  const [userLogged, setUserLogged] = useState({});
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshCreate, setRefreshCreate] = useState(0);

  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      alert("Faça o login para ver o perfil!");
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
  }, []);

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function onCreate() {
    setRefreshCreate(refreshLogin + 1);
  }

  function returnHome() {
    navigate("/");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="profile-container">
      <header
        className="profile-header"
        /* style={{
          backgroundImage: `linear-gradient(to bottom, transparent 100%, #fff 40%), url(${userLogged.background}})`,
        }} */
      >
        <div className="profile-user">
          {
            <img
              className="profile-background"
              src={userLogged.background}
              alt=""
            />
          }
          <img
            className="profile-avatar"
            src={userLogged.avatar}
            alt="Foto do usuário"
          />
          <h2>{userLogged.name}</h2>
          <h3>@{userLogged.username}</h3>
        </div>
        <div className="profile-actions">
          <button
            className="btn-create-news"
            type="button"
            onClick={handleOpenCreateModal}
          >
            <FiPlus /> Criar Noticia
          </button>
        </div>
      </header>

      <main className="profile-posts">
        {news.map((item, idx) => {
          return <SmallCardNews news={item} key={idx} />;
        })}
      </main>
    </section>
  );
}

export default Profile;
