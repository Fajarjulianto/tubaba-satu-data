import { createContext, useContext, useState, useEffect } from "react";

interface userType {
  name: string;
  id: string;
  email: string;
  password: string;
  role: string;
}

interface AuthContextType {
  user: userType | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ name: "", id: "", email: "", password: "", role: "admin" });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser({ name: "", id: "", email: "", password: "", role: "admin" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
