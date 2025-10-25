const steps = [
    {
        number: "1",
        title: "Create Tickets",
        description:
            "Submit new tickets with detailed information, attachments, and priority levels.",
    },
    {
        number: "2",
        title: "Assign & Prioritize",
        description:
            "Automatically assign tickets to team members and set priorities based on impact.",
    },
    {
        number: "3",
        title: "Collaborate",
        description:
            "Add comments, updates, and collaborate with your team in real-time.",
    },
    {
        number: "4",
        title: "Resolve & Track",
        description:
            "Mark tickets as resolved and track metrics to improve your workflow.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get started in four simple steps and start managing
                        tickets like a pro.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
                            )}

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground text-center">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
