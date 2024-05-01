import Navbar from "./components/Navbar";
import TransactionShow from "./components/TransactionShow";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-2 flex justify-center">
        <TransactionShow />
      </div>
    </div>
  );
}

export default App;
