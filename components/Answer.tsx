import { Info } from "lucide-react";

export default function Answer({
  answer,
}: {
  answer: string,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-auto w-full shrink-0">
      <div className="w-full max-w-[890px]">
        <div className="flex items-center justify-center gap-3 pb-3 lg:pb-3.5">
          <Info className="size-4" />
          <h3 className="text-base font-bold text-white">
            Answer
          </h3>
        </div>
        <div className="flex flex-wrap content-center items-center gap-[15px] px-8">
          <div className="w-full whitespace-pre-wrap text-base font-light leading-[152.5%] text-white">
            {answer ? (
              answer.trim()
            ) : (
              <div className="flex w-full flex-col gap-2">
                <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
                <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
                <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
                <div className="h-6 w-full animate-pulse rounded-md bg-zinc-800" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}