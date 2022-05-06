import "./CardNews.css";

function CardNews({ news }) {
  return (
    <div className="card">
      <h2>{news.title}</h2>
      <div className="card-image">
        <img src={news.banner} alt={news.title} />
      </div>
      <div className="card-body">
        <p className="text">{news.text}</p>
        <p>Created by {news.name}</p>
      </div>
    </div>
  );
}

export default CardNews;
