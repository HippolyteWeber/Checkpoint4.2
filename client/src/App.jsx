import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";
import fetchAuth from "../lib/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchAuth().then((response) => setCurrentUser(response));
  }, []);

  return (
    <div>
      <Outlet context={{ currentUser, setCurrentUser }} />
      <p> votre pseudo est {currentUser?.pseudo}</p>
    </div>
  );
}

export default App;
