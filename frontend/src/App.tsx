/**
This is the main component of the application which handles routing for different pages.
It uses react-router-dom for client-side routing.
The different pages are:
Login
Signup
GeneratePage
EditPage
Home
Collection
ArtWorkModal
UserList
ArtWorkList
Each page is a separate component and is rendered as per the corresponding route.
This component exports the App component which is used as the main entry point for the application.
*/

import './App.css';
import Login from './containers/Login/login';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Signup from './containers/Signup/signup';
import GeneratePage from './containers/Generate/GeneratePage';
import EditPage from './containers/Edit/EditPage';
import Home from './containers/Home/Home';
import Collection from './containers/Collection/Collection';
import ArtWorkModal from './containers/ArtWorkModal/ArtWorkModal';
import React, { useState } from 'react';
import UserList from './containers/UserList/UserList';
import ArtWorkList from './containers/ArtWorkList/ArtWorkList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/:userName" element={<Collection />} />
        <Route path="/artwork/:id" element={<ArtWorkModal />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/artworks" element={<ArtWorkList />}  />
      </Routes>
    </Router>

  );
}

export default App;
