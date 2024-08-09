"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { 
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface Ticker {
    value: string;
}

const fetchTickers = async (): Promise<Ticker[]> => {
    const response = await fetch(process.env.URL + "/api/tickers");
    if (!response.ok) {
        throw new Error('Failed to fetch tickers');
    }
    const tickers: Ticker[] = await response.json();
    return tickers;
};

export const SearchBar = async () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const tickers = await fetchTickers();
    
    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        area-expanded={open.toString()}
                        className="w-[700px] justify-between"
                    >
                        {value
                            ? tickers.find((ticker) => ticker.value === value)?.value
                            : "Select Ticker..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Ticker..." />
                        <CommandList>
                            <CommandEmpty>No ticker found.</CommandEmpty>
                            <CommandGroup>
                                {tickers.map((ticker) => (
                                    <CommandItem
                                        key={ticker.value}
                                        value={ticker.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check 
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === ticker.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {ticker.value}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Link href={`/search/${value}`} passHref>
                <Button className="mx-2 w-[100px]">
                    Analyze
                </Button>
            </Link>
        </div>
    );

};