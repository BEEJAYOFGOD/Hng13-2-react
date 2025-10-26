import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

import { toast } from "sonner";

interface User {
    name: string;
    email: string;
}

interface Session {
    token: string;
    user: User;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = () => {
        try {
            const sessionData = localStorage.getItem("ticketapp_session");
            if (sessionData) {
                const session: Session = JSON.parse(sessionData);
                setUser(session.user);
            }
        } catch (error) {
            console.error("Failed to parse session:", error);
            localStorage.removeItem("ticketapp_session");
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check if user already exists
            const existingUser = localStorage.getItem("ticketapp_user");
            if (existingUser) {
                const userData = JSON.parse(existingUser);
                if (userData.email === email) {
                    toast.error("User with this email already exists");
                    return false;
                }
            }

            // Store user credentials (in real app, this would be on backend)
            const userData = { name, email, password };
            localStorage.setItem("ticketapp_user", JSON.stringify(userData));

            // Create session
            const session: Session = {
                token: "mock-token-" + Date.now(),
                user: { name, email },
            };

            localStorage.setItem("ticketapp_session", JSON.stringify(session));

            setUser(session.user);
            toast.success("Account created successfully!");
            return true;
        } catch (error) {
            console.log(error);
            toast.error("Failed to create account");
            return false;
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check stored user credentials
            const storedUser = localStorage.getItem("ticketapp_user");

            if (!storedUser) {
                toast.error("User not found - please sign up first");
                return false;
            }

            const userData = JSON.parse(storedUser);

            if (userData.email !== email || userData.password !== password) {
                toast.error("Invalid credentials - please try again");
                return false;
            }

            // Create session
            const session: Session = {
                token: "mock-token-" + Date.now(),
                user: { name: userData.name, email: userData.email },
            };
            localStorage.setItem("ticketapp_session", JSON.stringify(session));

            setUser(session.user);
            toast.success("Login successful!");
            return true;
        } catch (error) {
            console.log(error);
            toast.error("Login failed - please try again");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("ticketapp_session");
        setUser(null);
        toast.success("Logged out successfully");
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
