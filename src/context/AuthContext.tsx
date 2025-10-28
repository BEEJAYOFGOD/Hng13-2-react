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

interface StoredUser extends User {
    id: string;
    password: string;
    createdAt: string;
    tickets: string[];
}

interface Session {
    token: string;
    user: User;
    loggedInAt: string;
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

    // Helper function to get all users
    const getAllUsers = (): StoredUser[] => {
        try {
            const usersData = localStorage.getItem("ticketapp_users");
            return usersData ? JSON.parse(usersData) : [];
        } catch (error) {
            console.error("Failed to parse users:", error);
            return [];
        }
    };

    // Helper function to save all users
    const saveAllUsers = (users: StoredUser[]): void => {
        localStorage.setItem("ticketapp_users", JSON.stringify(users));
    };

    const signup = async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Get all existing users
            const allUsers = getAllUsers();

            // Check if user already exists
            const existingUser = allUsers.find((u) => u.email === email);
            if (existingUser) {
                toast.error("User with this email already exists");
                return false;
            }

            // Create new user
            const newUser: StoredUser = {
                id: "176166048685" + Date.now(), // Generate unique ID
                name,
                email,
                password,
                createdAt: new Date().toISOString(),
                tickets: [],
            };

            // Add to users array and save
            allUsers.push(newUser);
            saveAllUsers(allUsers);

            // Create session
            const session: Session = {
                token: "mock-token-" + Date.now(),
                user: { name, email },
                loggedInAt: new Date().toISOString(),
            };

            localStorage.setItem("ticketapp_session", JSON.stringify(session));

            setUser(session.user);
            toast.success("Account created successfully!");
            return true;
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Failed to create account");
            return false;
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Get all users
            const allUsers = getAllUsers();

            // Find user by email
            const user = allUsers.find((u) => u.email === email);

            if (!user) {
                toast.error("User not found - please sign up first");
                return false;
            }

            if (user.password !== password) {
                toast.error("Invalid password - please try again");
                return false;
            }

            // Create session
            const session: Session = {
                token: "mock-token-" + Date.now(),
                user: { name: user.name, email: user.email },
                loggedInAt: new Date().toISOString(),
            };

            localStorage.setItem("ticketapp_session", JSON.stringify(session));

            setUser(session.user);
            toast.success(`Welcome back, ${user.name}!`);
            return true;
        } catch (error) {
            console.error("Login error:", error);
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
