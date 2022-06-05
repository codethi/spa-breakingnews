import "./CardComments.css";

import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";

function CardComments({ comment, news, onChanges }) {
  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

  const [user, setUser] = useState({});
  const [userLogged, setUserLogged] = useState({});

  async function getUser() {
    if (jwt) {
      const response = await fetch(
        `${baseURL}/user/findById/${comment.userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

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
      setUser(data);
    }
  }

  async function getUserLogged() {
    if (jwt) {
      const response = await fetch(`${baseURL}/user/findById`, {
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
      setUserLogged(data);
    }
  }

  async function deleteComment() {
    const response = await fetch(
      `${baseURL}/posts/${news.id}/${comment.idComment}/comment`,
      {
        method: "PATCH",
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: `Bearer ${jwt}`,
        }),
      }
    );

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
      onChanges(response);
    }
  }

  useEffect(() => {
    getUser();
    getUserLogged();
  }, []);

  return (
    <section className="card-comment">
      <img src={user.avatar} alt="" />
      <div>
        <h4>{user.name}</h4>
        <p>{comment.message}</p>
      </div>
      {userLogged._id == user._id ? (
        <BiTrash className="delete-comment" onClick={deleteComment} />
      ) : (
        ""
      )}
    </section>
  );
}

export default CardComments;
