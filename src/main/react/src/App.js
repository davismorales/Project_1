import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Games from "./components/pages/Games";
import Players from "./components/pages/Players";
import SignUp from "./components/pages/SignUp";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/games" exact element={<Games />}></Route>
          <Route path="/players" exact element={<Players />}></Route>
          <Route path="/sign-up" exact element={<SignUp />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
