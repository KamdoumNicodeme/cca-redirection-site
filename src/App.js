
import './App.css';
import TransactionInfo from "./pages/Transaction-info";
import AuthPin from "./pages/Auth-pin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/trasaction" element={<TransactionInfo />} />
              <Route path="/" element={<AuthPin />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
