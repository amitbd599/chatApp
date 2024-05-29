import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import OTPCode from './pages/OTPCode';
import ChangePassword from './pages/ChangePassword';

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/otp-code/:email" element={<OTPCode />} />
        <Route exact path="/change-password/:email/:otp" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
