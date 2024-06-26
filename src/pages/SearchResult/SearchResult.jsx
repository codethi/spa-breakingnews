import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardNews from "../../components/CardNews/CardNews";
import { useNavigate } from "react-router-dom";

import "./SearchResult.css";
import notfound from "../../images/notfound.png";
import Loading from "../../components/Loading/Loading";
import { IoIosArrowDropleft } from "react-icons/io";

function SearchResult() {
  const { title } = useParams();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  const baseURL = "http://localhost:3001";

  const emptyInput = () => (document.querySelector(".search-input").value = "");

  function returnRoute() {
    emptyInput();
    navigate(-1);
  }

  useEffect(() => {
    async function searchNews() {
      setIsLoading(true);
      const resp = await fetch(`${baseURL}/posts/search?title=${title}`);
      const data = await resp.json();
      if (resp.status == 200) {
        setNews(data.foundPosts);
      } else {
        setNews([]);
      }
      setIsLoading(false);
    }
    searchNews();
  }, [title]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container-results">
      <div className="text-results">
        <IoIosArrowDropleft
          className="profile-icon-back"
          onClick={returnRoute}
        />
        <span className="subtitle-result">
          {news.length != 0
            ? `Encontramos ${news.length} ${
                news.length > 1 ? "resultados" : "resultado"
              } para:`
            : "Não encontramos resultados para:"}
        </span>
        <h2>{title}</h2>
      </div>

      <div className="search-news">
        {news.map((item, idx) => {
          return (
            <CardNews
              news={item}
              key={idx}
              classCard={"card"}
              classCardBody={"card-body"}
              classCardImage={"card-image"}
              countComments={item.comments?.length}
              countLikes={item.likes?.length}
            />
          );
        })}
      </div>

      {news.length == 0 ? (
        <img className="notfound-image" src={notfound} />
      ) : (
        ""
      )}
    </section>
  );
}

export default SearchResult;
