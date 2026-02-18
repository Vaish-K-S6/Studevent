import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  savedReels: number[];
  toggleSaveReel: (id: number) => void;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [savedReels, setSavedReels] = useState<number[]>([]);

  /* Load saved state on refresh */
  useEffect(() => {
    const user = localStorage.getItem("studevent_user");
    const saved = localStorage.getItem("saved_reels");

    if (user) setIsLoggedIn(true);
    if (saved) setSavedReels(JSON.parse(saved));
  }, []);

  /* SAVE / UNSAVE REEL */
  const toggleSaveReel = (id: number) => {
    setSavedReels((prev) => {
      let updated: number[];

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
  };

  const logout = () => {
    localStorage.removeItem("studevent_user");
    setIsLoggedIn(false);
    setSavedReels([]);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, savedReels, toggleSaveReel, login, logout }}
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
