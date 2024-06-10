import './App.css';
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import FindBus from './pages/FindBus/FindBus'

function App() {
  return (
    <div>
        <Navbar/>
      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/FindBus" element={<FindBus/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
