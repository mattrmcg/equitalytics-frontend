import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Suggestions = () => {

    return (
        <div className="flex justify-between w-full mx-auto">
            <Link href="/search/AAPL" passHref>
                <Button variant="outline" className="bg-background w-[80px]">AAPL</Button>
            </Link>
            <Link href="/search/ADBE" passHref>
                <Button variant="outline" className="bg-background w-[80px]">ADBE</Button>
            </Link>
            <Link href="/search/CSCO" passHref>
                <Button variant="outline" className="bg-background w-[80px]">CSCO</Button>
            </Link>
            <Link href="/search/GM" passHref>
                <Button variant="outline" className="bg-background w-[80px]">GM</Button>
            </Link>
            <Link href="/search/MSFT" passHref>
                <Button variant="outline" className="bg-background w-[80px]">MSFT</Button>
            </Link>
            <Link href="/search/PEP" passHref>
                <Button variant="outline" className="bg-background w-[80px]">PEP</Button>
            </Link>
            <Link href="/search/TSLA" passHref>
                <Button variant="outline" className="bg-background w-[80px]">TSLA</Button>
            </Link>
            
        </div>
    );
};