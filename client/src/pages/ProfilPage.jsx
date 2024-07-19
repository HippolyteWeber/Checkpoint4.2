/* eslint-disable */
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

export default function ProfilPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (!currentUser) {
        navigate("/login");
      } else {
        fetchUserData(currentUser.user_id);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/${userId}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("utilisateur non existant:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {userData && (
        <div>
          <p>Pseudo: {userData.pseudo}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
          <img
            src=""
            alt="avatar"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        </div>
      )}
    </div>
  );
}
