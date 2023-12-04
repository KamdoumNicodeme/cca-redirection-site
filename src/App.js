
import './App.css';
import TransactionInfo from "./pages/Transaction-info";
import AuthPin from "./pages/Auth-pin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PinSetupPage from "./pages/PinSetupPage";
import PinChangePage from "./pages/PinChangePage";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/transaction" element={<TransactionInfo />} />
              <Route path="/auth-pin" element={<AuthPin />} />-
              <Route path="/setup-pin" element={<PinSetupPage />} />
              <Route path="/pin-change" element={<PinChangePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
