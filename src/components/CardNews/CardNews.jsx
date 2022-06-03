import "./CardNews.css";

import { FiMessageSquare, FiThumbsUp } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";

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
}) {
  let navigate = useNavigate();

  const { pathname } = useLocation();

  function goNewsDetails() {
    navigate(`/news-details/${news.id}`);
  }

  function onBtnComment() {
    document.querySelector(".form-comment").style.display = "flex";
  }

  function returnHome() {
    navigate("/");
  }

  useEffect(() => {
    datails ? findNewsById() : "";
  }, []);

  return (
    <section className="card-news">
      {pathname.indexOf("news-details") != -1 ? (
        <IoIosArrowDropleft className="card-icon-back" onClick={returnHome} />
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
              <form className="form-comment">
                <img src={userLogged?.avatar} alt="Avatar user" />
                <input type="text" placeholder="Escreva um comentário" />
                <button type="submit">Comentar</button>
              </form>
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
