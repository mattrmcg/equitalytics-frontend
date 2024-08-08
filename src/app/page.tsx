import Image from "next/image";
import { Landing } from "@/components/Landing"
import { Disclaimer } from "@/components/Disclaimer"

export default function Home() {
  return (
    <div className="flex flex-col h-[71dvh] bg-background">
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <Landing />
        {/* <div className=" my-6">
          <p className="text-lg text-muted-foreground">
          
          </p>
        </div> */}
      </main>
    </div>
  );
};
