import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/Landing";
import Login from "./page/auth/Login";
import RootLayout from "./components/layout/RooLayout";
import Signup from "./page/auth/Signup";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/Protectedroute";
import Dashboard from "./page/dashboard/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import AllTickets from "./page/dashboard/AllTickets";
import CreateEditTicket from "@/components/dashboard/CreateTicket";
import { Navigate } from "react-router-dom";
import { TicketsProvider } from "./context/TicketContext";

function App() {
    return (
        <TicketsProvider>
            {" "}
            <AuthProvider>
                <Toaster
                    position="top-right"
                    closeButton
                    duration={3000}
                    toastOptions={{
                        // Base styles for all toasts
                        style: {
                            background: "white",
                            color: "rgb(31 41 55)",
                            border: "1px solid rgb(229 231 235)",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        },
                        // Use classNames for different types
                        classNames: {
                            success: "border-green-500 text-green-500",
                            error: "border-red-500 text-red-500",
                            warning: "border-amber-500 text-amber-500",
                            info: "border-gray-500 text-gray-500",
                        },
                    }}
                />
                <Routes>
                    {/* <Route path="/" element={<LandingPage />} /> */}
                    {/* <Route path="/auth/login" element={<LoginForm />} /> */}

                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<LandingPage />} />
                        <Route path="auth/login" element={<Login />} />
                        <Route path="auth/signup" element={<Signup />} />
                        {/* <Route path="about" element={<AboutPage />} />{" "}
                {/* Renders at /about */}
                        {/* <Route path="contact" element={<ContactPage />} />{" "} */}
                        {/* Renders at /contact */}
                    </Route>

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                    </Route>

                    <Route
                        path="/tickets"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AllTickets />} />
                        <Route path="create" element={<CreateEditTicket />} />
                        <Route path="active" element={<AllTickets />} />

                        <Route path="edit/:id" element={<CreateEditTicket />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </TicketsProvider>
    );
}

export default App;
