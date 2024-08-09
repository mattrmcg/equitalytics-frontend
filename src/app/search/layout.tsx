import * as React from "react"
import { SearchBar } from "@/components/SearchBar"


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

    return (
        <div className="min-w-full min-h-full">
            <div className=" py-2 flex justify-center">
                <SearchBar />
            </div>
            {children}
        </div>
    );
};