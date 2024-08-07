import { SearchBar } from "@/components/SearchBar"


export default function SearchLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>){
    return (
        <div className="min-w-full min-h-full">
            <div className=" py-2 flex justify-center">
                <SearchBar />
            </div>
            {children}
        </div>
    );
};