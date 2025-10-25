import { Outlet } from "react-router-dom";
import Footer from "../landing/Footer";

const RootLayout = () => {
    return (
        <>
            {<Outlet />}
            <Footer />
        </>
    );
};

export default RootLayout;
