import "./CardNews.css";

function CardNews({ news }) {
  return (
    <div className="card">
      <h2>{news.title}</h2>
      <div className="card-image">
        <img src={news.banner} alt={news.title} />
      </div>
        <p className="text">{news.text}</p>
        <p className="user">by {news.name}</p>
     
    </div>
  );
}

export default CardNews;
