import { DataDashboard } from "@/components/DataDashboard"

export default function TickerPage({ params }: { params: { ticker: string } }) {
    return (
        <div className="w-[80%] mx-auto">
            <DataDashboard ticker={params.ticker}/>
        </div>
    );
};