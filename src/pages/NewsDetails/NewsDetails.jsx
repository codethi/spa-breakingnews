import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";

import "./NewsDetails.css";
import TopNews from "../../components/TopNews/TopNews";

function NewsDetails() {
  const navigate = useNavigate();
  const [news, setNews] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const baseURL = import.meta.env.VITE_API_URL;
  const jwt = localStorage.getItem("jwt");

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
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container">
      <div class="top-news">
        <TopNews news={news} />
      </div>
    </section>
  );
}

export default NewsDetails;
