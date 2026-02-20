import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./pages/Home";
import ThemeToggle from "./components/Layout/Theme/ThemeToggle";
import ChatBotButton from "./components/ChatBot/ChatBotButton";
import About from "./pages/About/About";

function App() {
  return (
    <>
      <Navbar />
      <ThemeToggle />
      <ChatBotButton />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
