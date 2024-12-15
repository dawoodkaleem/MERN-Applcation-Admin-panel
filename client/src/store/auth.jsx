import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  // Tacklong the logout functionality

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is a valid React node
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
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
