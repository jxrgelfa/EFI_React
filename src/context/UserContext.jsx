import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Usuario administrador por defecto para desarrollo
  const [user, setUser] = useState({ admin: true, nombre: "Admin" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
