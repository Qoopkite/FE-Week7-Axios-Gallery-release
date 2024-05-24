import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route element={<Layout />}>
       <Route path= "/" element={<Home/>}/>
       <Route path= "*" element={<NotFound />} />
       </Route>
      </Routes>
    </BrowserRouter>
  );
  };

export default App;