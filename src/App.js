import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { TransactionProvider } from "./context/transactions";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext, UserProvider } from "./context/user";
import { useContext } from "react";

function App() {
  const {user} = useContext(UserContext);
  console.log(user);
  return (
    <div className="pt-[70px]">
        <div>
          {user != null && <Navbar />}
        </div>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <TransactionProvider>
                  <HomePage />
                </TransactionProvider>
              }
            />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
