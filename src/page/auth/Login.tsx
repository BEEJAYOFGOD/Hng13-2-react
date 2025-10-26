import LoginForm from "@/components/auth/login-form";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 mb-6"
                        >
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold">
                                    T
                                </span>
                            </div>
                            <span className="font-bold text-xl text-foreground">
                                Ticko
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Nice to see you again
                        </h1>
                        <p className="text-muted-foreground">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Form */}
                    <LoginForm />

                    {/* Footer */}
                    <p className="text-center text-muted-foreground text-sm mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/auth/signup"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
