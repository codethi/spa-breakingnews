import "./CardNewsStyled.js";

import { FiMessageSquare, FiThumbsUp } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { BiEdit, BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import CardComments from "../CardComments/CardComments";
import Modals from "../Modals/Modals";
import swal from "sweetalert";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  createCommentService,
  deleteNewsService,
} from "../../services/news.service";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDatails, setFormDatails] = useState({});
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const { pathname } = useLocation();
  const { jwt } = useContext(AuthContext);

  function goNewsDetails() {
    navigate(`/news-details/${news.id}`);
  }

  const handleChangeValues = (event) => {
    setValues({ [event.target.name]: event.target.value });
  };

  function onBtnComment() {
    document.querySelector(".form-comment").style.display = "flex";
    document.querySelector(".comment-input").focus();
  }

  async function onComment(e) {
    e.preventDefault();
    const response = await createCommentService(news.id, values, jwt);

    if (response.status == 401) {
      return swal({
        title: "Erro",
        text: `Token inválido, faça o login!`,
        icon: "error",
        timer: "7000",
      });
    }

    if (response.status == 400) {
      swal({
        title: "Erro",
        text: response.data.message,
        icon: "error",
        timer: "7000",
      });
    } else if (response.status == 200) {
      swal({
        text: response.data.message,
        icon: "success",
        timer: "7000",
      });
      e.target[0].value = "";
      onChanges(response);
    }
  }

  function returnRoute() {
    navigate("/");
  }

  function handleModalOpen() {
    setFormDatails({
      id: news.id,
      type: "editPost",
      title: "Editar Noticia",
      btnName: "Atualizar",
      fieldList: [
        {
          field: "input",
          type: "text",
          name: "title",
          id: "title",
          placeholder: "Titulo",
          value: news.title,
        },
        {
          field: "input",
          type: "text",
          name: "banner",
          id: "banner",
          placeholder: "Banner",
          value: news.banner,
        },
        {
          field: "textarea",
          type: "text",
          name: "text",
          cols: "30",
          rows: "15",
          id: "text",
          placeholder: "Texto da noticia",
          value: news.text,
        },
      ],
    });
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function deletePost() {
    const response = await deleteNewsService(news.id, jwt);

    if (response.status == 401) {
      return swal({
        title: "Erro",
        text: `Token inválido, faça o login!`,
        icon: "error",
        timer: "7000",
      });
    }

    if (response.status == 400) {
      swal({
        title: "Erro",
        text: response.data.message,
        icon: "error",
        timer: "7000",
      });
    } else if (response.status == 200) {
      swal({
        text: response.data.message,
        icon: "success",
        timer: "7000",
      });
      onChanges(response);
    }
  }

  function handleDeleteModalOpen() {
    swal({
      title: "Apagar Noticia?",
      icon: "error",
      buttons: ["Não", "Sim"],
    }).then((resp) => {
      if (resp) {
        deletePost();
      }
    });
  }

  function handleOpenActions() {
    if (isActionsOpen) {
      setIsActionsOpen(false);
    } else {
      setIsActionsOpen(true);
    }
  }

  window.addEventListener("click", function (e) {
    if (!e.target.classList.contains("card-icon-actions")) {
      setIsActionsOpen(false);
    }
  });

  useEffect(() => {
    datails ? findNewsById() : "";
    setComments(news.comments?.reverse());
    setIsActionsOpen(false);
  }, []);

  return (
    <CardNews>
      {pathname.indexOf("news-details") != -1 ? (
        <IoIosArrowDropleft className="card-icon-back" onClick={returnRoute} />
      ) : (
        ""
      )}

      {pathname.indexOf("profile") != -1 ? (
        <>
          <BiDotsVerticalRounded
            className="card-icon-actions"
            onClick={handleOpenActions}
          />
          {isActionsOpen ? (
            <div className="space-menu">
              <ul>
                <li onClick={handleModalOpen}>
                  <BiEdit className="icon-menu" />
                  Editar
                </li>
                <hr />
                <li onClick={handleDeleteModalOpen}>
                  <BiTrash className="icon-menu" />
                  Apagar
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
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
                  className="comment-input"
                  onChange={handleChangeValues}
                />
                <button type="submit">Comentar</button>
              </form>

              <span className="line"></span>

              {comments?.map((item, idx) => (
                <CardComments
                  comment={item}
                  key={idx}
                  news={news}
                  onChanges={onChanges}
                />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

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
    </CardNews>
  );
}

export default CardNews;
