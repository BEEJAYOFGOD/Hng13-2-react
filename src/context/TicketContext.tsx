import { Ticket } from "@/page/dashboard/Dashboard";
import { createContext, ReactNode, useContext } from "react";
import { useState, useEffect } from "react";

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

    // ... same logic as custom hook

    useEffect(() => {
        const loadTickets = () => {
            const data = localStorage.getItem("ticketapp_tickets");
            if (data) {
                setTickets(JSON.parse(data));
            }
        };
        loadTickets();
    }, []);

    const saveTickets = (newTickets: Ticket[]) => {
        setTickets(newTickets);
        localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
    };

    const addTicket = (ticket: Ticket) => {
        const updated = [...tickets, ticket];
        saveTickets(updated);
    };

    const deleteTicket = (id: string) => {
        const updated = tickets.filter((t) => t.id !== id);
        saveTickets(updated);
    };

    const updateTicket = (id: string, updates: Partial<Ticket>) => {
        const updated = tickets.map((t) =>
            t.id === id ? { ...t, ...updates } : t
        );
        saveTickets(updated);
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
