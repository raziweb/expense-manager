import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { TransactionProvider } from "./context/transactions";

function App() {
  return (
    <div className="pt-[70px]">
      <TransactionProvider>
        <div>
          <Navbar />
        </div>
        <HomePage />
      </TransactionProvider>
    </div>
  );
}

export default App;
