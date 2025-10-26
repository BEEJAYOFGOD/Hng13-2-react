import { Pencil, Trash2 } from "lucide-react";
import { Ticket } from "./Dashboard";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const AllTickets = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);

    // Check if we're on the active tickets route
    const isActiveTicketsRoute = location.pathname === "/tickets/active";

    // Load tickets from localStorage
    useEffect(() => {
        const loadTickets = () => {
            const ticketsData = localStorage.getItem("ticketapp_tickets");
            if (ticketsData) {
                try {
                    const parsedTickets = JSON.parse(ticketsData);
                    setTickets(parsedTickets);
                } catch (error) {
                    console.error("Error parsing tickets:", error);
                    setTickets([]);
                }
            } else {
                setTickets([]);
            }
        };

        loadTickets();
    }, []);

    // Filter tickets based on route
    const displayedTickets = isActiveTicketsRoute
        ? tickets.filter(
              (ticket) =>
                  ticket.status === "open" || ticket.status === "in_progress"
          )
        : tickets;

    const handleDeleteClick = (ticket: Ticket) => {
        setTicketToDelete(ticket);
        setShowDeleteDialog(true);
    };

    const handleDelete = () => {
        const ticketsData = localStorage.getItem("ticketapp_tickets");
        if (ticketsData) {
            const tickets = JSON.parse(ticketsData);
            const updatedTickets = tickets.filter(
                (t: Ticket) => t.id !== ticketToDelete?.id
            );
            localStorage.setItem(
                "ticketapp_tickets",
                JSON.stringify(updatedTickets)
            );

            // Update local state
            setTickets(updatedTickets);

            toast.success("Ticket deleted successfully");
            setShowDeleteDialog(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "open":
                return "bg-green-100 text-green-800";
            case "in_progress":
                return "bg-amber-100 text-amber-800 border-amber-300";
            case "closed":
                return "bg-gray-100 text-gray-800 border-gray-300";
            default:
                return "";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "open":
                return "Open";
            case "in_progress":
                return "In Progress";
            case "closed":
                return "Closed";
            default:
                return status;
        }
    };

    const confirmDelete = () => {
        handleDelete();
        setShowDeleteDialog(false);
        setTicketToDelete(null);
    };

    return (
        <main className="p-8 pt-12">
            <h1 className="text-3xl font-bold mb-4">
                {isActiveTicketsRoute ? "Active Tickets" : "All Tickets"}
            </h1>

            {/* Optional: Add filter tabs */}
            <div className="flex gap-4 mb-6">
                <Link
                    to="/tickets"
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        !isActiveTicketsRoute
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    All Tickets
                </Link>
                <Link
                    to="/tickets/active"
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        isActiveTicketsRoute
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    Active Tickets
                </Link>
            </div>

            <div className="space-y-3">
                {displayedTickets.length > 0 ? (
                    displayedTickets.map((ticket: Ticket) => (
                        <div
                            key={ticket.id}
                            className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
                        >
                            {/* Card Header */}
                            <div className="p-5 border-b border-gray-100">
                                <div className="flex justify-between items-start gap-3 mb-3">
                                    <h3 className="text-lg font-semibold text-gray-900 flex-1 leading-tight">
                                        {ticket.title}
                                    </h3>

                                    {/* Status Tag */}
                                    <span
                                        className={`${getStatusColor(
                                            ticket.status
                                        )} px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap`}
                                    >
                                        {getStatusLabel(ticket.status)}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 space-y-4">
                                {ticket.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                        {ticket.description}
                                    </p>
                                )}

                                {/* Card Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">
                                        {formatDate(ticket.createdAt)}
                                    </span>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                navigate(
                                                    `/tickets/edit/${ticket.id}`
                                                );
                                            }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDeleteClick(ticket);
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">
                        {isActiveTicketsRoute
                            ? "No active tickets."
                            : "No tickets yet."}
                        <Link className="hover:underline" to="/dashboard">
                            {" "}
                            Create your first ticket here
                        </Link>
                    </p>
                )}
            </div>

            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Delete Ticket?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "
                            {ticketToDelete?.title}"? This action cannot be
                            undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AllTickets;
