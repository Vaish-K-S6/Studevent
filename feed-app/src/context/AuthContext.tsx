import { createContext, useContext, useEffect, useState } from "react";

type Role = "student" | "organizer";

type AuthContextType = {
  isLoggedIn: boolean;
  role: Role;
  savedReels: number[];
  toggleSaveReel: (id: number) => void;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

/* 🔐 ORGANIZER EMAIL CONTROL LIST */
const ORGANIZER_EMAILS = [
  "cse@iith.ac.in",
  "techclub@iitb.ac.in",
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("student");
  const [savedReels, setSavedReels] = useState<number[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("studevent_user");
    const saved = localStorage.getItem("saved_reels");

    if (user) {
      setIsLoggedIn(true);
      setRole(
        ORGANIZER_EMAILS.includes(user) ? "organizer" : "student"
      );
    }

    if (saved) {
      setSavedReels(JSON.parse(saved));
    }
  }, []);

  const toggleSaveReel = (id: number) => {
    setSavedReels((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((r) => r !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("saved_reels", JSON.stringify(updated));
      return updated;
    });
  };

  const login = (email: string) => {
    localStorage.setItem("studevent_user", email);
    setIsLoggedIn(true);
    setRole(
      ORGANIZER_EMAILS.includes(email) ? "organizer" : "student"
    );
  };

  const logout = () => {
    localStorage.removeItem("studevent_user");
    setIsLoggedIn(false);
    setRole("student");
    setSavedReels([]);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, savedReels, toggleSaveReel, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};