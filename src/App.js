import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import OnePost from "./components/OnePost";
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
        <div>
          <Header/>
          <Route component={AllPosts} path="/" exact/>
          <Route component={OnePost} path="/:slug"/>
          <Footer/>
        </div>
    </BrowserRouter>
  );
}

export default App;