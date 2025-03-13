import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRotes } from "routes";
import { userContext } from "context";
import "./App.css";

function App() {
  const [userType, setUserType] = useState("");
  return (
    <userContext.Provider value={{ userType, setUserType }}>
      <BrowserRouter>
        <AppRotes />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
