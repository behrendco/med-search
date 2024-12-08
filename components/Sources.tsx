import SourceCard from "@/components/SourceCard";
import { BookOpenText } from "lucide-react";

export default function Sources({
  name,
  sources,
  isLoading,
}: {
  name: string,
  sources: { url: string; title: string }[],
  isLoading: boolean,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-auto w-full shrink-0">
      <div className="flex items-center justify-center gap-3 pb-3 lg:pb-3.5">
        <BookOpenText className="size-4" />
        <h3 className="text-base font-bold text-white">
          {name} Sources
        </h3>
      </div>
      <div className="flex w-full max-w-[890px] flex flex-col md:flex-row px-8 content-center items-center gap-[15px]">
        {isLoading ? (
          <div className="flex w-full flex-col gap-2">
            <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
            <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
            <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
            <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
          </div>
        ) : sources.length > 0 ? (
          sources.map((source) => (
            <SourceCard 
              key={source.url} 
              source={source} 
              isPubMed={name === "PubMed"}
            />
          ))
        ) : (
          <div>Could not fetch sources.</div>
        )}
      </div>
    </div>
  )
}