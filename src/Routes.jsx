import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";

export function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:title" element={<SearchResult />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
