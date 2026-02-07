<<<<<<< HEAD
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
=======
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors ] = useState([])
    const [token, setToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): false)
    const [ userData, setUserData ] = useState(false)


    const getDoctorsData = async() => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/list")
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
           console.log(error)
           toast.error(error.message)
            
        }
    }

    const loadUserProfileData = async(req, res) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/grt-profile', {headers: {token}})
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            
        }
    }


    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if(token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
            
        </AppContext.Provider>
    )

}
export default AppContextProvider
>>>>>>> 6a576abdee5462a810efa8e598b45ba5b3df7102
