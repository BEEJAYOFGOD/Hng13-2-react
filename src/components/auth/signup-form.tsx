import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateName = (name: string) => {
        if (!name.trim()) {
            setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
            return false;
        } else if (name.length < 3) {
            setErrors((prev) => ({
                ...prev,
                name: "Name must be at least 3 characters long.",
            }));
            return false;
        }
        setErrors((prev) => ({ ...prev, name: "" }));
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password.trim()) {
            setErrors((prev) => ({
                ...prev,
                password: "Password cannot be empty",
            }));
            return false;
        } else if (password.trim().length < 5) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 5 characters long.",
            }));
            return false;
        }

        setErrors((prev) => ({ ...prev, password: "" }));
        return true;
    };

    const validateConfirmPassword = (password: string) => {
        if (!password.trim()) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Confirm password cannot be empty",
            }));
            return false;
        } else if (password.trim().length < 5) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Password must be at least 5 characters long.",
            }));
            return false;
        } else if (password !== formData.password) {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match",
            }));
            return false;
        }

        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        return true;
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setErrors((prev) => ({ ...prev, email: "Email is required." }));
            return false;
        } else if (!emailPattern.test(email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email address.",
            }));
            return false;
        }
        setErrors((prev) => ({ ...prev, email: "" }));
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const isNamevalid = validateName(formData.name);
        const isEmailValid = validateEmail(formData.email);
        const isPasswordValid = validatePassword(formData.password);
        const isConfirmPasswordValid = validateConfirmPassword(
            formData.confirmPassword
        );

        return (
            isNamevalid &&
            isConfirmPasswordValid &&
            isPasswordValid &&
            isEmailValid
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);

        if (!validateForm()) {
            return;
        }
        const session = {
            token: "mock-token-" + Date.now(),
            user: { name: "John", email: "john@example.com" },
        };
        localStorage.setItem("ticketapp_session", JSON.stringify(session));

        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        });
        const success = await signup(
            formData.name,
            formData.email,
            formData.password
        );
        setIsLoading(false);

        if (success) {
            navigate("/dashboard", { replace: true });
        }

        // In a real app, you would send data to your backend
        console.log("Signup attempt:", formData);
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
                            onChange={(e) => {
                                handleChange(e);
                                validateName(e.target.value);
                            }}
                            onBlur={(e) => validateName(e.target.value)}
                            className={errors.name ? "border-destructive" : ""}
                            disabled={isLoading}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
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
                            onChange={(e) => {
                                handleChange(e);
                                validateEmail(e.target.value);
                            }}
                            onBlur={(e) => validateEmail(e.target.value)}
                            className={errors.email ? "border-destructive" : ""}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
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
                            onChange={(e) => {
                                handleChange(e);
                                validatePassword(e.target.value);
                            }}
                            onBlur={(e) => {
                                validatePassword(e.target.value);
                            }}
                            className={
                                errors.password ? "border-destructive" : ""
                            }
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">
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
                            onChange={(e) => {
                                handleChange(e);
                                validateConfirmPassword(e.target.value);
                            }}
                            onBlur={(e) => {
                                validateConfirmPassword(e.target.value);
                            }}
                            className={
                                errors.confirmPassword
                                    ? "border-destructive"
                                    : ""
                            }
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-destructive">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-2">
                        <Checkbox
                            id="terms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    agreeToTerms: checked === true,
                                }))
                            }
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground cursor-pointer"
                        >
                            I agree to the{" "}
                            <a
                                href="#"
                                className="text-primary hover:underline"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="text-primary hover:underline"
                            >
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    {errors.agreeToTerms && (
                        <p className="text-sm text-destructive">
                            {errors.agreeToTerms}
                        </p>
                    )}

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
