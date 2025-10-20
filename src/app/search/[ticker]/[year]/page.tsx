import { createClient } from "@supabase/supabase-js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RpcRow = {
  value: string | null;
  filing_year?: string | null;
  fact_name?: string | null;
  label?: string | null;
  description?: string | null;
  ticker?: string | null;
  entity_name?: string | null;
  cik?: string | null;
};

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
    { auth: { persistSession: false } }
);

const parseNumber = (raw: any) => {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).replace(/,/g, "").trim();
  if (s === "") return null;
  return (/^-?\d+(\.\d+)?$/.test(s)) ? Number(s) : raw;
};

const formatNumber = (val: number | string | null | undefined) => {
  if (val === null || val === undefined) return "—";
  // if it's already a number use it, otherwise try to coerce
  const n = typeof val === "number" ? val : Number(String(val).replace(/,/g, "").trim());
  if (!Number.isFinite(n)) return String(val);
  // integers -> no fraction digits
  if (Math.abs(n - Math.trunc(n)) < Number.EPSILON) {
    return n.toLocaleString();
  }
  // floats -> up to 6 fraction digits, trim trailing zeros
  const s = n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  return s;
};

export default async function YearPage({ 
    params ,
}: {
    params: { ticker: string | Promise<string>; year: string | Promise<string> };
}) {
    const resolvedParams = await params
    const ticker = (await resolvedParams.ticker).trim();
    const yearStr = (await resolvedParams.year).trim();
    const yearNum = Number.isFinite(Number(yearStr)) ? Number(yearStr) : null;

    const { data, error } = await supabase.rpc('get_facts_for_ticker_cte', {
        p_ticker: ticker,
        p_year: yearNum,
    });

    if (error) {
        console.error("RPC error:", error);
        return <div className="p-6">Failed to load facts.</div>
    }

    let rows: RpcRow[] = [];
    if (typeof data === "string") {
        try { rows = JSON.parse(data); } catch { rows = []; }
    } else if (Array.isArray(data)) {
        rows = data as RpcRow[];
    } else if (data) {
        rows = [data as RpcRow];
    }

    const companyName = rows[0]?.entity_name ?? null;
    const cik = rows[0]?.cik ?? null;

    return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {ticker} — {yearStr}
      </h1>
      {companyName ? (
        <div className="mb-4 flex items-center gap-3">
          <div className="text-sm text-muted-foreground">{companyName}</div>
          {cik && <div className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-md">{`CIK ${cik}`}</div>}
        </div>
      ) : (
        <div className="mb-4 text-sm text-muted-foreground">Company information not available</div>
      )}

      {rows.length === 0 ? (
        <div className="text-sm text-muted-foreground">No facts for this year.</div>
      ) : (
        <Table className="bg-card border">
          <TableHeader>
            <TableRow >
              <TableHead>Fact</TableHead>
              <TableHead className="w-48">Value</TableHead>
              <TableHead className="w-32">Filing Year</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="py-2">{r.label ?? r.fact_name ?? "—"}</TableCell>
                <TableCell className="py-2">{formatNumber(parseNumber(r.value)) ?? r.value ?? "—"}</TableCell>
                <TableCell className="py-2">{r.filing_year ?? yearStr}</TableCell>
                <TableCell className="text-sm text-muted-foreground py-2">{r.description ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <div className="text-sm text-muted-foreground">
                  {rows.length} fact{rows.length !== 1 ? "s" : ""} shown
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
    );
}