import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const token = () => {
  return Math.random().toString(36);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("current-user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      setUsers(storedUser);
    }
  }, []);

  const signUp = (user) => {
    const { email } = user;

    if (users.find((user) => user.email === email)) {
      throw new Error("Email is already taken");
    }

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = (email, password) => {
    let currentUser = JSON.parse(localStorage.getItem("users")).find(
      (user) => user.email === email
    );

    if (currentUser) {
      if (password === currentUser.password) {
        currentUser = { ...currentUser, token: token() };
        setUser(currentUser);
        localStorage.setItem("current-user", JSON.stringify(currentUser));
      } else {
        throw new Error("The password entered is wrong");
      }
    } else {
      throw new Error("No user found with that email");
    }
  };

  const logout = () => {
    localStorage.removeItem("current-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
