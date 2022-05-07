import "./CardSearchNews.css";

function CardSearchNews({ news }) {
  return (
    <div className="card-search">
      <div className="card-search-body">
        <h2>{news.title}</h2>
        <p className="text-search">{news.text}</p>
        <p className="user-search">by {news.name}</p>
      </div>

      <div className="card-search-image">
        <img src={news.banner} alt={news.title} />
      </div>
    </div>
  );
}

export default CardSearchNews;
