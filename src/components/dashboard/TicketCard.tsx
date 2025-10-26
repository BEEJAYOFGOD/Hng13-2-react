
import type { Ticket } from "@/page/dashboard/Dashboard";

//  id: string;
//     title: string;
//     description: string;
//     status: string;
//     createdAt: string;
//     priority: string;

const TiketCard = ({ ticket }: { ticket: Ticket }) => {
    return (
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
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Pencil className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => {
                                console.log("ademol");
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
    );
};

export default TiketCard;
