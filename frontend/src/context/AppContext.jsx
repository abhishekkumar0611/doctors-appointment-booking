import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "$";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SINGLE SOURCE OF TRUTH
  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData(null);
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadUserProfileData = async () => {
    if (!token) {
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) setUserData(data.user);
      else setUserData(null);
    } catch {
      setUserData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    setLoading(true);
    loadUserProfileData();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        currencySymbol,
        doctors,
        getDoctorsData,
        token,
        saveToken,
        logout,
        userData,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
