import React, { createContext, useState, useContext } from "react";
import ShowAlert from "../components/ShowAlert";

const AlertContext = createContext({ showAlert: () => {} });
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.message && <ShowAlert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
