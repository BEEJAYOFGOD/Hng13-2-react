// RootLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../landing/Footer";

const RootLayout = () => {
    return (
        <>
            <div className="w-full  mx-auto">
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;
