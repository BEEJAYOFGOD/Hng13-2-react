import React, { useState, useEffect, useCallback } from "react";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

interface Ticket {
    id: string;
    title: string;
    description: string;
    status: "open" | "in_progress" | "closed";
    priority?: string;
    createdAt: string;
    updatedAt?: string;
}

const CreateEditTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    // ============================================
    // LOAD TICKET DATA FOR EDITING
    // ============================================

    const loadTicket = useCallback((ticketId: string) => {
        try {
            const ticketsData = localStorage.getItem("ticketapp_tickets");
            if (ticketsData) {
                const tickets: Ticket[] = JSON.parse(ticketsData);
                const ticket = tickets.find((t) => t.id === ticketId);

                if (ticket) {
                    setFormData({
                        title: ticket.title,
                        description: ticket.description || "",
                        status: ticket.status,
                        priority: ticket.priority || "",
                    });
                } else {
                    toast.error("Ticket not found");
                    navigate("/tickets");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load ticket");
            navigate("/tickets");
        }
    }, []);

    useEffect(() => {
        if (isEditMode && id) {
            loadTicket(id);
        }
    }, [id, isEditMode, loadTicket]);

    // ============================================
    // VALIDATION FUNCTIONS
    // ============================================

    const validateTitle = (title: string) => {
        if (!title.trim()) {
            setErrors((prev) => ({
                ...prev,
                title: "Title cannot be empty",
            }));
            return false;
        }
        if (title.trim().length < 3) {
            setErrors((prev) => ({
                ...prev,
                title: "Title must be at least 3 characters long",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.title;
            return newErrors;
        });
        return true;
    };

    const validateDesc = (desc: string) => {
        // Description is optional based on task
        if (desc && desc.trim().length < 10) {
            setErrors((prev) => ({
                ...prev,
                description: "Description must be at least 10 characters long",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.description;
            return newErrors;
        });
        return true;
    };

    const validateStatus = (status: string) => {
        const validStatuses = ["open", "in_progress", "closed"];

        if (!status.trim()) {
            setErrors((prev) => ({
                ...prev,
                status: "Status is required",
            }));
            return false;
        }

        if (!validStatuses.includes(status)) {
            setErrors((prev) => ({
                ...prev,
                status: "Status must be open, in_progress, or closed",
            }));
            return false;
        }

        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.status;
            return newErrors;
        });
        return true;
    };

    const validateForm = () => {
        const isTitleValid = validateTitle(formData.title);
        const isDescValid = validateDesc(formData.description);
        const isStatusValid = validateStatus(formData.status);

        return isTitleValid && isDescValid && isStatusValid;
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
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

    const handleBlur = (
        e:
            | React.FocusEvent<HTMLInputElement>
            | React.FocusEvent<HTMLTextAreaElement>
            | React.FocusEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        switch (name) {
            case "title":
                validateTitle(value);
                break;
            case "description":
                validateDesc(value);
                break;
            case "status":
                validateStatus(value);
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

        try {
            const ticketsData = localStorage.getItem("ticketapp_tickets");
            let tickets: Ticket[] = ticketsData ? JSON.parse(ticketsData) : [];

            if (isEditMode && id) {
                // UPDATE existing ticket
                tickets = tickets.map((ticket) =>
                    ticket.id === id
                        ? {
                              ...ticket,
                              title: formData.title,
                              description: formData.description,
                              status: formData.status as
                                  | "open"
                                  | "in_progress"
                                  | "closed",
                              priority: formData.priority,
                              updatedAt: new Date().toISOString(),
                          }
                        : ticket
                );
                toast.success("Ticket updated successfully!");
            } else {
                // CREATE new ticket
                const newTicket: Ticket = {
                    id: "ticket-" + Date.now(),
                    title: formData.title,
                    description: formData.description,
                    status: formData.status as
                        | "open"
                        | "in_progress"
                        | "closed",
                    priority: formData.priority,
                    createdAt: new Date().toISOString(),
                };
                tickets.push(newTicket);
                toast.success("Ticket created successfully!");
            }

            // Save to localStorage
            localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));

            // Reset form if creating new
            if (!isEditMode) {
                setFormData({
                    title: "",
                    description: "",
                    status: "",
                    priority: "",
                });
            }

            // Navigate back to tickets page
            setTimeout(() => {
                navigate("/tickets");
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(`Failed to ${isEditMode ? "update" : "create"} ticket`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8 pt-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white p-8 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-6">
                        {isEditMode ? "Edit Ticket" : "Create New Ticket"}
                    </h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="space-y-2">
                            <label
                                htmlFor="title"
                                className="block font-medium"
                            >
                                Title <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter ticket title"
                                disabled={isLoading}
                                aria-invalid={!!errors.title}
                            />
                            {errors.title && (
                                <p
                                    className="text-sm text-red-600 flex items-center gap-1"
                                    role="alert"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="block font-medium"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={4}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter ticket description (optional)"
                                disabled={isLoading}
                                aria-invalid={!!errors.description}
                            />
                            {errors.description && (
                                <p
                                    className="text-sm text-red-600 flex items-center gap-1"
                                    role="alert"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label
                                htmlFor="status"
                                className="block font-medium"
                            >
                                Status <span className="text-red-600">*</span>
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                                aria-invalid={!!errors.status}
                            >
                                <option value="">Select status</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                            {errors.status && (
                                <p
                                    className="text-sm text-red-600 flex items-center gap-1"
                                    role="alert"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        {/* Priority (Optional) */}
                        <div className="space-y-2">
                            <label
                                htmlFor="priority"
                                className="block font-medium"
                            >
                                Priority (Optional)
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                <option value="">Select priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/tickets")}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? isEditMode
                                        ? "Updating..."
                                        : "Creating..."
                                    : isEditMode
                                    ? "Update Ticket"
                                    : "Create Ticket"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default CreateEditTicket;
