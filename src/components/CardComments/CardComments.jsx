import { useState, useEffect, useContext } from "react";
import { BiTrash } from "react-icons/bi";
import { CardCommentContainer } from "./CardCommentStyled";
import { AuthContext } from "../../Contexts/AuthContext";
import { getUserLoggedService } from "../../services/user.service";
import { deleteCommentService } from "../../services/news.service";

export default function CardComments({ comment, news, onChanges }) {
  const { jwt } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [userLogged, setUserLogged] = useState({});

  async function getUser() {
    if (jwt) {
      const response = await getUserByIdService(comment.userId, jwt);

      if (response.status == 401) {
        handleExit();
        return swal({
          title: "Erro",
          text: `Token inválido, faça o login!`,
          icon: "error",
          timer: "7000",
        });
      }

      setUser(response.data.result);
    }
  }

  async function getUserLogged() {
    if (jwt) {
      const response = await getUserLoggedService(jwt);

      if (response.status == 401) {
        handleExit();
        return swal({
          title: "Erro",
          text: `Token inválido, faça o login!`,
          icon: "error",
          timer: "7000",
        });
      }
      setUserLogged(response.data.result);
    }
  }

  async function deleteComment() {
    const response = await deleteCommentService(
      news.id,
      comment.idComment,
      jwt
    );

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
        text: response.message,
        icon: "error",
        timer: "7000",
      });
    } else if (response.status == 200) {
      swal({
        text: response.message,
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
    <CardCommentContainer>
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
    </CardCommentContainer>
  );
}
