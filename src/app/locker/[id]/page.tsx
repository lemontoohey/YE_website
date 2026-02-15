import { notFound } from "next/navigation";
import evidenceLockerRaw from "@/lib/evidence_locker.json";
import { LuxeImage } from "@/components/ui";
import { LockerActions } from "@/components/locker/LockerActions";

type EvidenceItem = {
  id: number;
  title: string;
  src: string;
  price: string | null;
  description: string;
  stripe_price_id?: string | null;
};

const evidenceData = Array.isArray(evidenceLockerRaw)
  ? (evidenceLockerRaw as EvidenceItem[])
  : [];

function getItem(id: string): EvidenceItem | undefined {
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) return undefined;
  return evidenceData.find((item) => item.id === numId);
}

function isPrintOrMerch(item: EvidenceItem): boolean {
  const t = item.title.toLowerCase();
  return (
    t.includes("poster") ||
    t.includes("print") ||
    t.includes("shirt") ||
    t.includes("tee") ||
    t.includes("t-shirt") ||
    t.includes("tray") ||
    t.includes("rug") ||
    t.includes("towel") ||
    t.includes("apron")
  );
}

export async function generateStaticParams() {
  return evidenceData.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItem(id);
  if (!item) return { title: "Case File Not Found" };
  return {
    title: `${item.title} | Ye Yuan Evidence Locker`,
    description: item.description.slice(0, 160),
  };
}

export default async function LockerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getItem(id);
  if (!item) notFound();

  const canCheckout = isPrintOrMerch(item) && item.stripe_price_id;

  return (
    <div className="min-h-screen bg-void-950">
      <div className="grid min-h-[calc(100vh-4.5rem)] lg:grid-cols-2">
        {/* Left: Full-screen artwork */}
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-screen">
          <LuxeImage
            src={item.src}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: Case file details */}
        <div className="flex flex-col justify-center border-l-2 border-accent-500 bg-void-950 px-6 py-12 lg:px-12 lg:py-16">
          <h1 className="font-gta text-4xl font-normal text-white md:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <p className="mt-4 font-mono text-sm text-white/60">
            CASE-FILE-{String(item.id).padStart(3, "0")}
          </p>
          {item.price && (
            <p className="mt-2 font-mono text-lg text-accent-500">
              {item.price}
            </p>
          )}
          <p className="mt-6 font-mono text-sm leading-relaxed text-parchment-100/80">
            {item.description}
          </p>

          <div className="mt-12">
            <LockerActions item={item} canCheckout={canCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
}
