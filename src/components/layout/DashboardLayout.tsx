import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    console.log(user);

    return (
        <main>
            <header className="w-full flex fixed top-0  justify-between items-center px-12 p-4 border-b bg-white">
                <h1 className="text-3xl font-bold">
                    <Link to="/dashboard"> Dashboard</Link>
                </h1>

                <div className="flex gap-4">
                    <button
                        className="cursor-pointer bg-destructive/80 hover:bg-destructive/50  text-white px-4 rounded-md"
                        onClick={logout}
                    >
                        Log Out
                    </button>
                    <div className="h-8 w-8 bg-primary flex justify-center items-center rounded-full">
                        <p className="text-white">{user?.name.split("")[0]}</p>
                    </div>
                </div>
            </header>
            <div className="mt-12 bg-gray-200/60">{<Outlet />}</div>
        </main>
    );
};

export default DashboardLayout;
