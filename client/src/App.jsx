import { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchAuth from "../lib/auth";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchAuth().then((response) => setCurrentUser(response));
  }, []);

  return (
    <main className="w-full">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Suspense fallback={<Loading />}>
        <div className="w-12/12  items-center pt-40">
          <Outlet context={{ currentUser, setCurrentUser }} />
          {/* <p> votre pseudo est {currentUser?.pseudo}</p> */}
        </div>
      </Suspense>
    </main>
  );
}

export default App;
