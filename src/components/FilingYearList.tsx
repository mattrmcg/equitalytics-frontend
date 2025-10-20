import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign } from "lucide-react"
import { RadialChart } from "@/components/dashboard/test-radial"
import { ProgressAnimated } from "@/components/dashboard/animated-progess"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@supabase/supabase-js"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"

function priceToEarningsColor(pe : number): string {
    if (pe <= 25) {
        return "good"
    } else if (pe > 25 && pe < 50) {
        return "okay"
    } else {
        return "bad"
    }
}

interface DataDashboardProps {
    ticker: string | Promise<string>;
}

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
    { auth: { persistSession: false } }
)

async function getData(ticker: string) {
    "use server"

    console.log('[DataDashboard] getData ticker:', ticker);
    
    const { data, error } = await supabase.rpc('get_facts_for_ticker_cte', { p_ticker: ticker});

    if (error) {
        console.error('[DataDashboard] supabase.rpc error:', error);
        console.error('Supabase RPC error: ', error);
        throw new Error('Failed to fetch facts from Supabase');
    }

    const rows: any[] = Array.isArray(data) ? data : (data ? [data] : []);
    console.log(`[DataDashboard] rows returned: ${rows.length}`);

    const parseNumber = (raw: any) => {
        if (raw === null || raw === undefined) return null;
        const s = String(raw).replace(/,/g, '').trim();
        if (s === '') return null;
        return (/^-?\d+(\.\d+)?$/.test(s)) ? Number(s) : raw;
    };

    const parseYear = (y: any) => {
        if (y === null || y === undefined) return null;
        const n = Number(String(y).trim());
        return Number.isFinite(n) ? Math.trunc(n) : null;
    };

    const facts = rows.map(r => ({
        ...r,
        value: parseNumber(r.value),
        filing_year: parseYear(r.filing_year)
    }));

    return {
        ticker,
        companyName: rows[0]?.entity_name ?? null,
        facts
    };
    
}

