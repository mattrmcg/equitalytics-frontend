import { Suggestions } from "@/components/suggestions"

export default function SearchPage() {
    return (
        <section className="container min-h-[64dvh] flex flex-col justify-center max-w-3xl">
            <div className="flex flex-col items-center">
                <h3 className="text-muted-foreground text-lg">No data to display...</h3>
                <h3 className="text-muted-foreground text-lg pb-4">Here's some suggestions:</h3>
                <div className="w-[90%]">
                    <Suggestions />
                </div>
            </div>
        </section>
    );
};