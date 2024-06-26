import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";

import "./NewsDetails.css";
import CardNews from "../../components/CardNews/CardNews";

function NewsDetails() {
  const navigate = useNavigate();
  const [news, setNews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userLogged, setUserLogged] = useState({});
  const [countComments, setCountComments] = useState(0);
  const [countLikes, setCountLikes] = useState(0);
  const [colorBtnLike, setColorBtnLike] = useState("#000");
  const [refresh, setRefresh] = useState(0);

  const { id } = useParams();

  const baseURL = "http://localhost:3001";
  const jwt = localStorage.getItem("jwt");

  function handleExit() {
    localStorage.removeItem("jwt");
    navigate("/");
    setRefreshLogin(refreshLogin + 1);
  }

  async function findNewsById() {
    const response = await fetch(`${baseURL}/posts/byIdPost/${id}`, {
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

    if (response.status == 400) {
      swal({
        title: "Erro",
        text: "Id inválido",
        icon: "error",
        timer: "7000",
      });
    }

    const data = await response.json();

    if (response.status == 200) {
      setCountComments(data.comments?.length);
      setCountLikes(data.likes?.length);

      const liked = data.likes.filter((item) => item.userId == userLogged?._id);

      liked.length != 0 ? setColorBtnLike("#0bade3") : setColorBtnLike("#000");
    }
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

  function onChanges() {
    setRefresh(refresh + 1);
  }

  useEffect(() => {
    if (!jwt) {
      swal({
        title: "Erro",
        text: "Faça o login para ver a notícia",
        icon: "error",
        timer: "7000",
      });
      navigate("/");
    } else {
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

      async function getPostsUser() {
        setIsLoading(true);
        const resp = await fetch(`${baseURL}/posts/byIdPost/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const data = await resp.json();
        setNews(data);
        setIsLoading(false);
      }

      getPostsUser();
    }

    findNewsById();
  }, [refresh]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container">
      <div className="top-news-datails">
        <CardNews
          news={news}
          userLogged={userLogged}
          classCard={"card-top"}
          classCardBody={"card-body-top"}
          classCardImage={"card-image-top"}
          onBtnLike={onBtnLike}
          countComments={countComments}
          countLikes={countLikes}
          colorBtnLike={colorBtnLike}
          findNewsById={findNewsById}
          datails={true}
          onChanges={onChanges}
        />
      </div>
    </section>
  );
}

export default NewsDetails;
