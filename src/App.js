import HomePage from "./pages/HomePage";
import { TransactionProvider } from "./context/transactions";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SpendingAnalysis from "./pages/SpendingAnalysis";
import TransactionsPage from "./pages/TransactionsPage";
import CategoriesPage from "./pages/CategoriesPage";

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
          <Route
            path="/transactions"
            element={
              <TransactionProvider>
                <TransactionsPage />
              </TransactionProvider>
            }
          />
          <Route
            path="/categories"
            element={
              <TransactionProvider>
                <CategoriesPage />
              </TransactionProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
