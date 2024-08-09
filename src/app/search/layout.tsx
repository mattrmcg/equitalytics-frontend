import * as React from "react"
import { SearchBar } from "@/components/SearchBar"

interface Ticker {
    value: string;
}

const fetchTickers = async () => {
    const response = await fetch(process.env.EQL_TICKERS_URL as string);
    if (!response.ok) {
        throw new Error('Failed to fetch tickers');
    }
    const tickers = await response.json();
    return tickers;
}

// async function fetchTickers(): Promise<Ticker[]> {
//     try {
//         const res = await fetch("/api/tickers")
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error(`Error fetching tickers:`, error)
//         return [];
//     }
// }

export default async function SearchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    // const [tickers, setTickers] = React.useState<Ticker[]>([]);

    // React.useEffect(() => {
    //     const getTickers = async () => {
    //         const fetchedTickers = await fetchTickers();
    //         setTickers(fetchedTickers);
    //     };
    //     getTickers();
    // }, []);

    const tickers = await fetchTickers();

    return (
        <div className="min-w-full min-h-full">
            <div className=" py-2 flex justify-center">
                <SearchBar tickers={tickers} />
            </div>
            {children}
        </div>
    );
};