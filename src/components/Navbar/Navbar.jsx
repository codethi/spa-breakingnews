import logo from "../../images/LogoBN.png";

import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <img src={logo} className="logo-image" />

      <div className="controls">
        <input type="text" placeholder="Pesquise por um titulo" />
        <button type="button" className="btn-search"><i className="bi bi-search"></i></button>
        <button type="button" className="btn-menu"><i className="bi bi-list"></i></button>
      </div>
    </nav>
  );
}

export default Navbar;
