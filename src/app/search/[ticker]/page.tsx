import { FilingYearList } from "@/components/FilingYearList"

export default async function TickerPage({ params }: { params: { ticker: string } }) {

    const resolvedParams = await params;

    return (
        <div className="w-[80%] mx-auto">
            <FilingYearList ticker={resolvedParams.ticker}/>
        </div>
    );
};