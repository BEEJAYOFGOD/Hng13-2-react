import { Pencil, Trash2 } from "lucide-react";
import { Ticket } from "./Dashboard";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTickets = () => {
    const naviagte = useNavigate();
    const recentTickets = [
        {
            id: "1",
            title: "Fix login authentication bug",
            description:
                "Users are experiencing issues logging in with Google OAuth. Need to investigate the redirect callback.",
            status: "open",
            createdAt: "2025-10-20T10:00:00Z",
            priority: "high",
        },
        {
            id: "2",
            title: "Update dashboard UI design",
            description:
                "Redesign the main dashboard to match new brand guidelines and improve user experience.",
            status: "in_progress",
            createdAt: "2025-10-18T14:30:00Z",
            priority: "low",
        },
        {
            id: "3",
            title: "Add export to PDF feature",
            description:
                "Implement functionality to export reports as PDF documents with custom formatting.",
            status: "closed",
            createdAt: "2025-10-15T09:15:00Z",
            priority: "low",
        },
        {
            id: "4",
            title: "Database performance optimization",
            description:
                "Optimize slow queries affecting the user dashboard load times.",
            status: "open",
            createdAt: "2025-10-22T16:45:00Z",
            priority: "low",
        },
        {
            id: "5",
            title: "Implement email notifications",
            description:
                "Set up automated email notifications for ticket status updates.",
            status: "in_progress",
            createdAt: "2025-10-19T11:20:00Z",
            priority: "low",
        },
        {
            id: "6",
            title: "Fix mobile responsive issues",
            description:
                "Several pages are not rendering correctly on mobile devices. Need responsive fixes.",
            status: "closed",
            createdAt: "2025-10-12T08:00:00Z",
            priority: "low",
        },
    ];
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>({
        id: "",
        title: "",
        priority: "",
        status: "",
        description: "",
        createdAt: "",
    });

    const handleDeleteClick = (ticket: Ticket) => {
        setTicketToDelete(ticket);
        setShowDeleteDialog(true);
    };

    const handleDelete = () => {
        // Delete logic
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

            toast.success("Ticket deleted successfully");
            setShowDeleteDialog(false);

            // Refresh or update state
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
        console.log("Deleting ticket:", ticketToDelete?.title);
        handleDelete();
        setShowDeleteDialog(false);
        setTicketToDelete(null);
    };

    return (
        <main className="p-8 pt-12">
            <h1 className="text-3xl font-bol mb-4">All Tickets</h1>
            <div className="space-y-3">
                {recentTickets.map((ticket) => (
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
                                            naviagte(
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
                ))}
            </div>

            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 b">
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
