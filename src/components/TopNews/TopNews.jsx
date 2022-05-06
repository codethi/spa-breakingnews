import "./TopNews.css";

function TopNews({post}) {
  return (
    <section className="topNews">
      <div className="card-top">
        <div className="card-body-top">
          <h1>{post.title}</h1>
          <p className="text">{post.text}</p>
          <p>Created by {post.name}</p>
        </div>

        <div className="card-image-top">
          <img src={post.banner} alt={post.title} />
        </div>
      </div>
    </section>
  );
}

export default TopNews;
