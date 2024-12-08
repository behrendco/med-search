import Image from "next/image";

export default function SourceCard({
  source,
  isPubMed,
}: {
  source: { url: string; title: string },
  isPubMed: boolean,
}) {
  return (
    <div className="flex h-[79px] w-full items-center gap-2.5 rounded-md border border-solid border-zinc-600 bg-zinc-800 px-1.5 py-1 md:w-auto">
      <div>
        <Image
          unoptimized
          src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=128`}
          alt={source.url}
          className="p-1"
          width={44}
          height={44}
        />
      </div>
      <div className="flex max-w-full md:max-w-[145px] flex-col justify-center gap-[7px]">
        <h6 className="line-clamp-2 text-xs font-light leading-[normal] text-white">
          {source.title}
        </h6>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={source.url}
          className="truncate text-xs font-light text-zinc-50/50"
        >
          {source.url}
        </a>
      </div>
    </div>
  );
}