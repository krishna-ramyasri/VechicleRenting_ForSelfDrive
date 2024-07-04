import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData,setUserData]=useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn ,userData,setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };