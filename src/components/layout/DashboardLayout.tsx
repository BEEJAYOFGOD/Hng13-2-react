// DashboardLayout.jsx
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer";

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    console.log(user);

    return (
        <main className="">
            {/* Header with full-width background */}
            <header className=" w-full fixed top-0 border-b bg-white z-50">
                <div className=" mx-auto flex max-w-[1440px] justify-between items-center md:px-3  lg:px-24 py-4">
                    <h1 className="text-3xl text-primary hover:text-hover hover:underline font-bold">
                        <Link to="/dashboard">Dashboard</Link>
                    </h1>

                    <div className="flex gap-4 items-center">
                        <button
                            className="cursor-pointer bg-destructive/80 hover:bg-destructive/50 text-white px-4 py-2 rounded-md transition-colors"
                            onClick={logout}
                        >
                            Log Out
                        </button>

                        <div className="h-8 w-8 bg-primary flex justify-center items-center rounded-full">
                            <p className="text-white font-semibold">
                                {user?.name.charAt(0).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content area with background */}
            <div className="pt-20 bg-gray-200/60 ">
                <div className="max-w-[1440px]  mx-auto px-4 sm:px-6 lg:px-12">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default DashboardLayout;
