import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import UserPage from './pages/userpage'
import Results from './pages/results'
import Quiz from './pages/quiz'
import '../fonts/poppins/800.css'
import '@fontsource/bluu-next';
import '@fontsource-variable/sofia-sans';

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/userpage' element = {<UserPage/>}/>
      <Route path = '/quiz' element = {<Quiz/>}/>
      <Route path = '/results' element = {<Results/>}/>
    </Routes>
  );
};

export default App;
