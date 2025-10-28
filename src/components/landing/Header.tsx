import { Button } from "../ui/button";
import { NavLink as Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const scrollToSection = (sectionId: string) => {
        // If already on the page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            // Navigate to home page, then scroll after navigation
            navigate("/");
        }
    };

    console.log(isAuthenticated);
    return (
        <header className="fixed   w-full top-0 z-50 bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">
                                T
                            </span>
                        </div>
                        <span className="font-bold text-xl text-foreground">
                            Ticko
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="#features"
                            onClick={() => scrollToSection("features")}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            to="#how-it-works"
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            How It Works
                        </Link>
                        <Link
                            to="#faq"
                            onClick={() => scrollToSection("faq")}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            FAQ
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            {!isAuthenticated ? (
                                <Link to="/auth/login">Log in</Link>
                            ) : (
                                <Link to="/dashboard">Dashboard</Link>
                            )}
                        </Button>
                        <>
                            {isAuthenticated ? (
                                <Button
                                    onClick={logout}
                                    className={
                                        "bg-red-500 rounded-md px-4 py-2"
                                    }
                                >
                                    Log out
                                </Button>
                            ) : (
                                <Link
                                    to="/auth/signup"
                                    className={
                                        "bg-primary hover:bg-hover text-white rounded-md px-4 py-2"
                                    }
                                >
                                    Sign up
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </div>
        </header>
    );
}
