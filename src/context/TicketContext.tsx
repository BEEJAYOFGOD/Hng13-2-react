import { Ticket } from "@/page/dashboard/Dashboard";
import { createContext, ReactNode, useContext } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Adjust path as needed
import { toast } from "sonner";

interface StoredUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    tickets: Ticket[];
}

interface TicketsContextType {
    tickets: Ticket[];
    addTicket: (ticket: Ticket) => void;
    deleteTicket: (id: string) => void;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
}

interface ChildProps {
    children: ReactNode;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider = ({ children }: ChildProps) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const { user, isAuthenticated } = useAuth();

    // Load tickets when user changes
    useEffect(() => {
        if (isAuthenticated && user) {
            loadUserTickets();
        } else {
            setTickets([]);
        }
    }, [user, isAuthenticated]);

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

    // Helper function to find current user
    const getCurrentUser = (): StoredUser | undefined => {
        if (!user) return undefined;
        const allUsers = getAllUsers();
        return allUsers.find((u) => u.email === user.email);
    };

    const loadUserTickets = () => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser && currentUser.tickets) {
                setTickets(currentUser.tickets);
            } else {
                setTickets([]);
            }
        } catch (error) {
            console.error("Failed to load tickets:", error);
            setTickets([]);
        }
    };

    const saveUserTickets = (newTickets: Ticket[]) => {
        try {
            if (!user) {
                toast.error("You must be logged in to manage tickets");
                return;
            }

            const allUsers = getAllUsers();
            const userIndex = allUsers.findIndex((u) => u.email === user.email);

            if (userIndex === -1) {
                toast.error("User not found");
                return;
            }

            // Update user's tickets
            allUsers[userIndex].tickets = newTickets;
            saveAllUsers(allUsers);
            setTickets(newTickets);
        } catch (error) {
            console.error("Failed to save tickets:", error);
            toast.error("Failed to save tickets");
        }
    };

    const addTicket = (ticket: Ticket) => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to add tickets");
            return;
        }

        const updated = [...tickets, ticket];
        saveUserTickets(updated);
        toast.success("Ticket added successfully!");
    };

    const deleteTicket = (id: string) => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to delete tickets");
            return;
        }

        const updated = tickets.filter((t) => t.id !== id);
        saveUserTickets(updated);
        toast.success("Ticket deleted successfully!");
    };

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to update tickets");
            return;
        }

        const updated = tickets.map((t) =>
            t.id === id ? { ...t, ...updates } : t
        );
        saveUserTickets(updated);
        toast.success("Ticket updated successfully!");
    };

    return (
        <TicketsContext.Provider
            value={{ tickets, addTicket, deleteTicket, updateTicket }}
        >
            {children}
        </TicketsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTickets = () => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return context;
};
