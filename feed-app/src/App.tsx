import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Profile from "./pages/student/Profile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
