import * as React from "react"
import { SearchBar } from "@/components/SearchBar"
import { createClient } from "@supabase/supabase-js"

interface Ticker {
    value: string;
}

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
    { auth: { persistSession: false } }
)

const _tickersCache: {data?: Ticker[]; expiresAt?: number } = {};

const fetchTickers = async (): Promise<Ticker[]> => {
    const now = Date.now()
    if (_tickersCache.data && _tickersCache.expiresAt && _tickersCache.expiresAt > now) {
        return _tickersCache.data;
    }

    const { data, error } = await supabase.from('companies').select('ticker');
    if (error) throw error;

    const result = (data ?? []).map((d: any) => ({ value: d.ticker ?? d.value ?? String(d) }));
    _tickersCache.data = result;
    _tickersCache.expiresAt = now + 60 * 60 * 60 * 1000;


    return result;
}

export default async function SearchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    const tickers = await fetchTickers();

    return (
        <div className="min-w-full min-h-[71dvh] bg-background text-foreground">
            <div className=" py-2 flex justify-center">
                <SearchBar tickers={tickers} />
            </div>
            {children}
        </div>
    );
};