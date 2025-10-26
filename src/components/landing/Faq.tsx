"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is Ticko?",
        answer: "Ticko is a modern ticket management system designed to help teams track, prioritize, and resolve issues efficiently. It provides real-time collaboration, automation, and detailed analytics.",
    },
    {
        question: "How do I get started?",
        answer: "Simply sign up for a free account, create your first project, and start creating tickets. No credit card required and you can be up and running in minutes.",
    },
    {
        question: "Can I integrate with other tools?",
        answer: "Yes! Ticko integrates with popular tools like Slack, email, webhooks, and more. Check our integrations page for the full list.",
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use industry-standard encryption and security practices to protect your data. We also offer SSO and advanced permission controls.",
    },
    {
        question: "What is your pricing?",
        answer: "We offer flexible pricing plans starting from free. Visit our pricing page to see all available options and choose the plan that fits your needs.",
    },
    {
        question: "Do you offer support?",
        answer: "Yes, we provide 24/7 customer support via email, chat, and phone. Our support team is always ready to help you.",
    },
];

export default function FAQ() {
    return (
        <section id="faq" className="py-20 md:py-32 bg-card/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Find answers to common questions about Ticko.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-foreground hover:text-primary">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
