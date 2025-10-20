import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Suggestions = () => {

    return (
        <div className="flex justify-between w-full mx-auto">
            <Link href="/search/BRK-B" passHref>
                <Button variant="outline" className="bg-background w-[80px]">BRK-B</Button>
            </Link>
            <Link href="/search/GM" passHref>
                <Button variant="outline" className="bg-background w-[80px]">GM</Button>
            </Link>
            <Link href="/search/GOOG" passHref>
                <Button variant="outline" className="bg-background w-[80px]">GOOG</Button>
            </Link>
            <Link href="/search/META" passHref>
                <Button variant="outline" className="bg-background w-[80px]">META</Button>
            </Link>
            <Link href="/search/NVDA" passHref>
                <Button variant="outline" className="bg-background w-[80px]">NVDA</Button>
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