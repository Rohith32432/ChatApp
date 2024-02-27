import './App.css';
import { Route, Routes } from 'react-router-dom';
import Chatpage from './components/Chatpage';
import Home from './components/Home';
import ChatProvider from './Context/context';
function App() {

  return (
    <div className="App">
    {/* <Sample/> */}
    <ChatProvider>
      <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Chatpage/>} path='/chats'/>
      </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
