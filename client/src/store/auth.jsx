import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  // Tacklong the logout functionality

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  // JWT Authtication to get the Currently User loggedin data

  const UseAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      console.log(authorizationToken, "Checking the token in Context api");
      if (response.ok) {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.log("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data ", error);
    }
  };
  // to fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Data for services", data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      getServices();
      UseAuthentication();
    }
  }, []);

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is a valid React node
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
      }}>
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
