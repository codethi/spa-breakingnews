import "./CardNews.css";

function CardNews({ news, idx }) {

  function handleClickPost(){
    console.log(idx)
  }
  return (
    <div className="card" onClick={handleClickPost}>
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
