import { Button } from "../ui/button";
import { NavLink as Link } from "react-router-dom";
import wave from "../../assets/wave.svg";

export default function Hero() {
    return (
        <section className="py-20 md:py-32  ">
            {/* Background gradient */}

            <div className="bg-primary h-6 w-6 animate-bounce absolute right-12 top-24 rounded-full " />
            <div className="bg-primary h-6 w-6 animate-bounce absolute left-12 bottom-48 rounded-full" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 z-4">
                <div className="flex justify-center gap-3 items-center">
                    <span className="h-4 w-4 bg-primary rounded-full  animate-ping" />
                    <span className="px-3 py-1 bg-primary/10 text-primary   rounded-full text-sm font-medium">
                        Streamline Your Workflow
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl  text-center lg:text-6xl font-bold text-foreground leading-tight">
                    Manage Tickets with{" "}
                    <span className="text-primary">Ease</span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg text-center mx-auto">
                    TicketFlow is the modern ticket management system designed
                    for teams that want to work smarter, not harder. Track,
                    prioritize, and resolve issues in real-time.
                </p>

                <div className="flex flex-col md:flex-row gap-4 pt-4 justify-center">
                    <Button
                        size="lg"
                        className="md:w-auto w-fit mx-auto px-24 py-4 md:m-0"
                        asChild
                    >
                        <Link to="auth/signup">Get Started Free</Link>
                    </Button>
                    <Button
                        className="md:w-auto w-fit mx-auto px-24 md:m-0"
                        size={"lg"}
                        variant="outline"
                        asChild
                    >
                        <Link to="#how-it-works">Learn More</Link>
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                    No credit card required. Start managing tickets in minutes.
                </p>
            </div>
            <div className="absolute bottom-0 w-full  m">
                <img className=" " src={wave} alt="Wave decoration" />
            </div>
        </section>
    );
}
