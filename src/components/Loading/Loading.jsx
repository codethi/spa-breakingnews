import "./Loading.css";

function Loading() {
  return (
    <section className="loading-space">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

export default Loading;
