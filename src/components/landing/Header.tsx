import { Button } from "../ui/button";
import { NavLink as Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background border-b border-border">
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
                            TicketFlow
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="#features"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            to="#how-it-works"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            How It Works
                        </Link>
                        <Link
                            to="#faq"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            FAQ
                        </Link>
                        <Link
                            to="#pricing"
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            Pricing
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link to="/auth/login">Log in</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/auth/signup">Sign up</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
