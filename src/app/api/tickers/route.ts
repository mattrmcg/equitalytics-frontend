import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
    { auth: { persistSession: false } }
);

const fetchFromSupabase = async () => {
    const { data, error } = await supabase.from('companies').select('ticker');
    if (error) throw error;
    return data
};

export async function GET() {
    try {
        const tickers = await fetchFromSupabase();
        return NextResponse.json(tickers);
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch tickers' }, { status: 500});
    }
}