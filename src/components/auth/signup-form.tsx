import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignupForm() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    // ============================================
    // VALIDATION FUNCTIONS
    // ============================================

    const validateName = (name: string) => {
        if (!name.trim()) {
            setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
            return false;
        }
        if (name.trim().length < 3) {
            setErrors((prev) => ({
                ...prev,
                name: "Name must be at least 3 characters long",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.name;
            return newErrors;
        });
        return true;
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }));
            return false;
        }
        if (!emailPattern.test(email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email address",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.email;
            return newErrors;
        });
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) {
            setErrors((prev) => ({
                ...prev,
                password: "Password cannot be empty",
            }));
            return false;
        }
        if (password.trim().length < 8) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 8 characters long",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.password;
            return newErrors;
        });
        return true;
    };

    const validateConfirmPassword = (password: string) => {
        if (!password.trim()) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Please confirm your password",
            }));
            return false;
        }
        if (password.trim().length < 8) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Password must be at least 8 characters long",
            }));
            return false;
        }
        if (password !== formData.password) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.confirmPassword;
            return newErrors;
        });
        return true;
    };

    const validateForm = () => {
        const isNameValid = validateName(formData.name);
        const isEmailValid = validateEmail(formData.email);
        const isPasswordValid = validatePassword(formData.password);
        const isConfirmPasswordValid = validateConfirmPassword(
            formData.confirmPassword
        );

        return (
            isNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid
        );
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

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

        switch (name) {
            case "name":
                validateName(value);
                break;
            case "email":
                validateEmail(value);
                break;
            case "password":
                validatePassword(value);
                break;
            case "confirmPassword":
                validateConfirmPassword(value);
                break;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsLoading(true);
        const success = await signup(
            formData.name,
            formData.email,
            formData.password
        );
        setIsLoading(false);

        if (success) {
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            navigate("/dashboard", { replace: true });
        }
    };

    return (
        <Card className="border border-border">
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                            Full Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.name ? "border-destructive" : ""}
                            disabled={isLoading}
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
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
                        <Label htmlFor="password" className="text-foreground">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
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

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="confirmPassword"
                            className="text-foreground"
                        >
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.confirmPassword
                                    ? "border-destructive"
                                    : ""
                            }
                            disabled={isLoading}
                            aria-invalid={!!errors.confirmPassword}
                        />
                        {errors.confirmPassword && (
                            <p
                                className="text-sm text-destructive"
                                role="alert"
                            >
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
