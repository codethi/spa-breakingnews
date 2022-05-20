import "./Home.css";

import { useEffect, useState } from "react";
import SmallCardNews from "../../components/SmallCardNews/SmallCardNews";
import TopNews from "../../components/TopNews/TopNews";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [topNews, setTopNews] = useState({});
  const [news, setNews] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL;

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

  /*  function handleClickPost() {
    console.log("oi");
  }
 */

  return (
    <section className="container">
      <header className="top-news">
        <TopNews post={topNews} />
      </header>

      <section className="news">
        {news.map((item, idx) => {
          return <SmallCardNews news={item} key={idx} />;
        })}
      </section>

      <section className="loading">{isLoading ? <Loading /> : ""}</section>
    </section>
  );
}
("");

export default Home;