export const FilingYearList: React.FC<DataDashboardProps> = async ({ ticker }) => {

    const resolvedTicker = await ticker;
    const data = await getData(resolvedTicker);

    const years = Array.from(
        new Set(
            data.facts
                .map((f: any) => f.filing_year)
                .filter((y: number | null) => y !== null && y !== undefined)
        )
    ).map(Number).sort((a, b) => b - a);

    return (
        <div className="mx-auto max-w-4xl p-6 bg-background text-foreground min-h-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">{resolvedTicker} <span className="text-muted-foreground text-base font-normal">- {data.companyName ?? 'Unknown'}</span></h1>
            </div>

            <div className="space-y-3">
                {years.length === 0 && (
                    <div className="text-sm text-muted-foreground">No filings available.</div>
                )}

                {years.map((year) => {
                    const count = data.facts.filter((f: any) => f.filing_year === year).length;
                    return (
                        <Link key={year} href={`${resolvedTicker}/${year}`} className="block w-full">
                            <div
                                role="button"
                                className="w-full flex items-center justify-between p-4 bg-card border rounded-lg shadow-sm hover:shadow transition"
                            >
                                <div>
                                    <div className="text-lg font-semibold">{year}</div>
                                    <div className="text-sm text-muted-foreground">{count} fact{count !== 1 ? 's': ''}</div>
                                </div>
                                <div className="text-sm text-muted-foreground">View</div>
                            </div>
                        </Link>
                        // <button
                        //     key={year}
                        //     type="button"
                        //     className="w-full flex items-center justify-between p-4 bg-card border rounded-lg shadow-sm hover:shadow-md transition"
                        //     // add onClick handler later to show details for the year
                        // >
                        //     <div>
                        //         <div className="text-lg font-semibold">{year}</div>
                        //         <div className="text-sm text-muted-foreground">{count} fact{count !== 1 ? 's' : ''}</div>
                        //     </div>
                        //     <div className="text-sm text-muted-foreground">View</div>
                        // </button>
                    )
                })}
            </div>
        </div>
    )

    // return (
    //     <div className="mx-auto grid grid-cols-3 p-6 gap-4">
    //         <div className="col-span-3 text-2xl">
    //             <h1 className=""><span className="font-bold">{ticker}</span> - {data.companyName}</h1>
    //         </div>
    //         <hr className="min-w-[80%] col-span-3" />
    //         <Card className="col-span-1 bg-card">
    //             <CardHeader>
    //                 <CardDescription>Pricing and Financials</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-columns-2 gap-4">
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Price at Previous Close</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.marketPricePerShare}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Table className="rounded-lg border">
    //                             <TableBody>
    //                                 <TableRow>
    //                                     <TableCell className="font-bold text-md">Net Income:</TableCell>
    //                                     <TableCell className="font-bold">{data.netIncome}</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell className="font-bold text-md">Operating Income:</TableCell>
    //                                     <TableCell className="font-bold">{data.operatingIncomeLoss}</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell className="font-bold text-md">Gross Profit:</TableCell>
    //                                     <TableCell className="font-bold">{data.grossProfit}</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell className="font-bold text-md">Operating Cash Flow:</TableCell>
    //                                     <TableCell className="font-bold">{data.operatingCashFlow}</TableCell>
    //                                 </TableRow>
    //                             </TableBody>
    //                         </Table>
    //                 {/* <Card>
    //                     <CardHeader>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <Table className="">
    //                             <TableBody>
    //                                 <TableRow>
    //                                     <TableCell>Net Income:</TableCell>
    //                                     <TableCell>24000</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>Net Income:</TableCell>
    //                                     <TableCell>24000</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>Net Income:</TableCell>
    //                                     <TableCell>24000</TableCell>
    //                                 </TableRow>
    //                                 <TableRow>
    //                                     <TableCell>Net Income:</TableCell>
    //                                     <TableCell>24000</TableCell>
    //                                 </TableRow>
    //                             </TableBody>
    //                         </Table>
    //                     </CardContent>
    //                 </Card> */}
    //             </CardContent>
    //         </Card>
    //         <Card className="col-span-2 bg-card">
    //             <CardHeader>
    //                 <CardDescription>Piotroski Score</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-cols-3 gap-2">
    //                 <RadialChart points={data.pointsInProfitability} maxPoints={4} label="Profitability" />
    //                 <RadialChart points={data.pointsInLeverageLiquiditySourceOfFunds} maxPoints={3} label="Financial Stability" />
    //                 <RadialChart points={data.pointsInOperatingEfficiency} maxPoints={2} label="Operating Efficiency" />
    //                 <Card className="col-span-3">
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Total Score</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="flex">
    //                             <h2 className="text-4xl font-bold">{data.piotroskiScore}</h2>
    //                             <ProgressAnimated score={data.piotroskiScore}/>
    //                         </div>
    //                     </CardContent>
    //                 </Card>
    //             </CardContent>
    //         </Card>
    //         <Card className="col-span-3 bg-card">
    //             <CardHeader>
    //                 <CardDescription>Valuation</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-cols-4 gap-4">
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">P/E Ratio</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.priceToEarningsRatio}</div>
    //                         {/* <Badge className={`w-[50%] bg-${priceToEarningsColor(data.priceToEarningsRatio)}`}></Badge> */}
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Price to Book Ratio</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.priceToBookRatio}</div>
    //                     </CardContent>
    //                 </Card>
    //                     <Card>
    //                         <CardHeader>
    //                             <CardTitle className="text-md">Price to Sales Ratio</CardTitle>
    //                         </CardHeader>
    //                         <CardContent>
    //                             <div className="text-2xl font-bold">${data.priceToSalesRatio}</div>
    //                         </CardContent>
    //                     </Card>
    //                     <Card>
    //                         <CardHeader>
    //                             <CardTitle className="text-md">Earnings Per Share</CardTitle>
    //                         </CardHeader>
    //                         <CardContent>
    //                             <div className="text-2xl font-bold">${data.earningsPerShare}</div>
    //                         </CardContent>
    //                     </Card>
    //             </CardContent>
    //         </Card>
    //         <Card className="col-span-2">
    //             <CardHeader className="">
    //                 <CardDescription>Profitability</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-cols-3 gap-4">
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Gross Profit Margin</CardTitle>
    //                     </CardHeader>
    //                     <CardContent className="">
    //                         <div className="text-2xl font-bold">${data.grossProfitMargin}</div>
    //                         {/* <p className="w-4 h-4 text-muted-foreground">USD</p> */}
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Net Profit Margin</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.netProfitMargin}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Operating Profit Margin</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.operatingProfitMargin}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Return On Equity</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.returnOnEquity}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Return On Assets</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.returnOnAssets}</div>
    //                     </CardContent>
    //                 </Card>
    //             </CardContent>
    //         </Card>
    //         <Card>
    //             <CardHeader>
    //                 <CardDescription>Liquidity</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-cols-1 gap-4">
    //             <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Current Ratio</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.currentRatio}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Quick Ratio</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.quickRatio}</div>
    //                     </CardContent>
    //                 </Card>
    //             </CardContent>
    //         </Card>
    //         <Card className="col-span-2">
    //             <CardHeader>
    //                 <CardDescription>Solvency</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-cols-3 gap-4">
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Debt To Equity</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.debtToEquityRatio}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Debt to Assets</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.debtToAssetsRatio}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Interest Coverage</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.interestCoverageRatio} </div>
    //                     </CardContent>
    //                 </Card>
    //             </CardContent>
    //         </Card>
    //         <Card className="col-span-1">
    //             <CardHeader>
    //                 <CardDescription>Holdings</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid grid-cols-1 gap-4">
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Assets</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.assets}</div>
    //                     </CardContent>
    //                 </Card>
    //                 <Card>
    //                     <CardHeader>
    //                         <CardTitle className="text-md">Liabilities</CardTitle>
    //                     </CardHeader>
    //                     <CardContent>
    //                         <div className="text-2xl font-bold">${data.liabilities}</div>
    //                     </CardContent>
    //                 </Card>
    //             </CardContent>
    //         </Card>
    //     </div>
    //     // <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flexwrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
    //     //     <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
    //     //         <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
    //     //             <CardHeader className="space-y-0 pb-2">
    //     //                 <CardDescription>Piotroski Scoring</CardDescription>
    //     //                 <CardTitle className="text-4xl tabular-nums">
    //     //                     Testing
    //     //                 </CardTitle>

    //     //             </CardHeader>
    //     //         </Card>

    //     //     </div>
    //     // </div>
    // )

};