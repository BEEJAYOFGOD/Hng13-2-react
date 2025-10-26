import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// ============================================
// VALIDATION RULES (Pure Functions)
// ============================================

const validateEmail = (email: string) => {
    const trimmed = email.trim();

    if (!trimmed) {
        return { isValid: false, message: "Email is required" };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
        return {
            isValid: false,
            message: "Please enter a valid email address",
        };
    }

    return { isValid: true, message: "" };
};

const validatePassword = (password: string) => {
    const trimmed = password.trim();

    if (!trimmed) {
        return { isValid: false, message: "Password cannot be empty" };
    }

    if (trimmed.length < 8) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long",
        };
    }

    return { isValid: true, message: "" };
};

// ============================================
// COMPONENT
// ============================================

export default function LoginForm() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const [isLoading, setIsLoading] = useState(false);

    // ============================================
    // VALIDATION HANDLERS
    // ============================================

    const validateField = (field: "email" | "password", value: string) => {
        const validator = field === "email" ? validateEmail : validatePassword;
        const result = validator(value);

        setErrors((prev) => {
            if (result.isValid) {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            }
            return { ...prev, [field]: result.message };
        });

        return result.isValid;
    };

    const validateForm = () => {
        const emailResult = validateEmail(formData.email);
        const passwordResult = validatePassword(formData.password);

        const newErrors: typeof errors = {};
        if (!emailResult.isValid) newErrors.email = emailResult.message;
        if (!passwordResult.isValid)
            newErrors.password = passwordResult.message;

        setErrors(newErrors);
        return emailResult.isValid && passwordResult.isValid;
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof typeof errors];
                return newErrors;
            });
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name as "email" | "password", value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsLoading(true);
        const success = await login(formData.email, formData.password);
        setIsLoading(false);

        if (success) {
            setFormData({ email: "", password: "" });
            navigate("/dashboard", { replace: true });
        }
    };

    // ============================================
    // REDIRECT IF AUTHENTICATED
    // ============================================

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    // ============================================
    // RENDER
    // ============================================

    return (
        <Card className="border border-border">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email ? "border-destructive" : ""}
                            disabled={isLoading}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.password ? "border-destructive" : ""
                            }
                            disabled={isLoading}
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
