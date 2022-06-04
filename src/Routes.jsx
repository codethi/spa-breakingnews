import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import Profile from "./pages/Profile/Profile";
import SearchResult from "./pages/SearchResult/SearchResult";

export function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:title" element={<SearchResult />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news-details/:id" element={<NewsDetails />} />
      </Routes>
      {<Footer />}
    </Router>
  );
}
