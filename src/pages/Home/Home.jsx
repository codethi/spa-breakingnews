import "./Home.css";

import { useEffect, useState } from "react";
import CardNews from "../../components/CardNews/CardNews";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [topNews, setTopNews] = useState({});
  const [news, setNews] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLogged, setUserLogged] = useState({});

  const baseURL = "https://api-breakingnews.onrender.com";
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    async function getTopNews() {
      const resp = await fetch(`${baseURL}/posts/top`);
      const data = await resp.json();

      setIsLoading(false);
      setTopNews(data.post);
    }

    async function getAllNews() {
      const resp = await fetch(`${baseURL}/posts`);
      const data = await resp.json();

      setIsLoading(false);
      setNews(data.results);
      setNextUrl(data.nextUrl);
    }

    getTopNews();
    getAllNews();
  }, []);

  async function viewMore() {
    if (nextUrl) {
      const resp = await fetch(`${baseURL}${nextUrl}`);
      const data = await resp.json();
      setNews([...news, ...data.results]);
      setNextUrl(data.nextUrl);
    } else {
      setIsLoading(false);
    }
  }

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
    <section className="container">
      <header className="top-news">
        <CardNews
          news={topNews}
          userLogged={userLogged}
          classCard={"card-top"}
          classCardBody={"card-body-top"}
          classCardImage={"card-image-top"}
          countComments={topNews.comments?.length}
          countLikes={topNews.likes?.length}
        />
      </header>

      <section className="news">
        {news.map((item, idx) => {
          return (
            <CardNews
              news={item}
              key={idx}
              userLogged={userLogged}
              classCard={"card"}
              classCardBody={"card-body"}
              classCardImage={"card-image"}
              countComments={item.comments?.length}
              countLikes={item.likes?.length}
            />
          );
        })}
      </section>

      <section className="loading">{isLoading ? <Loading /> : ""}</section>
    </section>
  );
}
("");

export default Home;
