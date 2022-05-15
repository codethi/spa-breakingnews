import { useState, useEffect } from "react";
import CardSearchNews from "../../components/CardSearchNews/CardSearchNews";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

function Profile() {
  let navigate = useNavigate();
  const [userLogged, setUserLogged] = useState({});
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <main className="profile-container">
      <aside className="profile-aside">
        <div className="profile-card">
          <img src={userLogged.avatar} alt="Foto do usuário" />
          <h2>{userLogged.name}</h2>
          <h5>@{userLogged.username}</h5>
          <span>{userLogged.email}</span>
          <ul>
            <hr />
            <li> Criar nova notícia</li>
            <hr />
            <li>Sair</li>
            <hr />
          </ul>
        </div>
      </aside>
      <section className="profile-posts">
        <div>
          {news.map((item, idx) => {
            return <CardSearchNews news={item} key={idx} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Profile;
