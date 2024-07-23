import './App.css';
import PostId from './components/PostId';
import PostingPost from './components/PostingPost';
import PostingQuestion from './components/PostingQuestion';
import QuestionId from './components/QuestionId';
import Auth from './pages/Auth';
import DashBoard from './pages/DashBoard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './pages/User';
import { useState } from 'react';

function App() {
  const [state, setState] = useState("AllPosts");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>} />
          <Route path='/dashboard' element={<DashBoard setState={setState} state={state}/>}/>
          <Route path='/dashboard/compose/post' element={<PostingPost />} />
          <Route path='/dashboard/compose/question' element={<PostingQuestion/>}/>
          <Route path='content/post/:id' element={<PostId />} />
          <Route path='content/question/:id' element={<QuestionId />} />
          <Route path='user/profile/:id' element={<User setState={setState} state={state} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;