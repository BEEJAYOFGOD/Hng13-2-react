import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/How";
import FAQ from "@/components/landing/Faq";
import CTA from "@/components/landing/Cta";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <div className="min-h-screen border relative">
                <Header />
                <Hero />
            </div>
            <Features />
            <Stats />
            <HowItWorks />
            <FAQ />
            <CTA />
        </main>
    );
}
