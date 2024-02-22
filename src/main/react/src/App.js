import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/services" exact element={<Services />}></Route>
          <Route path="/products" exact element={<Products />}></Route>
          <Route path="/sign-up" exact element={<SignUp />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
