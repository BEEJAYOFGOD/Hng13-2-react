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

function App() {
    return (
        <AuthProvider>
            <Toaster position="top-right" />
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
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;
