import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const { user } = useAuth();
    console.log(user);

    return (
        <main>
            <header className="w-full flex fixed top-0  justify-between items-center px-12 p-4 border-b bg-white">
                <h1>Dashboard</h1>

                <div className="flex gap-4">
                    <button>New Ticket</button>
                    <div className="h-12 w-12 bg-primary flex justify-center items-center rounded-full">
                        <p className="text-white">{user?.name.split("")[0]}</p>
                    </div>
                </div>
            </header>
            <div className="mt-12">{<Outlet />}</div>
        </main>
    );
};

export default DashboardLayout;
