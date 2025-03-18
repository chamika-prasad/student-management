import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRotes } from "routes";
import "./App.css";

function App() {
  return (
      <BrowserRouter>
        <AppRotes />
      </BrowserRouter>
  );
}

export default App;
