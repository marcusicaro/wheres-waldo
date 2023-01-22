import "./Assets/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Game from "./components/Game";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route element={<NotFound />} path='*' />
        <Route element={<Homepage />} path='/' />
        <Route element={<Game />} path='/game' />
      </Routes>
    </div>
  );
}

export default App;
