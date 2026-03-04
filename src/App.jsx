import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./components/Register";
import AddCustomer from "./components/AddCustomer";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import EditCustomer from "./components/EditCustomer";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customer/:id" element={<CustomerDetail />} />
          <Route path="add" element={<AddCustomer />} />
          <Route path="edit/:id" element={<EditCustomer />} />
        </Route>
      </Routes>
    </div>
  );
}
