// STYLES
import './App.css';

// DEPENDENCIES
import  { Routes, Route } from "react-router-dom";

// PAGES
import Home from './Pages/Home';
import Index from './Pages/Index';


function App() {
  return (
    <div className="App">
      <Home />
      <main>
        <Routes>
          <Route path='/transactions' element={<Index />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
