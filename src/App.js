// STYLES
import "./App.css";

// DEPENDENCIES
import { Routes, Route } from "react-router-dom";

// PAGES
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import NavBar from "./Components/NavBar";
import Show from "./Pages/Show";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Index />} />
          <Route path="/transactions/:index" element={<Show />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
