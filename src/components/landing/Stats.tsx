"use client";

const stats = [
    {
        value: "10K+",
        label: "Active Users",
    },
    {
        value: "500K+",
        label: "Tickets Resolved",
    },
    {
        value: "99.9%",
        label: "Uptime",
    },
    {
        value: "24/7",
        label: "Support",
    },
];

export default function Stats() {
    return (
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {stat.value}
                            </div>
                            <div className="text-primary-foreground/80">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
