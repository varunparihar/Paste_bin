import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Snip from "./pages/snip";
import { Navbar } from "./components/navbar";
import SnipList from './pages/sniplist';
import { Login } from './pages/login';
import { Register } from './pages/register';
import Editsnip from './pages/editsnip';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/all" element={<SnipList />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/edit/:id" element={<Editsnip />}/>
          <Route path="/:id" element={<Snip />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
