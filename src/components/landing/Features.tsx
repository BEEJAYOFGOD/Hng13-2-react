"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";

const features = [
    {
        title: "Real-time Collaboration",
        description:
            "Work together seamlessly with your team. See updates instantly and never miss important changes.",
        icon: "👥",
    },
    {
        title: "Smart Prioritization",
        description:
            "Automatically prioritize tickets based on urgency, impact, and custom rules you define.",
        icon: "⚡",
    },
    {
        title: "Advanced Filtering",
        description:
            "Find exactly what you need with powerful search and filtering capabilities.",
        icon: "🔍",
    },
    {
        title: "Automation Rules",
        description:
            "Set up workflows that automatically assign, update, and resolve tickets.",
        icon: "🤖",
    },
    {
        title: "Detailed Analytics",
        description:
            "Track metrics that matter. Get insights into team performance and ticket trends.",
        icon: "📊",
    },
    {
        title: "Integrations",
        description:
            "Connect with your favorite tools. Slack, email, webhooks, and more.",
        icon: "🔗",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-20 md:py-32 bg-card/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Powerful Features for Modern Teams
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to manage tickets efficiently and
                        keep your team aligned.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="border border-border hover:border-primary/50 transition-colors"
                        >
                            <CardHeader>
                                <div className="text-4xl mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-foreground">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-muted-foreground">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
