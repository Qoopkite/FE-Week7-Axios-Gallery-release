import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route element={<Layout />}>
       <Route path= "/" element={<Home/>}/>
       <Route path= "/:Id" element={<Post/>}/>
       <Route path= "*" element={<NotFound />} />
       </Route>
      </Routes>
    </BrowserRouter>
  );
  };

export default App;