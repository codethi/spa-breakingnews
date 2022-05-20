import { useState, useEffect } from "react";
import LongCardNews from "../../components/LongCardNews/LongCardNews";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

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
      <header className="profile-header">
        <img src={userLogged.avatar} alt="Foto do usuário" />
        <h2>{userLogged.name}</h2>
        <h3>@{userLogged.username}</h3>
      </header>

      <aside className="profile-aside">
        <div className="profile-card">
          <ul>
            <li onClick={handleOpenCreateModal}> Criar notícia</li>
            <li onClick={returnHome}>Voltar</li>
          </ul>
        </div>
      </aside>

      <main className="profile-posts">
        <div>
          {news.map((item, idx) => {
            return <LongCardNews news={item} key={idx} />;
          })}
        </div>
      </main>
    </section>
  );
}

export default Profile;
