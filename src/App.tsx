import "./App.css";
import { useState } from "react";
import LoginPage from "./components/LoginPage";

import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      ) : (
        <Dashboard user={user} />
      )}
    </>
  );
}

export default App;
