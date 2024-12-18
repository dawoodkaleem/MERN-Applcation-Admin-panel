import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  // Tacklong the logout functionality

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  // JWT Authtication to get the Currently User loggedin data

  const useAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data ", error);
    }
  };
  useEffect(() => {
    useAuthentication();
  }, []);

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is a valid React node
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContectValue = useContext(AuthContext);
  if (!authContectValue) {
    throw new Error("useAuth used outside of the Provider ");
  }
  return authContectValue;
};
