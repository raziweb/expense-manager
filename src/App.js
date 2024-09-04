import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { TransactionProvider } from "./context/transactions";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext, UserProvider } from "./context/user";
import { useContext } from "react";
import SpendingAnalysis from "./pages/SpendingAnalysis";

function App() {
  return (
    <div className="pt-[70px]">
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
          <Route
            path="/analysis"
            element={
              <TransactionProvider>
                <SpendingAnalysis />
              </TransactionProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
