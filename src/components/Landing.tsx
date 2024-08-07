import { Button } from "@/components/ui/button"

export const Landing = () => {
    return (
        <div className="max-w-3xl text-center space-y-4 py-12">
            <h1 className="text-4xl md:text-5xl lf:text-6xl font-bold tracking-tight">
                Analyze fundamental company data in seconds
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
                Generate reports on filing data and financial metrics for over 2000 public companies.
            </p>
            <div className="">
                <Button>Analyze Company</Button>
            </div>
        </div>
    );
};