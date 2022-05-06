import { useEffect, useState } from "react";
import { api } from "../../services/api";

import CardNews from "../CardNews/CardNews";
import TopNews from "../TopNews/TopNews";
import Loading from "../Loading/Loading";

import "./Feed.css";

function Feed() {
  const [topNews, setTopNews] = useState({});
  const [news, setNews] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get("/posts/top").then((response) => setTopNews(response.data.post));
    api.get("/posts").then((response) => {
      setNews(response.data.results);
      setNextUrl(response.data.nextUrl);
    });
  }, []);

  const viewMore = function () {
    if (nextUrl) {
      api.get(`${nextUrl}`).then((response) => {
        setNews([...news, ...response.data.results]);
        setNextUrl(response.data.nextUrl);
      });
    } else {
      setIsLoading(false);
    }
  };

  window.onscroll = function onScroll(e) {
    const scrollTop = e.target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = e.target.documentElement.scrollHeight;
    if (windowHeight * scrollTop >= scrollHeight) {
      viewMore();
    }

    window.onscroll = null;
    setTimeout(function () {
      window.onscroll = onScroll;
    }, 250);
  };

  return (
    <section className="feed">
      <TopNews post={topNews} />
      
      <section className="news">
        {news.map((item, idx) => {
          return <CardNews news={item} key={idx} />;
        })}
      </section>

      {isLoading ? <Loading /> : ""}
    </section>
  );
}

export default Feed;
