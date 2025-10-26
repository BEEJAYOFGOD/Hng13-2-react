"use client";

import { Button } from "@/components/ui/button";
import { NavLink as Link } from "react-router-dom";

export default function CTA() {
    return (
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Transform Your Ticket Management?
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                    Join thousands of teams already using Ticko to streamline
                    their workflow and improve productivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                        <Link to="/signup">Start Free Trial</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                        asChild
                    >
                        <Link to="#pricing">View Pricing</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
