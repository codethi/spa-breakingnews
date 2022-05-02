import AllNews from "../AllNews/AllNews";
import TopNews from "../TopNews/TopNews";

function Feed() {
  return (
    <section className="feed">
      <TopNews />
      <AllNews />
    </section>
  )
}

export default Feed;
