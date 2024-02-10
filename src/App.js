import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat"

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Join/>}></Route>
      <Route path='/Chat' element={<Chat/>}></Route>
    </Routes>
   </Router>
  );
}

export default App;
