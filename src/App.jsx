import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ProtectedPath from "./layout/ProtectedPath";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPswd from "./pages/ForgetPswd";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";

import AdminPatients from "./pages/AdminPatients";

import EditProfile from "./pages/EditProfile";
import ChangePwd from "./pages/ChangePwd";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPswd />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/admin" element={<ProtectedPath />}>
              <Route index element={<AdminPatients />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePwd />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
