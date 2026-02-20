import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./pages/Home";
import ChatBotButton from "./components/ChatBot/ChatBotButton";
import About from "./pages/About/About";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <>
      <Navbar />
      <ChatBotButton />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
