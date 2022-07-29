import './App.css';

import {Routes,Route} from 'react-router-dom';
import Join from './component/join/join';
import Chat from './component/Chat/Chat';
import Video from './component/Video/Video';

function App() {

  

  return (
    <div className="App">
     <Routes>
       <Route path='/' element={<Join/>} exact ></Route>
       <Route path='/chat'  element={<Chat/>} exact    ></Route>
       <Route path='/video/:names'   element={<Video/>} exact   ></Route>
     </Routes>
    </div>
  );
}

export default App;
