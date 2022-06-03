import "./TopNews.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMessageSquare, FiThumbsUp } from "react-icons/fi";

function TopNews({ news, userLogged }) {
  const [countComments, setCountComments] = useState(0);
  const [countLikes, setCountLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [colorBtnLike, setColorBtnLike] = useState("#000");

  const { pathname } = useLocation();
  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  function handleExit() {
    localStorage.removeItem("jwt");
    navigate("/");
  }

  async function findNewsById() {
    const response = await fetch(`${baseURL}/posts/byIdPost/${news.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status == 401) {
      handleExit();
      return swal({
        title: "Erro",
        text: `Token inválido, faça o login!`,
        icon: "error",
        timer: "7000",
      });
    }

    /* if (response.status == 400) {
      swal({
        title: "Erro",
        text: "Id inválido",
        icon: "error",
        timer: "7000",
      });
    } */

    const data = await response.json();

    if (response.status == 200) {
      setCountComments(data.comments?.length);
      setCountLikes(data.likes?.length);     

      const liked = data.likes.filter((item) => item.userId == userLogged._id);

      liked.length != 0 ? setColorBtnLike("#0bade3") : setColorBtnLike("#000");
    }
  }

  function onBtnComment() {
    document.querySelector(".form-comment").style.display = "flex";
  }

  async function onBtnLike() {
    const response = await fetch(`${baseURL}/posts/${news.id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status == 401) {
      handleExit();
      return swal({
        title: "Erro",
        text: `Token inválido, faça o login!`,
        icon: "error",
        timer: "7000",
      });
    }

    const data = await response.json();

    if (response.status == 400) {
      swal({
        title: "Erro",
        text: data.message,
        icon: "error",
        timer: "7000",
      });
    } else if (response.status == 200) {
      findNewsById();
    }
  }

  useEffect(() => {
    findNewsById();
  }, [isLike]);

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
        <div className="card-actions">
          <div className="card-actions-count">
            <span className="card-actions-count-likes">
              <FiThumbsUp className="like" />
              {countLikes}
            </span>
            <span className="card-actions-count-comments">
              <FiMessageSquare className="comment" /> {countComments}
            </span>
          </div>
          <span className="line"></span>
          <div className="card-actions-btn">
            <span onClick={onBtnLike} style={{ color: colorBtnLike }}>
              <FiThumbsUp className="like" /> Gostei
            </span>
            <span onClick={onBtnComment}>
              <FiMessageSquare className="comment" /> Comentar
            </span>
          </div>

          <div className="card-footer">
            <form className="form-comment">
              <img src={userLogged.avatar} alt="Avatar user" />
              <input type="text" placeholder="Escreva um comentário" />
              <button type="submit">Comentar</button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default TopNews;
