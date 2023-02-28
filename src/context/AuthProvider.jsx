import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("apv_token_");

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios.get("/vet/profile", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem("apv_token_");
    setAuth({});
  };

  const updateProfile = async (dataUp) => {
    const token = localStorage.getItem("apv_token_");
    if (!token) {
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/vet/profile/${dataUp._id}`;
      await clientAxios.put(url, dataUp, config);
      return {
        msg: "Almacenado correctamente",
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const savePassword = async (dataSave) => {
    const token = localStorage.getItem("apv_token_");
    if (!token) {
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = "/vet/update-password";
      const { data } = await clientAxios.put(url, dataSave, config);
      console.log(data);
      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        logOut,
        updateProfile,
        savePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
