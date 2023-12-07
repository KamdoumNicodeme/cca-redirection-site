
import './App.css';
import TransactionInfo from "./pages/Transaction-info";
import AuthPin from "./pages/Auth-pin";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PinSetupPage from "./pages/PinSetupPage";
import PinChangePage from "./pages/PinChangePage";
import OTPValidation from "./pages/OTPValidation";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/transaction/:id_transaction" element={<TransactionInfo />} />
              <Route path="/auth-pin/:phone_number/:account_number/:operation" element={<AuthPin />} />-
              <Route path="/setup-pin/:phone_number" element={<PinSetupPage />} />
              <Route path="/pin-change/:phone_number" element={<PinChangePage />} />
              <Route path="/otp-validation/:phone_number/:account_number" element={<OTPValidation/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
