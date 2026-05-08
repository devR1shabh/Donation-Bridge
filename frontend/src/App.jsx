import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AvailableDonations from "./pages/AvailableDonations";
import ClaimedDonations from "./pages/ClaimedDonations";
import CreateDonation from "./pages/CreateDonation";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyDonations from "./pages/MyDonations";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-donation"
            element={
              <ProtectedRoute allowedRoles={["restaurant"]}>
                <CreateDonation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-donations"
            element={
              <ProtectedRoute allowedRoles={["restaurant"]}>
                <MyDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/available-donations"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <AvailableDonations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/claimed-donations"
            element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <ClaimedDonations />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
