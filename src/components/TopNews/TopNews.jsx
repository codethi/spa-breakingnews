import "./TopNews.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function TopNews({ news }) {
  const [userLogged, setUserLogged] = useState({});

  const { pathname } = useLocation();
  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  function handleExit() {
    localStorage.removeItem("jwt");
    navigate("/");
  }

  useEffect(() => {
    if (jwt) {
      async function getUser() {
        const response = await fetch(`${baseURL}/user/findById`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status == 401) {
          handleExit();
          return swal({
            title: "Erro",
            text: `Token inválido, faça o login novamente!`,
            icon: "error",
            timer: "7000",
          });
        }

        const data = await response.json();
        setUserLogged(data);
      }
      getUser();
    }
  }, []);
  return (
    <section className="topNews">
      <div className="card-top">
        <div className="card-body-top">
          <h1>{news.title}</h1>
          <p className="text-top">{news.text}</p>
          <p>by {news.name}</p>
        </div>

        <div className="card-image-top">
          <img src={news.banner} alt={news.title} />
        </div>
      </div>
      {pathname.indexOf("news-details") != -1 ? (
        <div className="card-footer">
          <form>
            <img src={userLogged.avatar} alt="Avatar user" />
            <input type="text" placeholder="Escreva um comentário" />
            <button type="submit">Comentar</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default TopNews;
