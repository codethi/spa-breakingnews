import "./CardNews.css";

import { FiMessageSquare, FiThumbsUp } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import CardComments from "../CardComments/CardComments";

function CardNews({
  news,
  userLogged,
  classCard,
  classCardBody,
  classCardImage,
  onBtnLike,
  countComments,
  countLikes,
  colorBtnLike,
  findNewsById,
  datails,
  onChanges,
}) {
  let navigate = useNavigate();

  const [values, setValues] = useState();
  const [comments, setComments] = useState([]);

  const { pathname } = useLocation();
  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  function goNewsDetails() {
    navigate(`/news-details/${news.id}`);
  }

  const handleChangeValues = (event) => {
    setValues({ [event.target.name]: event.target.value });
  };

  function onBtnComment() {
    document.querySelector(".form-comment").style.display = "flex";
  }

  async function onComment(e) {
    e.preventDefault();
    const response = await fetch(`${baseURL}/posts/${news.id}/comment`, {
      method: "PATCH",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }),
      body: JSON.stringify(values),
    });

    if (response.status == 401) {
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
      swal({
        text: data.message,
        icon: "success",
        timer: "7000",
      });
      e.target[0].value = "";
      onChanges(response);
    }
  }

  function returnRoute() {
    navigate(-1);
  }

  useEffect(() => {
    datails ? findNewsById() : "";
    setComments(news.comments?.reverse());
  }, []);

  return (
    <section className="card-news">
      {pathname.indexOf("news-details") != -1 ? (
        <IoIosArrowDropleft className="card-icon-back" onClick={returnRoute} />
      ) : (
        ""
      )}

      <div className={classCard} onClick={goNewsDetails}>
        <div className={classCardBody}>
          <h2>{news.title}</h2>
          <p className="text">{news.text}</p>
          <p className="user">by {news.name}</p>
        </div>

        <div className={classCardImage}>
          <img src={news.banner} alt={news.title} />
        </div>
      </div>

      <div className="card-actions" onClick={goNewsDetails}>
        <div className="card-actions-count">
          <span className="card-actions-count-likes">
            <FiThumbsUp className="like" />
            {countLikes}
          </span>
          <span className="card-actions-count-comments">
            <FiMessageSquare className="comment" /> {countComments}
          </span>
        </div>

        {pathname.indexOf("news-details") != -1 ? (
          <>
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
              <form className="form-comment" onSubmit={onComment}>
                <img src={userLogged?.avatar} alt="Avatar user" />
                <input
                  type="text"
                  placeholder="Escreva um comentário"
                  name="message"
                  id="message"
                  onChange={handleChangeValues}
                />
                <button type="submit">Comentar</button>
              </form>

              <span className="line"></span>

              {comments?.map((item, idx) => (
                <CardComments comment={item} key={idx} news={news} onChanges={onChanges}/>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default CardNews;
