import axios from "axios";

const handleLogout = async (setCurrentUser) => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setCurrentUser(null);
  } catch (e) {
    console.error(e);
  }
};

export default handleLogout;
