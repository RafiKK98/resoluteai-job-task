import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthGaurd from "./components/AuthGaurd";

function App() {
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <Router>
          <Navbar />
          <AuthGaurd />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <ToastContainer />
        </Router>
      </main>
    </>
  );
}

export default App;
