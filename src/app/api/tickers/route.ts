import { NextResponse } from 'next/server';

const fetchFromBackend = async () => {
    const res = await fetch(process.env.EQL_TICKERS_URL as string);

    if (!res.ok) {
        throw new Error('Failed to fetch tickers');
    }
    const data = await res.json();
    return data;
};

export async function GET() {
    try {
        const tickers = await fetchFromBackend();
        return NextResponse.json(tickers);
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch tickers' }, { status: 500});
    }
}