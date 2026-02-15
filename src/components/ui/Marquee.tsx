const TICKER_TEXT =
  "SEIZED ASSETS // NEW EVIDENCE // JEFFREY EPSTEIN // CASE FILE 2024 // ";

export function Marquee() {
  return (
    <div className="overflow-hidden bg-[#FF5A5F] py-3 -rotate-1">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="font-gta text-4xl text-[#000000]">{TICKER_TEXT}</span>
        <span className="font-gta text-4xl text-[#000000]">{TICKER_TEXT}</span>
      </div>
    </div>
  );
}
