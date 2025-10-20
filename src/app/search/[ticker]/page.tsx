import { FilingYearList } from "@/components/FilingYearList"

export default async function TickerPage(props: any) {
    const params = props?.params ?? {};
    const ticker = String(await (params.ticker ?? "")).trim();

    return (
        <div className="w-[80%] mx-auto">
            <FilingYearList ticker={ticker}/>
        </div>
    );
};