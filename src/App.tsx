import "./App.css";
import { useState } from "react";
import LoginPage from "./components/LoginPage";

import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
