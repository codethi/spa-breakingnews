import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardSearchNews from "../../components/CardSearchNews/CardSearchNews";

import "./SearchResult.css";
import notfound from "../../images/notfound.png";

function SearchResult() {
  const { title } = useParams();
  const [news, setNews] = useState([]);
  let navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function searchNews() {
      const resp = await fetch(`${baseURL}/posts/search?title=${title}`);
      const data = await resp.json();
      if (resp.status == 200) {
        setNews(data.foundPosts);
      } else {
        setNews([]);
      }
    }
    searchNews();
  }, [title]);

  return (
    <section className="container-results">
      <div className="text-results">
        <span className="subtitle-result">
          {news.length != 0
            ? `Achamos ${news.length} ${
                news.length > 1 ? "resultados" : "resultado"
              } para:`
            : "Não achamos resultados para:"}
        </span>
        <h2>{title}</h2>
      </div>

      <div className="search-news">
        {news.map((item, idx) => {
          return <CardSearchNews news={item} key={idx} />;
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
