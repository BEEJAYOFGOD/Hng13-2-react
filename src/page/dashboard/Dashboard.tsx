import DashboardStats from "@/components/dashboard/DashboardStat";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import {
    Ticket,
    CheckCircle,
    Clock,
    XCircle,
    PlusIcon,
    TicketIcon,
    Pencil,
    Trash2,
} from "lucide-react";
import { Clock3Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useTickets } from "@/context/TicketContext";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    priority: string;
}

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    // const [tickets, setTickets] = useState<Ticket[]>([]);

    const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);

    const { tickets, deleteTicket } = useTickets();

    const handleDeleteClick = (ticket: Ticket) => {
        setTicketToDelete(ticket);
        setShowDeleteDialog(true);
    };

    // const getTicketStats = (): TicketStats[] => {
    //     // Initialize counts
    //     const counts: TicketCounts = {
    //         total: 0,
    //         open: 0,
    //         inProgress: 0,
    //         closed: 0,
    //     };

    //     try {
    //         const ticketsData = localStorage.getItem("ticketapp_tickets");

    //         if (ticketsData) {
    //             const tickets: Ticket[] = JSON.parse(ticketsData);
    //             counts.total = tickets.length;

    //             // Count tickets by status
    //             tickets.forEach((ticket) => {
    //                 switch (ticket.status) {
    //                     case "open":
    //                         counts.open++;
    //                         break;
    //                     case "in_progress":
    //                         counts.inProgress++;
    //                         break;
    //                     case "closed":
    //                         counts.closed++;
    //                         break;
    //                 }
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error fetching ticket stats:", error);
    //     }

    //     // Return stats array with actual counts
    //     return [
    //         {
    //             title: "Total Tickets",
    //             value: counts.total,
    //             icon: Ticket,
    //             iconColor: "text-blue-600",
    //             description: "All tickets in system",
    //         },
    //         {
    //             title: "Open Tickets",
    //             value: counts.open,
    //             icon: CheckCircle,
    //             iconColor: "text-green-600",
    //             description: "Awaiting action",
    //         },
    //         {
    //             title: "In Progress",
    //             value: counts.inProgress,
    //             icon: Clock,
    //             iconColor: "text-amber-600",
    //             description: "Currently being worked on",
    //         },
    //         {
    //             title: "Resolved",
    //             value: counts.closed,
    //             icon: XCircle,
    //             iconColor: "text-gray-600",
    //             description: "Successfully completed",
    //         },
    //     ];
    // };

    // useEffect(() => {
    //     const loadTickets = () => {
    //         const ticketsData = localStorage.getItem("ticketapp_tickets");
    //         if (ticketsData) {
    //             try {
    //                 const parsedTickets = JSON.parse(ticketsData);
    //                 setTickets(parsedTickets);
    //                 // Update stats after loading tickets
    //                 setStats(getTicketStats());
    //             } catch (error) {
    //                 console.error(
    //                     "Error parsing tickets from localStorage:",
    //                     error
    //                 );
    //                 setTickets([]);
    //                 setStats(getTicketStats());
    //             }
    //         } else {
    //             setStats(getTicketStats());
    //         }
    //     };

    //     loadTickets();
    // }, []);

    const stats = useMemo(() => {
        const counts = {
            total: tickets.length,
            open: tickets.filter((t) => t.status === "open").length,
            inProgress: tickets.filter((t) => t.status === "in_progress")
                .length,
            closed: tickets.filter((t) => t.status === "closed").length,
        };

        return [
            {
                title: "Total Tickets",
                value: counts.total,
                icon: Ticket,
                iconColor: "text-blue-600",
                description: "All tickets in system",
            },
            {
                title: "Open Tickets",
                value: counts.open,
                icon: CheckCircle,
                iconColor: "text-green-600",
                description: "Awaiting action",
            },
            {
                title: "In Progress",
                value: counts.inProgress,
                icon: Clock,
                iconColor: "text-amber-600",
                description: "Currently being worked on",
            },
            {
                title: "Resolved",
                value: counts.closed,
                icon: XCircle,
                iconColor: "text-gray-600",
                description: "Successfully completed",
            },
        ];
    }, [tickets]);

    const QuickActions = [
        {
            icon: PlusIcon,
            text: "Create New Ticket",
            desc: "Start a new ticket to create a new issue",
            href: "/tickets/create",
            color: "text-black",
        },
        {
            icon: TicketIcon,
            text: "View All Tickets",
            desc: "Browse and manage all tickets",
            href: "/tickets",
            color: "text-green-600",
        },
        {
            icon: Clock3Icon,
            text: "View Active Tickets",
            desc: "See all tickets currently in progress",
            href: "/tickets/active",
            color: "text-amber-600",
        },
    ];

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

    const confirmDelete = () => {
        if (ticketToDelete) {
            deleteTicket(ticketToDelete.id); // Use context function
            toast.success("Ticket deleted successfully");
            setShowDeleteDialog(false);
            setTicketToDelete(null);
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section className="md:p-12 md:py-12 px-4 py-8  max-w-[1440px]">
            <h2 className="md:text-2xl text-lg font-bold">
                Welcome {user?.email}
            </h2>
            <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <DashboardStats {...stat} />
                    ))}
                </div>
            </div>

            {/*Quick Action */}
            <Card className="mt-8">
                <CardTitle className="px-4 text-xl">Quick Actions</CardTitle>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {QuickActions.map((action, index) => (
                        <Link key={index} to={action.href}>
                            <div className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                <div className="text-2xl mb-2">
                                    <action.icon
                                        className={`w-12 h-12 ${action.color}`}
                                    />
                                </div>
                                <h3 className="font-semibold text-foreground text-sm mb-1">
                                    {action.text}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {action.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>

            <section className="mt-8">
                <Card className="my-8">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl">
                                Recent Tickets
                            </CardTitle>
                            <Button
                                className="bg-primary text-white hover:bg-hover hover:text-white"
                                variant="outline"
                                onClick={() => navigate("/tickets")}
                            >
                                View All →
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {tickets.length > 0 ? (
                            <div className="space-y-3">
                                {tickets.slice(0, 5).map((ticket: Ticket) => (
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
                                                    {getStatusLabel(
                                                        ticket.status
                                                    )}
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
                                                    {formatDate(
                                                        ticket.createdAt
                                                    )}
                                                </span>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/tickets/edit/${ticket.id}`
                                                            )
                                                        }
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteClick(
                                                                ticket
                                                            );
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
                        ) : (
                            <p className="text-center text-muted-foreground py-8">
                                No tickets yet. Create your first ticket!
                            </p>
                        )}
                    </CardContent>
                </Card>
            </section>

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
        </section>
    );
};

export default Dashboard;
