import { CircleEllipsis, Plus } from "lucide-react";

export default function SimilarTopics({
  similarQuestions,
  handleSubmit,
  reset,
}: {
  similarQuestions: string[],
  handleSubmit: (query: string) => Promise<void>,
  reset: () => void,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-auto w-full shrink-0">
      <div className="w-full max-w-[890px]">
        <div className="flex items-center justify-center gap-3 pb-3 lg:pb-3.5">
          <CircleEllipsis className="size-4" />
          <h3 className="text-base font-bold text-white">
            Related
          </h3>
        </div>
        <div className="flex flex-wrap content-center items-center gap-[15px] px-8">
          <div className="w-full whitespace-pre-wrap text-base font-light leading-[152.5%] text-white">
            {similarQuestions.length > 0 ? (
              similarQuestions.map((question) => (
                <button
                  className="flex cursor-pointer items-center gap-4 pt-3.5"
                  key={question}
                  onClick={() => {
                    reset();
                    handleSubmit(question);
                  }}
                >
                  <div className="flex items-center">
                    <Plus className="size-4" />
                  </div>
                  <p className="text-sm font-light leading-[normal] text-white [leading-trim:both] [text-edge:cap]">
                    {question}
                  </p>
                </button>
              ))
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